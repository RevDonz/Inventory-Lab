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
    const [itemPicture, setItemPicture] = useState('')
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
            setCategoryId(data.categoryId)

        })
        .catch(err => {
            console.log('error', err)
        })
    }, [props])

    const onSubmit = (event) => {
        event.preventDefault();

        const items = new URLSearchParams();
        items.append('itemName', itemName);
        items.append('itemAmount', itemAmount);
        items.append('itemPicture', itemPicture);
        items.append('categoryId', categoryId);

        const id = props.match.params.id
        axios.post(`https://inventorylab.herokuapp.com/items/updateItem/${id}`, items ,{
            headers: {
                'Authorization': `token ${accesstoken}`
            }
        })
        .then(result => {
            console.log(result);
            Alert(result,'item')
        })
        .catch(error => {
            console.log('error : ', error);
        });
        
    }
    return (
        <>
            <PageTitle>Ubah Barang</PageTitle>
            <SectionTitle>Form Ubah Data</SectionTitle>
            <Card>
                <CardBody>
                    <form action=''>
                        <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
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
                                <span>Jumlah Barang</span>
                                <Input
                                    className='mt-1'
                                    type='number'
                                    value={itemAmount}
                                    onChange={(e) =>
                                        setItemAmount(e.target.value)
                                    }
                                />
                            </Label>
                                {itemPicture && <img className="w-12 h-14" src={itemPicture}></img>}
                            <Label>
                                <span>Gambar Barang</span>
                                <Input
                                    className='mt-1 p-1 border'
                                    type='file'
                                    // value={itemPicture}
                                    onChange={(e) => setItemPicture(e.target.files[0])}
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
