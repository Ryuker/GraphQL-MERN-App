

export default function ProjectCard( { project } ) {
  return (
    <div className="col-md-4">
      <div className="card mb-3">
        <div className="card-body">
          <div className="d-flex justify-content-between align-items-center">
            <h5 className="card-title">{project.name}</h5>
            <a className="btn btn-light" href={`/projects/${project.id}`}>
              View
            </a>
          </div>
          <div className="d-flex justify-content-between mt-2">
            <p className="small">
              Status: <strong>{project.status}</strong>
            </p>
            <p className="small">
              Client: <strong>{project.client.name}</strong>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
