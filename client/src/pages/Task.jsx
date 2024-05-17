import { Link, useParams } from 'react-router-dom';
import Spinner from '../components/Spinner';
// import ClientInfo from '../components/ClientInfo';
// import DeleteClientButton from '../components/DeleteClientButton';
// import EditClientForm from '../components/EditClientForm';
import { useQuery } from '@apollo/client';
import { GET_TASK } from '../queries/taskQueries';

export default function Task() {
  const { id } = useParams();
  const { loading, error, data } = useQuery(GET_TASK, {variables: { id }});

  if (loading) return <Spinner />;
  if (error) return <p>Something Went Wrong</p>;

  return(
    <>
      {!loading && !error && (
        <div className="mx-auto w-75 card p-5">
          <Link to="/" className="btn btn-light btn-sm w-25 d-inline ms-auto">
            Back
          </Link>

          <h1>{data.task.name}</h1>
          <p>{data.task.description}</p>

          <h5 className="mt-3">Project Status</h5>
          <p className="lead">{ data.task.status} </p>

          {/* <ClientInfo client={data.client} /> */}

          {/* <ClientProjects clientId={data.client.id} /> */}

          {/* <EditClientForm client={data.client} /> */}

          {/* <DeleteClientButton clientId={data.client.id} /> */}
        </div>
      )}
    </>
  )
}