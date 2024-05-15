import { useState } from "react";
import { useMutation, useQuery } from "@apollo/client";
import { GET_PROJECT } from "../queries/projectQueries";
import { GET_CLIENTS } from "../queries/clientQueries";
import { UPDATE_PROJECT } from "../mutations/projectMutations";

export default function EditProjectForm( { project } ) {
  
  const [name, setName] = useState(project.name);
  const [description, setDescription] = useState(project.description);
  const [status, setStatus] = useState(
    project.status == 'Not Started' &&  'new' ||
    project.status == 'In Progress' &&  'progress' ||
    project.status == 'Completed' &&  'completed'
  );
  const [clientId, setClientId] = useState(project.client.id);

  // Get Clients for select
  const { loading, error, data } = useQuery(GET_CLIENTS);

  const [updateProject] = useMutation(UPDATE_PROJECT, {
    variables: { id: project.id, name, description, status, clientId },
    refetchQueries: [{ query: GET_PROJECT, variables: { id: project.id }}]
  })

  const onSubmit = (e) => {
    e.preventDefault();

    if (!name || !description || !status || !clientId ){
      return alert('Please fill out all fields');
    }

    console.log(name, description, status, clientId);

    updateProject(name, description, status, clientId);
  };

  return (
    <div className="mt-5">
      <h3>Update Project Details</h3>
      <form onSubmit={onSubmit}>
        <div className="mb-3">
          <label className="form-label">Name</label>
          <input 
            type="text" className="form-control" 
            id="name" value={name} 
            onChange={ (e) => setName(e.target.value) } />
        </div>
        <div className="mb-3">
          <label className="form-label">Description</label>
          <textarea 
            className="form-control" 
            id="description" value={description} 
            onChange={ (e) => setDescription(e.target.value) } />
        </div>
        <div className="mb-3">
          <label className="form-label">Status</label>
          <select 
            className="form-select" 
            id="status" value={status}
            onChange={ (e) => setStatus(e.target.value) }>
              <option value="new">Not Started</option>
              <option value="progress">In Progress</option>
              <option value="completed">Completed</option>
            </select>
        </div>
        {!loading && !error && 
          <div className="mb-3">
            <label className="form-label">Client</label>
            <select id="clientId" className="form-select" 
            value={clientId} onChange={(e) => setClientId(e.target.value)}>
              {data.clients.map(client => (
                <option key={client.id} value={client.id}>{client.name}</option>
              ))}
            </select>
          </div>
        }
        
        <button type="submit" className="btn btn-primary">Submit</button>
      </form>
    </div>
  )
}
