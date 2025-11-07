'use client'

import { InputNumber } from "@/components/InputNumber";
import { InputText } from "@/components/InputText";
import { cadastroProdutoSchema } from "@/schemas/cadastroProdutoSchema";
import { useFormik } from "formik";
import error from "next/error";
import { Button, Form } from "react-bootstrap";
import { number } from "yup";
import { ChangeEvent, useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { FormularioProdutoTemplate } from "@/components/templates/FormularioProdutoTemplate";
import { IProduto } from "../../IProduto";

export default function Alterar() {
    /**
     * Hooks somente podem ser utilizados dentro de componentes, 
     * ou dentro de um outro hook
     */

    const params = useParams();

    // variavel de estado que armazena o produto retornado pela API
    const [produto, setProduto] = useState<IProduto>();

    useEffect(() => {
        const productId = params.id;

        const buscaProduto = async () => {
            const resposta = await fetch(
                `${process.env.NEXT_PUBLIC_API_HOST}/api/produto/${productId}`,
                {
                    method: "GET",
                }
            );

            const produtoResposta = await resposta.json();
            console.log(produtoResposta.id);
            setProduto(produtoResposta);
        }

        buscaProduto();
    }, []);

    return (
        <FormularioProdutoTemplate produto={produto} />
    );
}