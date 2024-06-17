import React from "react";
import { Link } from "react-router-dom";

const RelatorioPedido = ({ pedidos }) => {
    const assignColorToStatus = pedido => {
        if (pedido.Status === "Entregue") {
            return "p-3 mb-2 bg-success text-white";
        } else if (pedido.Status === 'Pendente') {
            return "p-3 mb-2 bg-warning text-dark";
        } else if (pedido.Status === 'Cancelado') {
            return "p-3 mb-2 bg-light text-dark";
        }
    };
    return (
        <div className="container">
            {tickets.length === 0 ? (
                "Não existem pedidos cadastrados"
            ) : (
                <table className="table">
                    <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Produto</th>
                            <th scope="col">Cliente</th>
                            <th scope="col">Quantidade</th>
                            <th scope="col">Data de Entrega</th>
                            <th scope="col">Status</th>
                            <th scope="col"></th>
                        </tr>
                    </thead>
                    <tbody>
                        {pedidos.map(ticket => (
                            <tr key={pedido.PedidoId}>
                                <td>{pedido.PedidoId}</td>
                                <td>{pedido.ProdutoNome}</td>
                                <td>{pedido.ClienteNome}</td>
                                <td>{pedido.Quantidade}</td>
                                <td>{pedido.DataEntrega.toString()}</td>
                                <td className={assignColorToTicketStatus(pedido)}>
                                    {pedido.Status}
                                </td>
                                <td>
                                    <Link to={`/Pedidos/${ticket.id}`}>See comments</Link>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
};

export default RelatorioPedido;