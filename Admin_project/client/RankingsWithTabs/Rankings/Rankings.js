import React from "react";
import { useState } from "react";
import '../Rankings/Rankings.css';
import TabContent from "../../Components/TabElements/TabContent";
import TabNavItem from "../../Components/TabElements/TabNavItem";
import MaleRankings from "../../Pages/Rankings/AllTabs/MaleRankings";
import FemaleRankings from "../../Pages/Rankings/AllTabs/FemaleRankings";
import U19MaleRankings from "../../Pages/Rankings/AllTabs/U19maleRankings";
import U19FemaleRankings from "../../Pages/Rankings/AllTabs/U19femaleRankings";



const Rankings = () => {
  const [activeTab, setActiveTab] = useState("tab1");
 
  return (
    <div className="container">
    <div className="Tabs">
      <ul className="nav">
        <TabNavItem title="Open Male Rankings" id="tab1" activeTab={activeTab} setActiveTab={setActiveTab}/>
        <TabNavItem title="Open Female Rankings" id="tab2" activeTab={activeTab} setActiveTab={setActiveTab}/>
        <TabNavItem title="U/19 Male Rankings" id="tab3" activeTab={activeTab} setActiveTab={setActiveTab}/>
        <TabNavItem title="U/19 Female Rankings" Females id="tab4" activeTab={activeTab} setActiveTab={setActiveTab}/>
      </ul>
 
      <div className="outlet">
        <TabContent id="tab1" activeTab={activeTab}>
          <MaleRankings/>
        </TabContent>
        <TabContent id="tab2" activeTab={activeTab}>
          <FemaleRankings/>
        </TabContent>
        <TabContent id="tab3" activeTab={activeTab}>
          <U19MaleRankings />
        </TabContent>
        <TabContent id="tab4" activeTab={activeTab}>
          <U19FemaleRankings/>
        </TabContent>
      </div>
    </div>
    </div>
  );
};
 
export default Rankings;