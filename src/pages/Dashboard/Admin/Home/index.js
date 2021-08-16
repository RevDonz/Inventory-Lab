import React, { useEffect, useState } from 'react'
import axios from 'axios'

const Home = () => {
    const [dataItem, setDataItem] = useState([])

    useEffect(() => {
        axios.get(`https://inventorylab.herokuapp.com/items`)
        .then(res => {
            console.log(res.data);
            const responseAPI = res.data;
            setDataItem(responseAPI.data)
        })
        .catch(err => {
            console.log('error: ', err);
        })
    }, [])
    

    return (
        <div>
            <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                    <tr>
                        <td className="p-3">Nama Barang</td>
                        <td className="p-3">Kode Barang</td>
                        <td className="p-3">Kategori Barang</td>
                        <td className="p-3">Jumlah Barang</td>
                        <td className="p-3">Jumlah Barang Dipinjam</td>
                        <td className="p-3">Aksi</td>
                    </tr>
                </thead>
                <tbody>
                    {dataItem.map(item => {
                        return (
                            <tr key={item._id}>
                                <td className="p-3">{item.itemName}</td>
                                <td className="p-3">{item.itemCode}</td>
                                <td className="p-3">{item.categoryId}</td>
                                <td className="p-3">{item.itemAmount}</td>
                                <td className="p-3">{item.itemInBorrow}</td>
                                <td className="flex p-3">
                                    <button className="p-2 bg-blue-500">Ubah</button>
                                    <button className="p-2 bg-red-500">Hapus</button>
                                </td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
        </div>
    )
}

export default Home
