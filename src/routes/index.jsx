import Dashboard from "../pages/dashboard";
import Gate from "../pages/gate";
import Login from "../pages/login";
import Report from "../pages/report";

const routes = [
    {
        path: '/login',
        element: <Login />
    },
    {
        path: '/',
        element: <Dashboard />
    },
    {
        path: '/gate',
        element: <Gate />
    },
    {
        path: '/report',
        element: <Report />
    },
]

export default routes