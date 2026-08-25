"use client";

import { useEffect, useState, type CSSProperties } from "react";
import {
  formatMessageDate,
  getMessages,
  SAMPLE_MESSAGES,
  type Message,
} from "../lib/browser-messages";

export default function HomePage() {
  const [messages, setMessages] = useState<Message[]>(SAMPLE_MESSAGES);

  useEffect(() => {
    setMessages(getMessages());
  }, []);

  return (
    <>
      <section className="hero" aria-labelledby="page-title">
        <div className="hero-copy">
          <p className="eyebrow"><span /> Community board</p>
          <h1 id="page-title">Leave a thought.<br /><em>Start an echo.</em></h1>
          <p className="hero-intro">
            A tiny corner of the internet for hellos, ideas, and everything in between.
          </p>
          <a className="button button-primary" href="/new">
            Write a message <span aria-hidden="true">↗</span>
          </a>
        </div>
        <div className="hero-art" aria-hidden="true">
          <div className="orb orb-large" />
          <div className="orb orb-medium" />
          <div className="orb orb-small" />
          <div className="spark spark-one">✦</div>
          <div className="spark spark-two">✦</div>
          <div className="hero-note">say<br />something<br /><strong>kind</strong></div>
        </div>
      </section>

      <section className="messages-section" aria-labelledby="latest-heading">
        <div className="section-heading">
          <div>
            <p className="eyebrow"><span /> From the community</p>
            <h2 id="latest-heading">Latest echoes</h2>
          </div>
          <p className="message-count"><strong>{messages.length}</strong> messages shared</p>
        </div>

        {messages.length === 0 ? (
          <div className="empty-state">
            <p>No messages yet. Be the first to say hello.</p>
            <a className="text-link" href="/new">Write the first message →</a>
          </div>
        ) : (
          <div className="message-grid">
            {[...messages].reverse().map((message, index) => (
              <article
                className="message-card"
                style={{ "--card-index": index } as CSSProperties}
                key={message.id}
              >
                <div className="message-meta">
                  <div className="avatar" aria-hidden="true">
                    {message.user.charAt(0).toUpperCase()}
                  </div>
                  <div>
                    <h3>{message.user}</h3>
                    <time dateTime={message.added}>{formatMessageDate(message.added)}</time>
                  </div>
                </div>
                <p className="message-text">{message.text}</p>
                <a
                  className="open-link"
                  href={`/messages/${message.id}`}
                  aria-label={`Open message from ${message.user}`}
                >
                  Open message <span aria-hidden="true">→</span>
                </a>
              </article>
            ))}
          </div>
        )}
      </section>
    </>
  );
}
