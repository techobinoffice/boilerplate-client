import { useLocation } from "react-router-dom";
import Footer from "./components/footer";
import Navbar from "./components/navbar";
import ScrollToTop from "./components/scroll";
import PageRoutes from "./routes";
import { match } from "path-to-regexp";
import { HelmetProvider } from "react-helmet-async";

const App = () => {
  const location = useLocation();
  // public pages that render inside the Navbar / Footer shell
  const pathsWithNavbar = [
    "/",
    "/login",
    "/register",
    "/forgot-password",
    "/reset-password",
  ];
  const shouldShowNavbar = (pathname: string) => {
    return pathsWithNavbar.some((path) =>
      match(path, { decode: decodeURIComponent })(pathname),
    );
  };

  return (
    <>
      <HelmetProvider>
        {shouldShowNavbar(location.pathname) && <Navbar />}
        <ScrollToTop />
        <PageRoutes />
        {shouldShowNavbar(location.pathname) && <Footer />}
      </HelmetProvider>
    </>
  );
};

export default App;
