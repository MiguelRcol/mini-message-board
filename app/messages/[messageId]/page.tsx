"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import {
  findMessage,
  formatMessageDate,
  type Message,
} from "../../../lib/browser-messages";

export default function MessageDetailPage() {
  const params = useParams<{ messageId: string }>();
  const [message, setMessage] = useState<Message | null | undefined>(undefined);

  useEffect(() => {
    setMessage(findMessage(Number.parseInt(params.messageId, 10)) ?? null);
  }, [params.messageId]);

  if (message === undefined) {
    return <section className="detail-page" aria-busy="true" />;
  }

  if (message === null) {
    return (
      <section className="error-page">
        <p className="error-code">404</p>
        <p className="eyebrow"><span /> Lost echo</p>
        <h1>Message not found</h1>
        <p>That message seems to have wandered off.</p>
        <a className="button button-primary" href="/">Return home <span aria-hidden="true">→</span></a>
      </section>
    );
  }

  return (
    <section className="detail-page">
      <a className="back-link" href="/">← Back to all messages</a>
      <article className="detail-card">
        <div className="quote-mark" aria-hidden="true">“</div>
        <p className="detail-message">{message.text}</p>
        <div className="detail-author">
          <div className="avatar avatar-large" aria-hidden="true">
            {message.user.charAt(0).toUpperCase()}
          </div>
          <div>
            <h1>{message.user}</h1>
            <time dateTime={message.added}>{formatMessageDate(message.added)}</time>
          </div>
        </div>
        <span className="detail-label">Echo #{String(message.id).padStart(2, "0")}</span>
      </article>
      <div className="detail-actions">
        <p>Have something to add?</p>
        <a className="button button-primary" href="/new">
          Write a message <span aria-hidden="true">↗</span>
        </a>
      </div>
    </section>
  );
}
