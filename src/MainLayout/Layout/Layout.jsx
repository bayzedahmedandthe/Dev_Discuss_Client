import { Outlet } from "react-router-dom";
import Navbar from "../Shared/Navbar/Navbar";
import LeftSidebar from "../Sidebars/LeftSidebar";
import RightSidebar from "../Sidebars/RightSidebar"; // ✅ Import RightSidebar

const Layout = () => {
  return (
    <div className="w-[98%] md:w-11/12 mx-auto">
      <Navbar />
      <div className="relative min-h-screen flex flex-col md:flex-row bg-white dark:bg-gray-900 dark:text-white py-6 gap-6">
        
        {/* ✅ Left Sidebar */}
        <div className="w-full md:w-1/8">
          <LeftSidebar />
        </div>

        {/* ✅ Main Content Section */}
        <div className="flex-1 bg-white dark:bg-gray-800 shadow-lg rounded-xl p-6">
          <Outlet />
        </div>

        {/* ✅ Right Sidebar */}
        <div className="w-full md:w-1/5 hidden md:block">
          <RightSidebar />
        </div>

      </div>
    </div>
  );
};

export default Layout;
