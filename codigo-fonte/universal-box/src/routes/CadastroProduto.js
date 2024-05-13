import React, { useState } from 'react';
import Navbar from './Navbar';

function CadastroProduto() {
  const [produtos, setProdutos] = useState({ ProdutoNome: '', FornecedorNome: '', ProdutoModelo: '', ProdutoPreco: '', ProdutoQuantidade: '' });

  const setInput = (e) => {
    const { name, value } = e.target;
    setProdutos(prevState => ({
      ...prevState,
      [name]: name === 'ProdutoQuantidade' ? parseInt(value) : value,
      [name]: name === 'ProdutoPreco' ? parseFloat(value) : value
    }));
  }

  const createProduto = async () => {
    const newData = await fetch('/criar', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify(produtos)
    })
      .then(res => res.json());
    window.location.href = '/produtos';
  }

  return (
    <div>
      <Navbar />
      <div className="container mt-5">
        <div className="row justify-content-center">
          <div className="col-md-6">
            <div className="card">
              <div className="card-body">
                <h1 className="card-title">Cadastrar Produto</h1>
                <div className="form-group">
                  <input
                    className="form-control mb-3"
                    placeholder="Nome"
                    name="ProdutoNome"
                    value={produtos.ProdutoNome}
                    onChange={setInput} />

                  <input
                    className="form-control mb-3"
                    placeholder="Fornecedor"
                    name="FornecedorNome"
                    value={produtos.FornecedorNome}
                    onChange={setInput} />

                  <input
                    className="form-control mb-3"
                    placeholder="Modelo"
                    name="ProdutoModelo"
                    value={produtos.ProdutoModelo}
                    onChange={setInput} />

                  <input
                    type='number'
                    className="form-control mb-3"
                    placeholder="Preço"
                    name="ProdutoPreco"
                    value={produtos.ProdutoPreco}
                    onChange={setInput} />

                  <input
                    type='number'
                    className="form-control mb-3"
                    placeholder="Quantidade"
                    name="ProdutoQuantidade"
                    value={produtos.ProdutoQuantidade}
                    onChange={setInput} />
                </div>
                <button
                  type="button"
                  className="btn btn-primary btn-block"
                  onClick={createProduto}>
                  Cadastrar Novo Produto
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CadastroProduto;