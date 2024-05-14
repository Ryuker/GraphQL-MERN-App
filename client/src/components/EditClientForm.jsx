import { useState } from "react";
import { useMutation } from "@apollo/client";
import { GET_CLIENT } from "../queries/clientQueries";
import { UPDATE_CLIENT } from "../mutations/clientMutations";


export default function EditClientForm( { client } ) {
  const [name, setName] = useState(client.name);
  const [email, setEmail] = useState(client.email);
  const [phone, setPhone] = useState(client.phone);

  const [updateClient] = useMutation(UPDATE_CLIENT, {
    variables: { id: client.id, name, email, phone },
    refetchQueries: [{ query: GET_CLIENT, variables: { id: client.id }}]
  })

  const onSubmit = (e) => {
    e.preventDefault();

    if (!name || !email || !phone){
      return alert('Please fill out all fields');
    }

    updateClient(name, email, phone);

  };

  return (
    <div className="mt-5">
      <h3>Update Client Details</h3>
      <form onSubmit={onSubmit}>
        <div className="mb-3">
          <label className="form-label">Name</label>
          <input 
            type="text" className="form-control" 
            id="name" value={name} 
            onChange={ (e) => setName(e.target.value) } />
        </div>
        <div className="mb-3">
          <label className="form-label">E-mail</label>
          <input 
            type="email" className="form-control" 
            id="email" value={email} 
            onChange={ (e) => setEmail(e.target.value) } />
        </div>
        <div className="mb-3">
          <label className="form-label">Phone</label>
          <input 
            type="tel" className="form-control" 
            id="phone" value={phone} 
            onChange={ (e) => setPhone(e.target.value) } />
        </div>
        <button type="submit" className="btn btn-primary">Submit</button>
      </form>
    </div>
  )

}