import { InputText } from "@/components/InputText";

export default function Home() {
  // declaração de variável de texto
  let name: string;
  // atribuição
  name = "João";
  
  // declaração de variável numerica
  const idade: number = 15;

  // if-else: utilizado quando a lógica é muito complexa

  // let message: string;
  // if(idade < 18)
  //   message = "é menor de idade";
  // else
  //   message = "é maior de idade";

  // { name } => permite acessar a variável "name" dentro de um componente
  
  // React Fragment <></>
  return (
    <>
      <h1>Hello World, { name }!</h1>
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
      </h2>
      <div>
        <InputText label="usuário:" inputName="username" 
          placeholder="Nome do usuário" value=""></InputText>
        <br/>
        <label>senha:</label>
        <input type="password"></input>
        <br/>
        <br/>
        <button type="button">entrar</button>
      </div>
    </>
  );
}
