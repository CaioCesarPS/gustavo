const { Client, Pool } = require('pg');

const credentials = {user: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    database: process.env.POSTGRES_DB,
    host: process.env.POSTGRES_HOST,
    port: process.env.POSTGRES_PORT
};

async function setup_db() {
    const client = new Client({credentials});
    
    await client.connect();
    try {
        const result = await client.query('SELECT 1 FROM pg_database WHERE datname = $1', [process.env.POSTGRES_DB]);

        if (result.rows.length === 0) {
            await client.query(`CREATE DATABASE ${process.env.POSTGRES_DB}`);
            console.log(`Database '${process.env.POSTGRES_DB}' criada.`);
        } else {
            console.log(`Database '${process.env.POSTGRES_DB}' já existe.`);
        }
    } catch (error) {
        console.error(error);
    }

    try {
        await client.query('CREATE TABLE IF NOT EXISTS curriculos (id_person SERIAL PRIMARY KEY, person_name VARCHAR(60) NOT NULL, phone VARCHAR(15) NOT NULL, email VARCHAR(50) NOT NULL, webpage VARCHAR(50) NOT NULL, experience TEXT NOT NULL)');
        console.log('Tabela currículos criada ou já existe.');
    } catch (error) {
        console.error(error);
    }

    await client.end();
}

async function db_connection() {
    if (global.connection) {
        console.log("Reutilizando conexão existente no PostgreSQL");
        return global.connection;
    }

    const pool = new Pool({
        host: process.env.POSTGRES_HOST,
        user: process.env.POSTGRES_USER,
        password: process.env.POSTGRES_PASSWORD,
        database: process.env.POSTGRES_DB,
    });

    console.log(`postgres://${process.env.POSTGRES_USER}:${process.env.POSTGRES_PASSWORD}@${process.env.POSTGRES_HOST}:${process.env.POSTGRES_PORT}/${process.env.POSTGRES_DB}`);

    const client = await pool.connect();
    console.log("Criou pool de conexões no PostgreSQL!");

    global.connection = client;
    return client;
}

async function get_curriculos() {
    let client;
    try {
        client = await db_connection();
        const res = await client.query('SELECT id_person, person_name, phone, email, webpage, experience FROM curriculos');
        console.log('Rows from database:', res.rows);
        return res.rows;
    } catch (error) {
        console.error('Error in get_curriculos:', error);
        return [];
    } finally {
        if (client) {
            client.release();
        }
    }
}

async function insert_curriculo(person_name, phone, email, webpage, experience) {
    let client;
    try {
        client = await db_connection();
        const query = 'INSERT INTO curriculos (person_name, phone, email, webpage, experience) VALUES ($1, $2, $3, $4, $5)';
        const values = [person_name, phone, email, webpage, experience];
        return await client.query(query, values);
    } catch (error) {
        console.error(error);
    } if (client) {
        client.release();
    }
}

module.exports = { db_connection, get_curriculos, insert_curriculo, setup_db };
