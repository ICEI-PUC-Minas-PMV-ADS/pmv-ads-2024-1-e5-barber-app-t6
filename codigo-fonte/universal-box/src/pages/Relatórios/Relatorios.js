import jsPDF from "jspdf";
import "jspdf-autotable";
import { format } from "date-fns";
import Status from "../../enums/Status";

const generatePDF = pedidos => {
    const doc = new jsPDF();

    const tableColumn = ["Id", "Produto", "Cliente", "Quantidade", "Data de Entrega", "Status"];
    const tableRows = [];

    pedidos.forEach(pedido => {
        const pedidoData = [
            pedido.PedidoId,
            pedido.ProdutoNome,
            pedido.ClienteNome,
            pedido.Quantidade,
            format(new Date(pedido.DataEntrega), "dd-MM-yyyy"),
            Status[pedido.Status]
        ];
        tableRows.push(pedidoData);
    });

    doc.autoTable(tableColumn, tableRows, { startY: 20 });
    const date = Date().split(" ");
    const dateStr = date[0] + date[1] + date[2] + date[3] + date[4];
    doc.text("Relatório de Pedidos", 14, 15);
    doc.save(`report_${dateStr}.pdf`);
};

export default generatePDF;