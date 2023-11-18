﻿const express = require("express");
const app = express();
const port = 4000;

app.use(requestLogger);

// Endpoint for returning plain text
app.get("/textmessage", (req, res) => {
  res.send("This is a plain text message. Friday");
});

// Endpoint for returning JSON data
app.get("/jsonmessage", (req, res) => {
  const jsonData = { message: "This is JSON data." };
  res.json(jsonData);
});

// Endpoint for returning HTML content
app.get("/htmlmessage", (req, res) => {
  const htmlContent = `
    <html>
      <body>
        <p>This is HTML content.</p>
      </body>
    </html>`;
  res.send(htmlContent);
});

// Endpoint for greeting the user with the current time in HTML content
app.get("/info", (req, res) => {
  const currentTime = new Date().toLocaleTimeString();
  const htmlResponse = `
    <html>
      <body>
        <h1>Hello, user!</h1>
        <p>Request received at: ${currentTime}</p>
      </body>
    </html>`;

  res.send(htmlResponse);
});

app.use(unknownEndpoint);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

// Middleware functions to handle requests processing and unknown endpoints.
function requestLogger(req, res, next) {
  console.log("Method:", req.method);
  console.log("Path:  ", req.path);
  console.log("======= middleware check =======");
  next();
}

function unknownEndpoint(req, res) {
  res.status(404).send({ error: "unknown endpoint" });
}