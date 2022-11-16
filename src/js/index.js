
import './services/worker';
import AccountController from './controllers/AccountController';
import ReportController from './controllers/ReportController';

const account = new AccountController();

account.init();


const accountController = new AccountController();
const reportController = new ReportController();

accountController.init();
reportController.init();
