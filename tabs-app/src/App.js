import React, { useState } from 'react';
import './App.css';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend'
import TabList from './component/TabList/TabList';
import TabContent from './component/TabContent/TabContent';
import Toast from './component/Toast/Toast';

var newToastId = 0;
function App() {
  const [tabList, setTabList] = useState([
    {
      id: 1,
      tabContent: <div>Content inside Tab 1</div>
    },
    {
      id: 2,
      tabContent: <div>Content inside Tab 2</div>
    },
    {
      id: 3,
      tabContent: <div>Content inside Tab 3</div>
    }
  ]);
  
  const [selectedTab, setSelectedTab] = useState(0);
  const [toast, setToast] = useState(null);

  /**
   * This method is to move tabs on drag and drop
   * @param {*} newIndex - Index where the tab should be moved to
   * @param {*} currentIndex - Previous index of the tab
   */
  const moveTabs = (newIndex,currentIndex) => {
    var tempTabList = tabList.slice();
    var currentTab = tempTabList.splice(currentIndex, 1);
    tempTabList.splice(newIndex, 0, currentTab[0]);
    setTabList(tempTabList); setSelectedTab(newIndex)
  }

  const changeActiveTab = (index) => setSelectedTab(index);

  //to add a new tab to the existing set of tabs
  const addNewTab = () => {
    var tempTabList = tabList.slice();
    var maxTabId = 1;
    tempTabList.map(tab => {
      if(maxTabId < tab.id) maxTabId = tab.id;
    });
    var newId = maxTabId + 1;
    tempTabList.push({
      id: newId,
      tabContent: <div>Content inside Tab {newId}</div>
    });
    setTabList(tempTabList); setSelectedTab(tempTabList.length - 1);
  }

  //to display custom toast on closing a tab
  const addToast = (data) => {
    var toast = {
      id: newToastId,
      title: "Tab Closed",
      desc: "Tab "+data.id+" has been closed"
    };
    setToast(toast);
  };

  //to remove a tab from tablist
  const closeTab = (index) => {
    var tempTabList = tabList.slice();
    var closedTab = tempTabList.splice(index, 1);
    // open previous tab, if its the first tab, open the next one
    var newSelectedTab = index > 0 ? (index - 1) : 0;
    addToast(closedTab[0]);
    setTabList(tempTabList); setSelectedTab(newSelectedTab);
  }

  const clearToast = () => setToast(null); 

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="tabs-container">
        <TabList 
          tabList={tabList}
          selectedTab={selectedTab}
          moveTabs={moveTabs}
          changeActiveTab={changeActiveTab}
          addNewTab={addNewTab}
          closeTab={closeTab}
        />
        <TabContent>{tabList[selectedTab].tabContent}</TabContent>
        {toast && 
          <Toast 
            {...toast}
            clearToast = {clearToast}
          />
        }
      </div>
    </DndProvider>
  );
}

export default App;
