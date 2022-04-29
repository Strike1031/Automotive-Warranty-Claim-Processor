import LoginPage from "views/Pages/LoginPage.jsx";
import LogoutPage from "views/Pages/LogoutPage.jsx";
import RepairOrderListAdmin from "views/RepairOrders/RepairOrderListAdmin";
import RepairOrderList from "views/RepairOrders/RepairOrderList";
import AddRepairOrder from "views/RepairOrders/AddRepairOrder";
import { loadFromLocalStorage } from 'redux/reducers/auth'

export const routes = [
  {
    path: "/dashboard/archive",
    layout: "/frontend/admin",
    name: "Archive Repair Order",
    icon: "pe-7s-graph",
    category: ["admin",],
    component: RepairOrderListAdmin
  },  
  {
    path: "/dashboard",
    layout: "/frontend/dealership",
    name: "Dashboard",
    icon: "pe-7s-graph",
    category: ["dealership",],
    component: RepairOrderList
  },
  {
    path: "/upload_pdf",
    layout: "/frontend/dealership",
    name: "Upload Repair Order",
    icon: "pe-7s-note2",
    category: [],
    component: AddRepairOrder
  },
  {
    path: "/login-page",
    layout: "/frontend/auth",
    name: "Login",
    icon: "pe-7s-users",
    category: [],
    component: LoginPage
  },
  {
    path: "/logout-page",
    layout: "/frontend/auth",
    name: "Log out",
    icon: "pe-7s-next-2",
    category: ["admin", "dealership",],
    component: LogoutPage
  },
];

export const admin_routes = [{
  path: "/dashboard/blank_dashboard",
  layout: "/frontend/admin",
  key: "blank_dashboard",
  name: "Dashboard",
  icon: "pe-7s-graph",
  category: ["admin",],
  component: RepairOrderListAdmin
}].concat(loadFromLocalStorage('dealerships')?.map(d => ({
  path: "/dashboard/" + d.name,
  layout: "/frontend/admin",
  key: d.name,
  name: d.name,
  icon: "pe-7s-graph",
  category: ["admin",],
  component: RepairOrderListAdmin
}))).concat(routes);

