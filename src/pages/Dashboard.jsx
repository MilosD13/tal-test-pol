import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import Heading from "../ui/Heading";
import Row from "../ui/Row";
import { getPollSummaries } from "../services/apiPolls";
import Spinner from "../ui/Spinner";

const List = styled.ul`
  list-style: none;
  padding: 0;
  margin: 2rem 0;
  display: grid;
  gap: 0.8rem;
`;

const Item = styled.li`
  background: white;
  padding: 1rem 1.5rem;
  border-radius: 6px;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.05);
`;

const PollLink = styled(Link)`
  text-decoration: none;
  color: var(--color-grey-800);
  font-size: 1.2rem;
  font-weight: 500;

  &:hover {
    color: var(--color-brand-600);
  }
`;

export default function Dashboard() {
  const [polls, setPolls] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    getPollSummaries()
      .then(list => setPolls(list))
      .catch(err => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  return (
    <>
      <Heading as="h1">Polls</Heading>
      <Row>
        {loading && <Spinner size="large" />}
        {error && <p style={{ color: "red" }}>{error}</p>}

        {!loading && !error && (
          <List>
            {polls.map(p => (
              <Item key={p.id}>
                <PollLink to={`/poll/${p.id}`}>{p.question}</PollLink>
              </Item>
            ))}
          </List>
        )}
      </Row>
    </>
  );
}
