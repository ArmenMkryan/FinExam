import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axiosClient from "../axiosClient";
import "./addstyle.css";

export const Tasks = () => {
  const [userTasks, setUserTasks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [isDisabled, setIsDisabled] = useState(false);
  const [task, setTask] = useState(false);

  useEffect(() => {
    getUserTasks();
  }, []);

  const onDelete = (task) => {
    if (!window.confirm("Are you sure you want to delete this task?")) {
      return;
    }
    axiosClient.delete(`tasks/${task.id}`).then(() => {
      getUserTasks();
    });
  };

  const getUserTasks = (page = 1, limit = 5) => {
    setLoading(true);

    axiosClient
      .get("tasks", { params: { page, limit } })
      .then(({ data }) => {
        setUserTasks(data.tasks.data);
        console.log(data.tasks.data);
        const totalTasks = data.tasks.total;
        setTotalPages(Math.ceil(totalTasks / limit));
        if (data.meta) {
          setTotalPages(data.meta.last_page);
        }
        console.log(userTasks, "helooo");
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
    setIsDisabled(true);
    setCurrentPage(page);
    getUserTasks(page);
  };

  const renderPagination = () => {
    const buttons = [];
    const limit = 5;
    const totalTasks = totalPages * limit;
    if (currentPage > totalPages) {
      buttons.push(
        <button key="prev" onClick={() => handlePageChange(currentPage - 1)}>
          Previous
        </button>
      );
    }

    for (let i = 1; i <= totalPages; i++) {
      buttons.push(
        <button
          key={i}
          onClick={() => handlePageChange(i)}
          className={i === currentPage ? "active" : ""}
        >
          {i}
        </button>
      );
    }

    if (currentPage < totalPages) {
      buttons.push(
        <button key="next" onClick={() => handlePageChange(currentPage + 1)}>
          Next{" "}
        </button>
      );
    }

    return buttons;
  };

  return (
    <div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <h1>Tasks</h1>
        <Link to="new" className="btn-add">
          Add new
        </Link>
      </div>
      <div className="card animated fadeInDwn">
        {userTasks && userTasks.length > 0 ? (
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
              {loading && (
                <tbody>
                  <tr>
                    <td colSpan="5" className="text-center">
                      Loading...
                    </td>
                  </tr>
                </tbody>
              )}
              {!loading && (
                <tbody>
                  {userTasks.map((task) => (
                    <tr key={task.id} className={
                      task.task_status === "completed" ? "completed" : "" 
                      || 
                      task.task_status === "pending" ? 'pending': ""} >
                      <td>{task.task_name}</td>
                      <td
                        className={`text-wrapper setlimit ${
                          expanded ? "expand" : ""
                        }`}
                        onClick={handleExpandClick}
                      >
                        {task.description}
                      </td>
                      <td>{task.task_date}</td>
                      <td>
                        {task.task_status}
                      </td>
                      <td>
                        <Link className="btn-edit" to={`/tasks/${task.id}`}>
                          edit
                        </Link>
                        &nbsp;
                        <button
                          onClick={(event) => onDelete(task)}
                          className="btn-delete"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              )}
            </table>
            {totalPages > 1 && (
              <div className="pagination ">
                <button
                  onClick={() =>
                    handlePageChange(
                      currentPage > 1 ? currentPage - 1 : currentPage
                    )
                  }
                  disabled={currentPage <= 1}
                >
                  Previous
                </button>

                {Array.from({ length: totalPages }, (_, index) => (
                  <button
                    key={index + 1}
                    className={
                      currentPage === index + 1
                        ? "active"
                        : "pagination page-link page-link"
                    }
                    onClick={() => handlePageChange(index + 1)}
                  >
                    {index + 1}
                  </button>
                ))}
                <button
                  onClick={() =>
                    handlePageChange(
                      currentPage ? currentPage + 1 : currentPage
                    )
                  }
                  disabled={currentPage >= totalPages}
                >
                  Next
                </button>
              </div>
            )}
          </>
        ) : (
          <p>No tasks found.</p>
        )}
      </div>
    </div>
  );
};
