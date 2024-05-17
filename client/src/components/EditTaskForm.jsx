import { useState } from "react";
import { useMutation, useQuery } from "@apollo/client";
import { GET_TASK } from "../queries/taskQueries";
import { GET_PROJECTS } from "../queries/projectQueries";
import { UPDATE_TASK } from "../mutations/taskMutations";

export default function EditTaskForm( { task } ) {

  const [name, setName] = useState(task.name);
  const [description, setDescription] = useState(task.description);
  const [status, setStatus] = useState(
    task.status == 'Not Started' &&  'new' ||
    task.status == 'In Progress' &&  'progress' ||
    task.status == 'Completed' &&  'completed'
  );

  const [projectId, setProjectId] = useState(task.project.id);

  // Get Projects for select
  const { loading, error, data } = useQuery(GET_PROJECTS);

  const [updateTask] = useMutation(UPDATE_TASK, {
    variables: { id: task.id, name, description, status, projectId },
    refetchQueries: [{ query: GET_TASK, variables: { id: task.id}}]
  })

  const onSubmit = (e) => {
    e.preventDefault();

    if(!name || !description || !status || !projectId) {
      return alert('Please fill out all fields');
    }

    console.log(name, description, status, projectId);

    updateTask(name, description, status, projectId);
  }


  return(
    <>
      <div className="mt-5">
        <h3>Update Task Details</h3>
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
              <label className="form-label">Project</label>
              <select id="projectId" className="form-select" 
              value={projectId} onChange={(e) => setProjectId(e.target.value)}>
                {data.projects.map(project => (
                  <option key={project.id} value={project.id}>{project.name}</option>
                ))}
              </select>
            </div>
          }
          
          <button type="submit" className="btn btn-primary">Submit</button>
        </form>
      </div>
    </>
  )
}