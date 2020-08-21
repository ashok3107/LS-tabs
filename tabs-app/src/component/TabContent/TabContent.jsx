import React from 'react';
import './tabContentStyles.css';

const TabContent = (props) => {
    return (
        <div className="tab-content">
            {props.children}
        </div>
    );
}

export default TabContent;