import React from 'react';
import Tab from '../Tab/Tab';
import './tabListStyles.css';
import { useState } from 'react';
import { useEffect } from 'react';
import { useRef } from 'react';

const TabList = (props) => {
    const {tabList, selectedTab, moveTabs, changeActiveTab, addNewTab, closeTab} = props;
    const tabListRef = useRef(null);
    const [displayChevron, setDisplayChevron] = useState(false);

    useEffect(() => {
        var tabLists = tabListRef.current;
        tabLists.scrollWidth > tabLists.clientWidth ? setDisplayChevron(true) : setDisplayChevron(false);
    },[tabList, selectedTab]);

    return (
        <div className="tab-list-container">
            {displayChevron && selectedTab !== 0 && <a className="chevron previous-tab" onClick={() => changeActiveTab(selectedTab - 1)}>{"<"}</a>}
            <div ref={tabListRef} className={"tab-lists "+(displayChevron && "with-chevron")}>
            {tabList && tabList.map((tab,index) => 
                <Tab 
                    key={tab.id}
                    tab={tab}
                    index={index}
                    moveTabs={moveTabs}
                    changeActiveTab = {changeActiveTab}
                    selectedTab={index === selectedTab && true}
                    canDisplayCloseX= {tabList.length > 1}
                    closeTab={closeTab}
                />
            )}
            </div>
            {displayChevron && selectedTab < tabList.length -1 && <a className="chevron next-tab" onClick={() => changeActiveTab(selectedTab + 1)}>{">"}</a>}
            {tabList && tabList.length < 10 && <a onClick={addNewTab} className="new-tab">+</a>}
        </div>
    );
}

export default TabList;