import Spinner from "./Spinner";
import { useQuery } from "@apollo/client";
import { GET_PROJECTS_BY_CLIENT } from "../queries/projectQueries";
import ProjectCard from "./ProjectCard";

export default function ClientProjects( { clientId }) {
  const { loading, error, data } = useQuery(GET_PROJECTS_BY_CLIENT, {
    variables: { clientId }
  });

  if (loading) return <Spinner/>;
  if (error) return <p>Something Went Wrong</p>;

  return (
    <>
      { data.projectsByClientId.length > 0 ? (
        <div className="row mt-4">
          <h5 className="mt-5">Projects</h5>
          { data.projectsByClientId.map(project => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>) 
        : ''}
    </>
  )
}
