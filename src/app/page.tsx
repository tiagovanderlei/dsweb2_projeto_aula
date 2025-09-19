'use client';

import { InputText } from "@/components/InputText";
import { loginSchema } from "@/schemas/loginSchema";
import { useFormik } from "formik";
import { redirect } from "next/navigation";
import { Button, Form } from "react-bootstrap";

export default function Login() {
  // declaração de variável de texto
  // let name: string;
  // atribuição
  // name = "João";
  
  // declaração de variável numerica
  // const idade: number = 15;

  // if-else: utilizado quando a lógica é muito complexa

  // let message: string;
  // if(idade < 18)
  //   message = "é menor de idade";
  // else
  //   message = "é maior de idade";

  // { name } => permite acessar a variável "name" dentro de um componente
  
  interface FormValues {
    username?: string;
    password?: string;
  }

  // disponibiliza todas as funções necessárias para manipulação do formulário
  const formik = useFormik<FormValues>({
    // valores iniciais do formulario
    initialValues: {
      username: "",
      password: "",
    },
    validationSchema: loginSchema,
    // função disparada quando o formulário é enviado
    onSubmit: (values) => {
      console.log(values);
    }
  });

  const { 
    handleSubmit, 
    values, 
    handleChange,
    errors
  } = formik;

  // 

  // formik.handleSubmit

  // React Fragment <></>
  return (
    <>
      {/* <h1>Hello World, { name }!</h1>
      <h2>
        { 
          idade < 18 ? 
            <span style={
              {
                color: "red", 
                fontWeight: "bold" 
              }
            }>é menor de idade</span> 
          :<span style={{ color: "green" }}>é maior de idade</span> 
        }
      </h2> */}
      <div className="mx-auto my-auto">
      <Form onSubmit={handleSubmit}>
        <InputText label="usuário:" inputName="username" 
          placeholder="Nome do usuário" 
          value={values.username} 
          id="username"
          onChange={handleChange}
          error={errors.username}
        ></InputText>
        
        <br/>
        <label>senha:</label>
        <input 
          type="password" 
          value={values.password}
          onChange={handleChange}
          id="password"
          ></input>
        <br/>
        <br/>
        <Button variant="primary" type="submit">entrar</Button>
      </Form>
      </div>
    </>
  );
}
