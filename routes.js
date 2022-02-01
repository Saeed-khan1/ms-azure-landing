const MSController = require('./controllers/msController');
const msController = new MSController();

module.exports = (app) => {
    app.get('/', (req, res) => msController.adLogin(req, res))
    app.get('/redirect', (req, res) => msController.callback(req, res))
    app.get('/landing', (req, res) => msController.landing(req, res))
    app.post('/notify', (req, res) => msController.notify(req, res))
    app.post('/billing', (req, res) => msController.saveToBilling(req, res))
}