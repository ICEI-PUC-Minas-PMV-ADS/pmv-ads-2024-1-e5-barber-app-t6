import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from './Navbar';

function Fornecedores() {
  const [fornecedores, setFornecedores] = useState([]);
  const [deletarFornecedor, setDeletarFornecedor] = useState({ FornecedorId: '' })


  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/apifornecedor');
        if (!response.ok) {
          throw new Error('Erro ao obter os dados');
        }
        const data = await response.json();
        setFornecedores(data);
      } catch (error) {
        console.error('Erro:', error);
      }
    };

    fetchData();
  }, []);

  const DeleteFornecedor = async () => {
    const newData = await fetch('/deletarfornecedor', {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify(deletarFornecedor)
    })
      .then(res => res.json());
  }


  const DeleteFornecedorState = async (fornecedorId) => {
    console.log(fornecedorId)
    setDeletarFornecedor({ FornecedorId: parseInt(fornecedorId) })
  }

  useEffect(() => {
    if (deletarFornecedor.FornecedorId !== '') {
      DeleteFornecedor();
    }
  }, [deletarFornecedor])

  return (
    <div>
      <Navbar />
      <div className="container mt-5">
        <h2>Lista de Fornecedores</h2>
        <Link to="/cadastrofornecedor" className="btn btn-primary mb-3">Cadastrar Novo Fornecedor</Link>
        <table className="table table-hover">
          <thead>
            <tr>
              <th scope="col">ID</th>
              <th scope="col">Empresa</th>
              <th scope="col">Responsável</th>
              <th scope="col">Telefone</th>
              <th scope="col">CNPJ</th>
            </tr>
          </thead>
          <tbody>
            {fornecedores.map((fornecedor) => (
              <tr key={fornecedor.FornecedorId}>
                <td>{fornecedor.FornecedorId}</td>
                <td>{fornecedor.Empresa}</td>
                <td>{fornecedor.Responsavel}</td>
                <td>{fornecedor.Telefone}</td>
                <td>{fornecedor.Cnpj}</td>
                <td><Button value={"Deletar"} onClick={(fornecedorId) => DeleteFornecedorState(fornecedor.FornecedorId)} /></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Fornecedores