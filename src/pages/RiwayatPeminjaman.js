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
    const [userIdUser, setUserIdUser] = useState('')
    const [dataPeminjaman, setDataPeminjaman] = useState([])
    const [isLoading, setIsLoading] = useState(true);
    const accesstoken = window.localStorage.getItem('token')

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
        axios.get('https://inventorylab.herokuapp.com/user/getdetailuser/', {
            headers: {
                'Authorization': `token ${accesstoken}`
            }
        })
        .then(res => {
            // console.log(res.data.details._id);
            const data = res.data.details._id;
            console.log(data._id)
            setUserIdUser(data._id);
        })
        .catch(err => {
            console.log(err)
        })
    }

    const getHistory = async () => {
        const response = await axios.get(
            `https://inventorylab.herokuapp.com/borrower/user/${userIdUser}`, {
                headers: {
                    'Authorization': `token ${accesstoken}`
                }
            }
        );
        const data = await Promise.all(
            response.data.data.map(async (borrow) => {
                return {
                    ...borrow,
                    item: await getItem(borrow.itemId).then((res) => {
                        return res;
                    }),
                };
            })
        );
        setDataPeminjaman(data);
        setDataTable1(data.slice((pageTable1 - 1) * resultsPerPage, pageTable1 * resultsPerPage))
        setIsLoading(false)
    };

    useEffect(() => {
        setDataTable1(dataPeminjaman.slice((pageTable1 - 1) * resultsPerPage, pageTable1 * resultsPerPage))
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [pageTable1])

    const getItem = async (id) => {
        const response = await axios.get(
            'https://inventorylab.herokuapp.com/items/findItem/' + id
        );
        return response.data.data;
    };

    useEffect(() => {
        getUserById();
        getHistory();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [props])

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
                                        <TableCell>{borrow.item.itemName}</TableCell>
                                        <TableCell>{borrow.itemBorrow}</TableCell>
                                        <TableCell>{borrow.dateBorrowUser}</TableCell>
                                        <TableCell>{borrow.dateReturnUser}</TableCell>
                                        <TableCell>
                                            <Badge type={borrow.status === 'Accepted' ? 'success' : borrow.status === 'in process' ? 'warning' : 'danger'} >
                                                {borrow.status}
                                            </Badge>
                                        </TableCell>
                                    </TableRow>
                            ) ;
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