import { createBrowserRouter } from "react-router-dom";
import { DefaultLayout } from "./DefaultLayout";
import { GuestLayout } from "./GuestsLayout";
import Login from "../Views/login.jsx";
import { Register } from "../Views/Register/Register.jsx";
import { Tasks } from "../Views/tasks.jsx";
import { NotFound } from "../Views/NotFound";
import { TaskForm } from "../Views/TaskForm";
import { TaskPage } from "../Views/taskPage";


export const router = createBrowserRouter ([
   
    {
    path:'/',
    element: <DefaultLayout/>,
    children: [
        {                                       
            path:'/tasks',
            element: <Tasks key="taskCreate"/>
        },
        {                                       
            path:'new',
            element: <TaskForm key="taskUpdate"/>
        },
        {                                       
            path:'/tasks/:id',
            element: <TaskForm/>
        },
        {                                       
            path:'/tasks/page',
            element: <TaskPage/>
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