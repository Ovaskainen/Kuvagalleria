import Modal from '@mui/material/Modal';
import styles from './ModalKuva.module.css'

function ModalKuva(props) {

  return (
    <div>
        <Modal className={styles.modal}
            open={props.open}
            onClose={props.handleClose}     
        >
            <img className={styles.img}
              src={props.kuva}
              alt="image"
            />
        </Modal>
    </div>
  )
}

export default ModalKuva;
