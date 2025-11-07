/**
 * /produto
 * 
 * Métodos HTTP
 * - GET: consulta
 * - PUT: alteração
 * - PATCH: alteração parcial
 * - POST: inserção
 * - DELETE: exclusão
 * 
 * /api/produto
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

export function GET(){
    return NextResponse.json(
        [{
            id: 1,
            nome: "Bolacha Trakinas", 
            descricao: "Bolacha recheada, sabor morango", 
            categoria: "Outros", 
            valor: 2.50, 
            estoque: 200, 
            fornecedor: "Unilever"
        }], 
        {status: 200}
    );
}

export function POST(request: any) {
    return NextResponse.json({
        id: 1,
    }, {status: 201})
}
