import { createBrowserRouter ,RouterProvider} from 'react-router-dom';
import Layout from './components/layout/Layout';
import Login from './components/login/Login';
import Register from './components/register/register';
 import Product from './components/products/Products';
 import Home from './components/Home/Home';
 import Notfound from './components/notfound/Notfound';
 import Category from './components/category/category';
import Brands from './components/brands/Brands';
import Cart from './components/cart/Cart';
import UserContextProvider from './context/UserContext';
import GardProtect from './components/gard/GardProtect';
import ForgetPassword from './forgetpassword/ForgetPassword';
import ResetPassword from './components/ResetPassword/ResetPassword';
import {
  QueryClient,
  QueryClientProvider,
  
  
} from '@tanstack/react-query'

import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import Details from './components/details/Details';
import Cartcontextprovider from './context/Cartcontext';
import { Provider } from 'react-redux';
import { store } from './redux/store';
import Checkout from './components/checkout/Checkout';
import Washlist from './components/washlist/washlist';
import Orders from './orders/Orders';
import Products from './components/products/Products';
const queryClient = new QueryClient()




function App() {
  let routes=createBrowserRouter([
   {path:'',element: <Layout/>,children:[
    {path:'home',element:<GardProtect><Home/></GardProtect>},
    {path:'cart',element:<GardProtect><Cart/></GardProtect>},
    {path:'brand',element:<GardProtect><Brands/></GardProtect>},
    {path:'prdouctdetails/:id',element:<GardProtect><Details/></GardProtect>},
    {path:'checkout/:id',element:<GardProtect><Checkout/></GardProtect>},
  
    {path:'category',element:<GardProtect><Category/></GardProtect>},
    {path:'washlist',element:<GardProtect><Washlist/></GardProtect>},
    {path:'allorders',element:<GardProtect><Orders/></GardProtect>},
    
    {path:'Product',element:<GardProtect><Products/></GardProtect>},
    {path:'forgetpassword',element:<ForgetPassword/>},

    {index:true,element:<Register/>},
    {path:"register",element:<Register/>},
    
    {path:'Login',element:<Login/>},
    {path:'/restpasswoprd',element:<ResetPassword/>},
    {path:'*',element:<Notfound/>},



   ]}

  ])
  

  return (
    
<Provider  store={store}>


<QueryClientProvider client={queryClient}>
  <ReactQueryDevtools>
  </ReactQueryDevtools>
  <Cartcontextprovider>
    <UserContextProvider>
    <RouterProvider router={routes}>
      <Layout/>

    </RouterProvider>
    

   </UserContextProvider>
   </Cartcontextprovider>

  

 </QueryClientProvider>
</Provider>
    
    
  );
}

export default App;
