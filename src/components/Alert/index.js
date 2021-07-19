import Swal from 'sweetalert2'

const Alert = (status, message) => {
    return (
        Swal.fire({
            icon: status === 400 ? 'error' : 'success',
            title: status === 400 ? 'Login Gagal' : 'Login Berhasil',
            text: message,
          })
    );
}

export default Alert
