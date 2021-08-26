import React, { useEffect, useState } from 'react';
import {
    TableContainer,
    Table,
    TableHeader,
    TableBody,
    TableRow,
    TableCell,
    Button,
    Badge,
} from '@windmill/react-ui';
import { EditIcon, TrashIcon } from '../icons';
import { PageTitle, SectionTitle } from '../components';
import Swal from 'sweetalert2';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Dashboard = () => {
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const getItem = () => {
        axios
            .get('https://inventorylab.herokuapp.com/borrower/')
            .then((res) => {
                const data = res.data;
                setData(data.data);
                setIsLoading(false);
            })
            .catch((err) => {
                console.log(err);
            })
    };

    useEffect(() => {
        getItem();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const handleDeletePost = (id) => {
        Swal.fire({
            title: 'Apakah Anda yakin ingin menghapus data?',
            text: 'Data yang sudah dihapus tidak dapat dikembalikan lagi!',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Ya, hapus data',
            cancelButtonText: 'Batal',
        }).then((result) => {
            if (result.isConfirmed) {
                axios.delete(`https://inventorylab.herokuapp.com/items/deleteItem/${id}`)
                    .then((res) => {
                        Swal.fire(
                            'Deleted!',
                            'Your file has been deleted.',
                            'success'
                            );
                            getItem();
                        })
                        .catch((err) => console.log('err:', err));
                    }
            });
    };

    const Spinner = () => {
        return (
            <TableRow>
                <TableCell colSpan={9} className='text-center'>
                    Memuat Data...
                </TableCell>
            </TableRow>
        );
    };

    return (
        <>
            <PageTitle>Dashboard</PageTitle>
            <SectionTitle>Tabel Data Peminjaman</SectionTitle>

            <TableContainer>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableCell>Nama Peminjam</TableCell>
                            <TableCell>Nama Barang</TableCell>
                            <TableCell>Jumlah</TableCell>
                            <TableCell>Tanggal Pinjam</TableCell>
                            <TableCell>Tanggal Dikembalikan</TableCell>
                            <TableCell>Garansi</TableCell>
                            <TableCell>Tanggal Pengajuan</TableCell>
                            <TableCell>Status</TableCell>
                            <TableCell>Aksi</TableCell>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {isLoading ? (
                            <Spinner />
                        ) : (
                            data.map((borr, i) => {
                                return (
                                    <TableRow key={i}>
                                        <TableCell>{borr.detailUser[0].fullname}</TableCell>
                                        <TableCell>{borr.detailItem[0].itemName}</TableCell>
                                        <TableCell>{borr.itemBorrow}</TableCell>
                                        <TableCell>{borr.dateBorrow}</TableCell>
                                        <TableCell>{borr.dateReturn}</TableCell>
                                        <TableCell>{borr.guarantee}</TableCell>
                                        <TableCell>{borr.dateRequest}</TableCell>
                                        <TableCell><Badge type="success">{borr.status}</Badge></TableCell>
                                        <TableCell>
                                            <div className='flex items-center space-x-4'>
                                                <Link to='/app/updateitem'>
                                                    <Button
                                                        layout='link'
                                                        icon={EditIcon}
                                                        aria-label='Edit'
                                                    />
                                                </Link>
                                                <Button
                                                    className='text-red-500'
                                                    layout='link'
                                                    icon={TrashIcon}
                                                    aria-label='Delete'
                                                    onClick={() =>
                                                        handleDeletePost(
                                                            borr._id
                                                        )
                                                    }
                                                />
                                            </div>
                                        </TableCell>
                                    </TableRow>
                                );
                            })
                        )}
                    </TableBody>
                </Table>
            </TableContainer>
        </>
    );
};

export default Dashboard;
