// Mongoose models
const Project = require('../models/Project');
const Client = require('../models/Client');
const Task = require('../models/Task');

const { 
  GraphQLObjectType, 
  GraphQLID, 
  GraphQLString, 
  GraphQLSchema, 
  GraphQLList,
  GraphQLNonNull,
  GraphQLEnumType
} = require('graphql');

// Client Type
const ClientType = new GraphQLObjectType({
  name: 'Client',
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    email: { type: GraphQLString },
    phone: { type: GraphQLString }
  })
});


// Project Type
const ProjectType = new GraphQLObjectType({
  name: 'Project',
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    description: { type: GraphQLString },
    status: { type: GraphQLString },
    client: {
      type: ClientType,
      resolve(parent, args){
        return Client.findById(parent.clientId);
      }
    }
  })
});

// Task Type
const TaskType = new GraphQLObjectType({
  name: 'Task',
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    description: { type: GraphQLString },
    status: { type: GraphQLString },
    project: {
      type: ProjectType,
      resolve(parent, args){
        return Project.findById(parent.projectId);
      }
    }
  })
});

const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    projects: {
      type: new GraphQLList(ProjectType),
      resolve(parent, args) {
        return Project.find();
      }
    },
    project: {
      type: ProjectType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args){
        return Project.findById(args.id);
      }
    },
    clients: {
      type: new GraphQLList(ClientType),
      resolve(parent, args) {
        return Client.find();
      }
    },
    client: {
      type: ClientType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args){
        return Client.findById(args.id);
      }
    },
    projectsByClientId: {
      type: new GraphQLList(ProjectType),
      args: { clientId: { type: GraphQLID }},
      resolve (parent,args){
        const projects = Project.find({clientId: args.clientId});
        return projects;
      }
    },
    tasks: {
      type: new GraphQLList(TaskType),
      resolve(parent,args) {
        return Task.find();
      }
    },
    task: {
      type: TaskType, 
      args: { id: { type: GraphQLID }},
      resolve(parent, args){
        return Task.findById(args.id);
      }
    },
    tasksByProjectId: {
      type: new GraphQLList(TaskType),
      args: { projectId: { type: GraphQLID }},
      resolve (parent,args){
        const tasks= Task.find({projecId: args.projectId});
        return tasks;
      }
    },
  }
});

// Mutations
const mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    // Add a client
    addClient: {
      type: ClientType,
      args: {
        name: { type: GraphQLNonNull(GraphQLString) },
        email: { type: GraphQLNonNull(GraphQLString) },
        phone: { type: GraphQLNonNull(GraphQLString) },
      },
      resolve(parent, args) {
        const client = new Client({
          name: args.name,
          email: args.email,
          phone: args.phone
        });

        return client.save();
      }
    },
    // Update a client
    updateClient: {
      type: ClientType,
      args: {
        id: { type: GraphQLNonNull(GraphQLID)},
        name: { type: GraphQLNonNull(GraphQLString) },
        email: { type: GraphQLNonNull(GraphQLString) },
        phone: { type: GraphQLNonNull(GraphQLString) },
      },
      resolve(parent, args) {
        return Client.findByIdAndUpdate(
          args.id, 
          {
            $set: {
              name: args.name,
              email: args.email,
              phone: args.phone
            },
          },
          { new: true }
        );
      }
    },
    // Delete a client
    deleteClient: {
      type: ClientType,
      args: {
        id: { type: GraphQLNonNull(GraphQLID) },
      },
      resolve(parent, args) {
        Project.find({ clientId: args.id }).then(
          projects => {
            projects.forEach(project => project.deleteOne({}));
          }
        )
        
        return Client.findByIdAndDelete(args.id);
      }
    },
    // Add a project
    addProject: {
      type: ProjectType,
      args: {
        name: { type: GraphQLNonNull(GraphQLString) },
        description: { type: GraphQLNonNull(GraphQLString)},
        status: {
          type: new GraphQLEnumType({
            name: 'ProjectStatus',
            values: {
              new: { value: 'Not Started' },
              progress: { value: `In Progress` },
              completed: { value: 'Completed' },
            }}),
          defaultValue: 'Not Started',
        },
        clientId: { type: GraphQLNonNull(GraphQLID)}, 
      },
      resolve(parent, args) {
        const project = new Project({
          name: args.name,
          description: args.description,
          status: args.status,
          clientId: args.clientId,
        });

        return project.save();
      }
    },
    // Delete a project
    deleteProject: {
      type: ProjectType,
      args: {
        id: { type: GraphQLNonNull(GraphQLID) }
      },
      resolve(parent, args) {
        return Project.findByIdAndDelete(args.id);
      }
    },
    // Update a project
    updateProject: {
      type: ProjectType,
      args: {
        id: { type: GraphQLNonNull(GraphQLID)},
        name: { type: GraphQLString},
        description: { type: GraphQLString},
        status: {
          type: new GraphQLEnumType({
            name: 'ProjectStatusUpdate',
            values: {
              new: { value: 'Not Started' },
              progress: { value: `In Progress` },
              completed: { value: 'Completed' },
            }}),
        },
        clientId: { type: GraphQLNonNull(GraphQLID)}
      },
      resolve(parent, args) {
        return Project.findByIdAndUpdate(
          args.id, 
          {
            $set: {
              name: args.name,
              description: args.description,
              status: args.status,
              clientId: args.clientId 
            },
          },
          { new: true }
        );
      }
    },
    // Add task
    addTask: {
      type: TaskType,
      args: {
        name: { type: GraphQLNonNull(GraphQLString)},
        description: { type: GraphQLString},
        status: {
          type: new GraphQLEnumType({
            name: 'TaskStatus',
            values: {
              new: { value: 'Not Started' },
              progress: { value: 'In Progress' },
              completed: { value: 'Completed' },
            }}),
          defaultValue: 'Not Started',
        },
        projectId: { type: GraphQLNonNull(GraphQLID)},
      },
      resolve(parent, args){
        const task = new Task({
          name: args.name,
          description: args.description,
          status: args.status,
          projectId: args.projectId,
        });

        return task.save();
      }
    }
  }
});

module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation
});