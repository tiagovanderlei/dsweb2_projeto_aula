'use client';

import Link from "next/link";
import { useEffect, useState } from "react";
import { Button, Table } from "react-bootstrap";
import { redirect } from "next/navigation";
import { IProduto } from "./IProduto";

export default function Produtos() {
    const [produtos, setProdutos] 
        = useState<IProduto[]>([]);
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
                                </tr>
                            )
                        })
                    }
                </tbody>
            </Table>
        </>
    );
}