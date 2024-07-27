import React, { useState } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import { Dropdown } from 'primereact/dropdown';
import { useNavigate } from 'react-router-dom';
import 'primereact/resources/themes/saga-blue/theme.css'; // PrimeReact theme
import 'primereact/resources/primereact.min.css'; // PrimeReact styles
import 'primeicons/primeicons.css'; // PrimeIcons

const Marketplace = () => {
  const [users, setUsers] = useState(usersData);
  const [first, setFirst] = useState(0);
  const [rows, setRows] = useState(10);
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();
  const statusOptions = ['approve', 'pending', 'reject'];

  const onUpdate = (rowData) => {
    navigate('/update-user', { state: { user: rowData } });
  };

  const onDelete = (rowData) => {
    setUsers(users.filter(user => user.id !== rowData.id));
  };

  const actionBodyTemplate = (rowData) => {
    return (
      <div className="flex space-x-2">
        <Button icon="pi pi-pencil" className="p-button-rounded p-button-success" onClick={() => onUpdate(rowData)} />
        <Button icon="pi pi-trash" className="p-button-rounded p-button-danger" onClick={() => onDelete(rowData)} />
      </div>
    );
  };

  const statusBodyTemplate = (rowData) => {
    let statusColor = '';

    switch (rowData.status) {
      case 'approve':
        statusColor = 'green';
        break;
      case 'pending':
        statusColor = '#FFC000';
        break;
      case 'reject':
        statusColor = 'red';
        break;
      default:
        statusColor = 'gray';
        break;
    }

    const statusStyle = {
      backgroundColor: statusColor,
      padding: '4px',
      borderRadius: '4px',
    };

    return (
      <div style={statusStyle}>
        <Dropdown value={rowData.status} options={statusOptions} onChange={(e) => onStatusChange(e, rowData)} style={{ width: '100%' }} />
      </div>
    );
  };

  const onStatusChange = (e, rowData) => {
    const updatedUsers = users.map(user => {
      if (user.id === rowData.id) {
        user.status = e.value;
      }
      return user;
    });
    setUsers(updatedUsers);
  };

  const onPageChange = (event) => {
    setFirst(event.first);
    setRows(event.rows);
  };

  const filteredUsers = users.filter(user =>
    user.id.toString().includes(searchTerm) ||
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.nic.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container mx-auto mt-5 mb-3">
      <div className="mb-4 flex ">
        <h1 className='mr-5 bg-blueSecondary text-white text-md p-2'>Search</h1>
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search by User ID, Name, or NIC"
          className="p-inputtext p-component shadow-lg w-full flex-grow p-2"
        />
      </div>
      <DataTable value={filteredUsers} paginator rows={rows} first={first} onPage={onPageChange} className="w-full">
        <Column field="id" header="User ID" />
        <Column field="name" header="Name" />
        <Column field="nic" header="NIC Number" />
        <Column field="payment" header="Payment" />
        <Column header="Status" body={statusBodyTemplate} />
        <Column header="Actions" body={actionBodyTemplate} />
      </DataTable>
    </div>
  );
};

export default Marketplace;

const usersData = [
  {
    "id": 1,
    "name": "John Doe",
    "nic": "123456789V",
    "payment": 1000,
    "status": "pending"
  },
  {
    "id": 2,
    "name": "Jane Smith",
    "nic": "987654321V",
    "payment": 1500,
    "status": "approve"
  },
  {
    "id": 3,
    "name": "Alice Johnson",
    "nic": "456789123V",
    "payment": 2000,
    "status": "reject"
  },
  {
    "id": 4,
    "name": "Bob Brown",
    "nic": "789123456V",
    "payment": 3000,
    "status": "pending"
  },
  {
    "id": 5,
    "name": "Eva Williams",
    "nic": "234567891V",
    "payment": 2500,
    "status": "approve"
  },
  {
    "id": 6,
    "name": "Michael Davis",
    "nic": "567891234V",
    "payment": 1800,
    "status": "pending"
  },
  {
    "id": 7,
    "name": "Sophia Wilson",
    "nic": "891234567V",
    "payment": 2200,
    "status": "reject"
  }
];
