/* eslint-disable react/jsx-indent-props */
import React, { useRef, useCallback } from 'react';
import { FiLogIn, FiMail, FiLock } from 'react-icons/fi';
import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import * as Yup from 'yup';
import { Link, useHistory } from 'react-router-dom';

import { useAuth } from '../../hooks/auth';
import { useToast } from '../../hooks/toast';

import { Container, Content, AnimationContainer, Background } from './styles';
import logoImg from '../../assets/logo.svg';

import Input from '../../components/Input';
import Button from '../../components/Button';
import getValidationErrors from '../../utils/getValidationErrors';

interface SignInFormData {
    email: string;
    password: string;
}

const SignIn: React.FC = () => {
    const formRef = useRef<FormHandles>(null);

    const { signIn } = useAuth();
    const { addToast } = useToast();
    const history = useHistory();

    const handleSubmit = useCallback(
        async (data: SignInFormData) => {
            try {
                formRef.current?.setErrors({});

                const schema = Yup.object().shape({
                    email: Yup.string()
                        .required('E-mail is required')
                        .email('Enter a valid e-mail'),
                    password: Yup.string().required('Password is required'),
                });

                await schema.validate(data, { abortEarly: false });

                history.push('/dashboard');

                await signIn({
                    email: data.email,
                    password: data.password,
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
                    title: 'An error happened!',
                    description: 'Unable to login, try again.',
                });
            }
        },
        [signIn, addToast, history],
    );

    return (
        <Container>
            <Content>
                <AnimationContainer>
                    <img
                        src={logoImg}
                        alt="Perfect Brows - Life isn’t perfect but your brows can be!"
                    />

                    <Form ref={formRef} onSubmit={handleSubmit}>
                        <h2>Sign In</h2>

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

                        <Button type="submit">Log In</Button>

                        <a href="forgot">Forgot my password</a>
                    </Form>

                    <Link to="/signup">
                        <FiLogIn />
                        Create Account
                    </Link>
                </AnimationContainer>
            </Content>

            <Background />
        </Container>
    );
};

export default SignIn;
