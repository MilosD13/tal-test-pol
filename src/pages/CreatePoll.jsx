import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { createPoll } from "../services/apiPolls";

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
  gap: 1.5rem;
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

const OptionRow = styled.div`
  display: flex;
  gap: 0.5rem;
`;

const Error = styled.div`
  color: #c00;
  font-size: 0.9rem;
`;

export default function CreatePoll() {
  const [question, setQuestion] = useState("");
  const [options, setOptions] = useState(["", ""]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const nav = useNavigate();

  const addOption = () => {
    if (options.length < 5) {
      setOptions([...options, ""]);
    }
  };

  const updateOption = (idx, value) => {
    const copy = [...options];
    copy[idx] = value;
    setOptions(copy);
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setError("");
    if (question.trim() === "" || options.some(o => o.trim() === "")) {
      return setError("Please fill in the question and all options.");
    }

    setLoading(true);
    try {
      const payload = {
        question: question.trim(),
        options: options.map(text => ({ text: text.trim() }))
      };

      const created = await createPoll(
        question.trim(),
        options.map(o => o.trim())
      );

      // navigate to the public view of that poll:
      nav(`/poll/${created.id}`);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Page>
      <Card>
        <h1>Create a Poll</h1>
        <Form onSubmit={handleSubmit}>
          <Input
            placeholder="Your poll question…"
            value={question}
            onChange={e => setQuestion(e.target.value)}
            disabled={loading}
            required
          />

          {options.map((opt, i) => (
            <OptionRow key={i}>
              <Input
                placeholder={`Option ${i + 1}`}
                value={opt}
                onChange={e => updateOption(i, e.target.value)}
                disabled={loading}
                required
              />
            </OptionRow>
          ))}

          <Button
            type="button"
            onClick={addOption}
            disabled={options.length >= 5 || loading}
          >
            + Add Option
          </Button>

          {error && <Error>{error}</Error>}

          <Button type="submit" disabled={loading}>
            {loading ? "Creating…" : "Create Poll"}
          </Button>
        </Form>
      </Card>
    </Page>
  );
}
