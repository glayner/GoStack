const express = require('express');

const server = express();
server.use(express.json());

const proj = [];

let cont = 0
server.use((req, res, next) => {
  console.log(`Numero de requisições: ${++cont}`);
  return next();
})

function checkIdExists(req, res, next) {
  const { id } = req.params;
  if (!proj.find(p => p.id === id)) {
    return res.status(400).json({
      erro: "Project not found"
    });
  }
  return next();
}

server.post('/projects', (req, res) => {
  const { id, title } = req.body;
  proj.push({ id, title, tasks: [] });

  return res.json(proj);
})

server.get('/projects', (req, res) => {
  return res.json(proj);
})

server.put('/projects/:id', checkIdExists, (req, res)=>{
  const {id} = req.params;
  const {title} = req.body;
  const project = proj.find(p => p.id === id);
  project.title = title;
  return res.json(project);
})

server.delete('/projects/:id', checkIdExists, (req, res) => {
  const { id } = req.params;
  const projectIndex = proj.findIndex(p => p.id === id);
  proj.splice(projectIndex, 1);
  return res.send();
})

server.post('/projects/:id/tasks', checkIdExists, (req, res) => {
  const { id } = req.params;
  const { title } = req.body;
  const project = proj.find(p => p.id === id);
  project.tasks.push(title)

  return res.json(project)
})


server.listen(3001);