import { createBrowserRouter } from "react-router-dom";
import { DefaultLayout } from "./DefaultLayout";
import { GuestLayout } from "./GuestsLayout";
import Login from "../Views/login.jsx";
import { Register } from "../Views/Register/Register.jsx";
import { Users } from "../Views/users.jsx";
import { NotFound } from "../Views/NotFound";
import { TaskForm } from "../Views/TaskForm";


export const router = createBrowserRouter ([
   
    {
    path:'/',
    element: <DefaultLayout/>,
    children: [
        {                                       
            path:'/users',
            element: <Users key="taskCreate"/>
        },
        {                                       
            path:'/users/new',
            element: <TaskForm key="taskUpdate"/>
        },
        {                                       
            path:'/users/:id',
            element: <TaskForm/>
        },
    ] 
},
    {
    path:'/',
    element: <GuestLayout/>,
    children: [
        {
            path:'/login',
            element: <Login/>
        },
           {
            path:'/register',
            element: <Register/>
        },
    ]
},
    
   
   {
    path:'*',
    element: <NotFound />
},
])