import React from 'react';
import PropTypes from 'prop-types';

const ModalButton = ({ id, name }) => {
    return (
        <button type="button" className="btn btn-primary" data-toggle="modal" data-target={`#${id}`}>
            {name}</button>
    );
}

ModalButton.propTypes={
    id:PropTypes.string,
    name:PropTypes.string
}

export default ModalButton;