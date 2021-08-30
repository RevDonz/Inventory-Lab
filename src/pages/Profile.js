import React, { useEffect, useState } from 'react'
import { PageTitle } from '../components';
import {
    CardBody,
    Input,
    Label,
} from '@windmill/react-ui';
import axios from 'axios';

const Profile = (props) => {
    const [fullname, setFullname] = useState('');
    const [NIM, setNIM] = useState('');
    const [major, setMajor] = useState('');
    const [faculty, setFaculty] = useState('');
    const [year, setYear] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [homeAddress, setHomeAddress] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const getUserById = () => {
        const accesstoken = window.localStorage.getItem('token')
        axios.get('https://inventorylab.herokuapp.com/user/getdetailuser/', {
            headers: {
                'Authorization': `token ${accesstoken}`
            }
        })
        .then(res => {
            const data = res.data.details._id;
            // setUserId(data._id);
            setFullname(data.fullname);
            setMajor(data.major);
            setFaculty(data.faculty);
            setNIM(data.NIM);
            setYear(data.year);
            setPhoneNumber(data.phoneNumber);
            setHomeAddress(data.homeAddress);
            setEmail(data.email);
            setPassword(data.password);
        })
        .catch(err => {
            console.log(err)
        })
    }

    useEffect(() => {
        getUserById();
    }, [props])

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
                                    value={fullname}
                                />
                            </Label>
                            <Label>
                                <Input
                                    disabled
                                    className='mt-1'
                                    value={email}
                                />
                            </Label>
                            <Label>
                                <Input
                                    disabled
                                    className='mt-1'
                                    value={NIM}
                                />
                            </Label>
                            <Label>
                                <Input
                                    disabled
                                    className='mt-1'
                                    value={password}
                                    type= 'password'
                                />
                            </Label>
                            <Label>
                                <Input
                                    disabled
                                    className='mt-1'
                                    value={faculty}
                                />
                            </Label>
                            <Label>
                                <Input
                                    disabled
                                    className='mt-1'
                                    value={phoneNumber}
                                />
                            </Label>
                            <Label>
                                <Input
                                    disabled
                                    className='mt-1'
                                    value={major}
                                />
                            </Label>
                            <Label>
                                <Input
                                    disabled
                                    className='mt-1'
                                    value={year}
                                />
                            </Label>
                            <Label>
                                <Input
                                    disabled 
                                    className='mt-1'
                                    value={homeAddress}
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
