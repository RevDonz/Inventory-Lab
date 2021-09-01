import React, { useEffect, useState } from 'react'
import { 
    Badge, 
    TableContainer,
    Table,
    TableHeader,
    TableBody,
    TableRow,
    TableCell,
    Pagination,
    TableFooter} from '@windmill/react-ui'
import { PageTitle, SectionTitle } from '../components';
import axios from 'axios';

const RiwayatPeminjaman = (props) => {

    const [dataPeminjaman, setDataPeminjaman] = useState([])
    const [isLoading, setIsLoading] = useState(true);

    // setup pages control for every table
    const [pageTable1, setPageTable1] = useState(1)
    // setup data for every table
    const [dataTable1, setDataTable1] = useState([])
    // pagination setup
    const resultsPerPage = 7
    const totalResults = dataPeminjaman.length

    // pagination change control
    const onPageChangeTable1 = (p) => {
        setPageTable1(p)
    }

    const getUserById = () => {
        const accesstoken = window.localStorage.getItem('token')
        axios.get('https://inventorylab.herokuapp.com/user/getdetailuser/', {
            headers: {
                'Authorization': `token ${accesstoken}`
            }
        })
        .then(res => {
            const data = res.data.details._id;
            getHistory(data._id)
        })
        .catch(err => {
            console.log(err)
        })
    }

    const getHistory = (UserId) => {
        const accesstoken = window.localStorage.getItem('token')

        axios.get(`https://inventorylab.herokuapp.com/borrower/user/${UserId}`, {
            headers: {
                'Authorization': `token ${accesstoken}`
            }
        })
        .then((res) => {
            setIsLoading(false)
            console.log(res);
            setDataPeminjaman(res.data.data);
            setDataTable1(res.data.data.slice((pageTable1 - 1) * resultsPerPage, pageTable1 * resultsPerPage))
        })
        .catch((err) => {
            console.log(err.response);
        })
    }

    useEffect(() => {
        setDataTable1(dataPeminjaman.slice((pageTable1 - 1) * resultsPerPage, pageTable1 * resultsPerPage))
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [pageTable1])

    useEffect(() => {
        getUserById();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const Spinner = () => {
        return (
            <TableRow>
                <TableCell colSpan={6} className="text-center">Loading Data...</TableCell>
            </TableRow>
        )
    }
    
    return (
        <>
            <PageTitle>Riwayat Peminjaman</PageTitle>
            <div className="mb-8">
                <SectionTitle>Data Peminjaman</SectionTitle>
                <TableContainer>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableCell>Barang</TableCell>
                                <TableCell>Jumlah</TableCell>
                                <TableCell>Tanggal Pinjam</TableCell>
                                <TableCell>Tanggal Kembali</TableCell>
                                <TableCell>Status</TableCell>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                        {isLoading ? <Spinner /> : dataTable1.map((borrow, i) => {
                            return (
                                <TableRow key={i}>
                                        <TableCell>{borrow.itemId}</TableCell>
                                        <TableCell>{borrow.itemBorrow}</TableCell>
                                        <TableCell>{borrow.dateBorrowUser}</TableCell>
                                        <TableCell>{borrow.dateReturnUser}</TableCell>
                                        <TableCell>
                                            <Badge type={borrow.status === 'Accepted' ? 'success' : borrow.status === 'in process' ? 'warning' : 'danger'} >
                                                {borrow.status}
                                            </Badge>
                                        </TableCell>
                                    </TableRow>
                            )
                        })}
                        </TableBody>
                    </Table>
                    <TableFooter>
                        <Pagination
                            totalResults={totalResults}
                            resultsPerPage={resultsPerPage}
                            onChange={onPageChangeTable1}
                            label="Table navigation"
                        />
                </TableFooter>
                </TableContainer>
            </div>
        </>
    )
}

export default RiwayatPeminjaman