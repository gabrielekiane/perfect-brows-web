import styled from 'styled-components';
import { shade } from 'polished';
    
export const Container = styled.button`
    background: #f7d9ce;
    color: #312e38;
    font-weight: bold;

    width: 100%;
    height: 56px;
    padding: 0 16px;
    margin-top: 16px;

    border-radius: 10px;
    border: 0;
    transition: background 0.4s;

    &:hover {
        background: ${shade(0.2, '#f7d9ce')};
    }
`;
