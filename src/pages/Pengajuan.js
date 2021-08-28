import axios from 'axios';
import { useState, useEffect } from 'react';
import { PageTitle } from '../components';
import {
    Button,
    Card,
    CardBody,
    Input,
    Label,
    Select,
} from '@windmill/react-ui';
import { useHistory } from 'react-router-dom';

const Pengajuan = (props) => {
    const [itemName, setItemName] = useState('')
    const [itemAmount, setItemAmount] = useState('')
    const [itemInBorrow, setItemInBorrow] = useState('')
    const [itemPicture, setItemPicture] = useState('')
    const [categoryId, setCategoryId] = useState('')
    const [dataCategory, setDataCategory] = useState([])

    const history = useHistory();

    const getCategory = () => {
        axios.get(`https://inventorylab.herokuapp.com/category`)
        .then(res => {
            const responseAPI = res.data;
            setDataCategory(responseAPI.data)
        })
        .catch(err => {
            console.log('error: ', err);
        })
    }
    useEffect(() => {  
        getCategory();

        const id = props.match.params.id;
        axios.get(`https://inventorylab.herokuapp.com/items/findItem/${id}`)
        .then(res => {
            const data = res.data.data;
            console.log('sukses', data);
            setItemName(data.itemName);
            setItemAmount(data.itemAmount);
            setItemInBorrow(data.itemInBorrow);
            setItemPicture(data.itemPicture);
            // setCategoryId(data.categoryId)

        })
        .catch(err => {
            console.log('error', err)
        })
    }, [props])


    let [count, setCount] = useState(0);

    function plush() {
        count = count + 1;
        setCount(count);
      }
    function minus() {
        count = count - 1;
        setCount(count);
      }

    const products = [
        {
          id: 3,
          name: 'MacBook',
          href: '#',
          price: '$89',
          imageSrc: 'https://www.freepnglogos.com/uploads/macbook-png/apple-macbook-air-quot-skins-custom-laptop-skins-30.png',
          imageAlt: 'Person using a pen to cross a task off a productivity paper card.',
        }
      ]

    return (
        <>
            <PageTitle>Pengajuan Barang</PageTitle>
            <div className="">
                <div className="max-w-2xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8">
                    <div className="grid grid-cols-1 gap-y-10 gap-x-6 lg:grid-cols-2 xl:grid-cols-3">
                        <div className="">
                                <div className="bg-gray-700 rounded-2xl px-4 py-3"> 
                                    <a className="group">
                                        <div className="w-full aspect-w-1 aspect-h-1 overflow-hidden xl:aspect-w-7 xl:aspect-h-8">
                                            <img
                                            src={itemPicture}
                                            // alt={product.imageAlt}
                                            className="w-full h-full object-center group-hover:opacity-75"
                                            />
                                        </div>
                                        <div className="flex justify-center my-2">
                                            <p className="font-normal text-gray-300 text-xs py-2">{itemInBorrow} Dipinjam<span className="px-2">{itemAmount - itemInBorrow} Tersisa</span> </p>    
                                        </div>
                                    </a>
                                </div>
                            <div className="grid grid-cols-2 pt-4">
                                <p className="self-center">Jumlah</p>
                                <div>
                                    <Label>
                                        <div className="relative">
                                            <Input
                                            className="block w-full pl-16 sm:pl-20 mt-1 text-sm dark:text-gray-300 dark:border-gray-600 dark:bg-gray-700 focus:border-purple-400 focus:outline-none focus:shadow-outline-purple dark:focus:shadow-outline-gray form-input"
                                            placeholder=""
                                            value={count}
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
                                            // onChange={(e) =>
                                            //     setCategoryName(e.target.value)
                                            // }
                                        />
                                    </Label>
                                    <Label className='pt-3'>
                                        <span>Tanggal Kembali</span>
                                        <Input
                                            className='mt-1'
                                            placeholder="Tanggal Kembali"
                                            type="date"
                                            // onChange={(e) =>
                                            //     setCategoryName(e.target.value)
                                            // }
                                        />
                                    </Label>
                                    <Label className='pt-3'>
                                        <span>Jaminan</span>
                                        <Select
                                                className='mt-1'
                                                placeholder="KTP/KTM"
                                                // onChange={(e) =>
                                                //     setCategoryId(e.target.value)
                                                // }
                                            >
                                                {/* {dataCategory.map((category) => {
                                                    return ( */}
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
                                                    {/* );
                                                })} */}
                                            </Select>
                                    </Label>
                                    <Label className='pt-3'>
                                        <span>Upload file png/jpg</span>
                                        <Input
                                            className='mt-1'
                                            type="file"
                                            placeholder="Link Google Drive KTP/KTM Aktif"
                                            // onChange={(e) =>
                                            //     setCategoryName(e.target.value)
                                            // }
                                        />
                                    </Label>
                                </div>
                                <div className='mt-4 flex justify-center'>
                                    <Button
                                        type='submit'
                                        // onClick={onSubmit}
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
