import React from 'react';

const ModalButton = ({ id, name }) => {
    return (
        <button type="button" class="btn btn-primary" data-toggle="modal" data-target={`#${id}`}>
            {name}</button>
    );
}

export default ModalButton;