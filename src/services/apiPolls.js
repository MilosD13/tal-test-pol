// src/apiPolls.js
import { authFetch } from "./apiAuth";

const BASE = import.meta.env.VITE_API_BASE_URL;

export async function createPoll(question, optionsArr) {
  const payload = {
    question,
    options: optionsArr.map(text => ({ text }))
  };

  const res = await authFetch("/api/Polls", {
    method: "POST",
    body: JSON.stringify(payload)
  });

  if (!res.ok) {
    // pull the error message from the API
    const txt = await res.text();
    throw new Error(txt || "Failed to create poll");
  }

  return res.json();
}

/**
 * Fetch a poll by its ID (public endpoint).
 * @param {string} id
 */
export async function getPoll(id) {
  const res = await fetch(`${BASE}/api/Polls/${id}`);
  if (!res.ok) {
    const txt = await res.text();
    throw new Error(txt || "Failed to load poll");
  }
  return res.json();
}

export async function getPollSummaries() {
  const res = await fetch(`${BASE}/api/Polls`); // public endpoint
  if (!res.ok) {
    const txt = await res.text();
    throw new Error(txt || "Failed to load polls");
  }
  return res.json(); // returns Array<{ id:string; question:string }>
}

/**
 * Vote on a given option.
 * @param {string} pollId
 * @param {number} optionId
 */
export async function votePoll(pollId, optionId) {
  const res = await authFetch(`/api/Polls/${pollId}/vote`, {
    method: "POST",
    body: JSON.stringify(optionId)
  });

  if (!res.ok) {
    const txt = await res.text();
    throw new Error(txt || "Failed to register vote");
  }

  return res.json();
}
