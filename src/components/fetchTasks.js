const mockTasks = [
    {
      id: 1,
      created: new Date("2023-02-15T12:00:00"),
      title: "Task 1",
      description: "This is the first task",
      dueDate: new Date("2023-02-18"),
      tags: ["tag1", "tag2"],
      status: "OPEN",
    },
    {
      id: 2,
      created: new Date("2023-02-14T10:00:00"),
      title: "Task 2",
      description: "This is the second task",
      dueDate: new Date("2023-02-20"),
      tags: ["tag2", "tag3"],
      status: "WORKING",
    },
    // more tasks...
  ];
  
  function fetchTasks() {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(mockTasks);
      }, 1000); // simulate 1 second delay
    });
  }
  