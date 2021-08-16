import axios from 'axios';
import { useState } from 'react';
import { Link } from 'react-router-dom';

const CreateItem = () => {
    const [itemName, setItemName] = useState('')
    const [itemAmount, setItemAmount] = useState('')

    const onSubmit = (event) => {
        event.preventDefault();

        const items = new URLSearchParams();
        items.append('itemName', itemName)
        items.append('itemAmount', itemAmount)

        axios.post('https://inventorylab.herokuapp.com/items/inputNewItem', items)
        .then(res => {
            console.log(res);
        })
        .catch(err => {
            console.log(err);
        })
    }
    return (
        <div>
            <form action='' className="w-1/3 p-10 space-y-3">
                <div className='col-span-6 sm:col-span-3'>
                    <label
                        htmlFor='itemName'
                        className='block text-sm font-medium text-gray-700'
                    >
                        Nama Barang
                    </label>
                    <input
                        type='text'
                        name='itemName'
                        id='itemName'
                        className='mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md'
                        onChange={(e) => setItemName(e.target.value)}
                    />
                </div>
                <div className='col-span-6 sm:col-span-3'>
                    <label
                        htmlFor='itemAmount'
                        className='block text-sm font-medium text-gray-700'
                    >
                        Jumlah Barang
                    </label>
                    <input
                        type='text'
                        name='itemAmount'
                        id='itemAmount'
                        className='mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md'
                        onChange={(e) => setItemAmount(e.target.value)}
                    />
                </div>
                <button onClick={onSubmit} className="p-3 bg-blue-500 rounded-md text-white hover:bg-blue-600">Tambah Data</button>
                <Link className="p-3 bg-red-500 rounded-md text-white hover:bg-red-600 ml-3" to="/admin/home">Kembali</Link>
            </form>
        </div>
    );
};

export default CreateItem;
