import {
    Button,
    Card,
    CardBody,
    Input,
    Label,
} from '@windmill/react-ui';
import axios from 'axios';
import Swal from 'sweetalert2';
import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Alert, PageTitle, SectionTitle } from '../components';

const CreateCategory = () => {
    const [categoryName, setCategoryName] = useState('');
    const history = useHistory();
    const accesstoken = window.localStorage.getItem('token')

    const onSubmit = (event) => {
        event.preventDefault();
        Swal.fire({
            title: 'Loading',
            allowOutsideClick: false,
            didOpen: () => {
                Swal.showLoading()
            }
        })

        const data = new URLSearchParams();
        data.append('categoryName', categoryName);

        axios
            .post(
                'https://inventorylab.herokuapp.com/category/addCategory', data, {
                    headers: {
                        'Authorization' : `token ${accesstoken}`
                    }
                })
            .then(result => Alert(result, 'category'))
            .catch((err) => {
                Alert(err.response, 'auth')
            });
    };
    return (
        <>
            <PageTitle>Tambah Kategori</PageTitle>
            <SectionTitle>Form Tambah Data</SectionTitle>
            <Card className="w-full md:w-1/2">
                <CardBody>
                    <form action=''>
                        <div className='gap-4'>
                            <Label>
                                <span>Nama Kategori</span>
                                <Input
                                    className='mt-1'
                                    onChange={(e) =>
                                        setCategoryName(e.target.value)
                                    }
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
                            <Button
                                type='submit'
                                layout="outline"
                                onClick={() => history.push('/app/category')}
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

export default CreateCategory;
