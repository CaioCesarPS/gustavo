const pgp = require('pg-promise');

const credentials = {
    user: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    database: process.env.POSTGRES_DB,
    host: process.env.POSTGRES_HOST,
    port: process.env.POSTGRES_PORT
};

async function setup_db() {
    const connection = pgp()('postgres://postgres:postgres@localhost:5432/trabalhog2');
    console.log('Criando tabela caso não exista...')
    await connection.query('CREATE TABLE IF NOT EXISTS curriculos (id_person SERIAL PRIMARY KEY, person_name VARCHAR(60) NOT NULL, phone VARCHAR(15) NOT NULL, email VARCHAR(50) NOT NULL, webpage VARCHAR(50) NOT NULL, experience TEXT NOT NULL)');
    console.log('Tabela currículos criada ou já existe.');
    await connection.$pool.end();
}

module.exports = { setup_db };

