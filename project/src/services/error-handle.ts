import request from 'axios';
import { toast } from 'react-toastify';
import { ErrorType } from '../types/error';
import { AppRoute, HTTP_CODE, HTTP_CODE_ERROR_TEXT } from '../const';
import { store } from '../store';
import { redirectToRoute } from '../store/actions';

export const errorHandle = (error: ErrorType): void => {
  if (!request.isAxiosError(error)) {
    throw error;
  }

  const {response} = error;

  if (response) {
    switch (response.status) {
      case HTTP_CODE.UNAUTHORIZED:
        toast.info(`${response.status} ${HTTP_CODE_ERROR_TEXT.UNAUTHORIZED}`);
        break;
      case HTTP_CODE.BAD_REQUEST:
        store.dispatch(redirectToRoute(AppRoute.NotFound));
        toast.error(`${response.status} ${HTTP_CODE_ERROR_TEXT.BAD_REQUEST}`);
        break;
      case HTTP_CODE.NOT_FOUND:
        store.dispatch(redirectToRoute(AppRoute.NotFound));
        toast.error(`${response.status} ${HTTP_CODE_ERROR_TEXT.NOT_FOUND}`);
        break;
      default: toast.error('unknown error');
    }
  }
};
