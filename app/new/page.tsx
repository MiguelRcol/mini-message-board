"use client";

import { useState, type FormEvent } from "react";
import { addMessage } from "../../lib/browser-messages";

export default function NewMessagePage() {
  const [messageUser, setMessageUser] = useState("");
  const [messageText, setMessageText] = useState("");
  const [error, setError] = useState<string | null>(null);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const user = messageUser.trim();
    const text = messageText.trim();

    if (!user || !text) {
      setError("Please enter both your name and a message.");
      return;
    }

    addMessage({ user, text });
    window.location.assign("/");
  }

  return (
    <section className="form-page">
      <div className="form-intro">
        <a className="back-link" href="/">← Back to all messages</a>
        <p className="eyebrow"><span /> Add your voice</p>
        <h1>What’s on<br />your <em>mind?</em></h1>
        <p>Share a thought with the board. Short, sweet, and human works best.</p>
        <div className="form-decoration" aria-hidden="true">
          <span>✦</span>
          <div>hello!</div>
        </div>
      </div>

      <div className="form-card">
        <div className="form-card-heading">
          <span>New echo</span>
          <span aria-hidden="true">01</span>
        </div>

        {error && <p className="form-error" role="alert">{error}</p>}

        <form method="POST" action="/new" onSubmit={handleSubmit}>
          <div className="field">
            <label htmlFor="messageUser">Your name</label>
            <input
              id="messageUser"
              name="messageUser"
              type="text"
              value={messageUser}
              onChange={(event) => setMessageUser(event.target.value)}
              placeholder="e.g. Ada"
              maxLength={50}
              autoComplete="name"
              required
            />
          </div>

          <div className="field">
            <label htmlFor="messageText">Your message</label>
            <textarea
              id="messageText"
              name="messageText"
              value={messageText}
              onChange={(event) => setMessageText(event.target.value)}
              placeholder="Leave something worth echoing..."
              maxLength={500}
              rows={6}
              required
            />
            <small>Up to 500 characters</small>
          </div>

          <button className="button button-primary submit-button" type="submit">
            Share your message <span aria-hidden="true">↗</span>
          </button>
        </form>
      </div>
    </section>
  );
}
