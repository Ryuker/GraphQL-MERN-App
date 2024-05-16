import { gql } from '@apollo/client';

const ADD_TASK = gql`
  mutation AddTask($name: String!, $description: String!, $status: TaskStatus!, $projectId: ID! ) {
    addTask(name: $name, description: $description, status: $status, projectId: $projectId) {
      id
      name
      description
      status
      project {
        id
        name
      }
    }
  }
`;

export { ADD_TASK };