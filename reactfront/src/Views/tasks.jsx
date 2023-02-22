import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './addstyle.css';

export const Tasks = () => {
  const [userTasks, setUserTasks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    getUserTasks();
  }, []);

  const onDelete = (task) => {
    if (!window.confirm("Are you sure you want to delete this task?")) {
      return;
    }
    axios.delete(`/api/tasks/${task.id}`)
      .then(() => {
        getUserTasks();
      });
  };

  const getUserTasks = (page = 1) => {
    setLoading(true);
    axios.get('/api/tasks', { params: { page } })
      .then(({ data }) => {
        setUserTasks(data);
        setTotalPages(data.meta.last_page);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  };

  const handleExpandClick = (event) => {
    event.stopPropagation();
    setExpanded(!expanded);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
    getUserTasks(page);
  };

  const renderPagination = () => {
    const buttons = [];
    if (currentPage > 1) {
      buttons.push(
        <button key="prev" onClick={() => handlePageChange(currentPage - 1)}>Previous</button>
      );
    }
    
    if (currentPage < totalPages) {
      buttons.push(
        <button key="next" onClick={() => handlePageChange(currentPage + 1)}>Next</button>
      );
    }
    return buttons;
  };

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h1>Tasks</h1>
        <Link to="new" className='btn-add'>Add new</Link>
      </div>
      <div className='card animated fadeInDwn'>
        {userTasks.length ? (
          <>
            <table>
              <thead>
                <tr>
                  <th>Task Name</th>
                  <th>Description</th>
                  <th>Task Date</th>
                  <th>Task Status</th>
                  <th>Action</th>
                </tr>
              </thead>
              {loading && <tbody>
                <tr>
                  <td colSpan='5' className='text-center'>
                    Loading...
                  </td>
                </tr>
              </tbody>}
              {!loading && <tbody>
                {userTasks.map(task => (
                  <tr key={task.id}>
                    <td>{task.task_name}</td>
                    <td className={`text-wrapper setlimit ${expanded ? 'expand' : ''}`} onClick={handleExpandClick}>{task.description}</td>
                    <td>{task.task_date}</td>
                    <td>{task.task_status}</td>
                    <td>
                      <Link className="btn-edit" to={`/tasks/${task.id}`}>edit</Link>
                      &nbsp;
                      <button onClick={event => onDelete(task)} className="btn-delete">Delete</button>
                   

                    </td>
                  </tr>
                ))}
                 
              </tbody>}
            </table>
            {totalPages > 1 && (
              <div className="pagination">
                {Array.from({ length: totalPages }, (_, index) => (
                  <button  
                    key={index + 1}
                    className={currentPage === index + 1 ? 'active' : 'pagination page-link page-link' }
                    onClick={() => handlePageChange(index + 1)}
                  >  
                    {index + 1}
                    
                  </button>
                ))}
              </div>
            )}
             
          </>
        ) : (
          <p>No tasks found.</p>
        )}{renderPagination()}
      </div>
    </div>
    );
}


