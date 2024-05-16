

export default function TaskCard( { task }) {
  return (
    <div className="col-md-4">
      <div className="card mb-3">
        <div className="card-body">
          <div className="d-flex justify-content-between align-items-center">
            <h5 className="card-title">{task.name}</h5>
            <a className="btn btn-light" href={`/tasks/${task.id}`}>
              View
            </a>
          </div>
          <div className="d-flex justify-content-between mt-2">
            <p className="small">
              Status: <strong>{task.status}</strong>
            </p>
            <p className="small">
              Project: <strong>{task.project.name}</strong>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
