const chartObj = require("../model/activity_page.model.js");

function helper(key, data, bounceCountMap, totalMap){
    
}
/** use page data and calculate bounce rate per top 5 pages of bounce rate, and overall bounce rate */
exports.retrieve = function(req, res) {
    let testing; 
    chartObj.getAll((err, data) => {
        if (err){
            res.status(500).send({
                message:
                err.message
            });
        }else{
            let bounceCountMap = new Map(); 
            let bounceRateMap = new Map(); 
            let totalMap = new Map(); 

            let firstPage = 0; //0-10
            let secondPage = 0; //10-20
            let thirdPage = 0; //20-30
            let fourthPage = 0; //30-40
            let fifthPage = 0; //40-50
            let returnData = []; 
            let returnURLS = []; 

            let timeMap = new Map(); 
            let pageMap = new Map(); 

            let returnAverage = 0; 

            for (let key in data){
                /*
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

                        if(!pageMap.has(data[key]["whichPage"]) && data[key]["whichPage"] !== null) {

                            
                            pageMap.set(data[key]["whichPage"], 1);
                            timeMap.set(data[key]["id"])
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
                    */

                //get all page data by usernum 
                console.log("GETTING USERNUM BY ID");
                console.log(data[key]["id"]);
                testing = data; 

                
        };

            console.log(pageMap); 

            console.log("TESTING"); 
            returnData.push(firstPage); 
            returnData.push(secondPage); 
            returnData.push(thirdPage); 
            returnData.push(fourthPage); 
            returnData.push(fifthPage); 
            



            for (const [key, value] of bounceCountMap.entries()) {
                
                console.log(key, value);

                    returnData.push(value);
                    returnURLS.push(key);  


            }



            


            





            /**SORT DATA */
            /*
            const mapSort1 = new Map([...errorMap.entries()].sort((a, b) => b[1] - a[1]).slice(0,5));
            console.log(mapSort1);

            console.log(mapSort1.entries());

            let i = 0; 
            let stopNum = 5; 
            let temp = {}; 
            /**GRAB TOP 5 */
            /*
            for (const [key, value] of Object.entries(object)) {
                console.log(key, value);
            }

            for (const [key, value] of errorMap.entries()) {
                
                console.log(key, value);

                if(i < stopNum){
                    
                    temp[key] = value; 
                    returnErrors.push(value);
                    returnURLS.push(key);  
                    temp = {}; 
                    i++;  
                }

            }
            */
            
        }
    });
    chartObj.getByUsernum(data[key]["id"], function(err, resData) {
        
        
            
        if (err){
            res.status(500).send({
                message:
                err.message
            });
        }else{
            console.log("GET BY USERNUM"); 
            console.log(resData); 
            let objCount = 0; 
            let whichPage = [];

            for(let i in resData){
                if(resData){
                console.log(resData[i]["whichPage"]);
                if(typeof data !== 'undefined'){};
                
                whichPage.push(resData[i]["whichPage"]);
                objCount++; 
                }
                
            
                console.log("WHICHPAGE");
                console.log(whichPage); 
                
                let tmp = 0; 
                if(whichPage.length > 0){
                    let test = !!whichPage.reduce(function(a, b){ return (a === b) ? a : NaN; });
                    if(whichPage.length == 1 || test) {
                        if(bounceCountMap.has(whichPage[0])){
                            tmp = bounceCountMap.get(whichPage[0]); 
                            console.log("TMP COUNT"); 
                            console.log(tmp); 
                            bounceCountMap.set(whichPage[0], tmp + 1);
                        }else{
                            bounceCountMap.set(whichPage[0], 1); 
                        }
                        
                    }

                    if(totalMap.has(whichPage[0])){
                        tmp = totalMap.get(whichPage[0]); 
                        totalMap.set(whichPage[0], tmp + 1);
                    }else{
                        totalMap.set(whichPage[0], 1); 
                    }
                }
            }
            

            
        }

       
        
    
} );
res.send(returnData);
};

