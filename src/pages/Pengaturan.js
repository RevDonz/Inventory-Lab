import React, { useEffect, useState } from 'react'
import { PageTitle, Alert } from '../components';
import {
    Button,
} from '@windmill/react-ui';
import axios from 'axios';

const Pengaturan = (props) => {
    const [fullname, setFullname] = useState('');
    const [idUser, setIdUser] = useState('');
    const [NIM, setNIM] = useState('');
    const [major, setMajor] = useState('');
    const [faculty, setFaculty] = useState('');
    const [year, setYear] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [homeAddress, setHomeAddress] = useState('');
    const [email, setEmail] = useState('');
    // const [password, setPassword] = useState('');
    const accesstoken = window.localStorage.getItem('token')

    const getUserById = () => {
        axios.get('https://inventorylab.herokuapp.com/user/getdetailuser/', {
            headers: {
                'Authorization': `token ${accesstoken}`
            }
        })
        .then(res => {
            const data = res.data.details._id;
            console.log(res.data.details);
            setIdUser(data._id);
            setFullname(data.fullname);
            setMajor(data.major);
            setFaculty(data.faculty);
            setNIM(data.NIM);
            setYear(data.year);
            setPhoneNumber(data.phoneNumber);
            setHomeAddress(data.homeAddress);
            setEmail(data.email);
            // setPassword(data.password);
        })
        .catch(err => {
            console.log(err)
        })
    }

    useEffect(() => {
        getUserById();
    }, [props])

    const onSubmit = (event) => {
        event.preventDefault();
        console.log(phoneNumber, homeAddress, email)

        const data = new URLSearchParams();
        data.append('email', email);
        // data.append('password', password);
        data.append('phoneNumber', phoneNumber);
        data.append('homeAddress', homeAddress);

        axios
            .post(
                `https://inventorylab.herokuapp.com/user/update/${idUser}`, data, {
                    headers: {
                        'Authorization': `token ${accesstoken}`
                    }
                }
            )
            .then(result => Alert(result, 'user'))
            .catch((err) => {
                console.log(err);
            });
    };

    return (
        <>
            <PageTitle>Pengaturan</PageTitle>
            <div className=''>
                <div className='grid'>
                    <img
                        className='align-middle rounded-full h-24 w-24 flex items-center justify-center justify-self-center my-4'
                        src='https://images.unsplash.com/photo-1502378735452-bc7d86632805?ixlib=rb-0.3.5&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=200&fit=max&s=aa3a807e1bbdfd4364d1f449eaa96d82'
                        alt=''
                        aria-hidden='true'
                    />
                    <h1 className="justify-self-center font-bold text-2xl  mb-8">{fullname}</h1>
                    <div className="w-full py-3 lg:py-3 lg:w-3/5 justify-self-center">
                        <h1>NIM : {NIM}</h1>
                        <h1>Fakultas : {faculty}</h1>
                        <h1>Prodi : {major}</h1>
                        <h1>Tahun : {year}</h1>
                    </div>
                </div>
                <div className="items-center justify-center text-center">
                    <input className="w-full py-3 lg:py-3 lg:w-3/5 focus:ring-blue-300 focus:border-blue-300 border-1 border-gray-300 rounded-lg my-4 font-semibold" type="email" name="email" placeholder="E-mail"
                    value={email} onChange={(e) => setEmail(e.target.value)}/> <br/>
                    {/* <input className="w-full py-3 lg:py-3 lg:w-3/5 focus:ring-blue-300 focus:border-blue-300 border-1 border-gray-300 rounded-lg my-4 font-semibold" type="password" name="password" placeholder="Kata Sandi"
                    value={password} onChange={(e) => setPassword(e.target.value)}/> <br/> */}
                    <input className="w-full py-3 lg:py-3 lg:w-3/5 focus:ring-blue-300 focus:border-blue-300 border-1 border-gray-300 rounded-lg my-4 font-semibold" type="text" name="homeAddress" placeholder="Alamat"
                    value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)}/> <br/>
                    <input className="w-full py-3 lg:py-3 lg:w-3/5 focus:ring-blue-300 focus:border-blue-300 border-1 border-gray-300 rounded-lg my-4 font-semibold" type="text" name="homeAddress" placeholder="Alamat"
                    value={homeAddress} onChange={(e) => setHomeAddress(e.target.value)}/> <br/>
                    <Button
                        type='submit'
                        onClick={onSubmit}
                        className='mt-5'
                    >
                        Ubah Data Diri
                    </Button>
                </div>
            </div>
        </>
    )
}

export default Pengaturan
