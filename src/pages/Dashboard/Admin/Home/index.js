import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Swal from 'sweetalert2'
import { Link } from 'react-router-dom'

const Home = () => {
    const [dataItem, setDataItem] = useState([])
    const [category, setCategory] = useState([])

    const getpost = () => {
        axios.get(`https://inventorylab.herokuapp.com/items`)
        .then(res => {
            const responseAPI = res.data;
            setDataItem(responseAPI.data)
        })
        .catch(err => {
            console.log('error: ', err);
        })
    }

    const getCategory = (id) => {
        axios.get(`https://inventorylab.herokuapp.com/category/searchCategory/${id}`)
        .then(res => {
            const responseAPI = res.data;
            console.log(responseAPI.data.categoryName);
            setCategory(responseAPI)
            
        })
        .catch(err => {
            console.log(err);
        })
    }

    useEffect(() => {  
        getpost()
    }, [])
    
    const handleDeletePost = (id) => {
        Swal.fire({
            title: 'Apakah Anda yakin ingin menghapus data?',
            text: "Data yang sudah dihapus tidak dapat dikembalikan lagi!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Ya, hapus data',
            cancelButtonText: 'Batal'
          }).then((result) => {
            if (result.isConfirmed) {
                axios.delete(`https://inventorylab.herokuapp.com/items/deleteItem/${id}`)
                .then(res => {
                    Swal.fire(
                      'Deleted!',
                      'Your file has been deleted.',
                      'success'
                    )
                    getpost()
                })
                .catch(err => console.log('err:', err))
            }
        })
    }

    return (
        <div>
            <Link to='/admin/createitem' className="px-3 bg-blue-400">Tambah data</Link>
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
                                    <button className="p-2 bg-red-500" onClick={() => handleDeletePost(item._id)}>Hapus</button>
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
