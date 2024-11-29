import React, { Suspense, useState } from "react";
import { Routes, Route } from "react-router-dom";
import { CartProvider } from "./components/cartContext/CartContext";
import LoadingSpinner from "./components/loadingSpinner/LoadingSpinner";
import LogIn from "./components/logIn/LogIn";
import MainPage from "./components/main/Main";

const Header = React.lazy(() => import("./components/header/Header"));
const Footer = React.lazy(() => import("./components/footer/Footer"));
const ErrorPage = React.lazy(() => import("./components/errorPage/ErrorPage"));
const Account = React.lazy(() => import("./components/account/Account"));
const ProtectedRoute = React.lazy(() =>
  import("./components/protectedRoute/ProtectedRoute")
);
const Orders = React.lazy(() => import("./components/account/Orders"));
const EditAccount = React.lazy(() =>
  import("./components/account/EditAccount")
);
const Address = React.lazy(() => import("./components/account/Address"));
const ChangePassword = React.lazy(() =>
  import("./components/account/ChangePassword")
);
const ProductDetail = React.lazy(() =>
  import("./components/products/ProductDetail")
);
const ScrollToTopButton = React.lazy(() =>
  import("./components/scrollToTopButton/ScrollToTopButton")
);
const ScrollToTop = React.lazy(() =>
  import("./components/scrollToTop/ScrollToTop")
);


const App = () => {
  const [showLogin, setShowLogin] = useState(false);
  const [userName, setUserName] = useState("");

  return (
    <CartProvider>
      {showLogin && (
        <LogIn setShowLogin={setShowLogin} setUserName={setUserName} />
      )}
      <Suspense fallback={<LoadingSpinner />}>
        <Header setShowLogin={setShowLogin} />
        <MainPage />
        <ScrollToTop />
        <Routes>
          <Route
            path="/"
            element={
              <>
              </>
            }
          />

          <Route
            path="/mano-paskyra"
            element={
              <ProtectedRoute>
                <Account />
              </ProtectedRoute>
            }
          >
            <Route path="edit-address" element={<Address />} />
            <Route path="edit-account" element={<EditAccount />} />
            <Route path="change-password" element={<ChangePassword />} />
          </Route>
          <Route path="*" element={<ErrorPage />} />
        </Routes>
        <ScrollToTopButton />
        <Footer />
      </Suspense>
    </CartProvider>
  );
};

export default App;
