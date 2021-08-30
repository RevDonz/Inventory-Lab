import React, { useEffect, useState } from 'react'
import { 
    Badge, 
    TableContainer,
    Table,
    TableHeader,
    TableBody,
    TableRow,
    TableCell} from '@windmill/react-ui'
import { PageTitle, SectionTitle } from '../components';
import axios from 'axios';

const RiwayatPeminjaman = (props) => {
    const [userIdUser, setUserIdUser] = useState('')
    const [dataPeminjaman, setDataPeminjaman] = useState([])

    const getUserById = () => {
        const accesstoken = window.localStorage.getItem('token')
        axios.get('https://inventorylab.herokuapp.com/user/getdetailuser/', {
            headers: {
                'Authorization': `token ${accesstoken}`
            }
        })
        .then(res => {
            // console.log(res.data.details._id);
            const data = res.data.details._id;
            setUserIdUser(data._id);
        })
        .catch(err => {
            console.log(err)
        })
    }

    const getHistory = async () => {
        const response = await axios.get(
            'https://inventorylab.herokuapp.com/borrower'
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
        console.log(data)
        setDataPeminjaman(data);
    };

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
                        {dataPeminjaman.map((borrow, i) => {
                            return borrow.userId === userIdUser ? (
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
                            ) : null
                        })}
                        </TableBody>
                    </Table>
                </TableContainer>
            </div>
        </>
    )
}

export default RiwayatPeminjaman