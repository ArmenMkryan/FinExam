import {Outlet} from 'react-router-dom'
import { useStateContext } from '../contexts/ContextProvider'
import { Navigate } from 'react-router-dom'

export const GuestLayout = () => {
const {token} =useStateContext()
if(token) {
    return <Navigate to="/" />
}

    return (
        
        <div>
        <h1>GuestLay</h1>
        <Outlet/>
        </div>
    )
}