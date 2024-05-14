import { useNavigate } from "react-router-dom";
import { FaTrash } from "react-icons/fa";
import { GET_CLIENTS } from "../queries/clientQueries";
import { GET_PROJECTS } from "../queries/projectQueries";
import { DELETE_CLIENT } from "../mutations/clientMutations";
import { useMutation } from "@apollo/client";

export default function DeleteClientButton( { clientId }) {
  const navigate = useNavigate();

  const [ deleteClient ] = useMutation(DELETE_CLIENT, {
    variables: { id: clientId },
    onCompleted: () => navigate('/'),
    refetchQueries: [{query: GET_CLIENTS, GET_PROJECTS }]
  });

  return (
    <div className="d-flex mt-5 ms-auto">
      <button className="btn btn-danger m-2" onClick={deleteClient}>
        <FaTrash className="icon" />Delete Client
      </button>
    </div>
  )
}
