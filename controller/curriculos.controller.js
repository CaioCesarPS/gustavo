const pgp = require('pg-promise');

class CurriculosController {
  async getCurriculos(req, res) {
    const connection = pgp()(
      'postgres://postgres:postgres@localhost:5432/trabalhog2'
    );
    const curriculos = await connection.query('SELECT * FROM curriculos');
    await connection.$pool.end();
    res.render('listar', { curriculos });
  }

  async insertCurriculos(req, res) {
    const connection = pgp()(
      'postgres://postgres:postgres@localhost:5432/trabalhog2'
    );
    const { person_name, phone, email, webpage, experience } = req.body;
    const curriculos = await connection.query(
      'INSERT INTO curriculos (person_name, phone, email, webpage, experience) VALUES ($1, $2, $3, $4, $5)',
      [person_name, phone, email, webpage, experience]
    );
    await connection.$pool.end();
    return res.send({ curriculos });
  }
}

module.exports = {
  CurriculosController,
};
