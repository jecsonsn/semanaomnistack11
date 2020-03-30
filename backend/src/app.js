const express = require('express');
const cors = require('cors');
const {errors} = require('celebrate');
const routes = require('./routes');

const app = express();

app.use(cors());
/**
 * Antes de Todas as requisições
 */
app.use(express.json());

/**
 * Rotas/Recursos
 */

/**
 * Tipo de parâmetros
 * 
 * Query Params: Parâmetros nomeados enviados na rota após "?" (Filtros, paginação)
 * Route Params: Parâmetros utilizados para identificar recursos
 * Request Body: Corpo da requisição, utilizado para criar ou alterar recursos
 */

 /**
  * SQL: MySQL, SQLite, PostgreSQL, Oraacle, Microsoft SQL Server
  * NoSQL: MonogDB, CouchDB, etc
  */

  /**
   * Driver: SELECT * FROM ....
   * Query builder: table('users').select('*').where()
   */
app.use(routes);
app.use(errors());

module.exports = app;