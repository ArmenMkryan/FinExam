import { useEffect, useState } from "react"
import axiosClient from "../axiosClient";

export const Tasks = () => {
    const [tasks, setTasks] = useState([]);
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        getUsers()
    }, [])
    getTasks = () => {
        loading(true)
        axiosClient.get('/tasks')
        .then(({data}) => {
            setLoading(false)
            console.log(data)
        })
        .catch(() => {
            setLoading(false)
        })
    }
    return (
        <div>
<div>
    <h1>Tasks</h1>
    
</div>
        </div>
    )
}