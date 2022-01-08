import ForbiddenError from './ForbiddenError';
import InternalError from './InternalError';
import NotFoundError from './NotFoundError';
import UnauthenticatedError from './UnauthenticatedError';
import BadRequest from './BadRequest';

export default function throwHttpError(status, msg) {
    switch (status) {
        case 400:
            throw new BadRequest(status, msg);
        case 404:
            throw new NotFoundError(status, msg);
        case 403:
            throw new ForbiddenError(status, msg);
        case 401:
            throw new UnauthenticatedError(status, msg);
        case 500:
            throw new InternalError(status, msg);
        default:
            throw Error('Erreur inconnue');
    }
}
