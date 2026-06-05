import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Tilt from "react-parallax-tilt";
import { FaMapMarkerAlt, FaPhoneAlt, FaEnvelope } from "react-icons/fa";
import axios from "axios";
import { toast, Toaster } from "sonner";

axios.defaults.baseURL = "https://ayi-backend.onrender.com";
import {
  FaUser,
  FaMoneyBillWave,
  FaCrown,
  FaCog,
  FaSignOutAlt,
} from "react-icons/fa";
import momo from "../assets/momo.jpeg";
import airtel from "../assets/airtel.png";
import { CiBank } from "react-icons/ci";
import { MdOutlineContactSupport } from "react-icons/md";
import GetVip from "../chat/pages/GetVip";
import { useNavigate } from "react-router-dom";

export default function WalletPage() {
  const [fullname, setfullname] = useState("");
  const [email, setemail] = useState("");
  const [message, setmessage] = useState("");
  const [userId, setUserId] = useState("");
  const [activeTab, setActiveTab] = useState("account");
  const [theme, setTheme] = useState("light");
  const [modalContent, setModalContent] = useState(null);

  const tabs = [
    { id: "account", label: "Account Information", icon: <FaUser /> },
    { id: "deposit", label: "Deposit Money", icon: <FaMoneyBillWave /> },
    { id: "vip", label: "Claim VIP", icon: <FaCrown /> },
    { id: "support", label: "Support", icon: <MdOutlineContactSupport /> },
    { id: "settings", label: "Settings", icon: <FaCog /> },
  ];

  const goto = useNavigate();

  const handleleavepage = () => {
    goto("/account-page");
  };

  const handleLogout = () => {
    setModalContent({
      title: "Logout",
      description: "You have successfully logged out.",
    });
    localStorage.removeItem("ayi-wallet-token");
    sessionStorage.clear();
    localStorage.clear();
    goto("/account-page");
  };

  const toggleTheme = () => setTheme(theme === "light" ? "dark" : "light");

  useEffect(() => {
    const fetchUserData = async () => {
      const token = localStorage.getItem("ayi-wallet-token");
      const id = localStorage.getItem("userId");
      setUserId(id);

      if (!token || !id) return;

      try {
        const res = await axios.get(
          `https://your-backend.com/api/users/${id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const user = res.data;
        setfullname(user.fullname);
        setemail(user.email);
        setmessage(user.message || "");
      } catch (err) {
        console.error("Failed to fetch user:", err);
      }
    };
    fetchUserData();
  }, []);

  return (
    <div
      className={`flex h-screen ${
        theme === "dark" ? "bg-gray-900 text-white" : "bg-gray-100 text-black"
      }`}
    >
      <aside className="w-64 p-4 border-r border-gray-300 flex flex-col gap-4">
        <div className=" py-7">
          <h1 className=" font-extrabold  text-center text-4xl border-b-2 border-b-amber-400">
            A Wallet
          </h1>
        </div>
        {tabs.map((tab) => (
          <button
            key={tab.id}
            className={`flex items-center gap-2 p-3 rounded-lg transition-colors duration-200 ${
              activeTab === tab.id
                ? "bg-blue-500 text-white"
                : "hover:bg-blue-100 dark:hover:bg-gray-700"
            }`}
            onClick={() => setActiveTab(tab.id)}
          >
            {tab.icon} {tab.label}
          </button>
        ))}
      </aside>

      <main className="flex-1 p-6 overflow-y-auto">
        {activeTab === "account" && (
          <AccountInformation openModal={setModalContent} fullname={fullname} />
        )}
        {activeTab === "deposit" && (
          <DepositMoney openModal={setModalContent} />
        )}
        {activeTab === "vip" && <ClaimVIP openModal={setModalContent} />}
        {activeTab === "profile" && (
          <UserProfile
            openModal={setModalContent}
            fullname={fullname}
            email={email}
          />
        )}
        {activeTab === "support" && <Support openModal={setModalContent} />}
        {activeTab === "settings" && (
          <div className=" min-h-screen flex justify-center items-center space-x-4">
            <button
              onClick={handleleavepage}
              className="flex items-center  px-5 p-3 bg-cyan-500 text-white rounded-lg"
            >
              <FaSignOutAlt /> Leave the page
            </button>
            <button
              onClick={handleLogout}
              className="flex items-center  px-5 p-3 bg-red-500 text-white rounded-lg"
            >
              <FaSignOutAlt /> Logout
            </button>
            <button
              onClick={toggleTheme}
              className="p-3 bg-gray-700  text-white rounded-lg"
            >
              Toggle {theme === "light" ? "Dark" : "Light"} Theme
            </button>
          </div>
        )}
      </main>

      <AnimatePresence>
        {modalContent && (
          <motion.div
            className="py-10 fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setModalContent(null)}
          >
            <motion.div
              className="bg-white dark:bg-gray-800 rounded-xl shadow-2xl p-6 max-w-lg w-full"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              <h3 className="text-xl font-bold mb-4 text-blue-600 dark:text-blue-300">
                {modalContent.title}
              </h3>
              <p className="text-gray-700 dark:text-gray-300 whitespace-pre-line">
                {modalContent.description}
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function InfoCard({ title, children, onClick }) {
  return (
    <motion.div
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      className="p-8 min-h-[180px] flex flex-col justify-between m-2 rounded-3xl shadow-xl bg-white dark:bg-gray-800 transition cursor-pointer hover:shadow-2xl border border-gray-200 dark:border-gray-700"
    >
      <h3 className="text-xl font-bold mb-4 text-blue-600 dark:text-blue-400">
        {title}
      </h3>
      <div className="text-base text-gray-600 dark:text-gray-300">
        {children}
      </div>
    </motion.div>
  );
}


function AccountInformation({ openModal }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  console.log(user);

  const transaction_details =
    "Transaction not permitted. Your account does not currently meet the minimum requirement for this type of transaction. Users must have at least 1 year of active membership in the system to proceed.";

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const userId = localStorage.getItem("userId");
        if (!userId) return;

        const res = await axios.get(`https://ayi-backend.onrender.com/api/user/${userId}`);
        setUser(res.data.user);
      } catch (err) {
        console.error("Failed to fetch user:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  if (loading) return <div className="text-center py-6">Loading account info...</div>;
  if (!user) return <div className="text-center py-6 text-red-500">User not found</div>;

  return (
    <section className="space-y-4 font-sans">
      <h2 className="text-3xl font-bold mb-6">Account Information</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <InfoCard
          title="Balance Details"
          onClick={() =>{
            console.log(user);
            openModal({
              title: "Balance Details",
              description: `1. Account Holder: ${user.names}\n2. Account balance: ${user.wallet} \n3.  Type of VIP: ${user.wallet?.vip || "N/A"}\n4. Loan allowed: up to ${user.wallet?.loanLimit || "0"}`,
            })
          }
          }
        >
          Current balance and available funds.
        </InfoCard>

        <InfoCard
          title="Loan Details"
          onClick={() =>
            openModal({
              title: "Loan Details",
              description:
                "You're not currently eligible to request a loan. Users must have at least 6 months of active history before applying. If yet reached 6 months using this application you may Text our Financial   manager on Whatsapp : +250 782 029 528 for asking the loan",
            })
          }
        >
          Loan status and repayment progress.
        </InfoCard>

        <InfoCard
          title="Deposit Details"
          onClick={() =>
            openModal({
              title: "Deposit Details",
              description: "All historical deposits including amount, method and timestamp. Text Our financial manager on whatsapp +250 782 029 528",
            })
          }
        >
          Record of deposits to your wallet.
        </InfoCard>
        <InfoCard
          title="Transaction History"
          onClick={() =>
            openModal({
              title: "Transaction History",
              description: transaction_details,
            })
          }
        >
          All past transactions.
        </InfoCard>
      </div>
    </section>
  );
}

function DepositMoney({ openModal }) {
  return (
    <section className="space-y-4">
      <h2 className="text-3xl font-semibold">Deposit Money</h2>
      <p className="text-gray-700 dark:text-black-300">
        Use the following methods with memo codes, Airtel Money or MTN MoMo:
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <motion.div
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.98 }}
          onClick={() =>
            openModal({
              title: "Airtel Money",
              description:
                "To deposit using Airtel Money:\n1. Dial *500#\n2. Select 'Send Money'\n3. Enter business number: +250 735 250 928\n4. Use MEMO code in reference\n5. Confirm and send",
            })
          }
          className="bg-slate-600 relative bg-cover bg-center p-8 min-h-[180px] flex flex-col justify-between m-2 rounded-3xl shadow-xl text-white cursor-pointer hover:shadow-2xl border border-gray-200 dark:border-gray-700"
        >
          <h1 className="font-bold text-center text-white text-xl">
            Airtel Money
          </h1>
          <img src={airtel} alt="airtel" />
        </motion.div>

        <motion.div
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.98 }}
          onClick={() =>
            openModal({
              title: "MTN MoMo Pay",
              description:
                "To deposit with MTN MoMo:\n1. Dial *182*8*1#\n2. Select 'MoMoPay'\n3. Enter merchant code\n4. Use PIN\n5. Confirm",
            })
          }
          className="bg-slate-600 relative bg-cover bg-center p-8 min-h-[180px] flex flex-col justify-between m-2 rounded-3xl shadow-xl text-white cursor-pointer hover:shadow-2xl border border-gray-200 dark:border-gray-700"
        >
          <h1 className="font-bold text-center text-white text-xl py-2">
            Mobile Money - MOMO
          </h1>
          <img src={momo} alt="momo" />
        </motion.div>

        <InfoCard
          onClick={() =>
            openModal({
              description:
                "Send money to our bank using your memo code in the transfer reference field. Usually reflects within 1–3 business days.",
            })
          }
        >
          <h1 className="font-bold text-center text-xl">Bank Transfer</h1>
          <CiBank size={100} className="mx-auto" />
          Transfer from your bank app with reference code.
        </InfoCard>
      </div>

      <div className="mt-8 p-6 bg-blue-50 border border-blue-200 rounded-xl text-gray-800">
        <h3 className="text-xl font-semibold mb-2">How to Deposit Money:</h3>
        <ul className="list-disc list-inside space-y-1">
          <li>Click on the deposit method you want to use.</li>
          <li>Follow the instructions shown for that method.</li>
          <li>Take a screenshot of the successful deposit message.</li>
          <li>
            Send it to: <strong>+250 782 029 528</strong> registered on
            Hakuzimana Paul.
          </li>
        </ul>
        <p className="mt-2">
          Once received, your stake will be added to your account.
        </p>
      </div>
    </section>
  );
}

function ClaimVIP({ openModal }) {
  return <GetVip />;
}

const Support = () => {
  const [name, setname] = useState("");
  const [email, setemail] = useState("");
  const [message, setmessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("/sendemail", {
        username: name,
        email: email,
        message: message,
      });
      toast.success("Your message was sent successfully!");
      setname("");
      setemail("");
      setmessage("");
    } catch (error) {
      toast.error("Something went wrong. Please try again.");
      console.error(error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-4xl font-bold text-center mb-10 text-blue-600"
      >
        Help Center & Support
      </motion.h1>

      <div className="grid md:grid-cols-2 gap-10">
        {/* Contact Form */}
        <Tilt className="bg-white p-6 rounded-2xl shadow-lg">
          <h2 className="text-2xl font-semibold mb-4 text-gray-800">
            Contact Us
          </h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-gray-700">Full Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setname(e.target.value)}
                className="w-full mt-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                placeholder="e.g. Shema Bonheur"
                required
              />
            </div>
            <div>
              <label className="block text-gray-700">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setemail(e.target.value)}
                className="w-full mt-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                placeholder="e.g. example@mail.com"
                required
              />
            </div>
            <div>
              <label className="block text-gray-700">Message</label>
              <textarea
                value={message}
                onChange={(e) => setmessage(e.target.value)}
                className="w-full mt-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                rows="4"
                placeholder="Write your message here..."
                required
              ></textarea>
            </div>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              type="submit"
              className="w-full bg-blue-600 text-white py-2 rounded-md font-semibold shadow-md hover:bg-blue-700 transition"
            >
              Submit
            </motion.button>
          </form>
        </Tilt>

        {/* Company Information */}
        <Tilt className="bg-white p-6 rounded-2xl shadow-lg">
          <h2 className="text-2xl font-semibold mb-4 text-gray-800">
            Company Information
          </h2>
          <div className="space-y-4 text-gray-700">
            <div className="flex items-center gap-3">
              <FaMapMarkerAlt className="text-blue-600" />
              <span>Kigali Gasabo Rwanda, Musanze</span>
            </div>
            <div className="flex items-center gap-3">
              <FaPhoneAlt className="text-blue-600" />
              <span>+250 788 967 462</span>
            </div>
            <div className="flex items-center gap-3">
              <FaEnvelope className="text-blue-600" />
              <span>afriyouthinvest@gmail.com</span>
            </div>
            <div>
              <iframe
                title="Company Location"
                className="w-full h-64 rounded-md mt-4"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14962.982749209987!2d30.0599758!3d-1.9472776!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x19dcb0b42e3c8f41%3A0xb42d2b431933e2fc!2sKigali%2C%20Rwanda!5e0!3m2!1sen!2sus!4v1692071629575!5m2!1sen!2sus"
                allowFullScreen=""
                loading="lazy"
              ></iframe>
            </div>
          </div>
        </Tilt>
      </div>

      <Toaster richColors />
    </div>
  );
};
