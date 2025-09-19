import InputTextClass from '@/styles/InputText.module.css';
import { ChangeEvent } from 'react';
import { Form } from 'react-bootstrap';

interface InputTextProps {
    label: string;
    inputName: string;
    placeholder?: string;
    value?: string;
    id?: string;
    onChange?: (e: ChangeEvent<any>) => void
}

// props: parametro da função, 
// que recebe todas as propriedades do componente (através de um objeto)
export function InputText(props: InputTextProps) {
    // const label = props.label;
    const { label, inputName, placeholder, value, id, onChange, } 
        = props;

    return (
        <>
            <Form.Label htmlFor={id}>{label}</Form.Label>
            &nbsp;
            <Form.Control id={id} type="text" name={inputName} 
                placeholder={placeholder} value={value}
                onChange={onChange} ></Form.Control>
        </>
    );
}