import React, { useEffect, useState } from 'react'
import { 
    Badge, 
    Button,
    TableContainer,
    Table,
    TableHeader,
    TableBody,
    TableRow,
    TableCell, 
    Avatar} from '@windmill/react-ui'
import { PageTitle, SectionTitle } from '../components';
import { DropdownIcon } from '../icons'
import axios from 'axios';

const RiwayatPeminjaman = (props) => {
    const [userIdUser, setUserIdUser] = useState('')
    const [dataPeminjamanProcess, setDataPeminjamanProcess] = useState([])
    const [dataPeminjamanAccepted, setDataPeminjamanAccepted] = useState([])
    const [dataPeminjamanRejected, setDataPeminjamanRejected] = useState([])
    const [dataPeminjamanReturned, setDataPeminjamanReturned] = useState([])
    const [dataStatus, setDataStatus] = useState();

    const getUserById = () => {
        const accesstoken = window.localStorage.getItem('token')
        axios.get('https://inventorylab.herokuapp.com/user/getdetailuser/', {
            headers: {
                'Authorization': `token ${accesstoken}`
            }
        })
        .then(res => {
            const data = res.data.data._id;
            console.log('id user:', data._id);
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
        setDataPeminjamanProcess(data);
        setDataPeminjamanAccepted(data);
        setDataPeminjamanRejected(data);
        setDataPeminjamanReturned(data);
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
    }, [props])
    
    function showProcess() {
        setDataStatus("process");
    }
    function showAcc() {
        setDataStatus("acc");
    }
    function showReject() {
        setDataStatus("reject");
    }
    function showReturn() {
        setDataStatus("return");
    }
    return (
        <>
            <PageTitle>Riwayat Peminjaman</PageTitle>
            <div className="grid justify-items-end my-2">
                <Button onClick={() => showProcess()} iconRight={DropdownIcon} aria-label="Notifications" aria-haspopup="true">
                    InProcess
                </Button>
            </div>
            {dataStatus === "process" && (
                <div id="dataInProcess" className="mb-8">
                    <SectionTitle>Peminjaman Dengan Status InProcess</SectionTitle>
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
                            {dataPeminjamanProcess.map((borrow, i) => {
                                if ((borrow.userId === userIdUser) && (borrow.status === "in process"))  {
                                    return (
                                            <TableRow key={i}>
                                                <TableCell>{borrow.item.itemName}</TableCell>
                                                <TableCell>{borrow.itemBorrow}</TableCell>
                                                <TableCell>{borrow.dateBorrowUser}</TableCell>
                                                <TableCell>{borrow.dateReturnUser}</TableCell>
                                                <TableCell>
                                                    <Badge>{borrow.status}</Badge>
                                                </TableCell>
                                            </TableRow>
                                )}})}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </div>
            )}
            <div className="grid justify-items-end my-2">
                <Button onClick={() => showAcc()} iconRight={DropdownIcon} aria-label="Notifications" aria-haspopup="true">
                    Accepted
                </Button>
            </div>
            {dataStatus === "acc" && (
                <div id="dataAccepted" className="mb-8">
                    <SectionTitle>Peminjaman Dengan Status Accepted</SectionTitle>
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
                            {dataPeminjamanAccepted.map((borrow, i) => {
                                if ((borrow.userId === userIdUser) && (borrow.status === "Accepted"))  {
                                    return (
                                            <TableRow key={i}>
                                                <TableCell>{borrow.item.itemName}</TableCell>
                                                <TableCell>{borrow.itemBorrow}</TableCell>
                                                <TableCell>{borrow.dateBorrowUser}</TableCell>
                                                <TableCell>{borrow.dateReturnUser}</TableCell>
                                                <TableCell>
                                                    <Badge type="success">{borrow.status}</Badge>
                                                </TableCell>
                                            </TableRow>
                                )}})}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </div>
            )}
            <div className="grid justify-items-end my-2">
                <Button onClick={() => showReject()} iconRight={DropdownIcon} aria-label="Notifications" aria-haspopup="true">
                    Rejected
                </Button>
            </div>
            {dataStatus === "reject" && (
                <div id="dataInReject" className="mb-8">
                    <SectionTitle>Peminjaman Dengan Status Rejected</SectionTitle>
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
                            {dataPeminjamanRejected.map((borrow, i) => {
                                if ((borrow.userId === userIdUser) & (borrow.status === "Rejected"))  {
                                    return (
                                            <TableRow key={i}>
                                                <TableCell>{borrow.item.itemName}</TableCell>
                                                <TableCell>{borrow.itemBorrow}</TableCell>
                                                <TableCell>{borrow.dateBorrowUser}</TableCell>
                                                <TableCell>{borrow.dateReturnUser}</TableCell>
                                                <TableCell>
                                                    <Badge type="warning">{borrow.status}</Badge>
                                                </TableCell>
                                            </TableRow>
                                )}})}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </div>
            )}
            <div className="grid justify-items-end my-2">
                <Button onClick={() => showReturn()} iconRight={DropdownIcon} aria-label="Notifications" aria-haspopup="true">
                    Returned
                </Button>
            </div>
            {dataStatus === "return" && (
                <div id="dataInReturn" className="mb-8">
                    <SectionTitle>Peminjaman Dengan Status Returned</SectionTitle>
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
                            {dataPeminjamanReturned.map((borrow, i) => {
                                if ((borrow.userId === userIdUser) & (borrow.status === "Returned"))  {
                                    return (
                                            <TableRow key={i}>
                                                <TableCell>{borrow.item.itemName}</TableCell>
                                                <TableCell>{borrow.itemBorrow}</TableCell>
                                                <TableCell>{borrow.dateBorrowUser}</TableCell>
                                                <TableCell>{borrow.dateReturnUser}</TableCell>
                                                <TableCell>
                                                    <Badge type="neutral">{borrow.status}</Badge>
                                                </TableCell>
                                            </TableRow>
                                )}})}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </div>
            )}
        </>
    )
}

export default RiwayatPeminjaman
