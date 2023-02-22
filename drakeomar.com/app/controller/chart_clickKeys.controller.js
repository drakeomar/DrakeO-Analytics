const chartObj = require("../model/static_dimensions.model.js");

/** use static dimensions model object to get data, then manipulate and return */
exports.retrieve = (req, res) => {

    chartObj.getAll((err, data) =>{
        if (err){
            res.status(500).send({
                message:
                err.message
            });
        }else{
            let phoneCount = 0;
            let tabletCount = 0; 
            let laptopCount = 0; 
            let desktopCount = 0; 
            let returnData = {}; 

            for (let key in data){

                //console.log(key);
                console.log(data[key]);
                
                if(data[key]["screenWidth"] <= 480){ //small aka phone
                    phoneCount++; 
                }else if(data[key]["screenWidth"] <= 1080){ //medium aka tablet
                    tabletCount++; 
                }else if(data[key]["screenWidth"] <= 1440){
                    laptopCount++; 
                }else{
                    desktopCount++;
                }

            

                returnData = {"phoneCount":phoneCount, "tabletCount":tabletCount, "laptopCount":laptopCount, "desktopCount":desktopCount}; 
            }
            res.send(returnData);
        }
    });
    
};