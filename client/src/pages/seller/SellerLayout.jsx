import React from "react";
import { useAppContext } from "../../context/AppContext";
import { images } from "../../assets/assets";
import { Link, NavLink, Outlet } from "react-router-dom";

const SellerLayout = () => {
  const { setIsSeller, toast, axios, navigate, BACKEND_URL } = useAppContext();
  const logout = async () => {
    try {
      const { data } = await axios.post(
        `${BACKEND_URL}/api/seller/logout`
      );

      if (data.success) {
        setIsSeller(null);
        navigate("/");
        toast.success("Logged Out");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };
  const dashboardicon = (
    <svg
      className="w-6 h-6"
      aria-hidden="true"
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      fill="none"
      viewBox="0 0 24 24"
    >
      <path
        stroke="currentColor"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M4 5a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V5Zm16 14a1 1 0 0 1-1 1h-4a1 1 0 0 1-1-1v-2a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2ZM4 13a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v6a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1v-6Zm16-2a1 1 0 0 1-1 1h-4a1 1 0 0 1-1-1V5a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v6Z"
      />
    </svg>
  );

  const overviewicon = (
    <svg
      className="w-6 h-6"
      aria-hidden="true"
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      fill="none"
      viewBox="0 0 24 24"
    >
      <path
        stroke="currentColor"
        strokeLinecap="round"
        strokeWidth="2"
        d="M7.111 20A3.111 3.111 0 0 1 4 16.889v-12C4 4.398 4.398 4 4.889 4h4.444a.89.89 0 0 1 .89.889v12A3.111 3.111 0 0 1 7.11 20Zm0 0h12a.889.889 0 0 0 .889-.889v-4.444a.889.889 0 0 0-.889-.89h-4.389a.889.889 0 0 0-.62.253l-3.767 3.665a.933.933 0 0 0-.146.185c-.868 1.433-1.581 1.858-3.078 2.12Zm0-3.556h.009m7.933-10.927 3.143 3.143a.889.889 0 0 1 0 1.257l-7.974 7.974v-8.8l3.574-3.574a.889.889 0 0 1 1.257 0Z"
      />
    </svg>
  );

  const chaticon = (
    <svg
      className="w-6 h-6"
      aria-hidden="true"
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      fill="none"
      viewBox="0 0 24 24"
    >
      <path
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M7 9h5m3 0h2M7 12h2m3 0h5M5 5h14a1 1 0 0 1 1 1v9a1 1 0 0 1-1 1h-6.616a1 1 0 0 0-.67.257l-2.88 2.592A.5.5 0 0 1 8 18.477V17a1 1 0 0 0-1-1H5a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1Z"
      />
    </svg>
  );

  const sidebarLinks = [
    { name: "Categories", path: "/seller", icon: dashboardicon },
    {
      name: "SubCategories",
      path: "/seller/subcategories",
      icon: overviewicon,
    },
    { name: "Services", path: "/seller/services", icon: chaticon },
    { name: "Orders", path: "/seller/order", icon: chaticon },
  ];

  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-100">
        <div className="flex items-center justify-between px-4 md:px-8 border-b border-gray-300 py-3 bg-primary transition-all duration-300">
          <Link to="/seller">
            <div className="flex flex-row items-center justify-center">
              <img className="h-9" src={images.logo} alt="dummyLogoColored" />
              <h1 className="font-bold text-xl">TaskTribe</h1>
            </div>
          </Link>
          <div className="flex items-center gap-5 text-gray-500">
            <p>Hi! Admin</p>
            <button
              onClick={logout}
              className="border rounded-full text-sm px-4 py-1 cursor-pointer"
            >
              Logout
            </button>
          </div>
        </div>
        <div className="flex">
          <div className="md:w-64 w-16 border-r h-[calc(100vh-60px)] text-base border-gray-300 pt-4 flex flex-col transition-all duration-300">
            {sidebarLinks.map((item) => (
              <NavLink
                to={item.path}
                key={item.name}
                end={item.path === "/seller"}
                className={({ isActive }) => `flex items-center py-3 px-4 gap-3 
                            ${
                              isActive
                                ? "border-r-4 md:border-r-[6px] bg-secondary/10 border-secondary text-secondary"
                                : "hover:bg-gray-100/90 border-white text-gray-700"
                            }`}
              >
                {item.icon}
                <p className="md:block hidden text-center">{item.name}</p>
              </NavLink>
            ))}
          </div>
          <div className="flex-1">
            <Outlet />
          </div>
        </div>
      </div>
    </>
  );
};

export default SellerLayout;
