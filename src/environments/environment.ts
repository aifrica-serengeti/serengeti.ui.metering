import {
  createTranslateLoader,
  getLoginEndPoint,
  getProduction,
} from '../app/app.module';

export const environment = {
  commonOptions: {
    createTranslateLoader,
    getLoginEndPoint,
    getProduction,
  },
  production: false,
};
