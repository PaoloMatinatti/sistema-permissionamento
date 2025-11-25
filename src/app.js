// src/app.js
const express = require('express');
const cors = require('cors');
const routes = require('./routes');
const swaggerUi = require('swagger-ui-express');
const fs = require('fs');
const yaml = require('js-yaml');
const path = require('path');

const app = express();

app.use(cors());
app.use(express.json());

// Carregar OpenAPI (Swagger)
const swaggerPath = path.join(__dirname, 'docs', 'openapi.yaml');
let swaggerDocument = {};
if (fs.existsSync(swaggerPath)) {
  swaggerDocument = yaml.load(fs.readFileSync(swaggerPath, 'utf8'));
}

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Rotas principais
app.use('/api', routes);

// Tratamento básico de erro
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ mensagem: 'Erro interno do servidor' });
});

module.exports = app;
