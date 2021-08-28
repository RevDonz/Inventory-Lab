import React, { useState } from 'react'
import { PageTitle } from '../components';
import {
    Button,
    Card,
    CardBody,
    Input,
    Label,
    Avatar,
} from '@windmill/react-ui';

const Profile = () => {
    return (
        <>
            <PageTitle>Data Diri</PageTitle>
            <div className=''>
                <div className=' grid mb-8'>
                    <img
                        className='align-middle rounded-full h-24 w-24 flex items-center justify-center justify-self-center my-4'
                        src='https://images.unsplash.com/photo-1502378735452-bc7d86632805?ixlib=rb-0.3.5&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=200&fit=max&s=aa3a807e1bbdfd4364d1f449eaa96d82'
                        alt=''
                        aria-hidden='true'
                    />
                    <h1 className="justify-self-center font-bold text-2xl">Akun Saya</h1>
                </div>
                <CardBody>
                    <form action=''>
                        <div className='grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-5'>
                            <Label>
                                <Input
                                    disabled
                                    className='mt-1'
                                    value="Alif Babrizq Kuncara"
                                    // onChange={(e) =>
                                    //     setItemName(e.target.value)
                                    // }
                                />
                            </Label>
                            <Label>
                                <Input
                                    disabled
                                    className='mt-1'
                                    value="alif@gmail.com"
                                    // type='number'
                                    // onChange={(e) =>
                                    //     setItemAmount(e.target.value)
                                    // }
                                />
                            </Label>
                            <Label>
                                <Input
                                    disabled
                                    className='mt-1'
                                    value="130120428"
                                    // type='number'
                                    // onChange={(e) =>
                                    //     setItemAmount(e.target.value)
                                    // }
                                />
                            </Label>
                            <Label>
                                <Input
                                    disabled
                                    className='mt-1'
                                    value="123456789"
                                    type='password'
                                    // onChange={(e) =>
                                    //     setItemAmount(e.target.value)
                                    // }
                                />
                            </Label>
                            <Label>
                                <Input
                                    disabled
                                    className='mt-1'
                                    value="Informatika"
                                    // type='number'
                                    // onChange={(e) =>
                                    //     setItemAmount(e.target.value)
                                    // }
                                />
                            </Label>
                            <Label>
                                <Input
                                    disabled
                                    className='mt-1'
                                    value="081234531051"
                                    // type='number'
                                    // onChange={(e) =>
                                    //     setItemAmount(e.target.value)
                                    // }
                                />
                            </Label>
                            <Label>
                                <Input
                                    disabled
                                    className='mt-1'
                                    value="S1 Informatika"
                                    // type='number'
                                    // onChange={(e) =>
                                    //     setItemAmount(e.target.value)
                                    // }
                                />
                            </Label>
                            <Label>
                                <Input
                                    disabled
                                    className='mt-1'
                                    value="2020"
                                    // type='number'
                                    // onChange={(e) =>
                                    //     setItemAmount(e.target.value)
                                    // }
                                />
                            </Label>
                            <Label>
                                <Input
                                    disabled 
                                    className='mt-1'
                                    value="Tulungagung"
                                    // type='number'
                                    // onChange={(e) =>
                                    //     setItemAmount(e.target.value)
                                    // }
                                />
                            </Label>
                        </div>
                    </form>
                </CardBody>
            </div>
        </>
    )
}

export default Profile
