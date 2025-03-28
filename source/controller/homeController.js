const SP = require('../model/ttsp');
const {getKh} = require('./userController');
const {sessions} = require('./userController');

const homeController = {
    async root(req, res) {
        res.redirect('/main');
    },
    async home(req, res) {
        SP.find()
        .then(result => {
            if (req.headers.cookie != null) {
                const sessionId = req.headers.cookie.split('=')[1];
                if (sessions[sessionId] == null) {
                    res.render('test_index', { sps: result, title: 'Trang chủ', kh: ''});
                }
                else {
                    userSession = sessions[sessionId];
                    res.render('test_index', { sps: result, title: 'Trang chủ', kh: userSession.username});
                }
            } else {
                res.render('test_index', { sps: result, title: 'Trang chủ', kh: ''});
            }
        })
        .catch(err => {
            console.log(err);
        });
    }
}

module.exports = homeController;
