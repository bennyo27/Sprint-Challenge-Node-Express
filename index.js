//imports
const express = require("express");
const port = 9000;

//instantiate server
const server = express();
server.use(express.json());

//import helpers
const projDb = require("./data/helpers/projectModel");
const actionDb = require("./data/helpers/actionModel");
const mapDb = require("./data/helpers/mappers");

//endpoints

// -------------Projects-------------

// Get projects
server.get("/projects", (req, res) => {
  projDb
    .get()
    .then(proj => {
      res.status(200).json(proj);
    })
    .catch(err => console.error(err));
});

// Get project (also returns actions)
server.get("/projects/:id", (req, res) => {
  const { id } = req.params;
  projDb
    .get(id)
    .then(proj => {
      res.status(200).json(proj);
    })
    .catch(err => console.error(err));
});

// Get project actions
server.get("/projects/:id/actions", (req, res) => {
  const { id } = req.params;
  projDb
    .getProjectActions(id)
    .then(proj => res.status(200).json(proj))
    .catch(err => console.error(err));
});

// Post project
server.post("/projects", (req, res) => {
  const { name, description } = req.body;
  newProj = { name, description };
  projDb
    .insert(newProj)
    .then(proj => res.status(200).json(proj))
    .catch(err => console.error(err));
});

// Delete project
server.delete("/projects/:id", (req, res) => {
  const { id } = req.params;
  projDb
    .remove(id)
    .then(proj => res.status(200).json(proj))
    .catch(err => console.error(err));
});

// Put project
server.put("/projects/:id", (req, res) => {
  const { id } = req.params;
  const { name, description } = req.body;
  const newProj = { name, description };
  projDb
    .update(id, newProj)
    .then(proj => {
      res.status(200).json(proj);
    })
    .catch(err => console.error(err));
});

// -------------Actions-------------

// Get actions
server.get("/actions", (req, res) => {
  actionDb
    .get()
    .then(action => {
      res.status(200).json(action);
    })
    .catch(err => console.error(err));
});

// Get action
server.get("/actions/:id", (req, res) => {
  const { id } = req.params;
  actionDb
    .get(id)
    .then(action => {
      res.status(200).json(action);
    })
    .catch(err => console.error(err));
});

// Post action
server.post("/actions", (req, res) => {
  const { project_id, description, notes } = req.body;
  newAction = { project_id, description, notes };
  actionDb
    .insert(newAction)
    .then(action => res.status(200).json(action))
    .catch(err => console.error(err));
});

// Delete action
server.delete("/actions/:id", (req, res) => {
  const { id } = req.params;
  projDb
    .remove(id)
    .then(action => res.status(200).json(action))
    .catch(err => console.error(err));
});

// Put action
server.put("/actions/:id", (req, res) => {
  const { id } = req.params;
  const { project_id, description, notes } = req.body;
  newAction = { project_id, description, notes };
  actionDb
    .update(id, newAction)
    .then(action => {
      res.status(200).json(action);
    })
    .catch(err => console.error(err));
});

// Call server
server.listen(port, () => {
  console.log(`Server is running on ${port}`);
});
