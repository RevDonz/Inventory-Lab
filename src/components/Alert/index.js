// import { useHistory } from 'react-router-dom';
import Swal from 'sweetalert2';

const Alert = (status, message, type) => {
    if (type === 'auth') {
        Swal.fire({
            icon: status === 400 ? 'error' : 'success',
            title: status === 400 ? 'Wadidaw Gagal' : 'Yeey Berhasil',
            text: message,
            confirmButtonText: 'OK',
        }).then((result) => {
            if (result.isConfirmed && status === 200) {
                window.location.href = `/admin/home`;
            }
        });
    } else if (type === 'item') {

    }
};

export default Alert