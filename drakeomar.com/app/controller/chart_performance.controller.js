const chartObj = require("../model/performance_times.model.js");

/** use static dimensions model object to get data, then manipulate and return */
exports.retrieve = (req, res) => {
    chartObj.getAll((err, data) =>{
        if (err){
            res.status(500).send({
                message:
                err.message
            });
        }else{
            let firstRange = 0; //0-10
            let secondRange = 0; //10-20
            let thirdRange = 0; //20-30
            let fourthRange = 0; //30-40
            let fifthRange = 0; //40-50
            let sixthRange = 0; //50-60
            let seventhRange = 0; //60-70
            let eigthRange = 0; //70-80
            let ninthRange = 0; //80-90
            let tenthRange = 0; //90-100
            let otherRange = 0; //100+
            let returnData = []; 

            let returnAverage = 0; 
            let total = 0; 
            let count = 0; 

            for (let key in data){
                try{
                    
                    console.log(data[key]["totalTime"]);
                            
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
                    
                    if(typeof data[key]["endTime"] !== 'undefined'){
                        pageTime = new Date(data[key]["endTime"]).getTime(); 
                        console.log("PAGETIME"); 
                        console.log(pageTime);

                    }
                    
                    //valid for this week, continue with rest of logic and fill ranges
                    if(pageTime > (todayMS - (7*daySeconds))) {
                        
                        /**fill ranges */
                        if(data[key]["totalTime"] >= 100 && data[key]["totalTime"] <= 10000){ //10s timeout, eliminate outliers???  
                            total+=data[key]["totalTime"]; 
                            count++; 
                            otherRange++; 
                        }else if(data[key]["totalTime"] >= 90){
                            total+=data[key]["totalTime"]; 
                            count++; 
                            tenthRange++;
                        }else if(data[key]["totalTime"] >= 80){
                            total+=data[key]["totalTime"]; 
                            count++; 
                            ninthRange++; 
                        }else if(data[key]["totalTime"] >= 70){
                            total+=data[key]["totalTime"]; 
                            count++; 
                            eigthRange++; 
                        }else if(data[key]["totalTime"] >= 60){
                            total+=data[key]["totalTime"]; 
                            count++; 
                            seventhRange++; 
                        }else if(data[key]["totalTime"] >= 50){
                            total+=data[key]["totalTime"]; 
                            count++; 
                            sixthRange++; 
                        }else if(data[key]["totalTime"] >= 40){
                            total+=data[key]["totalTime"]; 
                            count++; 
                            fifthRange++; 
                        }else if(data[key]["totalTime"] >= 30){
                            total+=data[key]["totalTime"]; 
                            count++; 
                            fourthRange++; 
                        }else if(data[key]["totalTime"] >= 20){
                            total+=data[key]["totalTime"]; 
                            count++; 
                            thirdRange++; 
                        }else if(data[key]["totalTime"] >= 10){
                            total+=data[key]["totalTime"]; 
                            count++; 
                            secondRange++; 
                        }else{
                            total+=data[key]["totalTime"]; 
                            count++; 
                            firstRange++; 
                        }
                    }

                }catch(err){
                    console.log(err); 
                }
                    

            }

            returnAverage = total / count; 

            returnData.push(firstRange); 
            returnData.push(secondRange); 
            returnData.push(thirdRange); 
            returnData.push(fourthRange); 
            returnData.push(fifthRange); 
            returnData.push(sixthRange); 
            returnData.push(seventhRange); 
            returnData.push(eigthRange); 
            returnData.push(ninthRange); 
            returnData.push(tenthRange); 
            returnData.push(otherRange); 


            res.send([returnData, Math.round(returnAverage * 100) / 100]);
        }
    });
};