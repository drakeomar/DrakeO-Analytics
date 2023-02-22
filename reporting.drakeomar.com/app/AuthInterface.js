class AuthInterface {
    returnWare;
    token; 
    cookieStr = 'do-user-sess'; 
    LoginUser; 

    constructor(){
        if(!this.generateCookie){
            throw console.error("ERROR: missing generateCookie");
        }else if(!this.generateToken){
            throw console.error("ERROR: missing generateToken"); 
        }else if(!this.verify){
            throw console.error("ERROR: missing verify"); 
        }

        //instantiate model/db interface
        this.LoginUser = require('./login_users.model.js'); 
    }
    
    /**check headers, cookies, and body*/
    getToken(req){
        console.log("getting token:"); 

        this.token = this.getCookie(req); 

        console.log(this.token); 

        return this.token; 
    }    

    getCookie(req){
        const cookie = req.cookies[this.cookieStr];
        console.log("cookies:");
        console.log(req.cookies); 
        console.log("cookie:");
        console.log(cookie); 
        return cookie; 
    }
}

module.exports = AuthInterface; 