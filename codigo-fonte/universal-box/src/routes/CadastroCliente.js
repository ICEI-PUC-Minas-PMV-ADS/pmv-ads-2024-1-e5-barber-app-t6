import React, { useState } from 'react';
import Navbar from './Navbar';

function CadastroCliente() {
    const [returnedData, setReturnedData] = useState('teste use state');
    const [clientes, setClientes] = useState({ ClienteId: '', ClienteNome: '', ClienteCpf: '', ClienteTelefone: '', ClienteCep: '' });

    const setInput = (e) => {
        const { name, value } = e.target;
        console.log(value);
        setClientes(prevState => ({
            ...prevState,
            [name]: name === 'ClienteId' ? parseInt(value) : value
        }));
    }

    const createCliente = async () => {
        console.log(clientes)
        const newData = await fetch('/criarcliente', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify(clientes)
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
                                <h1 className="card-title">Cadastrar Cliente</h1>
                                <div className="form-group">
                                    <input
                                        type='number'
                                        className="form-control mb-3"
                                        placeholder="ID"
                                        name="ClienteId"
                                        value={clientes.ClienteId}
                                        onChange={setInput} />

                                    <input
                                        className="form-control mb-3"
                                        placeholder="Nome"
                                        name="ClienteNome"
                                        value={clientes.ClienteNome}
                                        onChange={setInput} />

                                    <input
                                        className="form-control mb-3"
                                        placeholder="CPF"
                                        name="ClienteCpf"
                                        value={clientes.ClienteCpf}
                                        onChange={setInput} />

                                    <input
                                        className="form-control mb-3"
                                        placeholder="Telefone"
                                        name="ClienteTelefone"
                                        value={clientes.ClienteTelefone}
                                        onChange={setInput} />

                                    <input
                                        className="form-control mb-3"
                                        placeholder="CEP"
                                        name="ClienteCep"
                                        value={clientes.ClienteCep}
                                        onChange={setInput} />
                                </div>
                                <button
                                    type="button"
                                    className="btn btn-primary btn-block"
                                    onClick={createCliente}>
                                    Cadastrar Novo Cliente
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CadastroCliente;