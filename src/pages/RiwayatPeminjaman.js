import React, { useState } from 'react'
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

const RiwayatPeminjaman = () => {
    const [isOpen, setIsOpen] = useState(false)
    const [data, setData] = useState();
    
    function toggleDropdown() {
    }
    
    function showProcess() {
        setData("process");
      }
    function showReject() {
        setData("reject");
      }
    return (
        <>
            <PageTitle>Riwayat Peminjaman</PageTitle>
            <div className="grid justify-items-end my-2">
                <Button onClick={() => showProcess()} iconRight={DropdownIcon} aria-label="Notifications" aria-haspopup="true">
                    InProcess
                </Button>
            </div>
            {data === "process" && (
                <div id="dataInProcess" className="mb-8">
                    <SectionTitle>Peminjaman Dengan Status InProcess</SectionTitle>
                    <TableContainer>
                        <Table>
                            <TableHeader>
                            <TableRow>
                                <TableCell>Client</TableCell>
                                <TableCell>Amount</TableCell>
                                <TableCell>Status</TableCell>
                            </TableRow>
                            </TableHeader>
                            <TableBody>
                            <TableRow>
                                <TableCell>
                                <div className="flex items-center text-sm">
                                    <Avatar src="/img/avatar-1.jpg" alt="Judith" />
                                    <span className="font-semibold ml-2">Judith Ipsum</span>
                                </div>
                                </TableCell>
                                <TableCell>
                                <span className="text-sm">$ 534.87</span>
                                </TableCell>
                                <TableCell>
                                <Badge type="success">success</Badge>
                                </TableCell>
                            </TableRow>
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
            {data === "reject" && (
                <div id="dataInReject" className="mb-8">
                    <SectionTitle>Peminjaman Dengan Status Rejected</SectionTitle>
                    <TableContainer>
                        <Table>
                            <TableHeader>
                            <TableRow>
                                <TableCell>Client</TableCell>
                                <TableCell>Amount</TableCell>
                                <TableCell>Status</TableCell>
                            </TableRow>
                            </TableHeader>
                            <TableBody>
                            <TableRow>
                                <TableCell>
                                <div className="flex items-center text-sm">
                                    <Avatar src="/img/avatar-1.jpg" alt="Judith" />
                                    <span className="font-semibold ml-2">Judith Ipsum</span>
                                </div>
                                </TableCell>
                                <TableCell>
                                <span className="text-sm">$ 534.87</span>
                                </TableCell>
                                <TableCell>
                                <Badge type="success">success</Badge>
                                </TableCell>
                            </TableRow>
                            </TableBody>
                        </Table>
                    </TableContainer>
                </div>
            )}
        </>
    )
}

export default RiwayatPeminjaman
