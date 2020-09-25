/* eslint-disable react/jsx-indent-props */
import React, {
    InputHTMLAttributes,
    useEffect,
    useRef,
    useState,
    useCallback,
} from 'react';
import { IconBaseProps } from 'react-icons';
import { FiAlertCircle } from 'react-icons/fi';
import { useField } from '@unform/core';

import { Container, Error } from './styles';
import Tooltip from '../Tooltip';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
    name: string;
    icon?: React.ComponentType<IconBaseProps>;
}

const Input: React.FC<InputProps> = ({ name, icon: Icon, ...rest }) => {
    // utilizando o ref para poder ter acesso ao input na DOM
    const inputRef = useRef<HTMLInputElement>(null);
    const { fieldName, defaultValue, error, registerField } = useField(name);
    const [isFocused, setIsFocused] = useState(false);
    const [isFilled, setIsFilled] = useState(false);

    // utilizaremos o useCallback no lugar de function pois quando o componente renderizar, ele já estará salvo na memória e caso essa função precise ser atualizada, conseguimos passar para ela
    // se utilizássemos a função, toda vez que o componente fosse renderizado, ela seria renderizada tbm, mesmo sem necessidade
    const handleInputFocus = useCallback(() => {
        setIsFocused(true);
    }, []);

    const handleInputBlur = useCallback(() => {
        setIsFocused(false);

        // inputRef tem algum valor? Se sim, será true, se não, false (!! transforma em boolean)
        setIsFilled(!!inputRef.current?.value);
    }, []); // essa função nunca será recriada pois não passamos nenhuma variável dentro de []

    useEffect(() => {
        registerField({
            name: fieldName,
            // current é onde está o nosso input dentro do inputRef
            ref: inputRef.current,
            // o value retornará o valor do input, onde o path acessará e pegará esse valor
            path: 'value',
        });
    }, [fieldName, registerField]);

    return (
        <Container
            isErrored={!!error}
            isFocused={isFocused}
            isFilled={isFilled}
        >
            {Icon && <Icon size={20} />}
            {/* o defaultValue nos permite setar um valor inicial passando pelo initialData dentro de <Form> */}
            <input
                onFocus={handleInputFocus}
                onBlur={handleInputBlur}
                defaultValue={defaultValue}
                ref={inputRef}
                {...rest}
            />

            {error && (
                <Error title={error}>
                    <FiAlertCircle color="#c53030" size={20} />
                </Error>
            )}
        </Container>
    );
};

export default Input;
