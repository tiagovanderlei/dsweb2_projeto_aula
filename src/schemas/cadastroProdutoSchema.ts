import * as yup from "yup";

export const cadastroProdutoSchema = yup.object().shape ({
    codigo: yup.number().required("Código é origatório!"),
    nome: yup.string().required("Nome é obrigatório!").max(100,"Nome deve ter no máximo 100 caracteres!"),
    descricao: yup.string().required("Descrição é obrigatório").max(500, "Descrição deve conter no máximo 500 caracteres!"),
    categoria: yup.string().required(),
    valor: yup.number().required("Valor é obrigatório!"),
    estoque: yup.number().required("Estoque é obrigatório!"),
    fornecedor: yup.string().required("Forncedor é obrigatório!"),
});
