import { Layout as AntLayout, Menu } from "antd";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const { Header, Content } = AntLayout;

export default function Layout({ children }) {
  const navigate = useNavigate();
  const [current, setCurrent] = useState("dashboard");

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <AntLayout style={{ minHeight: "100vh" }}>
      <Header>
        <div style={{ float: "right" }}>
          <a onClick={logout} style={{ color: "#fff" }}>
            Logout
          </a>
        </div>
        <Menu
          theme="dark"
          mode="horizontal"
          selectedKeys={[current]}
          onClick={(e) => {
            setCurrent(e.key);
            navigate(`/${e.key}`);
          }}
          items={[{ key: "dashboard", label: "Patients" }]}
        />
      </Header>
      <Content style={{ padding: "20px" }}>{children}</Content>
    </AntLayout>
  );
}
