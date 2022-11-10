import './services/worker';

import AccountController from './controllers/AccountController';

const account = new AccountController();

account.init();