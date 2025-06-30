import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import styled from "styled-components";
import { getPoll, votePoll } from "../services/apiPolls";

const Page = styled.main`
  min-height: 100vh;
  padding: 4rem 2rem;
  background: var(--color-grey-50);
  display: flex;
  justify-content: center;
  align-items: start;
`;

const Card = styled.div`
  background: white;
  padding: 2.5rem;
  border-radius: 8px;
  width: 100%;
  max-width: 640px;
  box-shadow: 0 3px 12px rgba(0, 0, 0, 0.05);
`;

const BackLink = styled(Link)`
  display: inline-block;
  margin-bottom: 1rem;
  color: var(--color-brand-600);
  text-decoration: none;
  font-weight: 500;

  &:hover {
    text-decoration: underline;
  }
`;

const Title = styled.h1`
  font-size: 2rem;
  margin-bottom: 1.5rem;
  color: var(--color-grey-800);
`;

const OptionsList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 1rem 0 0;
  display: grid;
  gap: 1rem;
`;

const OptionItem = styled.li`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const OptionButton = styled.button`
  flex: 1;
  padding: 0.8rem 1rem;
  font-size: 1rem;
  background: ${p =>
    p.disabled ? "var(--color-grey-200)" : "var(--color-brand-600)"};
  color: white;
  border: none;
  border-radius: 6px;
  cursor: ${p => (p.disabled ? "default" : "pointer")};
  transition: background 0.2s;

  &:hover {
    background: ${p =>
      p.disabled ? "var(--color-grey-200)" : "var(--color-brand-700)"};
  }
`;

const VoteCount = styled.span`
  margin-left: 1rem;
  font-size: 1rem;
  color: var(--color-grey-600);
`;

const Error = styled.div`
  color: #c00;
  margin-top: 1rem;
  text-align: center;
`;

export default function ViewPoll() {
  const { id } = useParams();
  const [poll, setPoll] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [voted, setVoted] = useState(() =>
    Boolean(localStorage.getItem(`voted-${id}`))
  );

  useEffect(() => {
    getPoll(id)
      .then(p => setPoll(p))
      .catch(err => setError(err.message))
      .finally(() => setLoading(false));
  }, [id]);

  const handleVote = async optionId => {
    try {
      setError("");
      await votePoll(id, optionId);
      localStorage.setItem(`voted-${id}`, "1");
      setVoted(true);
      // reload counts
      const updated = await getPoll(id);
      setPoll(updated);
    } catch (err) {
      setError(err.message);
    }
  };

  if (loading)
    return (
      <Page>
        <Card>Loading poll…</Card>
      </Page>
    );
  if (error)
    return (
      <Page>
        <Card>
          <Error>{error}</Error>
        </Card>
      </Page>
    );
  if (!poll)
    return (
      <Page>
        <Card>
          <Error>Poll not found.</Error>
        </Card>
      </Page>
    );

  return (
    <Page>
      <Card>
        <BackLink to="/dashboard">← Back to polls</BackLink>
        <Title>{poll.question}</Title>

        <OptionsList>
          {poll.options.map(opt => (
            <OptionItem key={opt.id}>
              <OptionButton disabled={voted} onClick={() => handleVote(opt.id)}>
                {opt.text}
              </OptionButton>
              <VoteCount>
                {opt.votes} vote{opt.votes !== 1 && "s"}
              </VoteCount>
            </OptionItem>
          ))}
        </OptionsList>

        {voted && <Error>You’ve already voted on this poll.</Error>}
      </Card>
    </Page>
  );
}
