import React from "react";
import { FC } from "react";
import AdminLayout from "../Hoc/AdminLayout";

export interface IDashBoard {}

const DashBoard: FC<IDashBoard> = () => {
  return (
    <AdminLayout>
      <div className="user_dashboard">DashBoard</div>;
    </AdminLayout>
  );
};
export default DashBoard;
