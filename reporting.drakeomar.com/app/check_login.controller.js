const { render } = require("ejs");
const LoginUser = require("./login_users.model.js");
const bcrypt = require('bcrypt'); 

exports.findAll = (req, res) => {
    Users.getAll((err, data) =>{
        if (err){
            res.status(500).send({
                message:
                err.message
            });
        }else{
            res.send(data);
        }
    });
};

exports.checkLogin = (req,res) => {
    console.log("in checkLogin main controller"); 

    console.log("Passed in token"); 
    console.log(req.token); 

    /**request validation */
    if (!req.body) {
        res.status(400).send({
            message: "Request Body cannot be empty"
        });
        return;
    }else if(!req.body.username){
        res.status(400).send({
            message: "please enter username or email for login"
        })
        return;
    }else if(!req.body.password){
        res.status(400).send({
            message: "please send password for login"
        })
        return; 
    }

    const username = req.body.username; 
    const password = req.body.password; 
    //const token = req.body.token;

    /**input validation */
    if(username.length > 40 || username.length <= 0){ //check username length
        res.status(400).send({
            message: "invalid username -- length not possible or valid"
        })

        return; 
    }

    if(password.length > 35 || password.length <= 0 ){
        res.status(400).send({
            message: "invalid password -- length not possible or valid"
        })
        return; 
    }


    const obj = {"username": username, "password": password, "token": null}; 
    const loginUser = new LoginUser(obj);
    console.log("username:"); 
    console.log(username); 
    console.log("password:"); 
    console.log(password); 
    let col = 'username'; 

    if(username.indexOf('@') > -1){
        col = 'email'; 

        LoginUser.getByEmail(username, function(err, data){

            if (err) {
              if (err.kind === "not_found") {
                    res.status(404).send({
                        message: `User could not be found.`
                    });
                                    
                    return;
              } else {
                res.status(500).send({
                  message: `Usercould not be retrieved from the server.`
                });
                console.log(err);
                return; 
              }
            } else {
    
              //res.send(data);
              bcrypt.compare(password, data.password, function(err, result) {  // Compare
                // if passwords match
                if (result) {
                      console.log("Email password matches!");
    
                      LoginUser.updateTokenByEmail(username, req.token, (err, data) => {
                        if (err) {
                          console.log("error occurred");
                          console.log(err);
                            if (err.kind === "not_found") {
                              res.status(404).send({
                                message: `ERROR, could not find user to update token`
                              });
                              return; 
                            } else {
                              console.log(err);
                              res.status(500).send({
                                message: `Server Side Problem was Encountered when updating resource with id ${req.params.id}`
                              });
                              return; 
                            }
                        } else {
                            cookieStr =  "do-user-sess=" + req.token + ";expires=" + new Date(new Date().getTime()+100000).toUTCString() + "; HttpOnly; path=/";
                            res.setHeader('Set-Cookie', cookieStr);
                            res.redirect("/"); 
                        }
                      });
        
                    
                    //if(data.admin){
                        //res.render('admin-index');
                    //}
                    //res.render('index'); 
                }
                // if passwords do not match
                else {
                      console.log("Invalid password!");
                }
              });
              
              console.log("Authentication successful");
            }
          });
    }else{
    //res.send("TESTING SUCCESSFUL SO FAR"); 
    
    LoginUser.getByUsername(username, function(err, data){

        if (err) {
          if (err.kind === "not_found") {
                res.status(404).send({
                    message: `User could not be found.`
                });
                                
                return;
          } else {
            res.status(500).send({
              message: `Usercould not be retrieved from the server.`
            });
            console.log(err);
            return; 
          }
        } else {

          //res.send(data);
          bcrypt.compare(password, data.password, function(err, result) {  // Compare
            // if passwords match
            if (result) {
                  console.log("It matches!");

                  LoginUser.updateTokenByName( username, req.token, (err, data) => {
                    if (err) {
                      console.log("error occurred");
                      console.log(err);
                        if (err.kind === "not_found") {
                          res.status(404).send({
                            message: `ERROR`
                          });
                        } else {
                          console.log(err);
                          res.status(500).send({
                            message: `Server Side Problem was Encountered when updating resource with id ${req.params.id}`
                          });
                        }
                    } else {
                      
                    }
                  });
    
                cookieStr =  "do-user-sess=" + req.token + ";expires=" + new Date(new Date().getTime()+3600000).toUTCString() + "; HttpOnly; path=/";
                res.setHeader('Set-Cookie', cookieStr);
                res.redirect("/"); 
                //if(data.admin){
                    //res.render('admin-index');
                //}
                //res.render('index'); 
            }
            // if passwords do not match
            else {
                  console.log("Invalid password!");
            }
          });
          
          console.log("Authentication successful");
        }
      });
    }
};

exports.createUser = (req, res) => {

    /**request validation */
    if (!req.body) {
        res.status(400).send({
            message: "Request Body cannot be empty"
        });
        return;
    }else if(!req.body.username){
        res.status(400).send({
            message: "please enter username or email for login"
        })
        return;
    }else if(!req.body.password){
        res.status(400).send({
            message: "please send password for login"
        })
        return; 
    }

    console.log(req.body.username); 
    console.log(req.body.password);
    console.log(req.body.email); 

    const username = req.body.username; 
    const password = req.body.password; 
    //const token = req.body.token;

    /**input validation */
    if(username.length > 20 || username.length <= 0){ //check username length
        res.status(400).send({
            message: "invalid username -- length not possible or valid"
        })

        return; 
    }

    if(password.length > 35 || password.length <= 10 ){
        res.status(400).send({
            message: "invalid password -- length not possible or valid"
        })
        return; 
    }

    if(password.length > 35 || password.length <= 0 ){
        res.status(400).send({
            message: "invalid password -- length not possible or valid"
        })
        return; 
    }


    const obj = {"username": req.body.username, 
                "email": req.body.email, 
                "password": req.body.password, 
                "token": req.token}; 
    const loginUser = new LoginUser(obj);

    console.log("LOGINUSER");
    console.log(obj); 


    LoginUser.createNew(obj, (err, data) => {
    
        
        if (err) {
            if(err.code){
                if (err.code == 'ER_DUP_ENTRY') { //use duplicate entry code from err object
                    res.status(400).send({
                        message:
                        "user already exists"
                    });
                }
            }
            res.status(500).send({
              message:
                "error on server side"
            });
        }else {
            cookieStr =  "do-user-sess=" + req.token + ";expires=" + new Date(new Date().getTime()+1000000).toUTCString() + "; HttpOnly; path=/";
            res.setHeader('Set-Cookie', cookieStr);
            res.redirect("/"); 
        }

    });
};

exports.handleLogout = (req,res) => {


    /**Grab Cookie and ascertain user info from model */
    let token = req.cookies['do-user-sess']; 
    console.log("LOGGING OUT USER WITH COOKIE: "); 
    console.log(token); 
    
    LoginUser.deleteToken(token, (err, data) => {
    
        
        if (err) {
            res.redirect('/'); 
            console.log(err); 
        }else {
            res.render('logout'); 
        }

    });

};