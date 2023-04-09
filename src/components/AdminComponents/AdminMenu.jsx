import React from "react";
import { NavLink } from "react-router-dom";

const AdminMenu = () => {
  return (
    <>
      <div className="text-center mb-6">
        <div class="list-group">
          <NavLink
            to="/dashboard"
            className="list-group-item list-group-item-action"
          >
            Dashboard
          </NavLink>
          <NavLink
            to="/manage-user-admin"
            className="list-group-item list-group-item-action"
          >
            Users
          </NavLink>
          <NavLink
            to="/manage-category-admin"
            className="list-group-item list-group-item-action"
          >
            Category
          </NavLink>
          <NavLink
            to="/manage-role-admin"
            className="list-group-item list-group-item-action"
          >
            Role
          </NavLink>
          <NavLink
            to="/manage-idea-admin"
            className="list-group-item list-group-item-action"
          >
            Idea
          </NavLink>
          <NavLink
            to="/manage-sub-admin"
            className="list-group-item list-group-item-action"
          >
            Submission
          </NavLink>
        </div>
      </div>
    </>
  );
};

export default AdminMenu;
