import { useState, useEffect } from "react";
import { Table, Button, message, Popconfirm } from "antd";
import api from "../api/axios";
import PatientForm from "../components/PatientForm";
import { useNavigate } from "react-router-dom";
import Layout from "../components/Layout";

export function Dashboard() {
  const [patients, setPatients] = useState([]);
  const [loading, setLoading] = useState(false);
  const [formVisible, setFormVisible] = useState(false);
  const [editing, setEditing] = useState(null);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);

  const navigate = useNavigate();

  const fetchPatients = async (pageNumber = 1) => {
    setLoading(true);
    try {
      const res = await api.get(`/patients?page=${pageNumber}`);
      setPatients(res.data.patients);
      setTotal(res.data.total);
      setPage(pageNumber);
    } catch (err) {
      message.error("Failed to fetch patients", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPatients();
  }, []);

  const handleCreate = async (data) => {
    try {
      if (editing) {
        await api.put(`/patients/${editing.id}`, data);
        message.success("Updated successfully");
      } else {
        await api.post("/patients", data);
        message.success("Created successfully");
      }
      fetchPatients(page);
      setFormVisible(false);
      setEditing(null);
    } catch (err) {
      message.error("Operation failed", err);
    }
  };

  const handleDelete = async (id) => {
    try {
      await api.delete(`/patients/${id}`);
      message.success("Deleted successfully");

      const newTotal = total - 1;
      const maxPage = Math.ceil(newTotal / 5);
      fetchPatients(page > maxPage ? maxPage : page);
    } catch (err) {
      message.error("Delete failed", err);
    }
  };

  const columns = [
    { title: "Name", dataIndex: "name" },
    { title: "Email", dataIndex: "email" },
    { title: "Phone", dataIndex: "phone" },
    {
      title: "DOB",
      dataIndex: "dob",
      render: (d) => new Date(d).toLocaleDateString(),
    },
    {
      title: "Actions",
      render: (_, record) => (
        <>
          <Button
            type="link"
            onClick={() => {
              setEditing(record);
              setFormVisible(true);
            }}
          >
            Edit
          </Button>
          <Popconfirm title="Delete?" onConfirm={() => handleDelete(record.id)}>
            <Button type="link" danger>
              Delete
            </Button>
          </Popconfirm>
          <Button type="link" onClick={() => navigate(`/chat/${record.id}`)}>
            Chat
          </Button>
        </>
      ),
    },
  ];

  return (
    <Layout>
      <Button
        type="primary"
        onClick={() => setFormVisible(true)}
        style={{ marginBottom: 16 }}
      >
        Add Patient
      </Button>
      <Table
        columns={columns}
        dataSource={patients}
        rowKey="id"
        loading={loading}
        pagination={{
          current: page,
          pageSize: 5,
          total,
          onChange: (p) => fetchPatients(p),
          showSizeChanger: false,
        }}
      />

      <PatientForm
        open={formVisible}
        onCancel={() => {
          setFormVisible(false);
          setEditing(null);
        }}
        onSubmit={handleCreate}
        initialValues={editing}
      />
    </Layout>
  );
}
