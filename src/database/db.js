// importar a dependência do sqlite3
const sqlite3 = require("sqlite3").verbose();

//criar o objeto que irá fazer alterações no banco de dados

const db = new sqlite3.Database("./src/database/database.db") 

module.exports = db

// utilizar o objeto para as operações

db.serialize(() => {
  //Criar uma tabela
  // db.run(`
  //   CREATE TABLE IF NOT EXISTS places (
  //     id INTEGER PRIMARY KEY AUTOINCREMENT,
  //     image TEXT,
  //     name TEXT,
  //     address TEXT,
  //     address2 TEXT,
  //     district TEXT,
  //     city TEXT,
  //     items TEXT
  //   );
  // `)


//   //Inserir dados na tabela
//   const query = `
//   INSERT INTO places (
//     image,
//     name,
//     address,
//     address2,
//     district,
//     city,
//     items
//   ) VALUES (
//     ?,?,?,?,?,?,?);
// `

// const values = [
//   "https://images.unsplash.com/photo-1567393528677-d6adae7d4a0a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60",
//   "Papersider",
//   "Guilherme Gemballa, Jardim América",
//   "Nº260",
//   "Santa Catarina",
//   "Rio do Sul",
//   "Resíduos Eletrónicos, Lâmpadas"
// ]

//   function afterInsertData(err, values) { //Função callback, se der erro dá console log
//     if(err) {
//       return console.log(err)
//     }

//     console.log("Registado com sucesso")
//     console.log(this) //Não podemos usar arrow function por causa do this
//   }

//   db.run(query, values, afterInsertData)

  // // Consultar os dados
  // db.all(`SELECT * FROM places`, function(err, rows) {
  //   if(err) {
  //     return console.log(err)
  //   }

  //   console.log(rows)
  //   console.log("Aqui estão os registos")
  // })

  // // Apagar um dado da tabela
  // db.run(`DELETE FROM places  WHERE id = ?`, [3], function(err, rows) {
  //   if(err) {
  //     return console.log(err)
  //   }

  //   console.log("Apagado com sucesso")
  //   console.log(rows)
  // })


})
