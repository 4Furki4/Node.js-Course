import { Request } from 'express';
type CustomRequest = Request & {
    user: {
        id: string;
        username: string;
    }
}