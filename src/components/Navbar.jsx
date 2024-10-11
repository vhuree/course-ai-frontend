import React from "react";
import { NavLink } from "react-router-dom";
import { useAuth } from "../components/auth/useAuth";
import { useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

export const Navbar = () => {
  const auth = useAuth();
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  return (
    <nav className="navbar-container">
      <ul className="navbar-link">
        <NavLink to="/">
          <li>Home</li>
        </NavLink>
        <NavLink to="/weeklist">
          <li>Weekly List</li>
        </NavLink>
        <NavLink to="/mylist">
          <li>My List</li>
        </NavLink>

        {auth.user && (
          <button
            onClick={() => {
              queryClient.removeQueries();
              auth.logout();
              navigate("/");
            }}
          >
            Logout
          </button>
        )}
      </ul>
    </nav>
  );
};
