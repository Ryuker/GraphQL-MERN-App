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

const UPDATE_TASK = gql`
  mutation UpdateTask($id: ID!, $name: String!, $description: String!, $status: TaskStatusUpdate!, $projectId: ID!) {
    updateTask(id: $id, name: $name, description: $description, status: $status, projectId: $projectId) {
      id
      name
      description
      status
      project {
        id
        name
        description
        status
      }
    }
  }
`;

const DELETE_TASK = gql`
  mutation DeleteTask($id: ID!) {
    deleteTask(id: $id) {
      id
    }
  }
`;

export { ADD_TASK, UPDATE_TASK, DELETE_TASK };