import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import Navbar from '../../Navbar';

interface Pedido {
  PedidoId: number;
  ProdutoNome: string;
  ClienteNome: string;
  Quantidade: number;
}

function Pedidos() {
  const [pedidos, setPedidos] = useState<Pedido[]>([]);
  const [deletarPedido, setDeletarPedido] = useState<{ PedidoId: number | null }>({ PedidoId: null });

  useEffect(() => {
    const fetchPedidos = async () => {
      try {
        const response = await fetch('/apiPedido');
        if (!response.ok) {
          throw new Error('Erro ao obter os dados');
        }
        const data = await response.json();
        setPedidos(data);
      } catch (error) {
        console.error('Erro:', error);
      }
    };

    fetchPedidos();
  }, []);

  const DeletePedido = async () => {
    await fetch('/deletarPedido', {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify(deletarPedido)
    }).then(res => res.json());
  };

  const DeletePedidoState = async (pedidoId: number) => {
    console.log(pedidoId);
    setDeletarPedido({ PedidoId: pedidoId });
  };

  useEffect(() => {
    if (deletarPedido.PedidoId !== null) {
      DeletePedido();
    }
  }, [deletarPedido]);

  return (
    <div>
      <Navbar />
      <div className="container mt-5">
        <h2>Lista de Pedidos</h2>
        <Link to="/cadastroPedido" className="btn btn-primary mb-3">Cadastrar Novo Pedido</Link>
        <table className="table table-hover">
          <thead>
            <tr>
              <th scope="col">ID</th>
              <th scope="col">Produto</th>
              <th scope="col">Cliente</th>
              <th scope="col">Quantidade</th>
              <th scope="col">Ações</th>
            </tr>
          </thead>
          <tbody>
            {pedidos.map((pedido) => (
              <tr key={pedido.PedidoId}>
                <td>{pedido.PedidoId}</td>
                <td>{pedido.ProdutoNome}</td>
                <td>{pedido.ClienteNome}</td>
                <td>{pedido.Quantidade}</td>
                <td><Button onClick={() => DeletePedidoState(pedido.PedidoId)}>Deletar</Button></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Pedidos;
