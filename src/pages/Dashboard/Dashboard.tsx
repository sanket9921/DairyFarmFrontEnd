import React from 'react';
import CardDataStats from '../../components/CardDataStats';
import ChartOne from '../../components/Charts/ChartOne';
import ChartThree from '../../components/Charts/ChartThree';
import ChartTwo from '../../components/Charts/ChartTwo';
import ChatCard from '../../components/Chat/ChatCard';
import MapOne from '../../components/Maps/MapOne';
import TableOne from '../../components/Tables/TableOne';

import TotalMilk from "../../images/icon/icon-milk-can.png";
import TotalProfit from "../../images/icon/icon-profit.png";
import TotalAnimal from '../../images/icon/icon-cow.png';
import LactatingAnimal from "../../images/icon/icon-farming.png";
import AnimalList from '../../components/Animals/AnimalList';

const Dashboard: React.FC = () => {
  return (
    <>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 xl:grid-cols-4 2xl:gap-7.5">
        <CardDataStats title="Total Milk" total="80L">
        <img src={TotalMilk} width={36} height={38}/>
        </CardDataStats>
        <CardDataStats title="Total Profit" total="₹50,000">
        <img src={TotalProfit} width={36} height={38}/>

        </CardDataStats>
        <CardDataStats title="Total Animal" total="50">
        <img src={TotalAnimal} width={36} height={38}/>

        </CardDataStats>
        <CardDataStats title="Lactating Animals" total="30">
        <img src={LactatingAnimal} width={36} height={38}/>

        </CardDataStats>
      </div>

      <div className="mt-4 grid grid-cols-12 gap-4 md:mt-6 md:gap-6 2xl:mt-7.5 2xl:gap-7.5">
        <ChartTwo />
        <ChartThree />
      
        <div className="col-span-12 xl:col-span-12">
          {/* <TableOne />
           */}
           <AnimalList/>
        </div>
        {/* <ChatCard /> */}
      </div>
    </>
  );
};

export default Dashboard;
