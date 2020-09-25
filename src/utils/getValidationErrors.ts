import { ValidationError } from 'yup';

interface Errors {
    // a chave poderá ser qlqr string, como: nome, email, password...
    [key: string]: string;
}

export default function getValidationErrors(err: ValidationError): Errors {
    const validationErros: Errors = {};

    err.inner.forEach(error => {
        validationErros[error.path] = error.message;
    });

    return validationErros;
}
