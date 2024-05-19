import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSortUp, faSortDown } from '@fortawesome/free-solid-svg-icons';
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from '../../Navbar';
import { useOrdenacao } from '../../context/useOrdenacao';

interface Fornecedor {
  FornecedorId: string;
  Empresa: string;
  Responsavel: string;
  Telefone: string;
  Cnpj: string;
}

function Fornecedores() {
  const [fornecedores, setFornecedores] = useState<Fornecedor[]>([]);
  const [deletarFornecedor, setDeletarFornecedor] = useState<{ FornecedorId: string }>({ FornecedorId: '' });
  const { itens: fornecedoresOrdenados, solicitarOrdenacao, obterClassNamesPara } = useOrdenacao(fornecedores);

  useEffect(() => {
    const buscarDados = async () => {
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

    buscarDados();
  }, []);

  const deletarFornecedorAPI = async () => {
    await fetch('/deletarfornecedor', {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify(deletarFornecedor)
    }).then(res => res.json());
  };

  const deletarFornecedorEstado = (fornecedorId: string) => {
    console.log(fornecedorId);
    setDeletarFornecedor({ FornecedorId: fornecedorId });
  };

  useEffect(() => {
    if (deletarFornecedor.FornecedorId !== '') {
      deletarFornecedorAPI();
    }
  }, [deletarFornecedor]);

  const renderIconeOrdenacao = (chave: keyof Fornecedor) => {
    if (!obterClassNamesPara(chave)) {
      return <FontAwesomeIcon icon={faSortUp} className="sort-icon" />;
    }
    if (obterClassNamesPara(chave) === 'ascendente') {
      return <FontAwesomeIcon icon={faSortUp} className="sort-icon" />;
    }
    return <FontAwesomeIcon icon={faSortDown} className="sort-icon" />;
  };

  return (
    <div>
      <Navbar />
      <div className="container mt-5">
        <h2>Lista de Fornecedores</h2>
        <Link to="/cadastrofornecedor" className="btn btn-primary mb-3">Cadastrar Novo Fornecedor</Link>
        <table className="table table-hover">
          <thead>
            <tr>
              <th scope="col" onClick={() => solicitarOrdenacao('FornecedorId')} className={obterClassNamesPara('FornecedorId')}>
                ID {renderIconeOrdenacao('FornecedorId')}
              </th>
              <th scope="col" onClick={() => solicitarOrdenacao('Empresa')} className={obterClassNamesPara('Empresa')}>
                Empresa {renderIconeOrdenacao('Empresa')}
              </th>
              <th scope="col" onClick={() => solicitarOrdenacao('Responsavel')} className={obterClassNamesPara('Responsavel')}>
                Responsável {renderIconeOrdenacao('Responsavel')}
              </th>
              <th scope="col" onClick={() => solicitarOrdenacao('Telefone')} className={obterClassNamesPara('Telefone')}>
                Telefone {renderIconeOrdenacao('Telefone')}
              </th>
              <th scope="col" onClick={() => solicitarOrdenacao('Cnpj')} className={obterClassNamesPara('Cnpj')}>
                CNPJ {renderIconeOrdenacao('Cnpj')}
              </th>
              <th scope="col">Ação</th>
            </tr>
          </thead>
          <tbody>
            {fornecedoresOrdenados.map((fornecedor) => (
              <tr key={fornecedor.FornecedorId}>
                <td>{fornecedor.FornecedorId}</td>
                <td>{fornecedor.Empresa}</td>
                <td>{fornecedor.Responsavel}</td>
                <td>{fornecedor.Telefone}</td>
                <td>{fornecedor.Cnpj}</td>
                <td><Button onClick={() => deletarFornecedorEstado(fornecedor.FornecedorId)}>Deletar</Button></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Fornecedores;
