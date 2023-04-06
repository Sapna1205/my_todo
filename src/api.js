/* eslint-disable import/no-anonymous-default-export */
// api.js (mock API module)

const tasks = [
    {
      id: 1,
      createdTimestamp: "2022-02-15T12:00:00.000Z",
      title: "Task 1",
      description: "Description for Task 1",
      dueDate: "2022-03-01",
      tags: ["tag1", "tag2"],
      status: "OPEN"
    },
    {
      id: 2,
      createdTimestamp: "2022-02-16T12:00:00.000Z",
      title: "Task 2",
      description: "Description for Task 2",
      dueDate: "2022-03-02",
      tags: ["tag1", "tag3"],
      status: "WORKING"
    },
    {
      id: 3,
      createdTimestamp: "2022-02-17T12:00:00.000Z",
      title: "Task 3",
      description: "Description for Task 3",
      dueDate: "2022-03-03",
      tags: ["tag2", "tag3"],
      status: "DONE"
    },
    {
      id: 4,
      createdTimestamp: "2022-02-18T12:00:00.000Z",
      title: "Task 4",
      description: "Description for Task 4",
      dueDate: "2022-03-04",
      tags: [],
      status: "OVERDUE"
    }
  ];
  
  const getTasks = () => {
    return new Promise((resolve, reject) => {
      resolve(tasks);
    });
  };
  
  const addTask = (task) => {
    return new Promise((resolve, reject) => {
      const newTask = {
        ...task,
        id: tasks.length + 1,
        createdTimestamp: new Date().toISOString()
      };
      tasks.push(newTask);
      resolve(newTask);
    });
  };
  
  const updateTask = (id, updates) => {
    return new Promise((resolve, reject) => {
      const index = tasks.findIndex((task) => task.id === id);
      if (index === -1) {
        reject(new Error("Task not found"));
      } else {
        tasks[index] = {
          ...tasks[index],
          ...updates
        };
        resolve(tasks[index]);
      }
    });
  };
  
  const deleteTask = (id) => {
    return new Promise((resolve, reject) => {
      const index = tasks.findIndex((task) => task.id === id);
      if (index === -1) {
        reject(new Error("Task not found"));
      } else {
        tasks.splice(index, 1);
        resolve();
      }
    });
  };
  
  const searchTasks = (query) => {
    return new Promise((resolve, reject) => {
      const results = tasks.filter((task) => {
        const searchFields = [
          task.title,
          task.description,
          task.dueDate,
          ...task.tags
        ];
        return searchFields.some((field) =>
          field.toLowerCase().includes(query.toLowerCase())
        );
      });
      resolve(results);
    });
  };
  
  export default {
    getTasks,
    addTask,
    updateTask,
    deleteTask,
    searchTasks
  };
  