import styled, { keyframes } from 'styled-components';
import { shade } from 'polished';

import salonImg from '../../assets/salon.jpeg';

export const Container = styled.div`
    height: 100vh;

    display: flex;
    align-items: stretch;
`;

export const Content = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    width: 100%;
    max-width: 700px;
`;

const appearFromRight = keyframes`
    from {
        opacity: 0;
        transform: translateX(50px);
    }
    to {
        opacity: 1;
        transform: translateX(0);
    }
`;

export const AnimationContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    animation: ${appearFromRight} 2s;

    form {
        margin: 45px 0;
        width: 340px;
        text-align: center;

        h2 {
            margin-bottom: 20px;
        }

        a {
            color: #f4ede8;
            display: block;
            margin-top: 24px;
            text-decoration: none;
            transition: color 0.4s;

            &:hover {
                color: ${shade(0.2, '#f4ede8')};
            }
        }
    }

    > a {
        color: #f7d9ce;
        display: flex;
        align-items: center;

        margin-top: 15px;
        text-decoration: none;
        transition: color 0.4s;

        svg {
            margin-right: 10px;
            color: #cee7f0;
        }

        &:hover {
            color: ${shade(0.2, '#f7d9ce')};
        }
    }
`;

export const Background = styled.div`
    flex: 1;
    background: url(${salonImg}) no-repeat center;
    background-size: cover;
`;
