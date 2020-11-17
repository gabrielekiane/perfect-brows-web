import { Request, Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';

import AppError from '../errors/AppError';
import authConfig from '../config/auth';

interface TokenPayload {
    iat: number;
    exp: number;
    sub: string;
}

export default function ensureAuthenticated(
    request: Request,
    response: Response,
    next: NextFunction
): void {
    // validação do token JWT
    // pegando o token de dentro do header:
    const authHeader = request.headers.authorization;

    if (!authHeader) {
        throw new AppError('JWT token is missing', 401);
    }

    // splitando o bearer do token
    // desestruturando ficaria [type, token], mas como não quero o type (bearer), posso apenas deixar vazio, sem variável, apenas com a vírgula
    // pois a vírgula vai indicar que você n quer a primeira posição:
    const [, token] = authHeader.split(' ');

    try {
        const decoded = verify(token, authConfig.jwt.secret);

        const { sub } = decoded as TokenPayload;

        request.user = { id: sub };
        console.log(decoded);

        return next();
    } catch {
        throw new AppError('Invalid JWT token', 401);
    }
}
