/* eslint-disable react/jsx-indent-props */
import React, { useCallback, useRef } from 'react';
import { FiArrowLeft, FiMail, FiLock, FiUser } from 'react-icons/fi';
import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import * as Yup from 'yup';
import { Link, useHistory } from 'react-router-dom';

import getValidationErrors from '../../utils/getValidationErrors';
import api from '../../services/api';

import { Container, Content, AnimationContainer, Background } from './styles';
import logoImg from '../../assets/logo.svg';

import { useToast } from '../../hooks/toast';
import Input from '../../components/Input';
import Button from '../../components/Button';

interface SignUpFormData {
    name: string;
    email: string;
    password: string;
}

const SignUp: React.FC = () => {
    const formRef = useRef<FormHandles>(null);
    const { addToast } = useToast();
    const history = useHistory();

    const handleSubmit = useCallback(
        async (data: SignUpFormData) => {
            try {
                formRef.current?.setErrors({});

                const schema = Yup.object().shape({
                    name: Yup.string().required(
                        'You need to fill in this field',
                    ),
                    email: Yup.string()
                        .required('E-mail is required')
                        .email('Enter a valid e-mail'),
                    password: Yup.string().min(
                        6,
                        'Password at least six digits',
                    ),
                });

                await schema.validate(data, { abortEarly: false });

                await api.post('/users', data);

                history.push('/');

                addToast({
                    type: 'success',
                    title: 'Successful registration',
                    description: 'Now you can logon on Perfect Brows!',
                });
            } catch (err) {
                if (err instanceof Yup.ValidationError) {
                    const errors = getValidationErrors(err);
                    formRef.current?.setErrors(errors);

                    return;
                }
                // disparar um toast
                addToast({
                    type: 'error',
                    title: 'An error happened in the registration!',
                    description: 'Unable to register, try again.',
                });
            }
        },
        [history, addToast],
    );

    return (
        <Container>
            <Background />

            <Content>
                <AnimationContainer>
                    <img
                        src={logoImg}
                        alt="Perfect Brows - Life isn’t perfect but your brows can be!"
                    />

                    <Form ref={formRef} onSubmit={handleSubmit}>
                        <h2>Sign Up</h2>

                        <Input
                            name="name"
                            icon={FiUser}
                            placeholder="Nome"
                            autoComplete="off"
                        />

                        <Input
                            name="email"
                            icon={FiMail}
                            placeholder="E-mail"
                            autoComplete="off"
                        />

                        <Input
                            name="password"
                            icon={FiLock}
                            type="password"
                            placeholder="Password"
                        />

                        <Button type="submit">Register</Button>
                    </Form>

                    <Link to="/">
                        <FiArrowLeft />
                        Sign In
                    </Link>
                </AnimationContainer>
            </Content>
        </Container>
    );
};

export default SignUp;
