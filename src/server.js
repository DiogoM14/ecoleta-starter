const express = require("express"); //Variavel express receveu as propriedades da dependencia
const server = express();

//buscar bando de dados
const db = require("./database/db")

//Configurar pasta publica
server.use(express.static("public")); //Basicamente puxa o que está na pasta public

//Habilitar o uso do req.body
server.use(express.urlencoded({extended: true}))

//Template Nunjucks
const nunjucks = require("nunjucks");
nunjucks.configure("src/views", {
  express: server,
  noCache: true,
});

//configurar caminho da app
//pagina home
//req => Requisição = pergunta
//res => Resposta
server.get("/", (req, res) => {
  return res.render("index.html", { title: "Um titulo" }); //__dirname é uma variavel que informa o diretorio onde estou
});

server.get("/create-point", (req, res) => {

  // //req.query: Query string da nossa url
  // console.log(req.query)

  return res.render("create-point.html"); //__dirname é uma variavel que informa o diretorio onde estou
});

server.post("/savepoint", (req, res) => {

  //req.body: O corpo do form
  // console.log(req.body)

    //Inserir dados na tabela
  const query = `
  INSERT INTO places (
    image,
    name,
    address,
    address2,
    district,
    city,
    items
  ) VALUES (
    ?,?,?,?,?,?,?);
`

const values = [
  req.body.image,
  req.body.name,
  req.body.address,
  req.body.address2,
  req.body.district,
  req.body.city,
  req.body.items
]

  function afterInsertData(err, values) { //Função callback, se der erro dá console log
    if(err) {
     console.log(err)
     return res.send("Erro no registo")
    }

    console.log("Registado com sucesso")
    console.log(this) //Não podemos usar arrow function por causa do this

    return res.render("create-point.html", {saved: true})
  }

  db.run(query, values, afterInsertData)  
})

server.get("/search", (req, res) => {

  const search = req.query.search

  if(search == "") {
    //pesquisa vazia
    return res.render("search-results.html", {total: 0});
  }

  //Pegar os dados no banco de dados
  db.all(`SELECT * FROM places WHERE city LIKE '%${search}%'`, function(err, rows) {
    if(err) {
      return console.log(err)
    }

    const total = rows.length

    //Mostrar a página html com os dados da db
    return res.render("search-results.html", {places: rows, total: total}); //__dirname é uma variavel que informa o diretorio onde estou
  })

});

//Ligar o servidor
server.listen(3333);
