import React from 'react';
import ModalButton from '../Components/ModalButton';
import Modal from '../Components/ModalComponent';


export default { title: "Modals" };

export const withButton = () => (
    <div>
        <ModalButton name="Click Me" id="hello"></ModalButton>
        <Modal modalID="hello"></Modal>
    </div>
)

