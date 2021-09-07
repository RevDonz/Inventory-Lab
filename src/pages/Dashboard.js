import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
    TableContainer,
    Table,
    TableHeader,
    TableBody,
    TableRow,
    TableCell,
    Badge,
    TableFooter,
    Pagination,
} from '@windmill/react-ui';
import { Alert, PageTitle, SectionTitle } from '../components';
import Swal from 'sweetalert2';

const Dashboard = () => {
    const [data, setData] = useState([]);
    const accesstoken = localStorage.getItem('token');
    const [isLoading, setIsLoading] = useState(true);

    // setup pages control for every table
    const [pageTable1, setPageTable1] = useState(1);
    // setup data for every table
    const [dataTable1, setDataTable1] = useState([]);
    // pagination setup
    const resultsPerPage = 7;
    const totalResults = data.length;
    // pagination change control
    const onPageChangeTable1 = (p) => {
        setPageTable1(p);
    };
    

    const getItem = () => {
        axios
        .get('https://inventorylab.herokuapp.com/borrower/')
        .then((res) => {
            const data = res.data;
            const desc = data.data
                .sort((a, b) => a.dateRequest - b.dateRequest)
                .reverse();
            setDataTable1(desc.slice((pageTable1 - 1) * resultsPerPage, pageTable1 * resultsPerPage))
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

    const Spinner = () => {
        return (
            <TableRow>
                <TableCell colSpan={9} className='text-center'>
                    Memuat Data...
                </TableCell>
            </TableRow>
        );
    };

    const alertLoad = () => {
        Swal.fire({
            title: 'Loading',
            allowOutsideClick: false,
            didOpen: () => {
                Swal.showLoading();
            },
        });
    }
    const headers = {
        headers: {
            Authorization: `token ${accesstoken}`,
        },
    };

    const Accepting = (id) => {
        const data = new URLSearchParams();
        data.append('status', 'Accepted');
        alertLoad()
        axios
            .post(
                `https://inventorylab.herokuapp.com/borrower/changeStatus/${id}`,
                data,
                headers
            )
            .then((result) => {
                Alert(result, 'action');
                setIsLoading(false);
                getItem();
            })
            .catch((err) => console.log(err));
    };

    const Rejecting = (id) => {
        const data = new URLSearchParams();
        data.append('status', 'Rejected');
        alertLoad()
        axios
            .post(
                `https://inventorylab.herokuapp.com/borrower/changeStatus/${id}`,
                data,
                headers
            )
            .then((result) => {
                Alert(result, 'action');
                setIsLoading(false);    
                getItem();
            })
            .catch((err) => console.log(err));
    };

    const Returning = (id) => {
        const data = new URLSearchParams();
        data.append('status', 'Returned');
        alertLoad()
        axios
            .post(
                `https://inventorylab.herokuapp.com/borrower/changeStatus/${id}`,
                data,
                headers
            )
            .then((result) => {
                setIsLoading(false);
                Alert(result, 'action');
                getItem();
            })
            .catch((err) => console.log(err));
    };

    const ButtonAction = (props) => {
        if (props.status === 'Accepted') {
            return (
                <button
                    className='rounded-sm bg-yellow-400 hover:bg-yellow-500 text-white font-medium px-2 py-1 text-sm'
                    onClick={() => Returning(props.id)}
                    value='Returned'
                >
                    Return
                </button>
            );
        } else if (props.status === 'in process') {
            return (
                <div className='space-x-2 flex'>
                    <button
                        className='rounded-sm bg-green-500 hover:bg-green-600 text-white font-medium px-2 py-1 text-sm'
                        onClick={() => Accepting(props.id)}
                    >
                        Terima
                    </button>
                    <button
                        className='rounded-sm bg-red-500 hover:bg-red-600 text-white font-medium px-2 py-1 text-sm'
                        onClick={() => Rejecting(props.id)}
                    >
                        Tolak
                    </button>
                </div>
            );
        } else {
            return (
                <button className='rounded-sm bg-indigo-500 cursor-not-allowed text-white font-medium px-2 py-1 text-sm'>
                    Selesai
                </button>
            );
        }
    };

    const handlePict = (pict, type) => {
        Swal.fire({
            title: type,
            imageUrl: pict,
            imageWidth: 400,
            imageHeight: 200,
            imageAlt: 'Custom image',
        });
    };

    const ButtonDetail = (props) => {
        return (
            <button
                onClick={() => handlePict(props.pict, props.type)}
                className={`rounded-sm text-white font-medium px-2 py-1 text-sm ${
                    props.type === 'KTP' ? 'bg-indigo-500' : 'bg-red-500'
                }`}
            >
                {props.type}
            </button>
        );
    };

    return (
        <>
            <PageTitle>Dashboard</PageTitle>
            <SectionTitle>Tabel Data Peminjaman</SectionTitle>
            <TableContainer className='w-full'>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableCell>Nama Peminjam</TableCell>
                            <TableCell>Nama Barang</TableCell>
                            <TableCell>Jumlah</TableCell>
                            <TableCell>Tanggal Pengajuan</TableCell>
                            <TableCell>Tanggal Pinjam</TableCell>
                            <TableCell>Tanggal Dikembalikan</TableCell>
                            <TableCell className='text-center'>Status</TableCell>
                            <TableCell>Garansi</TableCell>
                            <TableCell className='text-center'>Aksi</TableCell>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {isLoading ? (
                            <Spinner />
                        ) : (
                            dataTable1.map((borr, i) => {
                                return (
                                    <TableRow key={i}>
                                        <TableCell>
                                            {borr.detailUser[0].fullname}
                                        </TableCell>
                                        <TableCell>
                                            {borr.detailItem[0].itemName}
                                        </TableCell>
                                        <TableCell>{borr.itemBorrow}</TableCell>
                                        <TableCell>
                                            {borr.dateRequest}
                                        </TableCell>
                                        <TableCell>
                                            {borr.dateBorrowUser}
                                        </TableCell>
                                        <TableCell>
                                            {borr.dateReturnUser}
                                        </TableCell>
                                        <TableCell className='text-center'>
                                            <Badge
                                                type={
                                                    borr.status === 'Accepted'
                                                        ? 'success'
                                                        : borr.status ===
                                                          'in process'
                                                        ? 'warning'
                                                        : 'danger'
                                                }
                                            >
                                                {borr.status}
                                            </Badge>
                                        </TableCell>
                                        <TableCell className='text-center'>
                                            <ButtonDetail
                                                type={borr.guarantee}
                                                pict={borr.guaranteePicture}
                                            />
                                        </TableCell>
                                        <TableCell className='text-center'>
                                            <ButtonAction
                                                status={borr.status}
                                                id={borr._id}
                                            />
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

export default Dashboard;
