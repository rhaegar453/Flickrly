import React from 'react';


const ModalComponent = ({ children, title, modalID }) => {
    return (
        <div>
            <div class="modal fade" id={modalID} tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div class="modal-dialog" role="document">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" id="exampleModalLabel">{title}</h5>
                            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div class="modal-body">
                            {children}
      </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ModalComponent;