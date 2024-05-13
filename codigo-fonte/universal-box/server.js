const express = require('express'),
     Produto = require('./dbFiles/produto'),
     Cliente = require('./dbFiles/cliente'),
     cors = require('cors'),
     bodyParser = require('body-parser'),
     sql = require('mysql2/promise')
     ;

const API_PORT = process.env.PORT || 5000;
const app = express();
const config = {
     host: 'universalbox.c56eiikm60x9.us-east-2.rds.amazonaws.com',
     user: 'admin',
     database: 'UniversalBox',
     password: '12345678',
     port: process.env.DB_PORT || 3307
}

let cliente;
let sessao;
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());

//#region Produtos
app.get('/api', async (req, res) => {
     try {
          let pool = await sql.createPool(config);
          let produtos = await pool.query(`SELECT * from UniversalBox.Produtos`)
          res.send(produtos[0]);

     }
     catch (error) {
          console.log(error);
     }
});

app.post('/criar', async (req, res) => {
     try {
          let pool = await sql.createPool(config);
          let criarProdutos = await pool.query(
               `INSERT INTO UniversalBox.Produtos
          (ProdutoNome, FornecedorNome, ProdutoModelo, ProdutoPreco, Quantidade)
          VALUES
               ('${req.body.ProdutoNome}',
               '${req.body.FornecedorNome}',
               '${req.body.ProdutoModelo}',
               ${req.body.ProdutoPreco},
               ${req.body.ProdutoQuantidade}
          )`,
          )
          let produtos = await pool.query(`SELECT * from UniversalBox.Produtos`)
          res.send(produtos[0]);
     }
     catch (error) {
          console.log(error);
     }
});

app.delete('/deletar', async (req, res) => {
     try {
          console.log(req.body.ProdutoId)
          let pool = await sql.createPool(config);
          let deletarProduto = await pool.query(
               `DELETE FROM UniversalBox.Produtos
               WHERE ProdutoId = ${req.body.ProdutoId}
          `)
     }
     catch (error) {
          console.log(error);
     }
})
//#endregion

//#region Clientes

app.get('/apicliente', async (req, res) => {
     try {
          let pool = await sql.createPool(config);
          let clientes = await pool.query(`SELECT * from UniversalBox.Clientes`);
          res.send(clientes[0]);
     }
     catch (error) {
          console.log(error);
     }
});


app.post('/criarcliente', async (req, res) => {
     try {
          let pool = await sql.createPool(config);
          let criarClientes = await pool.query(
               `INSERT INTO UniversalBox.Clientes
          (ClienteNome, ClienteCpf, ClienteTelefone, ClienteCep)
          VALUES
                  ('${req.body.ClienteNome}',
                  '${req.body.ClienteCpf}',
                  '${req.body.ClienteTelefone}',
                  '${req.body.ClienteCep}')`
          )
          let clientes = await pool.query(`SELECT * from UniversalBox.Clientes`);
          res.send(clientes[0]);
     }
     catch (error) {
          console.log(error);
     }
});

app.delete('/deletarCliente', async (req, res) => {
     try {
          console.log(req.body.ClienteId)
          let pool = await sql.createPool(config);
          let deletarCliente = await pool.query(
               `DELETE FROM UniversalBox.Clientes
               WHERE ClienteId = ${req.body.ClienteId}
          `)
     }
     catch (error) {
          console.log(error);
     }
})

//#endregion

//#region Pedidos
app.get('/apipedido', async (req, res) => {
     try {
          let pool = await sql.createPool(config);
          let pedidos = await pool.query(
               `SELECT pe.PedidoId, pr.ProdutoNome, cl.ClienteNome, pe.Quantidade
               FROM UniversalBox.Pedidos pe
               JOIN UniversalBox.Produtos pr ON pr.ProdutoId = pe.ProdutoId
               JOIN UniversalBox.Clientes cl ON cl.ClienteId = pe.ClienteId`);
          res.send(pedidos[0]);
     }
     catch (error) {
          console.log(error);
     }
});


app.post('/criarpedido', async (req, res) => {
     try {
          let pool = await sql.createPool(config);
          let criarPedidos = await pool.query(
               `INSERT INTO UniversalBox.Pedidos
                    (ProdutoId, ClienteId, Quantidade)
                    VALUES
                   ('${req.body.ProdutoId}',
                  '${req.body.ClienteId}',
                   '${req.body.Quantidade}')`
          )
          let ajusteQuantidade = await pool.query(
               `UPDATE UniversalBox.Produtos p
               join UniversalBox.Pedidos pe on pe.ProdutoId = p.ProdutoId
               SET p.Quantidade = p.Quantidade - pe.Quantidade
               WHERE p.ProdutoId = ${req.body.ProdutoId}`
          )

          let pedidos = await pool.query(`SELECT * from UniversalBox.Pedidos`);
          res.send(pedidos[0]);
     }
     catch (error) {
          console.log(error);
     }
});

app.delete('/deletarpedido', async (req, res) => {
     try {
          let pool = await sql.createPool(config);
          let deletarPedido = await pool.query(
               `DELETE FROM UniversalBox.Pedidos
               WHERE PedidoId = ${req.body.PedidoId}
          `)
     }
     catch (error) {
          console.log(error);
     }
})
//#endregion

//# Fornecedores
app.get('/apifornecedor', async (req, res) => {
     try {
          let pool = await sql.createPool(config);
          let fornecedores = await pool.query(
               `SELECT * from UniversalBox.Fornecedores`);
          res.send(fornecedores[0]);
     }
     catch (error) {
          console.log(error);
     }
});


app.post('/criarfornecedor', async (req, res) => {
     try {
          let pool = await sql.createPool(config);
          let criarFornecedores = await pool.query(
               `INSERT INTO UniversalBox.Fornecedores (Empresa, Responsavel, Telefone, Cnpj) VALUES
               ('${req.body.FornecedorEmpresa}',
               '${req.body.FornecedorResponsavel}',
               '${req.body.FornecedorTelefone}',
               '${req.body.FornecedorCnpj}')`
          )
          let fornecedores = await pool.query(`SELECT * from UniversalBox.Pedidos`);
          res.send(fornecedores[0]);
     }
     catch (error) {
          console.log(error);
     }
});

app.delete('/deletarfornecedor', async (req, res) => {
     try {
          console.log(req.body.ClienteId)
          let pool = await sql.createPool(config);
          let deletarPedido = await pool.query(
               `DELETE FROM UniversalBox.Fornecedores
               WHERE FornecedorId = ${req.body.FornecedorId}
          `)
     }
     catch (error) {
          console.log(error);
     }
})
//#endregion

//#region Usuarios

// UsuarioId, Email, Username, Senha (ID é auto increment, não precisa passar o valor pra criar)

app.get('/apilogin', async (req, res) => {
     try {
          let pool = await sql.createPool(config);
          let usuarios = await pool.query(
               `SELECT * FROM UniversalBox.Usuarios`);
          res.send(pedidos[0]);
     }
     catch (error) {
          console.log(error);
     }
});

//#endregion
app.listen(API_PORT, () => console.log(`ouvindo ${API_PORT}`));