exports.testFunction = function(req, res) {

    console.log("in retrieve function for controller"); 
    let usernumMap = new Map(); 
    let pageArr = []; 

    let returnPages = []; 
    let returnTotal; 

    chartObj.getAll((err, data) => {
        
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Pi Chart Data with id could not be found.`
                });
            } else {
                res.status(500).send({
                    message: `Pi Chart Data with id could not be retrieved from the server.`
                });
                console.log(err);
            }
        } else {
            let dataArr = []; 
            let index = 0; 
            for(let key in data){
                console.log("INSERTING INTO DATAARR");
                console.log(data[key]); 
                dataArr.push(data[key]); 
            }
            console.log("FULL DATA ARRAY"); 
            console.log(dataArr); 

            //all page activity data has been loaded into the full data array

            for(let i in dataArr){
                if(usernumMap.has(dataArr[i]["usernum"])){
                    tmp = usernumMap.get(dataArr[i]["usernum"]); 
                    tmp.push(dataArr[i]); 
                    console.log("TEMP ARRAY FOR USERNUM MAP"); 
                    console.log(tmp); 
                    usernumMap.set(dataArr[i]["usernum"], tmp);
                }else{
                    usernumMap.set(dataArr[i]["usernum"], [dataArr[i]]); 
                }
                //if usernum is the same, then 
            }

            let whichPage = []; 
            let bounceCountMap = new Map(); 
            let bounceRateMap = new Map(); 
            let totalMap = new Map(); 
            let objCount = 0; 
            let temp = 0; 

            for (const [key, value] of usernumMap.entries()) {
                
                console.log(key, value);

                for(let i in value){
                    whichPage.push(value[i]["whichPage"]);
                    objCount++; 
                }

                console.log("WHICHPAGE");
                console.log(whichPage); 
                console.log("LENGTH"); 
                console.log(whichPage.length); 
                temp = 0; 

                let test1 = whichPage.every( (val, i, arr) => val === arr[0] );
                //let test = !!whichPage.reduce(function(a, b){ return (a === b) ? a : NaN; });
                if( test1) {
                    
                    if(bounceCountMap.has(whichPage[0])){
                        console.log(test1);
                        temp = bounceCountMap.get(whichPage[0]); 
                        console.log("TMP COUNT"); 
                        console.log(whichPage[0]);
                        console.log(temp); 
                        bounceCountMap.set(whichPage[0], temp + 1);
                    }else{
                        bounceCountMap.set(whichPage[0], 1); 
                    }
                    
                }

                if(totalMap.has(whichPage[0])){
                    tmp = totalMap.get(whichPage[0]); 
                    totalMap.set(whichPage[0], tmp + 1);
                }else{
                    totalMap.set(whichPage[0], 1); 
                    pageArr.push(whichPage[0]); 
                }

                whichPage = [];
                objCount = 0; 
            }
            
            for(let key in pageArr){
                if(bounceCountMap.get(pageArr[key])){
                    bounceRateMap.set(pageArr[key], (bounceCountMap.get(pageArr[key]) / totalMap.get(pageArr[key])*100));
                }else{
                    bounceRateMap.set(pageArr[key], 100)
                }
                
            }

            let tempTotal = 0; 
            let x = 0; 
            for (const [key, value] of bounceRateMap.entries()) {
                tempTotal+=value; 
                x++; 
            }

            returnTotal = tempTotal / x; 

            console.log(bounceCountMap); 
            console.log(totalMap);
            console.log(bounceRateMap);
            console.log(returnTotal);  
            

            const returnMap = new Map([...bounceRateMap.entries()].sort((a, b) => b[1] - a[1]).slice(0,5));

            for (const [key, value] of returnMap.entries()) {
                returnPages.push([key, Math.round(value * 100) / 100]);
            }

            
            res.send([returnPages, Math.round(returnTotal * 100) / 100]);




        }
    });
};
//get all page data

    //get all page data by usernum 

        //if page data was entered within last 7 days

            //if number of page data objects == 1 or all "whichPage" are the same, 
                //then count as bounce : update bounceCount++ in bounceCountMap (key is whichPage)
                //increment total in totalMap (key is whichPage)
            //else 
                //then DONT count as bounce
                //increment total 

        //for each (key, value) in bounceCountMap (and totalMap)
                //bounceRate = bounceCount / total (key is whichPage from each entry); 
                //place bounceRate in bounceRateMap with same key
    
    //for each entry in bounceCountMap
        //use to calculate TOTALBOUNCERATE

    //return bounceRateMap and TOTALBOUNCERATE
