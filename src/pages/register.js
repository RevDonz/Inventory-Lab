import React, { useState } from 'react';
import Swal from 'sweetalert2';
import Alert from '../components/Alert'

const Register = () => {
  const [fullname, setFullname] = useState('');
  const [NIM, setNIM] = useState('');
  const [major, setMajor] = useState('');
  const [faculty, setFaculty] = useState('');
  const [year, setYear] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [homeAddress, setHomeAddress] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  function onSubmit(event) {
    console.log(
      fullname,
      NIM,
      major,
      faculty,
      year,
      phoneNumber,
      homeAddress,
      email,
      password,
      confirmPassword
    );
    event.preventDefault();
    
    var myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/x-www-form-urlencoded');

    var urlencoded = new URLSearchParams();
    urlencoded.append('fullname', fullname);
    urlencoded.append('NIM', NIM);
    urlencoded.append('major', major);
    urlencoded.append('faculty', faculty);
    urlencoded.append('year', year);
    urlencoded.append('phoneNumber', phoneNumber);
    urlencoded.append('homeAddress', homeAddress);
    urlencoded.append('email', email);
    urlencoded.append('password', password);

    var requestOption = {
      method: 'POST',
      headers: myHeaders,
      body: urlencoded,
      redirect: 'follow'
    };

    if (confirmPassword !== password) {
      Swal.fire({
        icon:'error',
        title: 'Wadidaw Gagal',
        text: 'kata sandi tidak sama',
        confirmButtonText: 'OK',
      })
    } else { 
      Swal.fire({
        title: 'Loading',
        allowOutsideClick: false,
        didOpen: () => {
            Swal.showLoading()
        }
      })
      fetch('https://inventorylab.herokuapp.com/user/register/', requestOption)
      .then(response => 
        response.json()
      )
      .then(result => {
        console.log(result);
        console.log(result.code);
        Alert(result, 'regis')
      })
      .catch(error => {
        console.log('error : ', error.response);
        Alert(error.response, 'regis')
      });
    }
  }

  const datafaculty = [
    {
      id: 0,
      name: 'Fakultas'
    },
    {
      id: 1,
      name: 'Teknik Elektro'
    },
    {
      id: 2,
      name: 'Rekayasa Industri'
    },
    {
      id: 3,
      name: 'Informatika'
    },
    {
      id: 4,
      name: 'Ekonomi dan Bisnis'
    },
    {
      id: 5,
      name: 'Komunikasi dan Bisnis'
    },
    {
      id: 6,
      name: 'Industri Kreatif'
    },
    {
      id: 7,
      name: 'Ilmu Terapan'
    },
  ]

  const datamajor = [
    {
      id: 0,
      name: 'Jurusan'
    },
    {
      id: 1,
      name: 'S1 Teknik Elektro'
    },
    {
      id: 2,
      name: 'S1 Teknik Telekomunikasi'
    },
    {
      id: 3,
      name: 'S1 Teknik Fisika'
    },
    {
      id: 4,
      name: 'S1 Sistem Komputer'
    },
    {
      id: 5,
      name: 'S2 Elektro Komunikasi'
    },
    {
      id: 6,
      name: 'S1 Teknik Industri'
    },
    {
      id: 7,
      name: 'S1 Sistem Informasi'
    },
    {
      id: 8,
      name: 'S2 Teknik Indutri'
    },
    {
      id: 9,
      name: 'S1 Teknik Informatika'
    },
    {
      id: 10,
      name: 'S1 Ilmu Komputasi'
    },
    {
      id: 11,
      name: 'S1 Teknologi Informasi'
    },
    {
      id: 12,
      name: 'S2 Teknik Informatika'
    },
    {
      id: 13,
      name: 'S1 Manajemen (MBTI)'
    },
    {
      id: 14,
      name: 'S1 Akuntansi'
    },
    {
      id: 15,
      name: 'S2 Magister Manajemen'
    },
    {
      id: 16,
      name: 'S1 Ilmu Komunikasi'
    },
    {
      id: 17,
      name: 'S1 Ilmu Administrasi Bisnis'
    },
    {
      id: 18,
      name: 'S1 Hubungan Masyarakat'
    },
    {
      id: 19,
      name: 'S1 Desain Komunikasi Visual'
    },
    {
      id: 20,
      name: 'S1 Desain Produk'
    },
    {
      id: 21,
      name: 'S1 Seni Rupa Murni'
    },
    {
      id: 22,
      name: 'S1 Desain Interior'
    },
    {
      id: 23,
      name: 'S1 Kriya Tekstil dan Mode'
    },
    {
      id: 24,
      name: 'D4 Sistem Multimedia'
    },
    {
      id: 25,
      name: 'D3 Komputerisasi Akuntansi'
    },
    {
      id: 26,
      name: 'D3 Manajemen Informatika'
    },
    {
      id: 27,
      name: 'D3 Teknik Komputer'
    },
    {
      id: 28,
      name: 'D3 Manajemen Pemasaran'
    },
    {
      id: 29,
      name: 'D3 Teknik Informatika'
    },
    {
      id: 30,
      name: 'D3 Teknik Telekomunikasi'
    },
    {
      id: 31,
      name: 'D3 Perhotelan'
    },
    {
      id: 32,
      name: 'S1 Rekayasa Perangkat Lunak'
    }
  ]
  
  return (
    <div className="bg-indigo-100">
      <svg width="378" height="561" viewBox="0 0 378 561" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M-85.3893 348.371C-83.0144 357.843 -79.8072 367.337 -75.7339 376.725C-43.8456 450.22 29.0497 489.388 87.0823 464.208C135.883 443.035 158.633 383.101 145.675 320.865C145.8 297.105 154.773 245.801 189.67 230.66L203.312 224.74C230.748 212.836 249.95 188.682 259.202 158.754C269.52 125.379 267.463 84.8237 250.651 46.0746C218.762 -27.4205 145.867 -66.5881 87.8344 -41.4087L-215.426 90.1711C-273.459 115.351 -294.653 195.342 -262.765 268.837C-230.876 342.332 -157.981 381.5 -99.9485 356.32C-94.8019 354.087 -89.9451 351.423 -85.3893 348.371Z" fill="#9EB4FA"/>
      </svg>
      <div className="-mt-96 font-poppins">
        <div className="items-center justify-center w-9/12 text-center m-auto">
          <h1 className="text-5xl md:text-7xl pb-10 text-indigo-900 font-semibold">Registrasi</h1>
        </div>
        <div className="w-full pt-11 text-lg">
          <form onSubmit={onSubmit}>
            <div className="mx-10 items-center justify-center text-center">
              <input className="w-full py-3 lg:py-3 lg:w-3/5 focus:ring-blue-300 focus:border-blue-300 border-1 border-gray-300 rounded-lg my-4 font-semibold" type="text" name="fullname" placeholder="Nama Lengkap" 
              value={fullname} onChange={(e) => setFullname(e.target.value)}/> <br/>
              <input className="w-full py-3 lg:py-3 lg:w-3/5 focus:ring-blue-300 focus:border-blue-300 border-1 border-gray-300 rounded-lg my-4 font-semibold" type="text" name="NIM" placeholder="Nomor Induk Mahasiswa / NIM" 
              value={NIM} onChange={(e) => setNIM(e.target.value)}/> <br/>
              <select className="w-full py-3 lg:py-3 lg:w-1/5 focus:ring-blue-300 focus:border-blue-300 border-1 border-gray-300 rounded-lg lg:rounded-r-none my-4 font-semibold" type="text" name="major" placeholder="Jurusan"
              onChange={(e) => setMajor(e.target.value)}>
                {datamajor.map((jurusan) => {
                    return (
                        <option
                            key={jurusan.id}
                            value={jurusan.name}
                        >
                            {jurusan.name}
                        </option>
                    );
                  })}
              </select>

              <select className="w-full py-3 lg:py-3 lg:w-1/5 focus:ring-blue-300 focus:border-blue-300 border-1 border-gray-300 rounded-lg lg:rounded-none my-4 font-semibold" name="faculty" placeholder="Fakultas"
              onChange={(e) => setFaculty(e.target.value)}>
                {datafaculty.map((fakultas) => {
                    return (
                        <option
                            key={fakultas.id}
                            value={fakultas.name}
                        >
                            {fakultas.name}
                        </option>
                    );
                  })}
              </select>

              <input className="w-full py-3 lg:py-3 lg:w-1/5 focus:ring-blue-300 focus:border-blue-300 border-1 border-gray-300 rounded-lg lg:rounded-l-none my-4 font-semibold bg-white" type="text" name="year" placeholder="Angkatan"
              value={year} onChange={(e) => setYear(e.target.value)}/> <br/>
              <input className="w-full py-3 lg:py-3 lg:w-3/5 focus:ring-blue-300 focus:border-blue-300 border-1 border-gray-300 rounded-lg my-4 font-semibold" type="number" name="phoneNumber" placeholder="Nomor Handphone"
              value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)}/> <br/>
              <input className="w-full py-3 lg:py-3 lg:w-3/5 focus:ring-blue-300 focus:border-blue-300 border-1 border-gray-300 rounded-lg my-4 font-semibold" type="text" name="homeAddress" placeholder="Alamat"
              value={homeAddress} onChange={(e) => setHomeAddress(e.target.value)}/> <br/>
              <input className="w-full py-3 lg:py-3 lg:w-3/5 focus:ring-blue-300 focus:border-blue-300 border-1 border-gray-300 rounded-lg my-4 font-semibold" type="email" name="email" placeholder="E-mail"
              value={email} onChange={(e) => setEmail(e.target.value)}/> <br/>
              <input className="w-full py-3 lg:py-3 lg:w-3/5 focus:ring-blue-300 focus:border-blue-300 border-1 border-gray-300 rounded-lg my-4 font-semibold" type="password" name="password" placeholder="Kata Sandi"
              value={password} onChange={(e) => setPassword(e.target.value)}/> <br/>
              <input className="w-full py-3 lg:py-3 lg:w-3/5 focus:ring-blue-300 focus:border-blue-300 border-1 border-gray-300 rounded-lg my-4 font-semibold" type="password" name="confirmPass" placeholder="Konfirmasi Kata Sandi"
              value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)}/> <br/>
            </div>
            <div className="px-10 lg:w-3/5 m-auto pt-9">
              <label className="inline-flex items-center mt-4" >
                <input className="focus:ring-blue-300 h-5 w-5 border-blue-300 rounded" type="checkbox"/>
                <span className="ml-4 text-blue-900 text-base md:text-lg font-semibold">Saya Telah Membaca dan Menyetujui Persyaratan Layanan</span> 
              </label>
            </div>
            <div className="items-center text-center mt-16 pb-20 md:pb-0">
              <button className="bg-blue-600 text-white rounded-lg px-20 py-4 text-2xl shadow-2xl">Daftar</button>
            </div>
          </form>
        </div>
      </div>
      <div className="flex">
        <div className="w-full absolute z-20 md:relative text-center flex flex-col"></div>
        <svg className="-mt-40 h-0 w-0 md:h-96 md:w-96" width="467" height="402" viewBox="0 0 467 402" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M328.969 189.663C320.714 184.446 311.841 179.787 302.415 175.803C228.621 144.613 148.834 166.564 124.206 224.833C103.496 273.831 128.385 332.909 180.709 369.012C197.014 386.295 225.92 429.62 211.111 464.659L205.321 478.357C193.678 505.904 196.447 536.637 210.401 564.682C225.964 595.958 255.437 623.892 294.343 640.337C368.137 671.527 447.924 649.576 472.553 591.307L601.253 286.813C625.881 228.545 586.024 156.024 512.23 124.833C438.436 93.6429 358.649 115.594 334.021 173.863C331.837 179.03 330.16 184.31 328.969 189.663Z" fill="#9EB4FA"/>
        </svg>
      </div>
    </div>
  )
}

export default Register
