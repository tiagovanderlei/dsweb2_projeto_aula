'use client'

import { InputNumber } from "@/components/InputNumber";
import { InputText } from "@/components/InputText";
import { cadastroProdutoSchema } from "@/schemas/cadastroProdutoSchema";
import { useFormik } from "formik";
import { Button, Form } from "react-bootstrap";
import { useParams } from "next/navigation";
import { IProduto } from "@/app/produtos/IProduto";

interface FormularioProdutoTemplateProps {
    produto?: IProduto;
}

export const FormularioProdutoTemplate = (
    props: FormularioProdutoTemplateProps
) => {

    const  { produto } = props;

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
    const formik = useFormik<FormValues> ({
        initialValues: {
          codigo: produto?.id.toString(),
          nome: produto?.nome,
          descricao: produto?.descricao,
          fornecedor: produto?.fornecedor,
          valor: produto?.valor,
          estoque: produto?.estoque,
          categoria: produto?.categoria,
        },
        enableReinitialize: true,
        validationSchema: cadastroProdutoSchema,
        onSubmit: async (values) => {
          console.log(values);
          const { codigo, ...dadosForm } = values;

          if(values.codigo) {
            // alteracao
            const resposta = await fetch(
                `${process.env.NEXT_PUBLIC_API_HOST}/api/produto/${codigo}`, 
                {
                    body: JSON.stringify(dadosForm),
                    headers: {
                        "Content-Type": "application/json",
                    },
                    method: "PUT"
                }
            );

            if(resposta.status === 200) {
                const resp = await resposta.json();
                console.log(resp)

                alert("Produto alterado com sucesso!");
            } else {
                alert("Erro ao tentar alterar produto");
            }
          } else {
            // cadadstro
            const resposta = await fetch(
                `${process.env.NEXT_PUBLIC_API_HOST}/api/produto`, 
                {
                    body: JSON.stringify(dadosForm),
                    headers: {
                        "Content-Type": "application/json",
                    },
                    method: "POST"
                }
            );

            if(resposta.status === 201) {
                const resp = await resposta.json();
                console.log(resp)

                alert("Produto cadastrado com sucesso!");
            } else {
                alert("Erro ao tentar cadastrar produto");
            }
          }
        }
      });
    
      const { handleSubmit, values, handleChange, errors} = formik;

    return (
        <>  
            <div id="formulario">
                <Form onSubmit={handleSubmit} >
                    <h1> Cadastro de Produtos </h1>

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
