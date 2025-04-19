import React from "react";
import MessageContainer from "./MessageContainer";
import Sidebar from "./Sidebar";

const HomePage = () => {
  return (
    <div
      className="flex rounded-lg  
    sm:h-[450px] md:h-[550px]
    overflow-hidden bg-clip-padding backdrop-filter backdrop-blur-sm border border-gray-100"
    >
      <Sidebar />
      <MessageContainer />
    </div>
  );
};

export default HomePage;
