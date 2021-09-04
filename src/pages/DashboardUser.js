import React, { useEffect, useState } from 'react';
import { PageTitle, SectionTitle } from '../components';
import axios from 'axios';
import { Link, useHistory } from 'react-router-dom';
import { saly } from '../assets';

const DashboardUser = () => {
    const [data, setData] = useState([]);
    const [dataMax, setDataMax] = useState([]);
    const history = useHistory();

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
        setData(data);
        // console.log(data)
        const desc = data
            .sort((a, b) => a.itemInBorrow - b.itemInBorrow)
            .reverse();
        // console.log(desc)
        setDataMax(desc[0]);
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

    return (
        <>
            <PageTitle>List Barang</PageTitle>
            <SectionTitle>Barang Yang Paling Di Cari</SectionTitle>

            {/* <div className='grid grid-cols-3 gap-2 sm:gap-6'>
                <div className='bg-white col-span-2 rounded-lg p-3 border shadow-md'>
                    <div className='flex items-center justify-center'>
                        <div className='w-1/2 space-y-2 md:space-y-3 px-1 md:px-3'>
                            <h1 className='md:font-semibold md:text-xl'>
                                {dataMax.itemName}
                            </h1>
                            <div className="flex flex-col md:flex-row md:space-x-2 font-normal text-gray-700 text-xs md:text-sm py-2">
                                <p>
                                    {dataMax.itemInBorrow} Dipinjam
                                </p>
                                <p>
                                    {dataMax.itemAmount - dataMax.itemInBorrow} Tersisa
                                </p>
                            </div>
                            <button
                                type='submit'
                                onClick={() =>
                                    history.push(
                                        `/app/user/pengajuan/${dataMax._id}`
                                    )
                                }
                                className='hover:bg-indigo-800 bg-indigo-700 text-white text-sm px-2 py-1 md:px-3 md:py-2 rounded-md'
                            >
                                Pinjam
                            </button>
                        </div>
                        <div className='w-1/2'>
                            <div className=''>
                                <img
                                    className='rounded-md object-cover'
                                    src={dataMax.itemPicture}
                                    alt={dataMax.itemName}
                                />
                            </div>
                        </div>
                    </div>
                </div>
                <div className='bg-gray-700 rounded-lg border shadow-md px-3 py-3 sm:px-7 sm:py-5 flex-wrap content-center grid'>
                    <h1 className='text-white text-center text-xs md:text-xl md:font-semibold'>
                        Minjem ga ribet, dengan Inventory Lab
                    </h1>
                    <img
                        className='h-20 sm:w-auto sm:h-52 object-cover object-center justify-self-center'
                        alt=''
                        src={saly}
                    ></img>
                </div>
            </div> */}

            <div className='flex justify-center space-x-3 items-stretch'>
                <div className='border bg-white w-2/3 rounded-md flex items-center'>
                    <div className='flex flex-col w-2/3 pl-5'>
                        <h1 className='md:font-semibold md:text-xl'>
                            {dataMax.itemName}
                        </h1>
                        <div className='flex flex-col mb-2 md:flex-row md:space-x-2 font-normal text-gray-700 text-xs md:text-sm py-2'>
                            <p>{dataMax.itemInBorrow} Dipinjam</p>
                            <p>
                                {dataMax.itemAmount - dataMax.itemInBorrow}{' '}
                                Tersisa
                            </p>
                        </div>
                        <div className=''>
                            <Link
                                to={`/app/user/pengajuan/${dataMax._id}`}
                                className='hover:bg-indigo-800 bg-indigo-700 text-white text-sm px-2 py-1 md:px-3 md:py-2 rounded-md'
                            >
                                Pinjam
                            </Link>
                        </div>
                    </div>
                    <div className='w-1/3'>
                        <div className='items-center justify-center flex'>
                            <img
                                className='rounded-md h-1/2 w-1/2'
                                src={dataMax.itemPicture}
                                alt={dataMax.itemName}
                            />
                        </div>
                    </div>
                </div>
                <div className='border bg-gray-700 w-1/3 rounded-md'>
                    <h1 className='text-white text-center text-xs md:text-xl md:font-semibold'>
                        Minjem ga ribet, dengan Inventory Lab
                    </h1>
                    <div className='items-center justify-center flex'>
                        <img
                            className='rounded-md h-1/2 w-1/2'
                            src={saly}
                            alt='banner'
                        />
                    </div>
                </div>
            </div>

            <div className=''>
                <div className='mx-auto py-4'>
                    <SectionTitle className='mt-96'>
                        Barang Yang Mungkin Kamu Cari
                    </SectionTitle>
                    <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 md:gap-4'>
                        {data.map((item, i) => (
                            <div
                                key={i}
                                className='bg-white shadow-md border rounded-lg'
                            >
                                <div className='w-full aspect-w-1 aspect-h-1'>
                                    <img
                                        src={item.itemPicture}
                                        alt={item.itemName}
                                        className='rounded-t-md object-cover'
                                    />
                                </div>
                                <div className='group px-3 pt-2 flex flex-col'>
                                    <h3 className='text-sm font-semibold md:text-lg'>
                                        {item.itemName}
                                    </h3>
                                    <div className='text-gray-500 flex flex-col text-xs mb-2'>
                                        <p>{item.itemInBorrow} Dipinjam</p>
                                        <p>
                                            {item.itemAmount -
                                                item.itemInBorrow}{' '}
                                            Tersisa
                                        </p>
                                    </div>
                                    <div className='justify-center flex mb-2'>
                                        <button
                                            type='submit'
                                            onClick={() =>
                                                history.push(
                                                    `/app/user/pengajuan/${item._id}`
                                                )
                                            }
                                            className='bg-indigo-600 hover:bg-indigo-700 text-white text-sm rounded-md px-3 py-2'
                                        >
                                            Pinjam
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
};

export default DashboardUser;
