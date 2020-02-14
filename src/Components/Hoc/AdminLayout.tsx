import React, { FC } from "react";
import { AdminNav } from "../Admin/nav/AdminNav";

export interface IAdminLayoutProps {}
const AdminLayout: FC<IAdminLayoutProps> = props => {
  return (
    <div className="admin_container">
      <div className="admin_left_nav">
        <AdminNav></AdminNav>
      </div>
      <div className="admin_right">{props.children}</div>
    </div>
  );
};
export default AdminLayout;
