// import React from 'react';
// import { Table } from 'antd';
// import moment from 'moment';
// import { Select } from 'antd';
// const { Option } = Select;

// const data = [
//   {
//     key: '1',
//     timestamp: moment().format(),
//     title: 'Task 1',
//     description: 'This is task 1',
//     dueDate: moment().add(1, 'days').format(),
//     tag: 'Urgent',
//     status: 'OPEN',
//   },
//   {
//     key: '2',
//     timestamp: moment().format(),
//     title: 'Task 2',
//     description: 'This is task 2',
//     dueDate: moment().add(2, 'days').format(),
//     tag: 'Important',
//     status: 'WORKING',
//   },
//   {
//     key: '3',
//     timestamp: moment().format(),
//     title: 'Task 3',
//     description: 'This is task 3',
//     dueDate: moment().add(3, 'days').format(),
//     tag: 'Low Priority',
//     status: 'DONE',
//   },
// ];

// function handleChange(value) {
//   console.log(`selected ${value}`);
// }

// const columns = [
//   {
//     title: 'Timestamp created',
//     dataIndex: 'timestamp',
//     key: 'timestamp',
//   },
//   {
//     title: 'Title',
//     dataIndex: 'title',
//     key: 'title',
//   },
//   {
//     title: 'Description',
//     dataIndex: 'description',
//     key: 'description',
//   },
//   {
//     title: 'Due Date',
//     dataIndex: 'dueDate',
//     key: 'dueDate',
//   },
//   {
//     title: 'Tag',
//     dataIndex: 'tag',
//     key: 'tag',
//   },
//   {
//     title: 'Status',
//     key: 'status',
//     dataIndex: 'status',
//     render: (text, record) => (
//       <Select defaultValue={text} style={{ width: 120 }} onChange={handleChange}>
//         <Option value="OPEN">OPEN</Option>
//         <Option value="WORKING">WORKING</Option>
//         <Option value="DONE">DONE</Option>
//         <Option value="OVERDUE">OVERDUE</Option>
//       </Select>
//     ),
//   },
// ];

// const pagination = {
//   current: 1,
//   pageSize: 10,
//   total: data.length,
//   showSizeChanger: true,
//   showQuickJumper: true,
//   pageSizeOptions: ['10', '20', '30', '40'],
// };

// function ToDoList() {
  
//   return <Table columns={columns} dataSource={data} pagination={pagination}/>;
// }

// export default ToDoList;


import React, { useState, useEffect } from 'react';
import { Table, Form, Input, DatePicker, Select, Button, Tag } from 'antd';
import moment from 'moment';
import axios from 'axios';

const { Option } = Select;
const { Search } = Input;

