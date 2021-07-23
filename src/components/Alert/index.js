import Swal from 'sweetalert2'

const Alert = (status, message) => {
    return (
        Swal.fire({
            icon: status === 400 ? 'error' : 'success',
            title: status === 400 ? 'Wadidaw Gagal' : 'Yeey Berhasil',
            text: message,
            confirmButtonText: 'OK',
          })
    );
}

export default Alert
