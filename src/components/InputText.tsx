interface InputTextProps {
    label: string;
    inputName: string;
    placeholder?: string;
    value?: string;
}

// props: parametro da função, 
// que recebe todas as propriedades do componente (através de um objeto)
export function InputText(props: InputTextProps) {
    // const label = props.label;
    const { label, inputName, placeholder, value } 
        = props;

    return (
        <>
            <label>{label}</label>
            <input type="text" name={inputName} 
                placeholder={placeholder} value={value} ></input>
        </>
    );
}