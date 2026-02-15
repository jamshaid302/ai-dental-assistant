import { useState } from "react";
import { Form, Input, Button, Card, message, Typography } from "antd";
import api from "../api/axios";
import { useNavigate } from "react-router-dom";

const { Text } = Typography;

export function Login() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const onFinish = async ({ email, password }) => {
    setLoading(true);
    try {
      const res = await api.post("/auth/login", { email, password });
      localStorage.setItem("token", res.data.token);
      message.success("Login successful");
      navigate("/dashboard");
    } catch (err) {
      message.error(err.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ display: "flex", justifyContent: "center", marginTop: 100 }}>
      <Card title="Login" style={{ width: 400 }}>
        <Form onFinish={onFinish} layout="vertical">
          <Form.Item label="Email" name="email" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item
            label="Password"
            name="password"
            rules={[{ required: true }]}
          >
            <Input.Password />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" loading={loading} block>
              Login
            </Button>
          </Form.Item>
        </Form>

        <div style={{ textAlign: "center", marginTop: 10 }}>
          <Text>Don't have an account? </Text>
          <Button
            type="link"
            onClick={() => navigate("/")}
            style={{ padding: 0 }}
          >
            Sign Up
          </Button>
        </div>
      </Card>
    </div>
  );
}
