import Spinner from "./Spinner";
import { useQuery } from "@apollo/client";
import { GET_TASKS_BY_PROJECT } from "../queries/taskQueries";
import TaskCard from "./TaskCard";

export default function ClientProjects( { projectId }) {
  const { loading, error, data } = useQuery(GET_TASKS_BY_PROJECT, {
    variables: { projectId }
  });

  if (loading) return <Spinner/>;
  if (error) return <p>Something Went Wrong</p>;

  return (
    <>
      { console.log(data)}
      { data.tasksByProjectId.length > 0 ? (
        <div className="row mt-4">
          <h5 className="mt-5">Tasks</h5>
          { data.tasksByProjectId.map(task => (
              <TaskCard key={task.id} task={task} />
          ))}
        </div>) 
        : ''}
    </>
  )
}
