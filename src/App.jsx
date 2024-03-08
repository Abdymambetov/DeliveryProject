import React, { useEffect } from "react";
import "./App.scss";
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import MainInfo from "./pages/MainInfo/MainInfo";
import Login from "./pages/Login/Login";
import WelcomePage from "./pages/WelcomePage/WelcomePage";
import MainPage from "./pages/MainPage/MainPage";
import Layout from "./components/hoc/Layout/Layout";
import SearchPage from "./pages/SearchPage/SearchPage";
import CategoriesPage from "./pages/CategoriesPage/CategoriesPage";
import OrdersPage from "./pages/OrdersPage/OrdersPage";
import Account from "./pages/Account/Account";
import DetailedPage from "./pages/DetailedPage/DetailedPage";
import ProductPage from "./pages/ProductPage/ProductPage";
import DeliveryPage from "./pages/DeliveryPage/DeliveryPage";
import { useDispatch, useSelector } from "react-redux";
import OrderListPage from "./pages/OrderListPage/OrderListPage";
import { getDiscounts } from "./store/reducers/requestFoodSlice";
import Preloader from "./components/Preloader/Preloader";
import Alerts from "./components/Alerts/Alerts";

const App = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const { tokenNum, tokenName } = useSelector((state) => state.accountSlice);

  useEffect(() => {
    dispatch(
      getDiscounts("http://kover-site.333.kg/get_discount?code_category=1")
    );
    /// для рекламы
  }, []);

  const { loading, allDataFood } = useSelector(
    (state) => state.requestFoodSlice
  );
  const { loadingList } = useSelector((state) => state.ordersListSlice);
  const { loadingEdit } = useSelector((state) => state.EditDataUser);
  const { pathSite } = useSelector((state) => state.ordersListSlice);
  const { loadingOrder } = useSelector((state) => state.postRequestSlice);
  // const {
  //   sumDishes,
  //   sumOrdersFoods,
  //   positionFoods,
  //   allFoodsOrders,
  //   pathCatalog,
  // } = useSelector((state) => state.statesSlice);

  React.useEffect(() => {
    if (pathSite) {
      navigate("/main");
    }
  }, [pathSite]);
  ///// Для переходя со страниц заказов в main

  React.useEffect(() => {
    pathSite ? navigate("/main") : "";
    if (tokenNum && tokenName) {
      if (
        location.pathname.includes("login") ||
        location.pathname.includes("welcome")
      ) {
        navigate("/main");
      }
      if (
        !location.pathname.includes("main") &&
        !location.pathname.includes("search") &&
        !location.pathname.includes("categories") &&
        !location.pathname.includes("orders") &&
        !location.pathname.includes("detailed") &&
        !location.pathname.includes("product") &&
        !location.pathname.includes("account") &&
        !location.pathname.includes("delivery") &&
        !location.pathname.includes("listorder")
      ) {
        navigate("/main");
      }
    } else {
      if (
        location.pathname.includes("main") ||
        location.pathname.includes("search") ||
        location.pathname.includes("categories") ||
        location.pathname.includes("orders") ||
        location.pathname.includes("detailed") ||
        location.pathname.includes("product") ||
        location.pathname.includes("account") ||
        location.pathname.includes("delivery") ||
        location.pathname.includes("listorder")
      ) {
        navigate("/");
      }
    }
  }, [location.pathname]);

  // console.log(sumDishes, "sumDishes");
  // console.log(sumOrdersFoods, 'sumOrdersFoods');
  // console.log(positionFoods, 'positionFoods');
  // console.log(allFoodsOrders, "allFoodsOrders");
  // console.log(location.pathname, 'location');
  // console.log(loading, 'loading');
  // console.log(loadingList, 'loadingList');
  // console.log(allDataFood, 'allDataFood');
  // console.log(pathCatalog,"pathCatalog");

  return (
    <>
      <Routes>
        <>
          {!!tokenNum && !!tokenName ? (
            <Route path="/" element={<Layout />}>
              <Route path="/main" element={<MainPage />} />
              <Route path="/search" element={<SearchPage />} />
              <Route path="/categories" element={<CategoriesPage />} />
              <Route path="/orders" element={<OrdersPage />} />
              <Route path="/detailed/:id/:estab" element={<DetailedPage />} />
              <Route
                path="/product/:id/:name/:estab/:categ"
                element={<ProductPage />}
              />
              <Route path="/account" element={<Account />} />
              <Route path="/delivery" element={<DeliveryPage />} />
              <Route path="/listorder" element={<OrderListPage />} />
            </Route>
          ) : (
            <>
              <Route path="/" element={<MainInfo />} />
              <Route path="/login" element={<Login />} />
              <Route path="/welcome" element={<WelcomePage />} />
            </>
          )}
        </>
      </Routes>
      {loading && <Preloader />}
      {loadingList && <Preloader />}
      {loadingEdit && <Preloader />}
      {loadingOrder && <Preloader />}
      <Alerts />
    </>
  );
};

export default App;


