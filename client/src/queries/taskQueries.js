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

const GET_TASK = gql`
  query GetTask($id: ID!) {
    task(id: $id) {
      id
      name
      description
      status
      project {
        id
        name
        description
        status
        client {
          name
        }
      }
    }
  }
`;

export { GET_TASKS, GET_TASK };