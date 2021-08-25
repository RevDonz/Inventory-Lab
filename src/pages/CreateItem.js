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
    const [categoryId, setCategoryId] = useState('');
    const [dataCategory, setDataCategory] = useState([]);

    const getCategory = () => {
        axios
            .get(`https://inventorylab.herokuapp.com/category`)
            .then((res) => {
                const responseAPI = res.data;
                // console.log(responseAPI);
                setDataCategory(responseAPI.data);
            })
            .catch((err) => {
                console.log('error: ', err);
            });
    };
    useEffect(() => {
        getCategory();
    }, []);

    const onSubmit = (event) => {
        event.preventDefault();

        const items = new URLSearchParams();
        items.append('itemName', itemName);
        items.append('itemAmount', itemAmount);
        items.append('categoryId', categoryId);

        axios
            .post(
                'https://inventorylab.herokuapp.com/items/inputNewItem',
                items
            )
            .then(result => Alert(result.data.code, result.data.message, 'item'))
            .catch((err) => {
                console.log(err);
            });
    };
    return (
        <>
            <PageTitle>Tambah Barang</PageTitle>
            <SectionTitle>Form Tambah Data</SectionTitle>
            <Card>
                <CardBody>
                    <form action=''>
                        <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
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
                                    onChange={(e) =>
                                        setItemAmount(e.target.value)
                                    }
                                />
                            </Label>
                            <Label>
                                <span>Requested Limit</span>
                                <Select
                                    className='mt-1'
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
