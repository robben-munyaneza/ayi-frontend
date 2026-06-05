import { useNavigate } from "react-router-dom";
import {
  FaMoneyBillWave,
  FaExchangeAlt,
  FaUniversity,
  FaWallet,
  FaShoppingCart,
  FaHandHoldingUsd,
  FaReceipt,
  FaArrowRight,
} from "react-icons/fa";
import logo from "../assets/logo.png"; // Make sure this path is correct

export default function LandingPage() {
  const navigate = useNavigate();

  const features = [
    { title: "Deposit Money", icon: <FaMoneyBillWave /> },
    { title: "Withdraw Money", icon: <FaUniversity /> },
    { title: "Transfer", icon: <FaExchangeAlt /> },
    { title: "Check Balance", icon: <FaWallet /> },
    { title: "A-Pay", icon: <FaArrowRight /> },
    { title: "Buy", icon: <FaShoppingCart /> },
    { title: "Loan", icon: <FaHandHoldingUsd /> },
    { title: "Transaction", icon: <FaReceipt /> },
  ];

  return (
    <div className="min-h-screen bg-blue-950 text-white font-sans flex flex-col items-center px-6 py-10">
      {/* Header */}
      <div className="flex items-center space-x-4 mb-10">
        <img
          src={logo}
          alt="Company Logo"
          className="w-16 h-16 object-contain drop-shadow-xl"
        />
        <h1 className="text-4xl md:text-5xl font-extrabold text-white tracking-wide">
          A-Wallet Finance
        </h1>
      </div>

      {/* Welcome Title */}
      <h2 className="text-2xl md:text-3xl text-blue-200 font-semibold mb-12">
        Welcome to <span className="text-white">A-</span> — your smart money companion
      </h2>

      {/* Features */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6 max-w-6xl w-full mb-16">
        {features.map((feature, index) => (
          <div
            key={index}
            className="bg-gray-800 bg-opacity-20 backdrop-blur-sm p-6 rounded-xl flex flex-col items-center text-center shadow-lg border border-white hover:shadow-2xl transition-all duration-200 cursor-pointer"
          >
            <div className="text-3xl mb-3 text-blue-300">{feature.icon}</div>
            <p className="text-base font-medium text-white">{feature.title}</p>
          </div>
        ))}
      </div>

      {/* Call-to-Action */}
      <button
        onClick={() => navigate("/ayi-wallet/wallet")}
        className="bg-blue-700 hover:bg-blue-600 text-white font-bold text-lg px-10 py-4 rounded-full shadow-lg transition"
      >
        Proceed to Wallet
      </button>
    </div>
  );
}
    