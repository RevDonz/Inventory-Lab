import axios from 'axios';
import { useState, useEffect } from 'react';
import { Alert, PageTitle } from '../components';
import {
    Button,
    Input,
    Label,
    Select,
} from '@windmill/react-ui';
import Swal from 'sweetalert2';

const Pengajuan = (props) => {
    const [itemName, setItemName] = useState('')
    const [itemAmount, setItemAmount] = useState('')
    const [itemInBorrow, setItemInBorrow] = useState('')
    let [itemBorrow, setItemBorrow] = useState(1)
    const [itemPicture, setItemPicture] = useState('')
    const [itemId, setItemId] = useState('')
    const [userId, setUserId] = useState('')
    const [dateReturnUser, setDateReturnUser] = useState('')
    const [dateBorrowUser, setDateBorrowUser] = useState('')
    const [guarantee, setGuarantee] = useState('')
    const [guaranteePicture, setGuaranteePicture] = useState('')
    const accesstoken = window.localStorage.getItem('token')

    const getItemById = () =>{
        const id = props.match.params.id;
        axios.get(`https://inventorylab.herokuapp.com/items/findItem/${id}`)
        .then(res => {
            const data = res.data.data;
            console.log('sukses', data);
            setItemId(data._id)
            setItemName(data.itemName);
            setItemAmount(data.itemAmount);
            setItemInBorrow(data.itemInBorrow);
            setItemPicture(data.itemPicture);
        })
        .catch(err => {
            console.log('error', err)
        })
    }

    const getUserById = () => {
        axios.get('https://inventorylab.herokuapp.com/user/getdetailuser/', {
            headers: {
                'Authorization': `token ${accesstoken}`
            }
        })
        .then(res => {
            const data = res.data.details._id;
            console.log('id user:', data._id);
            setUserId(data._id);
        })
        .catch(err => {
            console.log(err)
        })
    }

    useEffect(() => {
        getItemById();
        getUserById();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [props])

    const onSubmit = (event) => {
        console.log(
            userId,
            itemId,
            itemName,
            itemBorrow,
            dateReturnUser,
            dateBorrowUser,
            guarantee,
            guaranteePicture
            );
        event.preventDefault();
        Swal.fire({
            title: 'Loading',
            didOpen: () => {
                Swal.showLoading()
            }
        })
        const data = new FormData();
        data.append('userId', userId);
        data.append('itemId', itemId);
        data.append('itemBorrow', itemBorrow);
        data.append('dateReturnUser', dateReturnUser);
        data.append('dateBorrowUser', dateBorrowUser);
        data.append('guarantee', guarantee);
        data.append('guaranteePicture', guaranteePicture);

        axios
            .post(
                'https://inventorylab.herokuapp.com/borrower/requestItem', data, {
                    headers: {
                        'Authorization': `token ${accesstoken}`
                    }
                }
            )
            .then(result => Alert(result, 'pinjam'))
            .catch((err) => {
                console.log(err);
            });
    };

    function plush() {
        itemBorrow = itemBorrow + 1;
        if ((itemAmount-itemInBorrow) < itemBorrow) {
            itemBorrow = itemAmount-itemInBorrow
        } else {
            setItemBorrow(itemBorrow);
        }
      }
    function minus() {
        itemBorrow = itemBorrow - 1;
        if (itemBorrow < 1) {
            itemBorrow = 1
        } else{
            setItemBorrow(itemBorrow);
        }
      }

    return (
        <>
            <PageTitle>Pengajuan Barang</PageTitle>
            <div className="">
                <div className="max-w-2xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8">
                    <div className="grid grid-cols-1 gap-y-10 gap-x-6 lg:grid-cols-2 xl:grid-cols-3">
                        <div className="">
                                <div className="bg-gray-700 rounded-2xl px-4 py-3"> 
                                    <div className="group">
                                        <div className="w-full aspect-w-1 aspect-h-1 overflow-hidden xl:aspect-w-7 xl:aspect-h-8">
                                            <img
                                            src={itemPicture}
                                            alt={itemName}
                                            className="w-full h-full object-center group-hover:opacity-75"
                                            />
                                        </div>
                                        <div className="flex justify-center my-2">
                                            <p className="font-normal text-gray-300 text-xs py-2">{itemInBorrow} Dipinjam<span className="px-2">{itemAmount - itemInBorrow} Tersisa</span> </p>    
                                        </div>
                                    </div>
                                </div>
                            <div className="grid grid-cols-2 pt-4">
                                <p className="self-center">Jumlah</p>
                                <div>
                                    <Label>
                                        <div className="relative">
                                            <Input
                                            className="block w-full pl-16 sm:pl-20 mt-1 text-sm dark:text-gray-300 dark:border-gray-600 dark:bg-gray-700 focus:border-purple-400 focus:outline-none focus:shadow-outline-purple dark:focus:shadow-outline-gray form-input"
                                            placeholder=""
                                            value={itemBorrow}
                                            onChange={(e) =>
                                                setItemBorrow(e.target.value)
                                            }
                                            >
                                                
                                            </Input>
                                            <button className="absolute inset-y-0 px-3 text-sm font-medium leading-5 text-white transition-colors duration-150 bg-purple-600 border border-transparent rounded-l-md active:bg-purple-600 hover:bg-purple-700 focus:outline-none focus:shadow-outline-purple dark:focus:shadow-outline-gray"
                                                onClick={minus}>
                                            -
                                            </button>
                                            <button className="absolute inset-y-0 right-0 px-3 text-sm font-medium leading-5 text-white transition-colors duration-150 bg-purple-600 border border-transparent rounded-r-md active:bg-purple-600 hover:bg-purple-700 focus:outline-none focus:shadow-outline-purple"
                                                onClick={plush}>
                                            +
                                            </button>
                                        </div>
                                    </Label>
                                </div>
                            </div>
                        </div>
                        <div className="">
                            <form action=''>
                                <h1 className="font-semibold text-gray-700 text-3xl pb-5">{itemName}</h1>
                                <div className=''>
                                    <Label>
                                        <span>Tanggal Pinjam</span>
                                        <Input
                                            className='mt-1'
                                            type="date"
                                            placeholder="Tanggal Pinjam"
                                            onChange={(e) =>
                                                setDateBorrowUser(e.target.value)
                                            }
                                        />
                                    </Label>
                                    <Label className='pt-3'>
                                        <span>Tanggal Kembali</span>
                                        <Input
                                            className='mt-1'
                                            placeholder="Tanggal Kembali"
                                            type="date"
                                            onChange={(e) =>
                                                setDateReturnUser(e.target.value)
                                            }
                                        />
                                    </Label>
                                    <Label className='pt-3'>
                                        <span>Jaminan</span>
                                        <Select
                                                className='mt-1'
                                                onChange={(e) =>
                                                    setGuarantee(e.target.value)
                                                }
                                            >
                                                        <option
                                                            key="ktp"
                                                            value="KTP"
                                                        >
                                                            KTP
                                                        </option>
                                                        <option
                                                            key="ktm"
                                                            value="KTM"
                                                        >
                                                            KTM
                                                        </option>
                                            </Select>
                                    </Label>
                                    <Label className='pt-3'>
                                        <span>Upload file</span>
                                        <Input
                                            className='mt-1'
                                            type="file"
                                            placeholder="Link Google Drive KTP/KTM Aktif"
                                            onChange={(e) =>
                                                setGuaranteePicture(e.target.files[0])
                                            }
                                        />
                                    </Label>
                                </div>
                                <div className='mt-4 flex justify-center'>
                                    <Button
                                        type='submit'
                                        onClick={onSubmit}
                                        className=''
                                    >
                                        Pinjam
                                    </Button>
                                </div>
                            </form>
                        </div>
                    </div>

                </div>
            </div>
        </>
    )
}

export default Pengajuan
