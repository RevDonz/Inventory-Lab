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
import { useHistory } from 'react-router-dom';

const Category = () => {
    const [dataCategory, setDataCategory] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const history = useHistory()

    const getCategory = () => {
        axios.get(
            'https://inventorylab.herokuapp.com/category'
        )
        .then((res) => {
            const data = res.data;
            setDataCategory(data.data);
            setIsLoading(false)
        })
        .catch((err) => {
            console.log(err)
        })
    };
    
    useEffect(() => {
        getCategory();
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
                        `https://inventorylab.herokuapp.com/category/deleteCategory/${id}`
                    )
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

            <TableContainer>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableCell>No</TableCell>
                            <TableCell>Nama Kategori</TableCell>
                            <TableCell>Aksi</TableCell>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {isLoading ? <Spinner /> : dataCategory.map((category, index) => {
                            return (
                                <TableRow key={category._id}>
                                    <TableCell>{index + 1}</TableCell>
                                    <TableCell>{category.categoryName}</TableCell>
                                    <TableCell>
                                        <div className='flex items-center space-x-4'>
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
            </TableContainer>
        </>
    );
};

export default Category;
