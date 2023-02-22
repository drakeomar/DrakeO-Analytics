const AuthInterface = require('./AuthInterface.js');
const crypto = require('crypto'); 

class simpleAuth extends AuthInterface{
    testFlag; 

    constructor(){
        super(); 
        console.log("simple authentication started");
        //instantiate model/db interface
        this.LoginUser = require('./login_users.model.js'); 
    }

    generateToken(){
        console.log("GENERATETOKEN() CALLED"); 
        
        
        this.returnWare = (req, res, next) => {
            crypto.randomBytes(48, function(err, buffer) {
                this.token = buffer.toString('hex');
                console.log("TESTING TOKEN CREATION");
                console.log(this.token); 
                req.token = this.token; 
                next(); 
            }); 
        };

        return this.returnWare; 
    }

    generateCookie(req, res){
        
    }

    verify(){
        this.returnWare = (req,res,next) => { 
            this.token = this.getToken(req); //grab token
            console.log("Grabbed token-- simpleAuth.js side"); 
            console.log(this.token); 

            let currentUrl = req.protocol + 's://' + req.get('host') + req.originalUrl;
            console.log("GRABBED URL"); 
            console.log(currentUrl); 

            
            //check if token exists
            if(typeof this.token !== 'undefined' || this.token){
               
                 //check model 
                this.LoginUser.getByToken(this.token, function(err, data){
                    //console.log("tok");
                    //console.log(tok); 

                    if(err){
                        console.log("Invalid Authentication Token Detected");
                        console.log(err); 
                        //return res.status(401).send("Token cannot be authenticated"); 
                    }else{
                        req.notFound = false; 
                        console.log("GRABBED DATA");
                        console.log(data);
                        console.log("found in database");
                        //req.admin = data.admin;
                        if(!data){
                            //this.testFlag = true; 
                            req.notFound = true;  
                            console.log("test here"); 
                            //return res.render('login'); 
                            
                        }else{
                            console.log("database token");
                            console.log(data.token); 
                            //console.log("my token:");
                            //console.log(tok); 

                            if(!data.token){
                                  //return res.render('login'); 
                            }

                            req.admin = data.admin;
                        }
                        
                        //return next();  
                        if(req.notFound){
                            console.log("current url : " + currentUrl); 
                            let url = {"url":currentUrl};
                            return res.render('login', {"data": encodeURI(JSON.stringify(url))});
                        }
                    }
                    next(); 
                });
            }else{
                console.log("No token is detected in authentication request"); 
                console.log("current url : " + currentUrl); 
               //res.status(301); 
               //return res.status(403).send("Token not found, please reload request with a valid token");
               //res.setHeader('Location',`https://reporting.drakeomar.com/login.html`);
               let url = encodeURI(JSON.stringify({"url": currentUrl})) + "";
               return res.render('login', {"data":url});
            }

            console.log(this.LoginUser); 
            console.log("outside model interaction"); 
            
            this.testFlag = false; 
            //verify token
            //try {
                
            
            console.log("testFlag:");
            console.log(req.notFound); 

            //} catch (err) { //something went wrong overall,
            
            //}
            
            req.newData = this.token; 
            console.log("request new data test:");
            console.log(req.newData); 
            console.log("middleware authentication is finished, moving onto next stage"); 
            console.log("AUTHENTICATION SUCCESSFUL");
            
        }

        return this.returnWare; 
    }
}

//const sA = new simpleAuth();
module.exports = new simpleAuth(); 