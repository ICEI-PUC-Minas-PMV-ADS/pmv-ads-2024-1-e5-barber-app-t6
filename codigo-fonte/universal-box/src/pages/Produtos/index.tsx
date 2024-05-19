import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSortUp, faSortDown } from '@fortawesome/free-solid-svg-icons';
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from '../../Navbar';
import { useOrdenacao } from '../../context/useOrdenacao';

interface Produto {
  ProdutoId: string;
  ProdutoNome: string;
  FornecedorNome: string;
  ProdutoModelo: string;
  ProdutoPreco: number;
  ProdutoQuantidade: string;
}

function Produtos() {
  const [produtos, setProdutos] = useState<Produto[]>([]);
  const [deletarProduto, setDeletarProduto] = useState<{ ProdutoId: string }>({ ProdutoId: '' });
  const { itens: produtosOrdenados, solicitarOrdenacao, obterClassNamesPara } = useOrdenacao(produtos);

  useEffect(() => {
    const buscarDados = async () => {
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

    buscarDados();
  }, []);

  const deletarProdutoAPI = async () => {
    await fetch('/deletar', {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify(deletarProduto)
    }).then(res => res.json());
  };

  const deletarProdutoEstado = (produtoId: string) => {
    console.log(produtoId);
    setDeletarProduto({ ProdutoId: produtoId });
  };

  useEffect(() => {
    if (deletarProduto.ProdutoId !== '') {
      deletarProdutoAPI();
    }
  }, [deletarProduto]);

  const renderIconeOrdenacao = (chave: keyof Produto) => {
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
        <h2>Lista de Produtos</h2>
        <Link to="/cadastroproduto" className="btn btn-primary mb-3">Cadastrar Novo Produto</Link>
        <table className="table table-hover">
          <thead>
            <tr>
              <th scope="col" onClick={() => solicitarOrdenacao('ProdutoId')} className={obterClassNamesPara('ProdutoId')}>
                ID {renderIconeOrdenacao('ProdutoId')}
              </th>
              <th scope="col" onClick={() => solicitarOrdenacao('ProdutoNome')} className={obterClassNamesPara('ProdutoNome')}>
                Nome {renderIconeOrdenacao('ProdutoNome')}
              </th>
              <th scope="col" onClick={() => solicitarOrdenacao('FornecedorNome')} className={obterClassNamesPara('FornecedorNome')}>
                Fornecedor {renderIconeOrdenacao('FornecedorNome')}
              </th>
              <th scope="col" onClick={() => solicitarOrdenacao('ProdutoModelo')} className={obterClassNamesPara('ProdutoModelo')}>
                Modelo {renderIconeOrdenacao('ProdutoModelo')}
              </th>
              <th scope="col" onClick={() => solicitarOrdenacao('ProdutoPreco')} className={obterClassNamesPara('ProdutoPreco')}>
                Preço {renderIconeOrdenacao('ProdutoPreco')}
              </th>
              <th scope="col" onClick={() => solicitarOrdenacao('ProdutoQuantidade')} className={obterClassNamesPara('ProdutoQuantidade')}>
                Quantidade {renderIconeOrdenacao('ProdutoQuantidade')}
              </th>
              <th scope="col">Ação</th>
            </tr>
          </thead>
          <tbody>
            {produtosOrdenados.map((produto) => (
              <tr key={produto.ProdutoId}>
                <td>{produto.ProdutoId}</td>
                <td>{produto.ProdutoNome}</td>
                <td>{produto.FornecedorNome}</td>
                <td>{produto.ProdutoModelo}</td>
                <td>{produto.ProdutoPreco}</td>
                <td>{produto.ProdutoQuantidade}</td>
                <td><Button onClick={() => deletarProdutoEstado(produto.ProdutoId)}>Deletar</Button></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Produtos;
