import { Outlet } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import ScrollToTop from "../ScrollToTop";

const Layout = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <ScrollToTop />
      <Header />

      <main>
        <div className="w-full">
          <Outlet />
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Layout;
