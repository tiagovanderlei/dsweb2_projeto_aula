import InputTextClass from '@/styles/InputText.module.css';
import { Form } from 'react-bootstrap';

interface InputTextProps {
    label: string;
    inputName: string;
    placeholder?: string;
    value?: string;
    id?: string;
}

// props: parametro da função, 
// que recebe todas as propriedades do componente (através de um objeto)
export function InputText(props: InputTextProps) {
    // const label = props.label;
    const { label, inputName, placeholder, value, id } 
        = props;

    return (
        <>
            <Form.Label htmlFor={id}>{label}</Form.Label>
            &nbsp;
            <Form.Control id={id} type="text" name={inputName} 
                placeholder={placeholder} value={value} ></Form.Control>
        </>
    );
}