import React, { useEffect, useState } from 'react';
import {
    TableContainer,
    Table,
    TableHeader,
    TableBody,
    TableRow,
    TableCell,
    Button,
} from '@windmill/react-ui';
import { EditIcon, TrashIcon } from '../icons';
import { PageTitle, SectionTitle } from '../components';
import Swal from 'sweetalert2';
import axios from 'axios';
import { Link } from 'react-router-dom';

const ListItems = () => {
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const getItem = () => {
        axios
            .get('https://inventorylab.herokuapp.com/items')
            .then((res) => {
                const data = res.data;
                setData(data.data);
                // console.log(data);
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
                <TableCell colSpan={6} className='text-center'>
                    Memuat Data...
                </TableCell>
            </TableRow>
        );
    };

    return (
        <>
            <PageTitle>Daftar Barang</PageTitle>
            <SectionTitle>Tabel daftar barang</SectionTitle>

            <TableContainer>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableCell>Nama Barang</TableCell>
                            <TableCell>Kode Barang</TableCell>
                            <TableCell>Kategori Barang</TableCell>
                            <TableCell>Jumlah Barang</TableCell>
                            <TableCell>Jumlah Barang Dipinjam</TableCell>
                            <TableCell>Aksi</TableCell>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {isLoading ? (
                            <Spinner />
                        ) : (
                            data.map((item, i) => {
                                return (
                                    <TableRow key={i}>
                                        <TableCell>{item.itemName}</TableCell>
                                        <TableCell>{item.itemCode}</TableCell>
                                        <TableCell>
                                            {item.detailCategory[0].categoryName}
                                        </TableCell>
                                        <TableCell>{item.itemAmount}</TableCell>
                                        <TableCell>
                                            {item.itemInBorrow}
                                        </TableCell>
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
                                                            item._id
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

export default ListItems;
