import { useState, useEffect } from "react";
import { Input, Button, List, Spin, Card } from "antd";
import { useParams } from "react-router-dom";
import api from "../api/axios";
import Layout from "../components/Layout";

export function Chat() {
  const { patientId } = useParams();
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const fetchHistory = async () => {
    try {
      const res = await api.get(`/chat/${patientId}`);
      setMessages(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchHistory();
  }, []);

  const sendMessage = async () => {
    if (!input) return;
    setLoading(true);
    try {
      const res = await api.post("/chat", { patientId, message: input });
      setMessages([
        ...messages,
        { role: "user", message: input },
        { role: "assistant", message: res.data.reply },
      ]);
      setInput("");
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout>
      <Card title="Chat">
        <List
          dataSource={messages}
          renderItem={(item) => (
            <List.Item>
              <b>{item.role}:</b> {item.message}
            </List.Item>
          )}
        />
        {loading && <Spin />}
        <Input.TextArea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          rows={3}
          placeholder="Type your message"
        />
        <Button type="primary" onClick={sendMessage} style={{ marginTop: 8 }}>
          Send
        </Button>
      </Card>
    </Layout>
  );
}
