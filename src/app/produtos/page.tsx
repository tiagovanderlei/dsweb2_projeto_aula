'use client';

import Link from "next/link";
import { useEffect, useState } from "react";
import { Alert, Button, Modal, Table } from "react-bootstrap";
import { redirect } from "next/navigation";
import { IProduto } from "./IProduto";

export default function Produtos() {
    const [produtos, setProdutos] 
        = useState<IProduto[]>([]);

    const [produtoExclusao, setProdutoExclusao] 
        = useState<IProduto | null>(null);

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const [showAlert, setShowAlert] = useState(false);

    function ModalExclusao() {

        return (
            <>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                <Modal.Title>Exclusão de Produto</Modal.Title>
                </Modal.Header>
                <Modal.Body>Deseja realmente excluir o produto <b className="text-red-800">{produtoExclusao?.nome}</b>?</Modal.Body>
                <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Fechar
                </Button>
                <Button variant="danger" onClick={async () => {
                    handleClose();
                    // lógica de exclusão
                    const resposta = await fetch(
                        `${process.env.NEXT_PUBLIC_API_HOST}/api/produto/${produtoExclusao?.id}`,
                        {
                            method: "DELETE",
                        }
                    );

                    if(resposta.status === 204) {
                        // exibicao de alerta de sucesso
                        setShowAlert(true);
                    }
                }}>
                    Excluir
                </Button>
                </Modal.Footer>
            </Modal>
            </>
        );
    }

    /**
     * toda "logica" a ser executada no "carregamento" da página
     * useEffect(() => {
     *  // código a ser executado
     * }, []);
     */
    useEffect(() => {
        console.log(">> passo 1");
        fetch(`${process.env.NEXT_PUBLIC_API_HOST}/api/produto`, {
            method: "GET"
        }).then(async (response)=>{
            console.log(">> passo 2");
            // response = resposta da chamada à API

            const resposta = await response.json();
            setProdutos(resposta);

            console.log(resposta);
        });
        console.log(">> passo 3");
        // não depende da resposta da api
    }, []);
    
    return (
        <>
            {
                showAlert ?
                    <Alert variant="success" onClose={() => {
                        setProdutoExclusao(null);
                        setShowAlert(false);
                    }} dismissible>
                        Produto {produtoExclusao?.nome} excluído com sucesso!
                    </Alert>
                : undefined
            }
            <h1>Página de Produtos</h1>
            <Link href="/home">Home</Link>
            <Button variant="primary" href="/produtos/cadastrar">Novo</Button>
            <Table striped bordered hover variant="dark">
                <thead>
                    <tr>
                        <th>Nome</th>
                        <th>Descrição</th>
                        <th>Categoria</th>
                        <th>Valor</th>
                        <th>Estoque</th>
                        <th>Fornecedor</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {
                        produtos.map((produto, index) => {
                            return (
                                <tr 
                                    key={index} 
                                    className="cursor-pointer"
                                    onClick={() => {
                                        redirect(`/produtos/${produto.id}/alterar`)
                                    }}
                                >
                                    <td>{produto.nome}</td>
                                    <td>{produto.descricao}</td>
                                    <td>{produto.categoria}</td>
                                    <td>{produto.valor}</td>
                                    <td>{produto.estoque}</td>
                                    <td>{produto.fornecedor}</td>
                                    <td> 
                                        <div onClick={(e) => {
                                            e.stopPropagation();
                                            setProdutoExclusao(produto);
                                            handleShow();
                                        }}>
                                            <i className="bi bi-trash-fill"></i>
                                        </div>
                                    </td>
                                </tr>
                            )
                        })
                    }
                </tbody>
            </Table>
            <ModalExclusao />
        </>
    );
}