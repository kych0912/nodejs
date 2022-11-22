import React, { useRef, useState } from 'react';
import PropTypes from 'prop-types';
import './drop-file-input.css';
import uploadImg from '../cloud-upload-regular-240.png';

const DropFileInput = props => {

    const wrapperRef = useRef(null);

    const [fileList, setFileList] = useState([]);

    const onDragEnter = () => wrapperRef.current.classList.add('dragover');

    const onDragLeave = () => wrapperRef.current.classList.remove('dragover');

    const onDrop = () => wrapperRef.current.classList.remove('dragover');

    const onFileDrop = (e) => {
        const newFile = e.target.files[0];
        if (newFile) {
            const updatedList = [...fileList, newFile];
            setFileList(updatedList);
            props.onFileChange(updatedList);
        }
    }
    return (
        <>
            <div
                ref={wrapperRef}
                className="drop-file-input"
                onDragEnter={onDragEnter}
                onDragLeave={onDragLeave}
                onDrop={onDrop}
                style={{
                    
                }}
            >
                <div className="drop-file-input__label">
                    <img src={uploadImg} alt="" />
                    <p></p>
                </div>
            </div>
        </>
    );
}

export default DropFileInput;