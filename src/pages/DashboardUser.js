import React, { useEffect, useState } from 'react';
import { PageTitle, SectionTitle } from '../components';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import { saly } from '../assets';

const DashboardUser = () => {
    const [data, setData] = useState([]);
    const [dataMax, setDataMax] = useState([]);
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
        setData(data);
        // console.log(data)
        const desc = data.sort((a,b) => a.itemInBorrow - b.itemInBorrow).reverse()
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

            <div className="grid grid-cols-3 gap-2 sm:gap-6">
                <div className="col-span-2 px-2 py-2 sm:px-8 sm:py-7 bg-blue-600 rounded-lg sm:rounded-2xl">
                    <div className="bg-blue-600">
                        <div className="grid grid-cols-3">
                            <div className="col-span-2">
                                <div className="">
                                    <h1 className="text-white font-semibold text-xl sm:text-3xl">{dataMax.itemName}</h1>
                                    <p className="font-normal text-gray-300 text-xs py-2">{dataMax.itemInBorrow} Dipinjam<span className="px-2">{dataMax.itemAmount - dataMax.itemInBorrow} Tersisa</span> </p>
                                    <button 
                                        type='submit'
                                        onClick={() => history.push(`/app/user/pengajuan/${dataMax._id}`)}
                                        className="bg-indigo-900 text-white text-sm px-3 py-2 mt-5 rounded-2xl"
                                    >
                                        Pinjam
                                    </button>
                                </div>
                            </div>
                            <div className="">
                                <img className="sm:h-full sm:w-full py-5 object-cover object-center" alt="" src={dataMax.itemPicture}></img>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="bg-gray-700 rounded-lg sm:rounded-2xl px-3 py-3 sm:px-7 sm:py-5 flex-wrap content-center grid">
                    <h1 className="text-white text-xs sm:text-xl sm:font-semibold">Minjem ga ribet, dengan Inventory Lab</h1>
                    <img className="h-20 sm:w-auto sm:h-52 object-cover object-center justify-self-center" alt="" src={saly}></img>
                </div>
            </div>

            <div className="">
                <div className="max-w-2xl mx-auto py-16 sm:py-24 lg:max-w-7xl">
                    <SectionTitle className="mt-96">Barang Yang Mungkin Kamu Cari</SectionTitle>
                    <div className="grid grid-cols-2 gap-y-3 gap-x-4 sm:gap-x-6 sm:gap-y-7 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-7 xl:gap-y-8">
                    {data.map((item, i) => (
                        <div key={i} className="bg-gray-700 rounded-2xl px-4 py-3"> 
                            <div className="group">
                                <div className="w-full aspect-w-1 aspect-h-1 overflow-hidden xl:aspect-w-7 xl:aspect-h-8">
                                    <img
                                    src={item.itemPicture}
                                    alt={item.itemName}
                                    className="w-full h-full object-center group-hover:opacity-75"
                                    />
                                </div>
                                <h3 className="mt-2 text-sm md:text-lg text-white">{item.itemName}</h3>
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
