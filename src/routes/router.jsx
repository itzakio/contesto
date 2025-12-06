import { createBrowserRouter } from "react-router";
import RootLayout from "../Layouts/RootLayout";
import AllContests from "../pages/AllContests/AllContests";
import Home from "../pages/home/Home";

const router = createBrowserRouter([
    {
        path: '/',
        element: <RootLayout/>,
        children: [
            {
                index: true,
                element: <Home/>
            },
            {
                path: '/all-contests',
                element: <AllContests/>
            }
        ]
    }
])

export default router;