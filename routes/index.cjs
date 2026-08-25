const express = require("express");

const router = express.Router();

const messages = [
  {
    id: 1,
    text: "Hi there!",
    user: "Amando",
    added: new Date(),
  },
  {
    id: 2,
    text: "Hello World!",
    user: "Charles",
    added: new Date(),
  },
];

let nextMessageId = 3;

router.get("/", (req, res) => {
  res.render("index", {
    title: "Mini Message Board",
    messages: [...messages].reverse(),
  });
});

router.get("/new", (req, res) => {
  res.render("form", {
    title: "New message",
    error: null,
    values: { messageUser: "", messageText: "" },
  });
});

router.post("/new", (req, res) => {
  const messageUser = req.body.messageUser?.trim();
  const messageText = req.body.messageText?.trim();

  if (!messageUser || !messageText) {
    return res.status(400).render("form", {
      title: "New message",
      error: "Please enter both your name and a message.",
      values: { messageUser, messageText },
    });
  }

  messages.push({
    id: nextMessageId++,
    text: messageText,
    user: messageUser,
    added: new Date(),
  });

  return res.redirect("/");
});

router.get("/messages/:messageId", (req, res, next) => {
  const messageId = Number.parseInt(req.params.messageId, 10);
  const message = messages.find((item) => item.id === messageId);

  if (!message) {
    return next();
  }

  return res.render("message", {
    title: `Message from ${message.user}`,
    message,
  });
});

module.exports = router;
