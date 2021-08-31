import Swal from 'sweetalert2';

const Alert = (hasil, type) => {

    if (type === 'auth') {
        Swal.fire({
            icon: hasil.status === 400 ? 'error' : 'success',
            title: hasil.status === 400 ? 'Wadidaw Gagal' : 'Yeey Berhasil',
            text: hasil.data.message,
            confirmButtonText: 'OK',
        }).then((result) => {
            if (result.isConfirmed && hasil.status === 200) {
                if (hasil.data.type === "Admin") {
                    window.location.href = `/app/dashboard`;
                } else if (hasil.data.type === "User") {
                    window.location.href = `/app/user/dashboard`;
                }
            }
        });
    } else if (type === 'item') {
        Swal.fire({
            icon: hasil.data.code === 400 ? 'error' : 'success',
            title: hasil.data.code === 400 ? 'Wadidaw Gagal' : 'Yeey Berhasil',
            text: hasil.data.message,
            confirmButtonText: 'OK',
        }).then((result) => {
            if (result.isConfirmed && hasil.data.code === 200) {
                window.location.href = `/app/items`;
            }
        });
    } else if (type === 'category') {
        Swal.fire({
            icon: hasil.data.code === 400 ? 'error' : 'success',
            title: hasil.data.code === 400 ? 'Wadidaw Gagal' : 'Yeey Berhasil',
            text: hasil.data.message,
            confirmButtonText: 'OK',
        }).then((result) => {
            if (result.isConfirmed && hasil.data.code === 200) {
                window.location.href = `/app/category`;
            }
        });
    } else if (type === 'user') {
        Swal.fire({
            icon: hasil.data.code === 400 ? 'error' : 'success',
            title: hasil.data.code === 400 ? 'Wadidaw Gagal' : 'Yeey Berhasil',
            text: hasil.data.message,
            confirmButtonText: 'OK',
        }).then((result) => {
            if (result.isConfirmed && hasil.data.code === 200) {
                window.location.href = `/app/user/myProfile`;
            }
        });
    } else if (type === 'pinjam') {
        Swal.fire({
            icon: hasil.data.code === 400 ? 'error' : 'success',
            title: hasil.data.code === 400 ? 'Wadidaw Gagal' : 'Yeey Berhasil',
            text: hasil.data.message,
            confirmButtonText: 'OK',
        }).then((result) => {
            if (result.isConfirmed && hasil.data.code === 200) {
                window.location.href = `/app/user/riwayatPeminjaman`;
            }
        });
    }
};

export default Alert;
