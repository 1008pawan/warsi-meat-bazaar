import { Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import Layout from "./components/layout/Layout";
import ScrollToTop from "./components/ScrollToTop";

import Home from "./components/pages/home/Home";
import About from "./components/pages/about/About";
import Stores from "./components/pages/store/Stores";
import OffersPage from "./components/pages/offers/Offers";
import Contact from "./components/pages/contact/Contact";
import DownloadAppPage from "./components/pages/appdownload/DownloadAppPage";
import Policy from "./components/pages/policy/Policy";
import Conditions from "./components/pages/conditions/Conditions";
import ShippingNrefund from "./components/pages/shipping&refund/Shipping-refund";
import FranchisePage from "./components/pages/franchise/Franchise";
import ProductsPage from "./components/pages/products/ProductsPage";
import CategoryPage from "./components/pages/products/CategoryPage";

// Admin
import AdminLayout from "./admin/layout/AdminLayout";
import Login from "./admin/auth/Login";
import Dashboard from "./admin/pages/dashboard/Dashboard";
import AdminProfile from "./admin/pages/AdminProfile";
import Revenue from "./admin/pages/dashboard/Revenue";
import Analytics from "./admin/pages/dashboard/Analytics";
import AllOrders from "./admin/pages/AllOrders";
import ManageStore from "./admin/pages/ManageStore";
import DeliveryAgent from "./admin/pages/ManageDeliveryAgent/DeliveryAgent"
import RegisterDeliveryAgent from "./admin/pages/ManageDeliveryAgent/RegisterDeliveryAgent";



function App() {
  return (
    <>
      <Toaster position="top-right" reverseOrder={false} />
      <ScrollToTop />
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="about" element={<About />} />
          <Route path="stores" element={<Stores />} />
          <Route path="/offers" element={<OffersPage />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/app" element={<DownloadAppPage />} />
          <Route path="/policy" element={<Policy />} />
          <Route path="/conditions" element={<Conditions />} />
          <Route path="/shipping-refund" element={<ShippingNrefund />} />
          <Route path="/franchise" element={<FranchisePage />} />
          <Route path="/product/:id" element={<ProductsPage />} />
          <Route path="/category/:categoryName" element={<CategoryPage />} />
        </Route>

        {/* Admin Login */}
        <Route path="/admin/login" element={<Login />} />

        {/* Admin Panel */}
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="adminprofile" element={<AdminProfile />} />
          <Route path="analytics" element={<Analytics />} />
          <Route path="revenue" element={<Revenue />} />
          <Route path="allorders" element={<AllOrders />} />
          <Route path="stores" element={<ManageStore />} />
          <Route path="manege-delivery-agent" element={<DeliveryAgent />} />
          <Route path="register-delivery-agent" element={<RegisterDeliveryAgent />} />

        </Route>
      </Routes>
    </>
  );
}

export default App;
