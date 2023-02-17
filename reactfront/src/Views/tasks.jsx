import React from 'react';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axiosClient from '../axiosClient';


export const Tasks = () => {
  const [tasks, setTasks] = useState([]);
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        getTasks()
    }, [])
    const getTasks = () => {
      setLoading(true)
      axiosClient.get('/tasks')
          .then(({data}) => {
              setTasks(data)
              setLoading(false)
          })
          .catch((error) => {
              console.log(error)
              setLoading(false)
          })
  }
    return (
        <div>
          <div style={{display:'flex',justifyContent:'space-between', alignItems:'center'}}>
          <h1>Tasks</h1>
          <Link to="new" className='btn-add'>Add new</Link>
          </div>
          <div className='card animated fadeInDwn'>
            <table>
              <thead>
                <tr>
                  <th>Task</th>
                  <th>Title</th>
                  <th>Description</th>
                  <th>Created</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {tasks.map(task => (
                  <tr key={task.id}>
                    <td>{task.id}</td>
                    <td>{task.task_name}</td>
                    <td>{task.description}</td>
                    <td>{task.created_at}</td>
                    <td>{task.task_status}</td>
                    <td><Link to={'/tasks/' + task.id}>edit</Link></td>
                    <button  className="btn-delete">Delete</button>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
    );
  }

