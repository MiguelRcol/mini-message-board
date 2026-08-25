import type { Metadata } from "next";
import type { ReactNode } from "react";
import "../public/stylesheets/style.css";

export const metadata: Metadata = {
  title: {
    default: "Mini Message Board | Echo",
    template: "%s | Echo",
  },
  description:
    "A friendly little message board for sharing hellos, ideas, and everything in between.",
  openGraph: {
    title: "Mini Message Board | Echo",
    description: "Leave a thought. Start an echo.",
    type: "website",
    images: [{
      url: "https://raw.githubusercontent.com/MiguelRcol/mini-message-board/main/public/og.png",
      width: 1713,
      height: 909,
    }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Mini Message Board | Echo",
    description: "Leave a thought. Start an echo.",
    images: ["https://raw.githubusercontent.com/MiguelRcol/mini-message-board/main/public/og.png"],
  },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&family=Syne:wght@600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <div className="page-shell">
          <SiteHeader />
          <main>{children}</main>
          <SiteFooter />
        </div>
      </body>
    </html>
  );
}

function SiteHeader() {
  return (
    <header className="site-header">
      <a className="brand" href="/" aria-label="Echo message board home">
        <span className="brand-mark" aria-hidden="true">
          <span />
          <span />
          <span />
        </span>
        <span>echo</span>
      </a>
      <nav aria-label="Primary navigation">
        <a className="nav-link" href="/">Messages</a>
        <a className="button button-small" href="/new">
          <span aria-hidden="true">+</span>
          New message
        </a>
      </nav>
    </header>
  );
}

function SiteFooter() {
  return (
    <footer className="site-footer">
      <p>Small messages, shared openly.</p>
      <p>Built with Express + EJS</p>
    </footer>
  );
}
