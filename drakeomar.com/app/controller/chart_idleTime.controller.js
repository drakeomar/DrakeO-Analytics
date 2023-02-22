const chartObj = require("../model/activity_page.model.js");

/** use page data and calculate bounce rate per top 5 pages of bounce rate, and overall bounce rate */
exports.retrieve = (req, res) => {
    chartObj.getAll((err, data) =>{
        if (err){
            res.status(500).send({
                message:
                err.message
            });
        }else{
            let firstPage = 0; //0-10
            let secondPage = 0; //10-20
            let thirdPage = 0; //20-30
            let fourthPage = 0; //30-40
            let fifthPage = 0; //40-50
            let returnData = []; 
            let leftTime = 0; 
            let pageMap = new Map(); 

            let returnAverage = 0; 

            for (let key in data){
                try{
                    console.log(data[key]["enteredPage"]);
                    console.log(data[key]["whichPage"]);
                            
                    let pageTime = 0; 
                    let daySeconds = 86400000; 
                    let today = new Date();
                    const yyyy = today.getFullYear();
                    let mm = today.getMonth() + 1; // Months start at 0!
                    let dd = today.getDate();

                    if (dd < 10) dd = '0' + dd;
                    if (mm < 10) mm = '0' + mm;

                    today = mm + '/' + dd + '/' + yyyy;

                    console.log("today"); 
                    console.log(today); 
                    let todayMS = new Date(today).getTime();
                    console.log("TODAYMS");
                    console.log(todayMS); 

                    console.log(key);
                    console.log(data[key]);
                    
                    if(typeof data[key]["enteredPage"] !== 'undefined'){
                        pageTime = new Date(data[key]["enteredPage"]).getTime(); 
                        console.log("PAGETIME"); 
                        console.log(pageTime);

                    }
                    
                    //valid for this week, continue with rest of logic and count page load times
                    if(pageTime > (todayMS - (7*daySeconds))) {
                        
                        if(typeof data[key]["leftPage"] !== 'undefined' && data[key]["leftPage"]){
                            leftTime = new Date(data[key]["leftPage"]).getTime();
                            console.log("LEFTTIME:");
                            console.log(leftTime);  
                        }

                        if(!pageMap.has(data[key]["whichPage"]) && data[key]["whichPage"] !== null) {

                            pageMap.set(data[key]["whichPage"], 1);
                            console.log("MAP INSERTION"); 
                        }else if(data[key]["whichPage"] !== null){ //dont count null entries
                            let tmp = pageMap.get(data[key]["whichPage"]);
                            console.log(tmp); 
                            pageMap.set(data[key]["whichPage"], tmp + 1); 
                        }   
                    }

                }catch(err){
                    console.log(err); 
                }
                    

            }
            console.log(pageMap); 

            returnData.push(firstPage); 
            returnData.push(secondPage); 
            returnData.push(thirdPage); 
            returnData.push(fourthPage); 
            returnData.push(fifthPage); 
            res.send(returnData);
        }
    });
};

exports.fixed = (req, res) => {
    //grab all idle objects 

    //get visitnum from idle object 

    //get total idletime, eliminate outliers 

    //get activity page by id using visitnum

    //get total time, use to get active time

    //store in map of arrays (key is page, array has each )
}