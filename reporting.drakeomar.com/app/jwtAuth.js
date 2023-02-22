
const jwt = require('jsonwebtoken');

class jwtAuth extends authInterface{
    constructor(){
        super(); 

    }
    
    getToken(){
        
    }

    generateCookie(){

    }

    generateToken(){

    }

    verify(req, res){
        this.returnWare = (req,res,next) =>{

            this.getToken(req); //grab token

            //check if token exists
            if(typeof token == 'undefined' || !token){
                
               
            }

            /**use jwt.verify*/
            try {

            } catch (err) {

            }
            
            return next(); 
        }

        return returnWare; 
    }

}

const jwtAuth