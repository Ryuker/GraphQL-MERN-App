import { FaTrash } from 'react-icons/fa';
import { IoPersonSharp } from "react-icons/io5";
import { useMutation } from '@apollo/client';
import { DELETE_CLIENT } from '../mutations/clientMutations';
import { GET_CLIENTS } from '../queries/clientQueries';
import { GET_PROJECTS } from '../queries/projectQueries';

export default function ClientRow( { client }) {
  const [deleteClient] = useMutation(DELETE_CLIENT, {
    variables: { id: client.id },
    refetchQueries: [{ query: GET_CLIENTS }, { query: GET_PROJECTS }]
    // update(cache, { data: { deleteClient }}){
    //   const { clients } = cache.readQuery({ query: GET_CLIENTS});

    //   cache.writeQuery({
    //     query: GET_CLIENTS,
    //     data: { clients: clients.filter(client => client.id !== deleteClient.id)}
    //   })
    //  }
  });

  return (
    <tr>
      <td>{ client.name }</td>
      <td>{ client.email }</td>
      <td>{ client.phone }</td>
      <td>
        <div className='d-flex gap-2'>
        <a className="btn btn-secondary btn-sm" href={`/clients/${client.id}`}> 
            <IoPersonSharp />
          </a>
          <button className="btn btn-danger btn-sm" onClick={deleteClient}> 
            <FaTrash />
          </button>
        </div>
      </td>
    </tr>
  )
}
