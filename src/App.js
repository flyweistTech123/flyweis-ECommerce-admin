/** @format */

import { Routes, Route } from "react-router-dom";
import MSG from "./components/vendorPanel/components/pages/Message/Message";
import VendorLogin from "./components/vendorPanel/components/forms/VendorLogin";
import VendorDashboard from "./components/vendorPanel/components/pages/VendorDashboard";
import Users from "./components/vendorPanel/components/pages/Users/Users";
import PendingProduct from "./components/vendorPanel/components/pages/Products/PendingProduct";
import ApprovedProduct from "./components/vendorPanel/components/pages/Products/ApprovedProduct";
import Category from "./components/vendorPanel/components/pages/Category/Category";
import Order from "./components/vendorPanel/components/pages/Orders/Order";
import Ban from "./components/vendorPanel/components/pages/Ban/Ban";
import Coupon from "./components/vendorPanel/components/pages/Coupon/Coupon";
import Complaint from "./components/vendorPanel/components/pages/Complaint/Complaint";
import Vendor from "./components/vendorPanel/components/pages/Vendors/Vendor";
import Privacy from "./components/vendorPanel/components/pages/Products/Privacy";
import Terms from "./components/vendorPanel/components/pages/Products/Terms";
import SubAdmin from "./components/vendorPanel/components/pages/Category/SubAdmin";
import DeliveryPartner from "./components/vendorPanel/components/pages/DeliveryPartner";
import DeliveryOrder from "./components/vendorPanel/components/pages/DeliveryOrder";
import { ReactNotifications } from "react-notifications-component";
import Sub from "./components/vendorPanel/components/pages/SubCategory/Sub";
import Wallet from "./components/vendorPanel/components/pages/Wallet/Wallet";
import Payment from "./components/vendorPanel/components/pages/Payment/Payment";
import Refer from "./components/vendorPanel/components/pages/Refer/Refer";
import Login from "./components/forms/Login";
import Dashboard from "./components/pages/Dashboard";
import VenderProduct from "./components/pages/Product/VenderProduct";
import Vendor_Category from "./components/pages/categories/Vendor_Category";
import Vendor_sub_category from "./components/pages/Subcategory/Vendor_sub_category";
import Vendor_Order from "./components/pages/Order/Vendor_Order";
import Single_order_product from "./components/pages/Order/Single_order_product";
import VendorRegister from "./components/vendorPanel/components/forms/VendorRegister";
import NewResigter from "./components/forms/NewResigter";
import PendingVendor from "./components/vendorPanel/components/pages/PendingVendor/PendingVendor";
import AproveVendor from "./components/vendorPanel/components/pages/ApproveVendor/AproveVendor";
import UpdateAdminProFile from "./components/vendorPanel/components/forms/UpdateAdminProFile";
import Payment_gateway from "./components/vendorPanel/components/pages/Gateway_Payment/Payment_gateway";
import ShiprocketCredentials from "./components/vendorPanel/components/pages/Shiprocket Credentials/ShiprocketCredentials";
import Complainttickets from "./components/vendorPanel/components/pages/Complaint tickets/Complainttickets";
import RefundOrders from "./components/vendorPanel/components/pages/Refund Orders/RefundOrders";

function App() {
  return (
    <>
      <ReactNotifications />
      <Routes>
        <Route path="/" element={<VendorLogin />} />
        <Route path="/adminRegister" element={<VendorRegister />} />
        <Route path="/updateadminprofile" element={<UpdateAdminProFile />} />
        <Route path="/vendorDashboard" element={<VendorDashboard />} />
        <Route path="/pendingVendor" element={<PendingVendor />} />
        <Route path="/approveVendor" element={<AproveVendor />} />
        <Route path="/users" element={<Users />} />
        <Route path="/ban" element={<Ban />} />
        <Route path="/subAdmin" element={<SubAdmin />} />
        <Route path="/category" element={<Category />} />
        <Route path="/subcategory" element={<Sub />} />
        <Route path="/wallet" element={<Wallet />} />
        <Route path="/payment" element={<Payment />} />
        <Route path="/refer" element={<Refer />} />
        <Route path="/pendingproduct" element={<PendingProduct />} />
        <Route path="/approvegproduct" element={<ApprovedProduct />} />
        <Route path="/msg" element={<MSG />} />
        <Route path="/dis" element={<Coupon />} />
        <Route path="/complaint" element={<Complaint />} />
        <Route path="/order" element={<Order />} />
        <Route path="/deliveryPartner" element={<DeliveryPartner />} />
        <Route path="/deliveryOrder/:id" element={<DeliveryOrder />} />
        <Route path="/privacy" element={<Privacy />} />
        <Route path="/term" element={<Terms />} />
        {/* vender panel */}
        <Route path="/vendorLogin" element={<Login />} />
        <Route path="/vendorNewRegister" element={<NewResigter />} />
        <Route path="/adminDashboard" element={<Dashboard />} />
        <Route path="/venderProduct" element={<VenderProduct />} />
        <Route path="/vendorCategory" element={<Vendor_Category />} />
        <Route path="/vendorSubCategory" element={<Vendor_sub_category />} />
        <Route path="/VendorOrder" element={<Vendor_Order />} />
        <Route path="/payment_gateway" element={<Payment_gateway />} />
        <Route path="/shiprocketcredentials" element={<ShiprocketCredentials />} />
        <Route path="/complainttickets" element={<Complainttickets />} />
        <Route path="/refundorders" element={<RefundOrders />} />
        <Route
          path="/vendor_single_order_page/:id"
          element={<Single_order_product />}
        />
      </Routes>
    </>
  );
}

export default App;
