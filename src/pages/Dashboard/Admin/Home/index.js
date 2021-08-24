import React, { useEffect, useState } from 'react';
import axios from 'axios';

import {
    TableContainer,
    Table,
    TableHeader,
    TableBody,
    TableRow,
    TableCell,
    Button,
} from '@windmill/react-ui';
import { EditIcon, TrashIcon } from '../../../../icons';
import Swal from 'sweetalert2';
import { Header, PageTitle, SectionTitle, Sidebar } from '../../../../components';

const Home = () => {
    const [data, setData] = useState([]);

    const getItem = async () => {
        const response = await axios.get(
            'https://inventorylab.herokuapp.com/items'
        );
        const data = await Promise.all(
            response.data.data.map(async (item) => {
                return {
                    ...item,
                    category: await getCategory(item.categoryId).then((res) => {
                        return res;
                    }),
                };
            })
        );
        // console.log(data);
        setData(data);
    };
    const getCategory = async (id) => {
        const response = await axios.get(
            'https://inventorylab.herokuapp.com/category/searchCategory/' + id
        );
        return response.data.data;
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
                axios
                    .delete(
                        `https://inventorylab.herokuapp.com/items/deleteItem/${id}`
                    )
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

    return (
        <div class='flex h-screen bg-gray-50 dark:bg-gray-900 font-poppins'>
            {/* <!-- Desktop sidebar --> */}
            <Sidebar />
            <div class='flex flex-col flex-1'>
                <Header />
                <main class='h-full pb-16 overflow-y-auto'>
                    {/* <!-- Remove everything INSIDE this div to a really blank page --> */}
                    <div class='container px-6 mx-auto grid'>
                        <PageTitle>Dashboard</PageTitle>
                        <SectionTitle>Tabel daftar barang</SectionTitle>
                        <TableContainer>
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableCell>Nama Barang</TableCell>
                                        <TableCell>Kode Barang</TableCell>
                                        <TableCell>Kategori Barang</TableCell>
                                        <TableCell>Jumlah Barang</TableCell>
                                        <TableCell>
                                            Jumlah Barang Dipinjam
                                        </TableCell>
                                        <TableCell>Aksi</TableCell>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {data.map((item, i) => {
                                        return (
                                            <TableRow key={i}>
                                                <TableCell>
                                                    {item.itemName}
                                                </TableCell>
                                                <TableCell>
                                                    {item.itemCode}
                                                </TableCell>
                                                <TableCell>
                                                    {item.category.categoryName}
                                                </TableCell>
                                                <TableCell>
                                                    {item.itemAmount}
                                                </TableCell>
                                                <TableCell>
                                                    {item.itemInBorrow}
                                                </TableCell>
                                                <TableCell>
                                                    <div className='flex items-center space-x-4'>
                                                        <Button
                                                            layout='link'
                                                            icon={EditIcon}
                                                            aria-label='Edit'
                                                        />
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
                                    })}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </div>
                </main>
            </div>
        </div>
    );
};

export default Home;
