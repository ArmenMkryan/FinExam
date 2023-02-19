import React from 'react';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axiosClient from '../axiosClient';
import './addstyle.css';

export const Tasks = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [expanded, setExpanded] = useState(false);



  useEffect(() => {
    getTasks();
  }, []);

  const onDelete = (task) => {
    if(!window.confirm("Are you sure you want to delete this task?")){
      return 
    }
        axiosClient.delete(`/tasks/${task.id}`)
        .then(() => {
          getTasks()
        })  } 

  const getTasks = () => {
    setLoading(true);
    axiosClient.get('/tasks')
      .then(({data}) => {
        setTasks(data.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }

  function handleExpandClick(event) {
    event.stopPropagation();
    setExpanded(!expanded);
  }

  return (
    <div>
      <div style={{display:'flex',justifyContent:'space-between', alignItems:'center'}}>
        <h1>Tasks</h1>
        <Link to="new" className='btn-add'>Add new</Link>
      </div>
      <div className='card animated fadeInDwn'>
        {tasks.length ? (
          <table>
            <thead>
              <tr >
                <th>Task</th>
                <th>Title</th>
                <th>Description</th>
                <th>Created</th>
                <th>Status</th>
              </tr>
            </thead>
            {loading && <tbody>
              <tr>
                <td colSpan='5' className='text-center'>
Loading...
                </td>
              </tr>
            </tbody>
}
           {!loading && <tbody>
              {tasks.map(task => (
                <tr key={task}>
                  <td>{task.id}</td>
                  <td>{task.task_name}</td>
                  <td className={`text-wrapper setlimit ${expanded ? 'expand' : ''}`} onClick={handleExpandClick}>{task.description}</td>
                  <td>{task.created_at}</td>
                  <td>{task.task_status}</td>
                  <td>
                    <Link className="btn-edit" to={'/tasks/' + task.id}>edit</Link>
                    &nbsp;
                    <button onClick={event => onDelete(task)} className="btn-delete">Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
         }
         </table>
        ) : (
          <p>No tasks found.</p>
        )}
      </div>
    </div>
  );
}
