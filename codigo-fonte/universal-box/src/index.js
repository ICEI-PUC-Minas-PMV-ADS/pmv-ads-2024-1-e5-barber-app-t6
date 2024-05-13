import React from 'react';
import ReactDOM from 'react-dom/client';
import reportWebVitals from './reportWebVitals';
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Home from './routes/Home';
import Produtos from './routes/Produtos';
import CadastroProduto from './routes/CadastroProduto';
import Navbar from './routes/Navbar';
import Clientes from './routes/Clientes';
import CadastroCliente from './routes/CadastroCliente';
import Login from './routes/Login';
import Fornecedores from './routes/Fornecedores';
import CadastroFornecedor from './routes/CadastroFornecedor';
import Pedidos from './routes/Pedidos';
import CadastroPedido from './routes/CadastroPedido';
import './index.css';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />
  },
  {
    path: "produtos",
    element: <Produtos />
  },
  {
    path: "cadastroproduto",
    element: <CadastroProduto />
  },
  {
    path: "navbarcomponent",
    element: <Navbar />
  },
  {
    path: "clientes",
    element: <Clientes />
  },
  {
    path: "cadastrocliente",
    element: <CadastroCliente />
  },
  {
    path: "login",
    element: <Login />
  },
  {
    path: "fornecedores",
    element: <Fornecedores />
  },
  {
    path: "cadastrofornecedor",
    element: <CadastroFornecedor />
  },
  {
    path: "pedidos",
    element: <Pedidos />
  },
  {
    path: "cadastropedido",
    element: <CadastroPedido />
  },
])

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();