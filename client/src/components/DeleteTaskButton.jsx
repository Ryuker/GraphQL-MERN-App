import { useNavigate } from "react-router-dom";
import { FaTrash } from "react-icons/fa";
import { GET_TASKS } from "../queries/taskQueries";
import { DELETE_TASK } from "../mutations/taskMutations";
import { useMutation } from "@apollo/client";

export default function DeleteTaskButton( { taskId } ){
  const navigate = useNavigate();

  const [ deleteTask ] = useMutation(DELETE_TASK, {
    variables: { id: taskId }, 
    onCompleted: () => navigate('/'),
    refetchQueries: [ { query: GET_TASKS } ]
  });

  return  (
    <div className="d-flex mt-5 ms-auto">
      <button className="btn btn-danger m-2" onClick={deleteTask}>
        <FaTrash className="icon"/>Delete Task
      </button>
    </div>
  )


}