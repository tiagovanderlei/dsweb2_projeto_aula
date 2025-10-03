'use client'

import { useState } from "react";
import { Button, Form } from "react-bootstrap";

let total: number = 0;
let operacao: string = "";

export default function Calculadora() {
    // variaveis de estado
    const [visor, setVisor] = useState<string>("");

    console.log(total);

    const adicionaDigito = (digito: number) => {
        setVisor(`${visor}${digito}`);
    }

    const removeUltimoDigito = () => {
        const novoVisor = visor.slice(0, -1);
        setVisor(novoVisor);
    }

    const subtracao = (a: number, b: number) => {
        return a - b;
    }

    return (
        <div>
            <Form.Control type="text" value={visor} />
            <Button onClick={() => adicionaDigito(1)}>1</Button>
            <Button onClick={() => adicionaDigito(2)}>2</Button>

            <Button>+</Button>
            <Button onClick={() => {
                operacao = "-";
                total = parseInt(visor);
                setVisor("");
            }}>-</Button>
            <Button onClick={() => {
                if (operacao === "-")
                    total = subtracao(total, parseInt(visor));

                setVisor(total.toString());
            }}>=</Button>

            <Button onClick={() => setVisor("")}>Apagar</Button>
            <Button onClick={() => removeUltimoDigito()}>{"<-"}</Button>
            
        </div>
    );
}