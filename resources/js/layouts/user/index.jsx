import React from "react";
import {Routes, Route, Navigate, useLocation, useNavigate} from "react-router-dom";
import UserNavbar from "@/components/user/navbar";
import Footer from "@/components/admin/footer/Footer";
import userRoutes from "@/routes/protected/user/routes/routes";
import RequireAuth from "@/routes/protected/user";
import UserSidebar from "@/components/user/sidebar";


export default function User(props) {
    const { ...rest } = props;
    const location = useLocation();
    const [open, setOpen] = React.useState(true);
    const [currentRoute, setCurrentRoute] = React.useState("Home");
    React.useEffect(() => {
        window.addEventListener("resize", () =>
            window.innerWidth < 1200 ? setOpen(false) : setOpen(true)
        );
    }, []);
    React.useEffect(() => {
        getActiveRoute(userRoutes);
    }, [location.pathname]);

    const getActiveRoute = (userRoutes) => {
        let activeRoute = "Home";
        for (let i = 0; i < userRoutes.length; i++) {
            if (
                window.location.href.indexOf(
                    userRoutes[i].layout + "/" + userRoutes[i].path
                ) !== -1
            ) {
                setCurrentRoute(userRoutes[i].name);
            }
        }
        return activeRoute;
    };
    const getActiveNavbar = (userRoutes) => {
        let activeNavbar = false;
        for (let i = 0; i < userRoutes.length; i++) {
            if (
                window.location.href.indexOf(userRoutes[i].layout + userRoutes[i].path) !== -1
            ) {
                return userRoutes[i].secondary;
            }
        }
        return activeNavbar;
    };
    const getRoutes = (userRoutes) => {
        return userRoutes.map((prop, key) => {
            if (prop.layout === "") {
                return prop.auth ? (
                    <Route path={`/${prop.path}`} element={<RequireAuth>{prop.component}</RequireAuth>} key={key} />
                ) : (
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
            <UserSidebar open={open} onClose={() => setOpen(false)} />
            {/* Navbar & Main Content */}
            <div className="h-full w-full bg-lightPrimary dark:!bg-navy-900">
                {/* Main Content */}
                <main
                    className={`mx-[12px] h-full flex-none transition-all md:pr-2 xl:ml-[313px]`}
                >
                    {/* Routes */}
                    <div className="h-full">
                        <UserNavbar
                            onOpenSidenav={() => setOpen(true)}
                            logoText={"logo text"}
                            brandText={currentRoute}
                            secondary={getActiveNavbar(userRoutes)}
                            {...rest}
                        />
                        <div className="pt-5s mx-auto mb-auto h-full min-h-[84vh] p-2 md:pr-2">
                            <Routes>
                                {getRoutes(userRoutes)}
                                <Route path="/" element={<Navigate to="/" replace />}/>
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
