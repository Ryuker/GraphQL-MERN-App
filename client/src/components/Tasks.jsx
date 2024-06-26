import Spinner from "./Spinner";
import { useQuery } from "@apollo/client";
import { GET_TASKS } from "../queries/taskQueries";
import TaskCard from "./TaskCard";

export default function Tasks() {
  const { loading, error, data } = useQuery(GET_TASKS);
  
  if (loading) return <Spinner />;
  if (error) return <p> Something Went Wrong</p>;

  return (
    <>
      {data.tasks.length > 0 ? (
        <div className="row mt-4">
          <h5>Tasks</h5>
          { data.tasks.map(task => (
            <TaskCard key={task.id} task={task} />
          ))}
        </div>
      )
      : (<p>No Tasks</p>)}
    </>
  )
}