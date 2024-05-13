import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from './Navbar';

function Produtos() {
  const [produtos, setProdutos] = useState([]);
  const [deletarProduto, setDeletarProduto] = useState({ ProdutoId: '' })

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/api');
        if (!response.ok) {
          throw new Error('Erro ao obter os dados');
        }
        const data = await response.json();
        setProdutos(data);
      } catch (error) {
        console.error('Erro:', error);
      }
    };

    fetchData();
  }, []);

  const DeleteProduto = async () => {
    const newData = await fetch('/deletar', {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify(deletarProduto)
    })
      .then(res => res.json());
  }


  const DeleteProdutoState = async (produtoId) => {
    console.log(produtoId)
    setDeletarProduto({ ProdutoId: parseInt(produtoId) })
  }

  useEffect(() => {
    if (deletarProduto.ProdutoId !== '') {
      DeleteProduto();
    }
  }, [deletarProduto])

  return (
    <div>
      <Navbar />
      <div className="container mt-5">
        <h2>Lista de Produtos</h2>
        <Link to="/cadastroproduto" className="btn btn-primary mb-3">Cadastrar Novo Produto</Link>
        <table className="table table-hover">
          <thead>
            <tr>
              <th scope="col">ID</th>
              <th scope="col">Nome</th>
              <th scope="col">Fornecedor</th>
              <th scope="col">Modelo</th>
              <th scope="col">Preço</th>
              <th scope="col">Quantidade</th>
            </tr>
          </thead>
          <tbody>
            {produtos.map((produto) => (
              <tr key={produto.ProdutoId}>
                <td>{produto.ProdutoId}</td>
                <td>{produto.ProdutoNome}</td>
                <td>{produto.FornecedorNome}</td>
                <td>{produto.ProdutoModelo}</td>
                <td>{produto.ProdutoPreco}</td>
                <td>{produto.Quantidade}</td>
                <td><Button value={"Deletar"} onClick={(produtoId) => DeleteProdutoState(produto.ProdutoId)} /></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Produtos