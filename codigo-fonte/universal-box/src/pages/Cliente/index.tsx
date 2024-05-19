import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../../Navbar';
import { AuthContext } from '../../context/AuthContext';
import { Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSortUp, faSortDown } from '@fortawesome/free-solid-svg-icons';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useOrdenacao } from '../../context/useOrdenacao';

interface Cliente {
  ClienteId: string;
  ClienteNome: string;
  ClienteCpf: string;
  ClienteTelefone: string;
  ClienteCep: string;
}

function Clientes() {
  const { email } = useContext(AuthContext);

  console.log(email + "- pagina de clientes");

  const [clientes, setClientes] = useState<Cliente[]>([]);
  const [deletarCliente, setDeletarCliente] = useState<{ ClienteId: string }>({ ClienteId: '' });
  const { itens: clientesOrdenados, solicitarOrdenacao, obterClassNamesPara } = useOrdenacao(clientes);

  useEffect(() => {
    const fetchClientes = async () => {
      try {
        const response = await fetch('/apicliente');
        if (!response.ok) {
          throw new Error('Erro ao obter os dados');
        }
        const data = await response.json();
        setClientes(data);
      } catch (error) {
        console.error('Erro:', error);
      }
    };

    fetchClientes();
  }, []);

  const DeleteCliente = async () => {
    await fetch('/deletarCliente', {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify(deletarCliente)
    }).then(res => res.json());
  };

  const DeleteClienteState = async (clienteId: string) => {
    console.log(clienteId);
    setDeletarCliente({ ClienteId: clienteId });
  };

  useEffect(() => {
    if (deletarCliente.ClienteId !== '') {
      DeleteCliente();
    }
  }, [deletarCliente]);

  const renderIconeOrdenacao = (chave: keyof Cliente) => {
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
        <h2>Lista de Clientes</h2>
        <Link to="/cadastrocliente" className="btn btn-primary mb-3">Cadastrar Novo Cliente</Link>
        <table className="table table-hover">
          <thead>
            <tr>
              <th scope="col" onClick={() => solicitarOrdenacao('ClienteId')} className={obterClassNamesPara('ClienteId')}>
                ID {renderIconeOrdenacao('ClienteId')}
              </th>
              <th scope="col" onClick={() => solicitarOrdenacao('ClienteNome')} className={obterClassNamesPara('ClienteNome')}>
                Nome {renderIconeOrdenacao('ClienteNome')}
              </th>
              <th scope="col" onClick={() => solicitarOrdenacao('ClienteCpf')} className={obterClassNamesPara('ClienteCpf')}>
                CPF {renderIconeOrdenacao('ClienteCpf')}
              </th>
              <th scope="col" onClick={() => solicitarOrdenacao('ClienteTelefone')} className={obterClassNamesPara('ClienteTelefone')}>
                Telefone {renderIconeOrdenacao('ClienteTelefone')}
              </th>
              <th scope="col" onClick={() => solicitarOrdenacao('ClienteCep')} className={obterClassNamesPara('ClienteCep')}>
                CEP {renderIconeOrdenacao('ClienteCep')}
              </th>
              <th scope="col">Ação</th>
            </tr>
          </thead>
          <tbody>
            {clientesOrdenados.map((cliente) => (
              <tr key={cliente.ClienteId}>
                <td>{cliente.ClienteId}</td>
                <td>{cliente.ClienteNome}</td>
                <td>{cliente.ClienteCpf}</td>
                <td>{cliente.ClienteTelefone}</td>
                <td>{cliente.ClienteCep}</td>
                <td><Button onClick={() => DeleteClienteState(cliente.ClienteId)}>Deletar</Button></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Clientes;
