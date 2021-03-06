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
import { EditIcon, TrashIcon } from '../icons';
import { PageTitle, SectionTitle } from '../components';
import Swal from 'sweetalert2';
import axios from 'axios';
import { useHistory } from 'react-router-dom';

const Category = () => {
    const [dataCategory, setDataCategory] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const history = useHistory()

    // setup pages control for every table
    const [pageTable1, setPageTable1] = useState(1)
    // setup data for every table
    const [dataTable1, setDataTable1] = useState([])
    // pagination setup
    const resultsPerPage = 7
    const totalResults = dataCategory.length
    // pagination change control
    const onPageChangeTable1 = (p) => {
        setPageTable1(p)
    }

    const getCategory = () => {
        axios.get(
            'https://inventorylab.herokuapp.com/category'
        )
        .then((res) => {
            const data = res.data;
            const desc = data.data
                    .sort((a,b) => (a.categoryName > b.categoryName) ? 1 : ((b.categoryName > a.categoryName) ? -1 : 0));
            setDataCategory(desc);
            setDataTable1(desc.slice((pageTable1 - 1) * resultsPerPage, pageTable1 * resultsPerPage))
            setIsLoading(false)
        })
        .catch((err) => {
            console.log(err)
        })
    };
    
    useEffect(() => {
        setDataTable1(dataCategory.slice((pageTable1 - 1) * resultsPerPage, pageTable1 * resultsPerPage))
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [pageTable1])

    useEffect(() => {
        getCategory();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const handleDeletePost = (id) => {
        const accesstoken = window.localStorage.getItem('token')
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
                        Swal.showLoading()
                    }
                })
                axios
                    .delete(`https://inventorylab.herokuapp.com/category/deleteCategory/${id}`, {
                        headers: {
                            'Authorization' : `token ${accesstoken}`
                        }
                    })
                    .then((res) => {
                        Swal.fire(
                            'Deleted!',
                            'Your file has been deleted.',
                            'success'
                        );
                        getCategory();
                    })
                    .catch((err) => console.log('err:', err));
            }
        });
    };

    const Spinner = () => {
        return (
            <TableRow>
                <TableCell colSpan={6} className="text-center">Loading Data...</TableCell>
            </TableRow>
        )
    }

    return (
        <>
            <PageTitle>Kategori</PageTitle>
            <SectionTitle>Tabel daftar kategori</SectionTitle>

            <TableContainer className="w-1/2">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableCell>No</TableCell>
                            <TableCell>Nama Kategori</TableCell>
                            <TableCell className='text-center'>Aksi</TableCell>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {isLoading ? <Spinner /> : dataTable1.map((category, index) => {
                            return (
                                <TableRow key={category._id}>
                                    <TableCell>{index + 1}</TableCell>
                                    <TableCell>{category.categoryName}</TableCell>
                                    <TableCell className='text-center'>
                                        <div className='flex items-center justify-center space-x-4'>
                                            <Button
                                                layout='link'
                                                icon={EditIcon}
                                                aria-label='Edit'
                                                onClick = {() =>
                                                    history.push(`/app/updatecategory/${category._id}`)}
                                            />
                                            <Button
                                                className='text-red-500'
                                                layout='link'
                                                icon={TrashIcon}
                                                aria-label='Delete'
                                                onClick={() =>
                                                    handleDeletePost(category._id)
                                                }
                                            />
                                        </div>
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
        </>
    );
};

export default Category;
