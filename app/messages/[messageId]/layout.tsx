import type { Metadata } from "next";
import type { ReactNode } from "react";
import { SAMPLE_MESSAGES } from "../../../lib/browser-messages";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ messageId: string }>;
}): Promise<Metadata> {
  const { messageId: rawMessageId } = await params;
  const messageId = Number.parseInt(rawMessageId, 10);
  const message = SAMPLE_MESSAGES.find((item) => item.id === messageId);

  if (!message) {
    return {
      title: "Message detail",
      description: "Read a message shared on Echo.",
      openGraph: { images: [] },
      twitter: { images: [] },
    };
  }

  return {
    title: `Message from ${message.user}`,
    description: message.text,
    openGraph: {
      title: `Message from ${message.user}`,
      description: message.text,
      images: [],
    },
    twitter: {
      title: `Message from ${message.user}`,
      description: message.text,
      images: [],
    },
  };
}

export default function MessageLayout({ children }: { children: ReactNode }) {
  return children;
}
