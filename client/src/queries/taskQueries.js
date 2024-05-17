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

const GET_TASKS_BY_PROJECT = gql`
  query GetTasksByProject($projectId: ID!) {
    tasksByProjectId(projectId: $projectId) {
      id
      name
      description
      status
      project {
        id
        name
        status
        client{
          name
        }
      }
    }
  }
`;

export { GET_TASKS, GET_TASK, GET_TASKS_BY_PROJECT };