const STORAGE_KEY = "echo-message-board";

const SAMPLE_MESSAGES = [
  {
    id: 1,
    text: "Hi there!",
    user: "Amando",
    added: "2026-08-25T19:00:00.000Z",
  },
  {
    id: 2,
    text: "Hello World!",
    user: "Charles",
    added: "2026-08-25T19:05:00.000Z",
  },
];

function getMessages() {
  const stored = window.localStorage.getItem(STORAGE_KEY);

  if (!stored) {
    saveMessages(SAMPLE_MESSAGES);
    return SAMPLE_MESSAGES;
  }

  try {
    const messages = JSON.parse(stored);
    return Array.isArray(messages) ? messages : SAMPLE_MESSAGES;
  } catch {
    saveMessages(SAMPLE_MESSAGES);
    return SAMPLE_MESSAGES;
  }
}

function saveMessages(messages) {
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(messages));
}

function escapeHtml(value) {
  return String(value).replace(/[&<>'"]/g, (character) => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    "'": "&#39;",
    '"': "&quot;",
  })[character]);
}

function formatDate(date) {
  return new Intl.DateTimeFormat("en-US", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(new Date(date));
}

function renderIndex() {
  const messages = getMessages();
  const grid = document.querySelector("#message-grid");
  document.querySelector("#message-count").textContent = messages.length;

  if (messages.length === 0) {
    grid.outerHTML = `
      <div class="empty-state">
        <p>No messages yet. Be the first to say hello.</p>
        <a class="text-link" href="./new.html">Write the first message →</a>
      </div>`;
    return;
  }

  grid.innerHTML = [...messages].reverse().map((message, index) => `
    <article class="message-card" style="--card-index: ${index}">
      <div class="message-meta">
        <div class="avatar" aria-hidden="true">${escapeHtml(message.user.charAt(0).toUpperCase())}</div>
        <div>
          <h3>${escapeHtml(message.user)}</h3>
          <time datetime="${escapeHtml(message.added)}">${escapeHtml(formatDate(message.added))}</time>
        </div>
      </div>
      <p class="message-text">${escapeHtml(message.text)}</p>
      <a class="open-link" href="./message.html?id=${encodeURIComponent(message.id)}" aria-label="Open message from ${escapeHtml(message.user)}">
        Open message <span aria-hidden="true">→</span>
      </a>
    </article>
  `).join("");
}

function setUpForm() {
  const form = document.querySelector("#message-form");

  form.addEventListener("submit", (event) => {
    event.preventDefault();

    const user = form.elements.messageUser.value.trim();
    const text = form.elements.messageText.value.trim();

    if (!user || !text) {
      document.querySelector("#form-error").hidden = false;
      return;
    }

    const messages = getMessages();
    const nextId = messages.reduce((highest, message) => Math.max(highest, message.id), 0) + 1;
    messages.push({ id: nextId, user, text, added: new Date().toISOString() });
    saveMessages(messages);
    window.location.assign("./");
  });
}

function renderMessage() {
  const messageId = Number.parseInt(new URLSearchParams(window.location.search).get("id"), 10);
  const message = getMessages().find((item) => item.id === messageId);
  const root = document.querySelector("#message-detail");

  if (!message) {
    root.innerHTML = `
      <section class="error-page">
        <p class="error-code">404</p>
        <p class="eyebrow"><span></span> Lost echo</p>
        <h1>Message not found</h1>
        <p>That message seems to have wandered off.</p>
        <a class="button button-primary" href="./">Return home <span aria-hidden="true">→</span></a>
      </section>`;
    return;
  }

  document.title = `Message from ${message.user} | Echo`;
  root.innerHTML = `
    <section class="detail-page">
      <a class="back-link" href="./">← Back to all messages</a>
      <article class="detail-card">
        <div class="quote-mark" aria-hidden="true">“</div>
        <p class="detail-message">${escapeHtml(message.text)}</p>
        <div class="detail-author">
          <div class="avatar avatar-large" aria-hidden="true">${escapeHtml(message.user.charAt(0).toUpperCase())}</div>
          <div>
            <h1>${escapeHtml(message.user)}</h1>
            <time datetime="${escapeHtml(message.added)}">${escapeHtml(formatDate(message.added))}</time>
          </div>
        </div>
        <span class="detail-label">Echo #${String(message.id).padStart(2, "0")}</span>
      </article>
      <div class="detail-actions">
        <p>Have something to add?</p>
        <a class="button button-primary" href="./new.html">Write a message <span aria-hidden="true">↗</span></a>
      </div>
    </section>`;
}

const page = document.body.dataset.page;

if (page === "index") renderIndex();
if (page === "new") setUpForm();
if (page === "message") renderMessage();
