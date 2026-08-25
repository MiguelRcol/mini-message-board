# Mini Message Board

A small, friendly message board built with Express and EJS. Visitors can read the latest posts, add a message of their own, and open any message on a dedicated detail page.

## Live deployments

- [GitHub Pages](https://miguelrcol.github.io/mini-message-board/)
- [Netlify](https://mini-message-board-miguelrcol.netlify.app/)

## Features

- Server-rendered message list with author, text, and timestamp
- New-message form with server-side validation
- Dedicated detail page for every message
- Custom 404 page
- Responsive, accessible interface
- Route tests with Node's built-in test runner and Supertest

## Built with

- Node.js
- Express
- EJS
- CSS

## Run locally

```bash
git clone https://github.com/MiguelRcol/mini-message-board.git
cd mini-message-board
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

The static GitHub Pages and Netlify deployments use browser storage so each
visitor can try the full message flow without a database. The Express app
continues to use its assignment-ready in-memory array.

## Scripts

```bash
npm start     # Start the app
npm run dev   # Start with automatic restarts
npm test      # Run route tests
npm run build # Validate the static deployment
```

## Project structure

```text
.
├── public/stylesheets/  # Site styles
├── docs/                # Static GitHub Pages and Netlify deployment
├── routes/              # Express routes and in-memory data
├── test/                # Route tests
├── views/               # EJS pages and partials
├── app.cjs              # Express application setup
└── server.cjs           # HTTP server entry point
```

Messages are stored in memory, so new submissions reset whenever the server restarts. This is intentional for the scope of the project.

## License

MIT
