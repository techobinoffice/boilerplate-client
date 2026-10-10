import { useEffect, useState } from "react";
import Sidebar from "../Sidebar";
import Header from "../Header";
import { Outlet, useNavigate } from "react-router-dom";
import { getStoredUser } from "../../utils/auth";
import { User } from "../../types/user";

const DefaultLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const navigate = useNavigate();
  const parsedUser = getStoredUser();
  const isLoggedIn = !!parsedUser;

  useEffect(() => {
    if (!isLoggedIn) {
      navigate("/login");
    }
  }, [isLoggedIn, navigate]);

  if (!parsedUser) return null;

  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
        user={parsedUser.user || ({} as User)}
      />

      {/* <!-- ===== Content Area Start ===== --> */}
      <div className="relative flex flex-1 flex-col overflow-y-auto overflow-x-hidden">
        {/* <!-- ===== Header Start ===== --> */}
        <Header
          sidebarOpen={sidebarOpen}
          setSidebarOpen={setSidebarOpen}
          user={parsedUser.user}
        />
        {/* <!-- ===== Header End ===== --> */}

        {/* <!-- ===== Main Content Start ===== --> */}
        <main>
          <div className="mx-auto max-w-screen-2xl p-4 md:p-6 2xl:p-10">
            <Outlet />
          </div>
        </main>
        {/* <!-- ===== Main Content End ===== --> */}
      </div>
    </div>
  );
};

export default DefaultLayout;
