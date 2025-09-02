import React from 'react';
import Modal from 'react-modal';
import { IoMdCloseCircle } from "react-icons/io";
import BeatLoader from 'react-spinners/BeatLoader';

interface DeleteModalProps {
    onDelete: () => void;
    onClose: () => void;
    showModal:boolean,
    loading?:boolean
}

const DeleteModal: React.FC<DeleteModalProps> = ({ onDelete, onClose,showModal,loading }) => {
    return (
        <Modal
            isOpen={showModal}
            onRequestClose={onClose}
            contentLabel="Example Modal"
            style={{
                overlay: { backgroundColor: 'rgba(0, 0, 0, 0.5)', zIndex: 1000 },
                content: {
                    borderRadius: 10,
                    width: '400px', height: 'auto',
                    top: '10%', left: '50%', right: 'auto', bottom: 'auto',
                    transform: 'translateX(-50%)', padding: '20px', overflow: 'auto',
                    zIndex: 1050, position: 'relative', display: 'flex',
                    flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
                }
            }}
        >
            <div className="modal-body p-0 text-center" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                <IoMdCloseCircle size={60} className="justify-center text-danger" />
                <div className="text-3xl mt-5">Are you sure?</div>
                <div className="text-slate-500 mt-2">
                    Do you really want to delete this record? This process cannot be undone.
                </div>
            </div>

            <div className="px-5 pb-5 pt-4 justify-center">
                <button onClick={onClose} className="mr-1 btn btn-outline-secondary w-24">
                    Cancel
                </button>
                <button onClick={onDelete} className="mr-1 btn btn-danger w-24">
                    {loading?<BeatLoader color="#ffffff" size={8} />:'Delete'}
                </button>
            </div>
        </Modal>
    );
};

export default DeleteModal;
