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
    const [dataPeminjaman, setDataPeminjaman] = useState('')
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
    }, [props])
    
    function showProcess() {
        setDataStatus("process");
      }
    function showReject() {
        setDataStatus("reject");
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
                            {dataPeminjaman.map((borrow) => {
                                if ((borrow.userId === userIdUser) & (borrow.status === "in process"))  {
                                    return (
                                            <TableRow>
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
                    Reject
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
                            {dataPeminjaman.map((borrow) => {
                                if ((borrow.userId === userIdUser) & (borrow.status === "rejected"))  {
                                    return (
                                            <TableRow>
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
        </>
    )
}

export default RiwayatPeminjaman
