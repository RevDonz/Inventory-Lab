import {
    Button,
    Card,
    CardBody,
    Input,
    Label,
    Select,
} from '@windmill/react-ui';
import axios from 'axios';
import { useState, useEffect } from 'react';
import { Alert, PageTitle, SectionTitle } from '../components';

const CreateItem = () => {
    const [itemName, setItemName] = useState('');
    const [itemAmount, setItemAmount] = useState('');
    const [itemPicture, setItemPicture] = useState('');
    const [categoryId, setCategoryId] = useState('');
    const [dataCategory, setDataCategory] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const getCategory = () => {
        axios
            .get(`https://inventorylab.herokuapp.com/category`)
            .then((res) => {
                const responseAPI = res.data;
                // console.log(responseAPI);
                setDataCategory(responseAPI.data);
                setIsLoading(false)
            })
            .catch((err) => {
                console.log('error: ', err);
            });
    };
    useEffect(() => {
        getCategory();
    }, []);

    const onSubmit = (event) => {
        const accesstoken = window.localStorage.getItem('token')
        event.preventDefault();

        const items = new FormData();
        items.append('itemName', itemName);
        items.append('itemAmount', itemAmount);
        items.append('itemPicture', itemPicture);
        items.append('categoryId', categoryId);

        axios
            .post(
                'https://inventorylab.herokuapp.com/items/inputNewItem',
                items, {
                    headers: {
                    'Authorization' : `token ${accesstoken}`
                }
            }
            )
            .then(result => Alert(result, 'item'))
            .catch((err) => {
                Alert(400, err, 'item');
            });
    };
    return (
        <>
            <PageTitle>Tambah Barang</PageTitle>
            <SectionTitle>Form Tambah Data</SectionTitle>
            <Card className="w-full md:w-1/2">
                <CardBody>
                    <form action=''>
                        <div className='gap-4 space-y-3'>
                            <Label>
                                <span>Nama Barang</span>
                                <Input
                                    className='mt-1'
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
                                    onChange={(e) => setItemAmount(e.target.value)}
                                    defaultValue={1}
                                />
                            </Label>
                            <Label>
                                <span>Kategori Barang</span>
                                <Select
                                    className='mt-1'
                                    onChange={(e) =>
                                        setCategoryId(e.target.value)
                                    }
                                >
                                    {isLoading ? <option>Memuat kategori...</option> : dataCategory.map((category) => {
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
                            <Label>
                                <span>Gambar Barang</span>
                                <Input
                                    className='mt-1'
                                    type='file'
                                    onChange={(e) => setItemPicture(e.target.files[0])}
                                />
                            </Label>
                        </div>
                        <div className='mt-4 items-center flex'>
                            <Button
                                type='submit'
                                onClick={onSubmit}
                                className=''
                            >
                                Tambah Data
                            </Button>
                        </div>
                    </form>
                </CardBody>
            </Card>
        </>
    );
};

export default CreateItem;
