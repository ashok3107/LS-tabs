import React from 'react';
import './tabStyles.css';
import { ItemTypes } from '../../types/DragTypes';
import { useDrag, useDrop } from 'react-dnd';
import { useRef } from 'react';
import { useEffect } from 'react';

const Tab = (props) => {
    const {tab, selectedTab, index, moveTabs, changeActiveTab, canDisplayCloseX, closeTab} = props;

    useEffect(() => {
        selectedTab && ref.current.focus();
    },[selectedTab]);

    const ref = useRef(null);
    const [, drop] = useDrop({
        accept: ItemTypes.TABS,
        drop: (item) => moveTabs(index, item.currentIndex),
    });

    const [, drag] = useDrag({
        item: { type: ItemTypes.TABS, currentIndex: index },
        collect: monitor => ({
            isDragging: !!monitor.isDragging(),
        }),
    });
    drag(drop(ref));

    return (
        <div 
            ref={ref} 
            className={"tab "+ (selectedTab && "active")} 
            onClick={() => changeActiveTab(index)}
            tabIndex="0"
        >
            {"Tab "+tab.id}
            {canDisplayCloseX && <a className="close-tab" onClick={(e) => {e.stopPropagation();closeTab(index)}} >X</a> }
        </div>
    );
}

export default Tab;