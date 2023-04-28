import React from "react";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import Navbar from "@/components/admin/navbar";
import Sidebar from "@/components/admin/sidebar";
import Footer from "@/components/admin/footer/Footer";
import adminRoutes from "@/routes/protected/admin/routes/routes";


export default function Admin(props) {
  const { ...rest } = props;
  const location = useLocation();
  const [open, setOpen] = React.useState(true);
  const [currentRoute, setCurrentRoute] = React.useState("Main Dashboard");

  React.useEffect(() => {
    window.addEventListener("resize", () =>
      window.innerWidth < 1200 ? setOpen(false) : setOpen(true)
    );
  }, []);
  React.useEffect(() => {
    getActiveRoute(adminRoutes);
  }, [location.pathname]);

  const getActiveRoute = (adminRoutes) => {
    let activeRoute = "Main Dashboard";
    for (let i = 0; i < adminRoutes.length; i++) {
      if (
        window.location.href.indexOf(
          adminRoutes[i].layout + "/" + adminRoutes[i].path
        ) !== -1
      ) {
        setCurrentRoute(adminRoutes[i].name);
      }
    }
    return activeRoute;
  };
  const getActiveNavbar = (adminRoutes) => {
    let activeNavbar = false;
    for (let i = 0; i < adminRoutes.length; i++) {
      if (
        window.location.href.indexOf(adminRoutes[i].layout + adminRoutes[i].path) !== -1
      ) {
        return adminRoutes[i].secondary;
      }
    }
    return activeNavbar;
  };
  const getRoutes = (adminRoutes) => {
    return adminRoutes.map((prop, key) => {
      if (prop.layout === "/admin") {
        return (
          <Route path={`/${prop.path}`} element={prop.component} key={key} />
        );
      } else {
        return null;
      }
    });
  };

  document.documentElement.dir = "ltr";
  return (
    <div className="flex h-full w-full">
      <Sidebar open={open} onClose={() => setOpen(false)} />
      {/* Navbar & Main Content */}
      <div className="h-full w-full bg-lightPrimary dark:!bg-navy-900">
        {/* Main Content */}
        <main
          className={`mx-[12px] h-full flex-none transition-all md:pr-2 xl:ml-[313px]`}
        >
          {/* Routes */}
          <div className="h-full">
            <Navbar
              onOpenSidenav={() => setOpen(true)}
              logoText={"logo text"}
              brandText={currentRoute}
              secondary={getActiveNavbar(adminRoutes)}
              {...rest}
            />
            <div className="pt-5s mx-auto mb-auto h-full min-h-[84vh] p-2 md:pr-2">
              <Routes>
                {getRoutes(adminRoutes)}
                <Route path="/" element={<Navigate to="/admin/default" replace />}/>
              </Routes>
            </div>
            <div className="pt-3">
              <Footer />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
