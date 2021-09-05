import React, { useEffect, useState } from 'react';
import {
    TableContainer,
    Table,
    TableHeader,
    TableBody,
    TableRow,
    TableCell,
    Button,
    TableFooter,
    Pagination,
} from '@windmill/react-ui';
import { EditIcon, EyeIcon, TrashIcon } from '../icons';
import { PageTitle, SectionTitle } from '../components';
import Swal from 'sweetalert2';
import axios from 'axios';
import { useHistory } from 'react-router-dom';

const ListItems = () => {
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const history = useHistory();
    const accesstoken = localStorage.getItem('token');

    // setup pages control for every table
    const [pageTable1, setPageTable1] = useState(1);

    // setup data for every table
    const [dataTable1, setDataTable1] = useState([]);

    // pagination setup
    const resultsPerPage = 7;
    const totalResults = data.length;

    // pagination change control
    function onPageChangeTable1(p) {
        setPageTable1(p);
    }

    const getItem = () => {
        axios
            .get('https://inventorylab.herokuapp.com/items')
            .then((res) => {
                const data = res.data;
                console.log(data.data);
                const desc = data.data
                    .sort((a, b) => a.itemCode - b.itemCode)
                    .reverse();
                setDataTable1(
                    desc.slice(
                        (pageTable1 - 1) * resultsPerPage,
                        pageTable1 * resultsPerPage
                    )
                );
                setData(desc);
                setIsLoading(false);
            })
            .catch((err) => {
                console.log(err);
            });
    };

    useEffect(() => {
        setDataTable1(
            data.slice(
                (pageTable1 - 1) * resultsPerPage,
                pageTable1 * resultsPerPage
            )
        );
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [pageTable1]);

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
                Swal.fire({
                    title: 'Loading',
                    allowOutsideClick: false,
                    didOpen: () => {
                        Swal.showLoading();
                    },
                });
                axios
                    .delete(
                        `https://inventorylab.herokuapp.com/items/deleteItem/${id}`,
                        {
                            headers: {
                                Authorization: `token ${accesstoken}`,
                            },
                        }
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

    const handlePict = (pict) => {
        Swal.fire({
            imageUrl: pict,
            imageWidth: 400,
            imageAlt: 'Custom image',
        });
    }

    const Spinner = () => {
        return (
            <TableRow>
                <TableCell colSpan={7} className='text-center'>
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
                            <TableCell className='text-center'>
                                Jumlah Barang
                            </TableCell>
                            <TableCell className='text-center'>
                                Jumlah Barang Dipinjam
                            </TableCell>
                            <TableCell className='text-center'>
                                Gambar
                            </TableCell>
                            <TableCell className='text-center'>Aksi</TableCell>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {isLoading ? (
                            <Spinner />
                        ) : (
                            dataTable1.map((item, i) => {
                                return (
                                    <TableRow key={i}>
                                        <TableCell>{item.itemName}</TableCell>
                                        <TableCell>{item.itemCode}</TableCell>
                                        <TableCell>
                                            {
                                                item.detailCategory[0]
                                                    .categoryName
                                            }
                                        </TableCell>
                                        <TableCell className='text-center'>
                                            {item.itemAmount}
                                        </TableCell>
                                        <TableCell className='text-center'>
                                            {item.itemInBorrow}
                                        </TableCell>
                                        <TableCell className='text-center'>
                                            <Button
                                                className=''
                                                layout='link'
                                                icon={EyeIcon}
                                                aria-label='Detail'
                                                onClick={() =>
                                                    handlePict(item.itemPicture)
                                                }
                                            />
                                        </TableCell>
                                        <TableCell>
                                            <div className='flex items-center space-x-4 justify-center'>
                                                <Button
                                                    layout='link'
                                                    icon={EditIcon}
                                                    aria-label='Edit'
                                                    onClick={() =>
                                                        history.push(
                                                            `/app/updateitem/${item._id}`
                                                        )
                                                    }
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
                            })
                        )}
                    </TableBody>
                </Table>
                <TableFooter>
                    <Pagination
                        totalResults={totalResults}
                        resultsPerPage={resultsPerPage}
                        onChange={onPageChangeTable1}
                        label='Table navigation'
                    />
                </TableFooter>
            </TableContainer>
        </>
    );
};

export default ListItems;
