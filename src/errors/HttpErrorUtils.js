import ForbiddenError from './ForbiddenError';
import InternalError from './InternalError';
import NotFoundError from './NotFoundError';
import UnauthenticatedError from './UnauthenticatedError';
import BadRequest from './BadRequest';
import UnProcessableEntityError from './UnprocessableEntityError';

export default function throwHttpError(status, msg, errorJSON) {
    switch (status) {
        case 400:
            throw new BadRequest(status, msg, errorJSON);
        case 404:
            throw new NotFoundError(status, msg, errorJSON);
        case 403:
            throw new ForbiddenError(status, msg, errorJSON);
        case 401:
            throw new UnauthenticatedError(status, msg, errorJSON);
        case 422:
            throw new UnProcessableEntityError(status, msg, errorJSON);
        case 500:
            throw new InternalError(status, msg, errorJSON);
        default:
            throw Error('Erreur inconnue');
    }
}
