import React from 'react';
import ModalButton from '../Components/Modals/ModalButton';
import Modal from '../Components/Modals/ModalComponent';


export default { title: "Modals" };

export const withButton = () => (
    <div>
        <ModalButton name="Click Me" id="hello"></ModalButton>
        <Modal modalID="hello"></Modal>
    </div>
)

