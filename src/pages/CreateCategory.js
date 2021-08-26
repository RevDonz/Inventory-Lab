import {
    Button,
    Card,
    CardBody,
    Input,
    Label,
} from '@windmill/react-ui';
import axios from 'axios';
import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Alert, PageTitle, SectionTitle } from '../components';

const CreateCategory = () => {
    const [categoryName, setCategoryName] = useState('');
    const history = useHistory();

    const onSubmit = (event) => {
        event.preventDefault();

        const data = new URLSearchParams();
        data.append('categoryName', categoryName);

        axios
            .post(
                'https://inventorylab.herokuapp.com/category/addCategory', data
            )
            .then(result => Alert(result.data.code, result.data.message, 'item'))
            .catch((err) => {
                console.log(err);
            });
    };
    return (
        <>
            <PageTitle>Tambah Kategori</PageTitle>
            <SectionTitle>Form Tambah Data</SectionTitle>
            <Card>
                <CardBody>
                    <form action=''>
                        <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
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
