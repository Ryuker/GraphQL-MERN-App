import { gql } from '@apollo/client';

const GET_TASKS = gql`
  query GetTasks {
    tasks {
      id
      name
      status
      project {
        id
        name
      }
    }
  }
`;

export { GET_TASKS };