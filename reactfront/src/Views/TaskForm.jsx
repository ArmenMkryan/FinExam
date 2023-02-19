import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom"
import axiosClient from "../axiosClient";

export const TaskForm = () => {
    const navigate = useNavigate()
    const {id} = useParams();
    const [task, setTask] = useState({
        id: null,
        task_name:"",
        description:"",
        created_at:"",
        task_status:"",

    });
    const [loading, setLoading] = useState(false)
    const [errors, setErrors] = useState(null)
   
        useEffect(() => {
            setLoading(true) 
            axiosClient.get(`/tasks/ ${id}`)
            .then(({data})=>{
                setLoading(false)
                setTask(data)
            })
            .catch(() => {
                setLoading(false)
            })
        }, [])
    
        const onSubmit = (event) => {
event.preventDefault();
if(task.id){
    axiosClient.put(`/tasks/${task.id}`, task)
    .then(()=>{
        navigate(`/tasks`)
    })
    .catch(err =>{
    
        const response = err.response;
        if(response && response.status === 422){
          setErrors(response.data.errors)
        }
      })    
} else {
    axiosClient.post(`/tasks`, task)
    .then(()=>{
        navigate(`/tasks`)
    })
    .catch(err =>{
    
        const response = err.response;
        if(response && response.status === 422){
          setErrors(response.data.errors)
        }
      })    
}
        }

    return (
        <>
           {task.id && <h1>Update Task: {task.task_name} </h1>}
           {!task.id && <h1>New Task</h1>}
          <div className="card animated fadeInDown">
            {loading && (
                <div className="text-center">loading...</div>
            )}
            {errors && <div className="alert" >
        {Object.keys(errors).map(key=>(
        <p key={key}>{errors[key][0]}</p>
        ))}
        </div>
        }
          {!loading && 
          <form onSubmit={onSubmit}>
<input value={task.task_name} onChange={event => setTask({...task, task_name:event.target.value})} placeholder="Title" />
<input value={task.description} onChange={event => setTask({...task, description:event.target.value})} placeholder="Description" />
<input value={task.created_at} onChange={event => setTask({...task, created_at:event.target.value})} placeholder="Date" />
<input value={task.task_status} onChange={event => setTask({...task, task_status:event.target.value})} placeholder="Status" />
          <button className="btn">Save task</button>
          </form>
}
          </div>
           
        </>
    )
}