const { session } = require('passport');
const KH = require('../model/kh');
const bcrypt = require('bcrypt');
const saltRounds = 5;

const uuidv4 = require('uuid').v4;
const sessions = {};

//Các biến toàn cục
let kh = '', err = '', mail = ''
//Username
const setKh = (value) => {
  kh = value;
};
const getKh = () => {
  return kh;
};
//Mail
const setMail = (value) => {
  mail = value;
};
const getMail = () => {
  return mail;
};

const userController = {
    async login(req, res) {
      res.render('test_login', {title: 'Login', err: err, kh: ''});
      err = '';
    },
    async signup(req, res) {
      res.render('test_signup', {title: 'SignUp', err: err, kh: ''});
      err = '';
    },
    async logout(req, res) {
      console.log('Logout successful.');
      const sessionId = req.headers.cookie?.split('=')[1];
      delete sessions[sessionId];
      res.set ('Set-Cookie', 'session=; expires=Thu, 01 Jan 1970 00:00:00 GMT');
      res.redirect('/main');
      err = '';
    },
    async postLogin(req, res) {
      try {
          const result = await KH.findOne({ mail: req.body.mail });
  
          if (result !== null) {
            username = result.username;
            mail = result.mail;

            await bcrypt.compare(req.body.password, result.password).then(function(reslt) {
              if (err) {
                // Handle error
                console.error('Error comparing passwords:', err);
                return;
              }
              if (reslt) {
                // Passwords match, authentication successful
                console.log('Passwords match! User authenticated.');
                const sessionId = uuidv4();
                sessions[sessionId] = {username, mail};
                res.set ('Set-Cookie',`session=${sessionId}`);
                res.redirect('/main');
              } 
            });
          } else {
            // Passwords don't match, authentication failed
            console.log('Passwords do not match! Authentication failed.');
            res.render('test_login', {title: 'Login', err: 'Err: Please try again. Email or Password are wrong!!!', kh: ''});
          }
      } catch (error) {
          console.log(error);
      }
    },
  
    async postSignup(req, res) {
      if (req.body.password == req.body.password1) {
          KH.findOne({ mail: req.body.mail})
                .then(result => {
                  if (result == null ){
                    bcrypt.genSalt(saltRounds, function(err, salt) {
                      bcrypt.hash(req.body.password, salt, function(err, hash) {
                        const kh = new KH({
                          mail: req.body.mail,
                          password: hash,
                          username: req.body.username,
                        })            
                        kh.save();
                      });
                     });
                    err = "Welcome! Please login to start! Let's go!!!";
                    console.log(err);
                    res.redirect('/login');
                  }
                  else {
                    err = "Sorry this Email has already signup before. Try another one or Login!";
                    console.log(err);
                    res.redirect('/signup');
                  }
                })
        }  
      else {
        res.render('test_signup', {title: 'SignUp', err: 'Err: Your passwords are not the same.', kh: ''});
        err = '';
      }
    }
}

module.exports = {userController,setKh,getKh,setMail,getMail,sessions};