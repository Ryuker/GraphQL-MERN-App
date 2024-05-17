import { FaList, FaIdBadge } from "react-icons/fa";
import { RiProgress5Line } from "react-icons/ri";




export default function ProjectInfo( { project } ) {

  return (
    <>
      <h5 className="mt-5">Project Information</h5>
      <ul className="list-group d-flex gap-x-2 justify-content-center">
        <li className="list-group-item d-flex align-items-center">
          <FaList className="icon" />
          <span>{project.name}</span>
        </li>
        <li className="list-group-item d-flex align-items-center">
          <FaIdBadge className="icon" />
          <span>{project.client.name}</span>
        </li>
        <li className="list-group-item d-flex align-items-center">
          <RiProgress5Line className="icon" />
          <span>{project.status}</span> 
        </li>
      </ul>
    </>
    
  )
}
