import { FaEnvelope, FaPhone, FaIdBadge } from "react-icons/fa";

export default function ClientInfo( {client} ) {

  return (
    <>
      <h5 className="mt-5">Client Information</h5>
      <ul className="list-group d-flex gap-x-2 justify-content-center">
        <li className="list-group-item">
          <FaIdBadge className="icon" />
          <span>{client.name}</span>
        </li>
        <li className="list-group-item d-flex align-items-center">
          <FaEnvelope className="icon" />
          <span>{client.email}</span>
        </li>
        <li className="list-group-item d-flex align-items-center">
          <FaPhone className="icon" />
          <span>{client.phone}</span>
        </li>
      </ul>
    </>
    
  )
}