const ToDoList = () => {

  const [data, setData] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editFormData, setEditFormData] = useState(null);
  const [isEditFormVisible, setIsEditFormVisible] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  // create new entry
  const handleCreateNewClick = () => {
    setShowForm(!showForm);
  };

  // on adding new entry
  const onFinish = (values) => {
    const { title, description, dueDate, tags, status } = values;
    const timestamp = moment().format('YYYY-MM-DD HH:mm:ss');
    setData([...data, { timestamp, title, description, dueDate, tags, status }]);
    setShowForm(false)
  };

  //delete entry
  const handleDelete = (record) => {
    setData((prevState) => prevState.filter((data) => data.key !== record.key));
  };

  //edit from
  const showEditForm = (record) => {
    setEditFormData(record);
    setIsEditFormVisible(true);
  };

  //edit entry
  const handleEdit = (values) => {
    const editedTask = { ...editFormData, ...values };
    const editedTasks = data.map(task => task.id === editedTask.id ? editedTask : task);
    setData(editedTasks);
    setIsEditFormVisible(false);
    setEditFormData(null);
  };

  const filteredTasks = data.filter(
    (task) =>
      task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      task.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      task.tags.some((tag) => tag.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  // useEffect(() => {
  //   const tasksFromStorage = JSON.parse(localStorage.getItem('tasks'));
  //   if (tasksFromStorage) {
  //     setData(tasksFromStorage);
  //   }
  // }, []);

  // const handleAddTask = (task) => {
  //   const newTasks = [...data, task];
  //   setData(newTasks);
  //   localStorage.setItem("tasks", JSON.stringify(newTasks));
  // };
  
  // const handleDeleteTask = (id) => {
  //   const newTasks = data.filter((task) => task.id !== id);
  //   setData(newTasks);
  //   localStorage.setItem("tasks", JSON.stringify(newTasks));
  // };

  // const handleEditTask = (updatedTask) => {
  //   const newTasks = data.map((task) =>
  //     task.id === updatedTask.id ? updatedTask : task
  //   );
  //   setData(newTasks);
  //   localStorage.setItem("tasks", JSON.stringify(newTasks));
  // };
  // useEffect(() => {
  //   localStorage.setItem('tasks', JSON.stringify(data));
  // }, [data]);
  
  // columns of table
  const columns = [
    {
      title: "Timestamp Created",
      dataIndex: "timestampCreated",
      key: "timestampCreated",
      render: (text) => moment(text).format("YYYY-MM-DD HH:mm:ss"),
    },
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
    },
    {
      title: "Due Date",
      dataIndex: "dueDate",
      key: "dueDate",
      render: (text) => (text ? moment(text).format("YYYY-MM-DD") : "-"),
    },
    {
      title: "Tag",
      dataIndex: "tag",
      key: 'tag',
      render: (tag) => (
        <>
          {tag.map((tag) => (
            <div key={tag}>{tag}</div>
          ))}
        </>
      )
     
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      filters: [
        { text: 'OPEN', value: 'OPEN' },
        { text: 'WORKING', value: 'WORKING' },
        { text: 'DONE', value: 'DONE' },
        { text: 'OVERDUE', value: 'OVERDUE' }
      ],
      onFilter: (value, record) => record.status === value
    },
    {
      title: "Action",
      key: "action",
      render: (text, record) => (
        <><Button type="primary" danger onClick={() => handleDelete(record)}>
          Delete
        </Button><Button type="primary" danger onClick={() => showEditForm(record)}>
            Edit
          </Button></>
      ),
    },
  ];
  
  // useEffect(() => {
  //   axios.get('http://localhost:3001/tasks')
  //     .then( res => setData(res.data))
  //     .catch(err => console.log(err))
  // }, []);

  useEffect(() => {
    axios.get('http://localhost:3001/tasks')
      .then(response => {
        setData(response.data);
        // e.preventDefault()
        console.log(setData)
      })
      .catch(error => {
        console.log(error);
      });
  }, [data]);

  return (
    <div>
      <button onClick={handleCreateNewClick}>Create New</button>

      {/* create form */}
      {showForm && (
        <Form onFinish={onFinish}>
          <Form.Item  name="title"  rules={[{ required: true, message: 'Please enter a title' }, { max: 100, message: 'Title should be less than 100 characters' }]} >
            <Input placeholder="Title" />
          </Form.Item>

          <Form.Item name="description" rules={[{ required: true, message: 'Please enter a description' }, { max: 1000, message: 'Description should be less than 1000 characters' }]}>
            <Input.TextArea placeholder="Description" />
          </Form.Item>

          <Form.Item name="dueDate">
            <DatePicker placeholder="Due Date" />
          </Form.Item>

          <Form.Item name="tags" label="Tag">
            <Select mode="tags" style={{ width: '100%' }} placeholder="Please enter tags"  />
          </Form.Item>

          <Form.Item  name="status"  rules={[{ required: true, message: 'Please select a status' }]} >
            <Select placeholder="Status">
              <Option value="OPEN">OPEN</Option>
              <Option value="WORKING">WORKING</Option>
              <Option value="DONE">DONE</Option>
              <Option value="OVERDUE">OVERDUE</Option>
            </Select>
          </Form.Item>

          <Button type="primary" htmlType="submit">  Add</Button>

        </Form>
      )}

      {/* update form */}
      {isEditFormVisible &&(
        <Form name="edit_task_form" layout="vertical" onFinish={handleEdit} initialValues={editFormData}>
          <Form.Item name="title" label="Title" rules={[{ required: true, max: 100 }]}>
            <Input />
          </Form.Item>

          <Form.Item name="description" label="Description" rules={[{ required: true, max: 1000 }]}>
            <Input.TextArea />
          </Form.Item>

          <Form.Item name="due_date" label="Due Date">
            <DatePicker showTime format="YYYY-MM-DD HH:mm:ss" />
          </Form.Item>

          <Form.Item name="tag" label="Tag">
            <Select mode="tags" style={{ width: '100%' }} placeholder="Please enter tags" />    
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit">  Save </Button>
            <Button onClick={() => setIsEditFormVisible(false)}> Cancel</Button>
          </Form.Item>

        </Form>
      )}
      <Search placeholder="Search tasks" onChange={handleSearch} style={{ width: 200, marginBottom: 16 }} />
      {/* <Table columns={columns} dataSource={data} /> */}
      <Table dataSource={filteredTasks} columns={columns} rowKey="id" pagination={{ pageSize: 5 }} />

    </div>
  );
};

export default ToDoList;
