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

export default function Alterar() {
    interface FormValues {
        codigo?: string;
        nome?: string;
        descricao?: string;
        valor?: number;
        estoque?: number;
        fornecedor?: string;
        error?: string | undefined;
        categoria?: string;
    }

    /**
     * Hooks somente podem ser utilizados dentro de componentes, 
     * ou dentro de um outro hook
     */

    const params = useParams();

    // variavel de estado que armazena o produto retornado pela API
    const [produto, setProduto] = useState<any>();

    useEffect(() => {
        const productId = params.id;

        const buscaProduto = async () => {
            const resposta = await fetch(
                `http://localhost:3000/api/produto/${productId}`,
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

    const formik = useFormik<FormValues> ({
        initialValues: {
          codigo: produto?.id,
          nome: produto?.nome,
          descricao: produto?.descricao,
          fornecedor: produto?.fornecedor,
          valor: produto?.valor,
          estoque: produto?.estoque,
          categoria: produto?.categoria,
        },
        enableReinitialize: true,
        validationSchema: cadastroProdutoSchema,
        onSubmit: (values) => {
          console.log(values);
    
        }
      });
    
      const { handleSubmit, values, handleChange, errors} = formik;

    return (
        <>  
            <div id="formulario">
                <Form >
                    <h1> Cadastro de Produtos </h1>

                    <InputText label="Código" inputName="codigo" placeholder="Digite o código do produto" value={values.codigo} onChange={handleChange} id="codigo" error={errors.codigo} />
                    <InputText label="Nome" inputName="nome" placeholder="Digite o nome do produto" value={values.nome} onChange={handleChange} id="nome" error={errors.nome} />
                    <InputText label="Descrição" inputName="descricao" placeholder="Digite a descrição do produto" value={values.descricao} onChange={handleChange} id="descricao" error={errors.codigo} />

                    <Form.Label style={{fontWeight: 700}}>Categoria</Form.Label>
                    <Form.Select 
                        aria-label="Default select example" 
                        name="categoria" 
                        onChange={handleChange} 
                        isInvalid={!!errors.categoria}
                        value={values.categoria}
                    >
                        <option>Escolha a categoria do produto</option>
                        <option value="1">Informática</option>
                        <option value="2">Moveis</option>
                        <option value="3">Eletrodomésticos</option>
                        <option value="4">Vestuario</option>
                        <option value="5">Outros</option>
                    </Form.Select>
                    
                    <InputNumber label="Valor" inputName="valor" placeholder="Digite o valor do produto" value={values.valor} onChange={handleChange} id="valor" error={errors.valor} />
                    <InputNumber label="Estoque" inputName="estoque" placeholder="Digite a quantidade de estoque do produto" value={values.estoque} onChange={handleChange} id="estoque" error={errors.estoque} />

                    <InputText label="Fornecedor" inputName="fornecedor" placeholder="Digite o fornecedor do produto" value={values.fornecedor} onChange={handleChange} id="fornecedor" error={errors.fornecedor} />

                    <Button variant="outline-success" type="submit">Salvar</Button>
                    <Button variant="outline-danger" href="/produtos">Cancelar</Button>
                </Form>
            </div>
        </>

    );
}