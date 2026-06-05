import React, { useState } from "react";
import {
  FaUsers,
  FaRocket,
  FaRegHandPointUp,
  FaWallet,
  FaComments,
  FaThumbsUp,
} from "react-icons/fa"; // Icons
import { motion } from "framer-motion";
import { IoChatbubblesSharp } from "react-icons/io5";
import { Link } from "react-router-dom";
import Tilt from "react-parallax-tilt";
import Navbar from "../components/Navbar";
import Chatbox from "../views/Chatbox";
import Feed from "../views/Feed"; // Assume we have a feed component
import EWallet from "../views/EWallet"; // Assume we have an E-wallet component

const AccountPage = () => {
  const [activeSection, setActiveSection] = useState("chat");

  const handleSectionChange = (section) => {
    setActiveSection(section);
  };

  return (
    <div className="font-sans bg-gray-900 text-white min-h-screen">
      <Navbar />

      {/* Account Management Section */}
      <div className="py-10">
        <h2 className="text-3xl font-bold text-center mb-8">
          Manage Your Account
        </h2>

        <h1 className="text-center font-thin text-xl">
          Select - Click and continue
        </h1>

        {/* Active Section Display */}
      </div>

      {/* Parallax Visual Effect Section */}
      <div className="py-20 bg-gray-800">
        <div className="flex flex-wrap justify-center items-center space-x-6 gap-8 sm:space-x-4 md:space-x-6 lg:space-x-8 xl:space-x-10">
          {/* Parallax Tilt Card 1 */}
          <Link to={"/ayi-chat-room"} target="_blank">
            <Tilt
              tiltMaxAngleX={20}
              tiltMaxAngleY={20}
              glareEnable={true}
              glareMaxOpacity={0.4}
              glareColor="#ffffff"
            >
              <div className="bg-blue-700 p-8 sm:p-6 md:p-8 rounded-xl text-center text-white w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg">
                <IoChatbubblesSharp className="text-5xl mb-4 mx-auto" />
                <h3 className="text-xl sm:text-2xl"> Continue to A-Chat</h3>
              </div>
            </Tilt>
          </Link>
          <Link to={"/ayi-sphere"} target="_blank">
            {/* Parallax Tilt Card 2 */}

            <Tilt
              tiltMaxAngleX={20}
              tiltMaxAngleY={20}
              glareEnable={true}
              glareMaxOpacity={0.4}
              glareColor="#ffffff"
            >
              <div className="bg-green-700 p-8 sm:p-6 md:p-8 rounded-xl text-center text-white w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg">
                <FaUsers className="text-5xl mb-4 mx-auto" />
                <h3 className="text-xl sm:text-2xl">Join the A Sphere</h3>
              </div>
            </Tilt>
          </Link>

          {/* Parallax Tilt Card 3 */}
          <Link to={"/ayi-wallet"} target="_blank">
            <Tilt
              tiltMaxAngleX={20}
              tiltMaxAngleY={20}
              glareEnable={true}
              glareMaxOpacity={0.4}
              glareColor="#ffffff"
            >
              <div className=" bg-blue-700 p-8 sm:p-6 md:p-8 rounded-xl text-center text-white w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg">
                <FaWallet className="text-5xl mb-4 mx-auto" />
                <h3 className="text-xl sm:text-2xl">A - Wallet</h3>
              </div>
            </Tilt>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AccountPage;
