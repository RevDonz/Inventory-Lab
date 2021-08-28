import React, { useEffect, useState } from 'react';
import {
    TableContainer,
    Table,
    TableHeader,
    TableBody,
    TableRow,
    TableCell,
    Button,
    Card,
    CardBody,
} from '@windmill/react-ui';
import { EditIcon, TrashIcon } from '../icons';
import { PageTitle, SectionTitle } from '../components';
import Swal from 'sweetalert2';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import { saly } from '../assets';

const DashboardUser = () => {
    const [data, setData] = useState([]);
    // const [isLoading, setIsLoading] = useState(true);
    const history = useHistory()

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
        // setIsLoading(!isLoading);
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
    const products = [
        {
          id: 1,
          name: 'Meja Laboratorium',
          href: '#',
          price: '$48',
          imageSrc: 'https://s3.amazonaws.com/diversif-868/low-res/175/FACS.png',
          imageAlt: 'Tall slender porcelain bottle with natural clay textured body and cork stopper.',
        },
        {
          id: 2,
          name: 'Lampu Belajar',
          href: '#',
          price: '$35',
          imageSrc: 'https://s.kaskus.id/images/fjb/2015/11/11/light_up_your_workspace___desk_lamp___lampu_belajar___lampu_meja_2187534_1447217914.png',
          imageAlt: 'Olive drab green insulated bottle with flared screw lid and flat top.',
        },
        {
          id: 3,
          name: 'MacBook',
          href: '#',
          price: '$89',
          imageSrc: 'https://www.freepnglogos.com/uploads/macbook-png/apple-macbook-air-quot-skins-custom-laptop-skins-30.png',
          imageAlt: 'Person using a pen to cross a task off a productivity paper card.',
        },
        {
          id: 4,
          name: 'Terminal Listrik',
          href: '#',
          price: '$35',
          imageSrc: 'https://id-test-11.slatic.net/p/15ef8867f253c118935635ad1bde4963.png',
          imageAlt: 'Hand holding black machined steel mechanical pencil with brass tip and top.',
        },
        // More products...
      ]

    return (
        <>
            <PageTitle>List Barang</PageTitle>
            <SectionTitle>Barang Yang Paling Di Cari</SectionTitle>

            <div className="grid grid-cols-3 gap-2 sm:gap-6">
                <div className="col-span-2 px-2 py-2 sm:px-8 sm:py-7 bg-blue-600 rounded-lg sm:rounded-2xl">
                    <div colored className="bg-blue-600">
                        <div className="grid grid-cols-3">
                            <div className="col-span-2">
                                <div className="">
                                    <h1 className="text-white font-semibold text-xl sm:text-3xl">Printer Epson</h1>
                                    <p className="font-normal text-gray-300 text-xs py-2">10 Dipinjam <span className="px-2">2 Tersisa</span> </p>
                                    <button 
                                        type='submit'
                                        // onClick={onSubmit}
                                        className="bg-indigo-900 text-white text-sm px-3 py-2 mt-5 rounded-2xl"
                                    >
                                        Pinjam
                                    </button>
                                </div>
                            </div>
                            <div className="">
                                <img className="sm:h-full sm:w-full py-5 object-cover object-center" src="https://www.freepnglogos.com/uploads/printer-png/laser-printer-png-image-pngpix-3.png"></img>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="bg-gray-700 rounded-lg sm:rounded-2xl px-3 py-3 sm:px-7 sm:py-5 flex-wrap content-center grid">
                    <h1 className="text-white text-xs sm:text-xl sm:font-semibold">Minjem ga ribet, dengan Inventory Lab</h1>
                    <img className="h-20 sm:w-auto sm:h-52 object-cover object-center justify-self-center " src={saly}></img>
                </div>
            </div>

            <div className="">
                <div className="max-w-2xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8">
                    <SectionTitle className="mt-96">Barang Yang Mungkin Kamu Cari</SectionTitle>
                    <div className="grid grid-cols-1 gap-y-10 sm:grid-cols-2 gap-x-6 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
                    {data.map((item, i) => (
                        <div className="bg-gray-700 rounded-2xl px-4 py-3"> 
                            <a key={i} className="group">
                                <div className="w-full aspect-w-1 aspect-h-1 overflow-hidden xl:aspect-w-7 xl:aspect-h-8">
                                    <img
                                    src={item.itemPicture}
                                    // alt={product.imageAlt}
                                    className="w-full h-full object-center group-hover:opacity-75"
                                    />
                                </div>
                                <h3 className="mt-2 text-lg text-white">{item.itemName}</h3>
                                <p className="font-normal text-gray-300 text-xs py-2">{item.itemInBorrow} Dipinjam<span className="px-2">{item.itemAmount - item.itemInBorrow} Tersisa</span> </p>
                                <div className="flex justify-center my-2">
                                    <button 
                                            type='submit'
                                            onClick={() => history.push(`/app/user/pengajuan/${item._id}`)}
                                            className="bg-indigo-600 object-center object-cover text-white text-sm px-6 sm:px-4 py-2 rounded-2xl"

                                        >
                                            Pinjam
                                    </button>
                                </div>
                            </a>
                        </div>
                    ))}
                    </div>
                </div>
            </div>
        </>
    );
};

export default DashboardUser;
