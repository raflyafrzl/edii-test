const {Client} = require("pg")


const client = new Client({
    host: '127.0.0.1',
    port: 5432,
    database: 'edii',
    user: 'postgres',
    password: 'postgres',
  })
  module.exports = client