import React, { useState, useEffect } from 'react'
import Navbar from './Navbar';
import Select from 'react-select'

function CadastroPedidos() {
  const [returnedData, setReturnedData] = useState('teste use state');
  const [produtos, setProdutos] = useState([]);
  const [clientes, setClientes] = useState([]);
  const [produtoSelecionado, setProdutoSelecionado] = useState({ ProdutoId: '' });
  const [clienteSelecionado, setClienteSelecionado] = useState({ ClienteId: '' });
  const [quantidade, setQuantidade] = useState({ Quantidade: '' })
  const [pedidos, setPedidos] = useState({ ProdutoId: '', ClienteId: '', Quantidade: '' });


  //Buscar valores dos selects
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

  //Alterar state

  const setProdSel = (e) => {
    setProdutoSelecionado({ ProdutoId: parseInt(e.value) });
  }

  const setCliSel = (e) => {
    setClienteSelecionado({ ClienteId: parseInt(e.value) });
  }

  const setInput = (e) => {
    const { name, value } = e.target;
    setQuantidade(prevState => ({
      ...prevState,
      [name]: parseInt(value)
    }));
  }

  //Disparam uma função após a alteração do select

  const createPedidoState = async () => {
    if (quantidade.Quantidade !== '' && quantidade.Quantidade > 0 && clienteSelecionado.ClienteId !== '' && produtoSelecionado.ProdutoId !== '') {
      setPedidos({
        ProdutoId: produtoSelecionado.ProdutoId,
        ClienteId: clienteSelecionado.ClienteId,
        Quantidade: quantidade.Quantidade
      })
      console.log(pedidos)
    }
    else {
      console.log('Alguma informação não foi inserida')
    }
  }

  useEffect(() => {
    if (pedidos.ClienteId !== '' && pedidos.ProdutoId !== '' && pedidos.Quantidade !== '' && pedidos.Quantidade > 0) {
      createPedido()
    }
  }, [pedidos])

  const createPedido = async () => {
    const newData = await fetch('/criarpedido', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify(pedidos)
    })
      .then(res => res.json());
    console.log(newData);
    setReturnedData(newData[0])
  }



  return (
    <div>
      <Navbar />
      <div className="container mt-5">
        <div className="row justify-content-center">
          <div className="col-md-6">
            <div className="card">
              <div className="card-body">
                <h1 className="card-title">Novo Pedido</h1>
                <div className="form-group">
                  <Select
                    placeholder='Produto'
                    options={
                      produtos.map
                        (
                          (produto) => ({ value: produto.ProdutoId, label: produto.ProdutoNome })
                        )}
                    onChange={(e) => setProdSel(e)}
                  />
                  <Select
                    placeholder='Cliente'
                    options={
                      clientes.map
                        (
                          (cliente) => ({ value: cliente.ClienteId, label: cliente.ClienteNome })
                        )}
                    name='ClienteID'
                    onChange={(e) => setCliSel(e)}
                  />
                  <input
                    type='number'
                    className="form-control mb-3"
                    placeholder="Quantidade"
                    name="Quantidade"
                    value={quantidade.Quantidade}
                    onChange={setInput} />
                </div>
                <button
                  type="button"
                  className="btn btn-primary btn-block"
                  onClick={createPedidoState}>
                  Cadastrar Novo Pedido
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CadastroPedidos;