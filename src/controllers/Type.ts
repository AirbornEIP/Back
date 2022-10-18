import type express from 'express';
import type { user } from '../models/Type';

export type Request = express.Request & {
    user: user,
}
