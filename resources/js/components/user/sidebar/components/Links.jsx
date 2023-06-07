import React from "react";
import { Link, useLocation } from "react-router-dom";
import DashIcon from "@/components/admin/icons/DashIcon";
import {selectCurrentUserToken} from "@/store/auth/authSlice";
import {useSelector} from "react-redux";

export function SidebarLinks(props) {
  let location = useLocation();

  const { routes } = props;

    const activeRoute = (routeName) => {
        return routeName === "" ? location.pathname === "/" : location.pathname.includes(routeName);
    };
    const token = useSelector(selectCurrentUserToken)
    const createLinks = (routes) => {
    return routes.map((route, index) => {
      if (!route.hidden && (route.auth === false || (route.auth === true && token))) {
        return (
          <Link key={index} to={route.layout + "/" + route.path}>
            <div className="relative mb-3 flex hover:cursor-pointer">
              <li
                className="my-[3px] flex cursor-pointer items-center px-8"
                key={index}
              >
                <span
                  className={`${
                    activeRoute(route.path) === true
                      ? "font-bold text-brand-500 dark:text-white"
                      : "font-medium text-gray-600"
                  }`}
                >
                  {route.icon ? route.icon : <DashIcon />}{" "}
                </span>
                <p
                  className={`leading-1 ml-4 flex ${
                    activeRoute(route.path) === true
                      ? "font-bold text-navy-700 dark:text-white"
                      : "font-medium text-gray-600"
                  }`}
                >
                  {route.name}
                </p>
              </li>
              {activeRoute(route.path) ? (
                <div className="absolute right-0 top-px h-9 w-1 rounded-lg bg-brand-500 dark:bg-brand-400" />
              ) : null}
            </div>
          </Link>
        );
      }
    });
  };
  // BRAND
  return createLinks(routes);
}

export default SidebarLinks;
