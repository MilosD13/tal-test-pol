import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { login as apiLogin } from "../services/apiAuth";
import { useAuth } from "../context/AuthContext";

const Page = styled.main`
  min-height: 100vh;
  padding: 4rem;
  background: var(--color-grey-50);
  display: flex;
  justify-content: center;
  align-items: start;
`;

const Card = styled.div`
  background: white;
  padding: 2rem;
  border-radius: 8px;
  width: 100%;
  max-width: 600px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
`;

const Form = styled.form`
  display: grid;
  gap: 1rem;
`;

const Input = styled.input`
  padding: 0.8rem;
  font-size: 1rem;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

const Button = styled.button`
  padding: 0.8rem 1.2rem;
  font-size: 1rem;
  background: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;

  &:disabled {
    background: #aaa;
  }
`;

const Error = styled.div`
  color: #c00;
  font-size: 0.9rem;
`;

export default function Login() {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const { token, login, logout } = useAuth();

  // If already logged in, show logout
  if (token) {
    return (
      <Page>
        <Card>
          <h1>Welcome back!</h1>
          <p>You’re already signed in.</p>
          <Button
            onClick={() => {
              logout();
              navigate("/login");
            }}
          >
            Log Out
          </Button>
        </Card>
      </Page>
    );
  }

  const handleSubmit = async e => {
    e.preventDefault();
    setErr("");
    setLoading(true);

    try {
      const newToken = await apiLogin(userName, password);
      login(newToken);
      navigate("/");
    } catch (error) {
      setErr(error.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Page>
      <Card>
        <h1>Sign In</h1>
        <Form onSubmit={handleSubmit}>
          <Input
            type="text"
            placeholder="Username"
            value={userName}
            onChange={e => setUserName(e.target.value)}
            disabled={loading}
            required
          />
          <Input
            type="password"
            placeholder="Password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            disabled={loading}
            required
          />
          {err && <Error>{err}</Error>}
          <Button type="submit" disabled={loading}>
            {loading ? "Signing in…" : "Log In"}
          </Button>
        </Form>
      </Card>
    </Page>
  );
}
