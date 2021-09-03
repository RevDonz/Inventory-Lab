import axios from 'axios';
import { useState, useEffect } from 'react';
import {
    Button,
    Card,
    CardBody,
    Input,
    Label,
    Select,
} from '@windmill/react-ui';
import { useHistory, withRouter } from 'react-router-dom';
import { Alert, PageTitle, SectionTitle } from '../components';

const UpdateItem = (props) => {
    const [itemName, setItemName] = useState('')
    const [itemAmount, setItemAmount] = useState('')
    const [inputAmount, setInputAmount] = useState(null)
    const [itemPicture, setItemPicture] = useState('')
    const [preview, setPreview] = useState(null)
    const [categoryId, setCategoryId] = useState('')
    const [dataCategory, setDataCategory] = useState([])

    const accesstoken = window.localStorage.getItem('token')

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
        console.log(props);
        axios.get(`https://inventorylab.herokuapp.com/items/findItem/${id}`)
        .then(res => {
            const data = res.data.data;
            console.log('sukses', data);
            setItemName(data.itemName);
            setItemAmount(data.itemAmount);
            setItemPicture(data.itemPicture);
            setCategoryId(data.categoryId);
            setPreview(data.itemPicture)

        })
        .catch(err => {
            console.log('error', err)
        })
    }, [props])

    const onImageUpload = (e) =>{
        // if (itemPicture !== null) {
            const file = e.target.files[0];
            setItemPicture(file)
            setPreview(URL.createObjectURL(file))
        // } else {

        // }
    }

    const onSubmit = (event) => {
        event.preventDefault();

        
        const items = new URLSearchParams();
        items.append('itemName', itemName);
        items.append('categoryId', categoryId);
        
        console.log('ini gambar: ', itemPicture)
        console.log('ini gambar: ', preview)
        console.log('stok: ',itemAmount)
        const pctr = new FormData();
        pctr.append('itemPicture', itemPicture);

        const id = props.match.params.id

        axios.post(`https://inventorylab.herokuapp.com/items/updateItem/${id}`, items, {
            headers: {
                'Authorization': `token ${accesstoken}`
            }
        })
        if (itemPicture !== preview) {
            
            axios.post(`https://inventorylab.herokuapp.com/items/updatePicture/${id}`, pctr, {
                headers: {
                    'Authorization': `token ${accesstoken}`
                }
            })
        }

        if (inputAmount === null) {
            setItemAmount(itemAmount)
        } else if (inputAmount > itemAmount) {
            const tambah = inputAmount - itemAmount
            setItemAmount(tambah)

            const stok = new URLSearchParams();
            stok.append('itemAmount', itemAmount);

            axios.post(`https://inventorylab.herokuapp.com/items/addItem/${id}/${tambah}`, stok, {
                headers: {
                    'Authorization': `token ${accesstoken}`
                }
            })
        } else {
            const kurang = itemAmount - inputAmount;
            setItemAmount(kurang)

            const stok = new URLSearchParams();
            stok.append('itemAmount', itemAmount);

            axios.post(`https://inventorylab.herokuapp.com/items/minItem/${id}/${kurang}`, stok, {
                headers: {
                    'Authorization': `token ${accesstoken}`
                }
            })
        }

        // .then(result => {
        //     console.log(result);
        //     Alert(result,'item')
        // })
        // .catch(error => {
        //     console.log('error : ', error);
        // });
        
    }
    return (
        <>
            <PageTitle>Ubah Barang</PageTitle>
            <SectionTitle>Form Ubah Data</SectionTitle>
            <Card className="w-full md:w-1/2">
                <CardBody>
                    <form action=''>
                        <div className='gap-4 space-y-3'>
                            <Label>
                                <span>Nama Barang</span>
                                <Input
                                    className='mt-1'
                                    value={itemName}
                                    onChange={(e) =>
                                        setItemName(e.target.value)
                                    }
                                />
                            </Label>
                            <Label>
                                <span>Jumlah Awal : <p className="font-bold text-lg">{itemAmount}</p></span>
                            </Label>
                            <Label>
                                <span>Ubah Jumlah Barang</span>
                                <Input
                                    className='mt-1'
                                    type='number'
                                    // value={itemAmount}
                                    onChange={(e) =>
                                        setInputAmount(e.target.value)
                                    }
                                />
                            </Label>
                                {itemPicture && <img className="w-12 h-14" src={preview}></img>}
                            <Label>
                                <span>Gambar Barang</span>
                                <Input
                                    className='mt-1 p-1 border'
                                    type='file'
                                    // value={itemPicture}
                                    onChange={(e) => onImageUpload(e)}
                                />
                            </Label>
                            <Label>
                                <span>Requested Limit</span>
                                <Select
                                    className='mt-1'
                                    value={categoryId}
                                    onChange={(e) =>
                                        setCategoryId(e.target.value)
                                    }
                                >
                                    {dataCategory.map((category) => {
                                        return (
                                            <option
                                                key={category._id}
                                                value={category._id}
                                            >
                                                {category.categoryName}
                                            </option>
                                        );
                                    })}
                                </Select>
                            </Label>
                        </div>
                        <div className='mt-4 items-center flex'>
                            <Button
                                type='submit'
                                onClick={onSubmit}
                                className=''
                            >
                                Ubah Data
                            </Button>
                            <Button
                                type='submit'
                                layout="outline"
                                onClick={() => history.push('/app/items')}
                                className='mx-4'
                            >
                                Kembali
                            </Button>
                        </div>
                    </form>
                </CardBody>
            </Card>
        </>
    );
};

export default withRouter(UpdateItem);
