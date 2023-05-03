import {createTranslateLoader, getLoginEndPoint, getProduction} from '../app/app.module';

export const environment = {
  commonOptions: {
    createTranslateLoader,
    getLoginEndPoint,
    getProduction,
    testUserId: 'chidae2000@gmail.com',
    testPassword: 'dPtj!2Wkd',
    testAccessKey: 'AifricaSerengetiDevAccesskey',
    testSecretKey: 'AifricaSerengetiDevSecretkey',
  },
  production: false,
};
