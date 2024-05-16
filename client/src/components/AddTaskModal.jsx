import { useState } from 'react';
import { BiTask } from "react-icons/bi";
import { useMutation, useQuery } from '@apollo/client';
import { GET_PROJECTS } from '../queries/projectQueries';
import { GET_TASKS } from '../queries/taskQueries';
import { ADD_TASK } from '../mutations/taskMutations';
import Spinner from './Spinner';

export default function AddTaskModal() {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [status, setStatus] = useState('new');
  const [projectId, setProjectId] = useState('');

  // Get Projects for select
  const { loading, error, data } = useQuery(GET_PROJECTS);

  // Add Task Mutation
  const [ addTask ] = useMutation(ADD_TASK, {
    variables: { name, description, status, projectId },
    update(cache, { data: { addTask }}){
      const { tasks } = cache.readQuery({ query: GET_TASKS});

      cache.writeQuery({
        query: GET_TASKS,
        data: { tasks: [...tasks, addTask] }
      });
     }
  })

  const onSubmit = (e) => {
    e.preventDefault();
    
    if(name === '' || description === '' || status === '' || projectId === ''){
      return alert('Please fill in all fields');
    } 

    addTask(name, description, status, projectId);

    setName('');
    setDescription('');
    setStatus('new');
    setProjectId('');
  };

  if (loading) return null
  if (error) return 'Something Went Wrong';

  return (
    <>
     { !loading && !error && (
      <>
        <button type="button" 
        className="btn btn-tertiary" 
        data-bs-toggle="modal" 
        data-bs-target="#addTaskModal">
          <div className="d-flex align-items-center">
            <BiTask className='icon'/>
            <div>New Task</div>
          </div>
        </button>

        <div className="modal fade" id="addTaskModal" aria-labelledby="taskModalLabel" aria-hidden="true">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h1 className="modal-title fs-5" id="taskModalLabel">New Task</h1>
                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>
              <div className="modal-body">
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

                  <div className="mb-3">
                    <label className="form-label">Project</label>
                    <select id="projectId" className="form-select" 
                    value={projectId} onChange={(e) => setProjectId(e.target.value)}>
                      <option value="">Select project</option>
                      {data.projects.map(project => (
                        <option key={project.id} value={project.id}>{project.name}</option>
                      ))}
                    </select>
                  </div>

                  <button 
                    type="submit" 
                    data-bs-dismiss="modal" 
                    className="btn btn-primary">
                      Submit
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </>
     )}
    </>
  )


}