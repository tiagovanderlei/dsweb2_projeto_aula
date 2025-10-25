import InputTextClass from '@/style/InputText.module.css';
import { ChangeEvent } from 'react';
import { Form } from 'react-bootstrap';

interface InputNumberProps { // ela permite que criamos um tipo para objetos
    // no código ela mostra os atributos permitido dentro da tag 
    label?: string;
    inputName: string;
    value?: number;
    placeholder?: string;
    id?: string;
    onChange?: (e: ChangeEvent <any>) => void
    error?: string | undefined;
}


export function InputNumber(props: InputNumberProps) { // props: parametro da função, que recebe todas as propriedades do componente (através de um objeto).

    // const label = props.label; -> aqui tem que escrever propriedade por propriedade.
    const {label, inputName, value, placeholder, id, onChange, error} = props; // pode se colocar mais de uma propriedade

    return (
        <>
        <Form.Label htmlFor={id}>{label}</Form.Label>
        
        <Form.Control id={id} name={inputName} value={value} placeholder={placeholder} onChange={onChange} isInvalid={!!error}></Form.Control>

        <Form.Control.Feedback type="invalid">{error}</Form.Control.Feedback>
        </>
    );
}

