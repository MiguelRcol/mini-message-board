export type Message = {
  id: number;
  text: string;
  user: string;
  added: string;
};

const STORAGE_KEY = "echo-message-board";

export const SAMPLE_MESSAGES: Message[] = [
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

export function getMessages(): Message[] {
  if (typeof window === "undefined") {
    return SAMPLE_MESSAGES;
  }

  const stored = window.localStorage.getItem(STORAGE_KEY);

  if (!stored) {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(SAMPLE_MESSAGES));
    return SAMPLE_MESSAGES;
  }

  try {
    const parsed = JSON.parse(stored) as Message[];
    return Array.isArray(parsed) ? parsed : SAMPLE_MESSAGES;
  } catch {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(SAMPLE_MESSAGES));
    return SAMPLE_MESSAGES;
  }
}

export function addMessage(input: { user: string; text: string }): Message {
  const messages = getMessages();
  const nextId = messages.reduce((highest, message) => Math.max(highest, message.id), 0) + 1;
  const message: Message = {
    id: nextId,
    user: input.user,
    text: input.text,
    added: new Date().toISOString(),
  };

  window.localStorage.setItem(STORAGE_KEY, JSON.stringify([...messages, message]));
  return message;
}

export function findMessage(messageId: number): Message | undefined {
  return getMessages().find((message) => message.id === messageId);
}

export function formatMessageDate(date: string): string {
  return new Intl.DateTimeFormat("en-US", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(new Date(date));
}
