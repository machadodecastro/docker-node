const express = require('express');
const { Repository } = require('./repository');
const app = express();

app.get('/', async (_, res) => {
  const selectSql = `SELECT * FROM pessoas`;
  const people = await Repository.query(selectSql);

  const title = '<h1>Full Cycle Rocks!!</h1>';
  const list = `
    <ul>
      ${people.map(p => `<li>${p.nome}</li>`).join('')}
    </ul>
  `;

  res.send(title + list);
});

app.listen(3000, () => {
  console.log('Executando na porta 3000');

  const createSql = `
    CREATE TABLE IF NOT EXISTS pessoas (id INT NOT NULL AUTO_INCREMENT, nome VARCHAR(100), PRIMARY KEY (id));
  `;
  Repository.query(createSql);

  const insertSql = `
    INSERT INTO pessoas (nome) values ('AAA'), ('BBB'), ('CCC');
  `;
  Repository.query(insertSql);
});
