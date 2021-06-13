// Layout Types
import AdminLayout from '../views/layout/adminLayout';
import FrontendLayout from '../views/layout/frontendLayout';

//Actual Routes
import AdminDashbord from '../views/dashbord';
import Home from '../views/home';
import Login from '../views/login';

export default [
  {
    path: '/', // Path
    layout: FrontendLayout, // Layouts
    component: Home,
    exact: true,
  },
  {
    path: '/login',
    layout: AdminLayout,
    component: Login,
  },
];
