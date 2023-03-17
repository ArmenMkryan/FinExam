import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axiosClient from "../axiosClient";

export const TaskPage = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [task, setTask] = useState({
    id: "",
    task_name: "",
    description: "",
    task_date: new Date().toLocaleDateString("en-US"),
    task_status: "",
    created_at: "",
  });

  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState(null);

  useEffect(() => {
    setLoading(true);
    axiosClient
      .get(`/tasks/${task.id}`)
      .then(({ data }) => {
        setLoading(false);
        setTask(data);
        console.log(task, "the ID")
      })
      .catch(() => {
        setLoading(false);
      });
  }, [id]);

  const onSubmit = (event) => {
    event.preventDefault();
    if (task.id) {
      axiosClient
        .put(`/tasks/${task.id}`, task)
        .then(() => {
          navigate(`/tasks`);
        })
        .catch((err) => {
          const response = err.response;
          if (response && response.status === 422) {
            setErrors(response.data.errors);
          }
        });
    } else {
      axiosClient
        .post(`/tasks`, task)
        .then(() => {
          navigate(`/tasks`);
        })
        .catch((err) => {
          const response = err.response;
          if (response && response.status === 422) {
            setErrors(response.data.errors);
          }
        });
    }
  };

  return (
    <>
      {task.id && <h1>Update Task</h1>}
      {!task.id && <h1>New Task</h1>}
      <div className="card animated fadeInDown">
        {loading && <div className="text-center">loading...</div>}
        {errors && (
          <div className="alert">
            {Object.keys(errors).map((key) => (
              <p key={key}>{errors[key][0]}</p>
            ))}
          </div>
        )}
        
            <h2>Task Name: {task.task_name}</h2>
            <hr />
            <br />
           <h2>About Task: {task.description}</h2>
           <hr />
           <br />
              <h2>Task Deadline: {task.task_date}</h2>
              <hr />
              <br />
             <h2>Task Status: {task.task_status}</h2>
             <hr />
             <br />
        
      </div>
    </>
  );
};

// type="select" value={task.task_status} onChange={event => setTask({...task, task_status:event.target.value})} placeholder="Status"
