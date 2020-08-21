import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import './toastStyles.css';

const AUTO_DELETE_TIME = 2000;
const Toast = (props) =>  {
    const {title, desc, clearToast} = props;
    const [autoDelete, setAutoDelete] = useState(true);

    useEffect(() => {
        const interval = setInterval(() => {
            if (autoDelete) {
                clearToast();
            }
        }, AUTO_DELETE_TIME);
        return () => {
            clearInterval(interval);
        }
    }, []);

    const onCloseClick = () => {
        setAutoDelete(false);
        clearToast();
    }

    return (
        <>
            <div className="toast-overlay"></div>
            <div className="toast">
                <div className="title">{title}</div>
                <div className="desc">{desc}</div>
                <a className="close-toast" onClick={onCloseClick}>X</a>
            </div>
        </>
    );
}

export default Toast;