/**
 * /produto
 * 
 * Métodos HTTP
 * - GET: consulta por id
 * - PUT: alteração
 * - PATCH: alteração parcial
 * - DELETE: exclusão
 * 
 * /api/produto/[id]
 * 
 * HTTP status code:
 * - 200 sucesso
 * - 201 created
 * - 401 unauthorized
 * - 404 not found
 * - 500 internal server error
 * - 400 bad request
 */

import { NextResponse } from "next/server";

export function GET(request: any, { params }: any){
    
    return NextResponse.json(
        {
            id: Number(params.id),
            nome: "Bolacha Trakinas", 
            descricao: "Bolacha recheada, sabor morango", 
            categoria: "5", 
            valor: 2.50, 
            estoque: 200, 
            fornecedor: "Unilever"
        }, 
        {status: 200}
    );
}

export function PUT(request: any, { params }: any){
    return NextResponse.json(
        {
            id: Number(params.id),
        }, 
        {status: 200}
    );
}

export function DELETE(request: any, { params }: any){
    return new NextResponse(
        null,
        {status: 204}
    );
}
