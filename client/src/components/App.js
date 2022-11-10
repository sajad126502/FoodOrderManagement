import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './Header';
import Home from './Home';
import Signin from './Signin';
import Signup from './Signup';
import NotFound from './NotFound';
import AdminDashboard from './AdminDashboard';
import UserDashboard from './UserDashboard';
import AdminEditProduct from './AdminEditProduct';
import Shop from './Shop';
import Cart from './Cart';
import Product from './Product';
import Shipping from './Shipping';
import Payment from './Payment';
import OrderSummary from './OrderSummary';
import ViewAdminOrders from './ViewAdminOrders';
import AdminOrderDetailView from './AdminOrderDetailView';
import UserOrderdProducts from './UserOrderdProducts';
import Footer from './Footer';


const App = () => {
  return (
  <BrowserRouter>
    <Header />
    <main style={{ marginTop: "85px"}}>
      <Routes>
        <Route exact path="/" element={<Home></Home>} />
        <Route exact path="/shop" element={<Shop></Shop>} />
        <Route exact path="/orders" element={<UserOrderdProducts></UserOrderdProducts>} />
        <Route exact path="/cart" element={<Cart></Cart>} />
        <Route exact path="/product/:productId" element={<Product></Product>} />
        <Route exact path="/shipping" element={<Shipping></Shipping>} />
        <Route exact path="/orderSummary" element={<OrderSummary></OrderSummary>} />
        <Route exact path="/payment" element={<Payment></Payment>} />
        <Route exact  path="/signin" element={<Signin></Signin>} />
        <Route exact  path="/signup" element={<Signup></Signup>} />
        <Route exact  path="/admin/dashboard" element={<AdminDashboard></AdminDashboard>} />
        <Route exact  path="/admin/dashboard/vieworders" element={<ViewAdminOrders></ViewAdminOrders>} />
        <Route exact  path="/admin/dashboard/vieworders/view/:id" element={<AdminOrderDetailView></AdminOrderDetailView>} />
        <Route exact  path="/user/dashboard" element={<UserDashboard></UserDashboard>} />
        <Route exact  path="/admin/edit/product/:productId" element={<AdminEditProduct></AdminEditProduct>} />
        <Route exact path="*" element={<NotFound></NotFound>} />
      </Routes>

      <Footer />
    </main>
  </BrowserRouter>
  )
};

export default App;
