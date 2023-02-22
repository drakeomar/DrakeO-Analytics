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
            let firstPage = 0; //0-10
            let secondPage = 0; //10-20
            let thirdPage = 0; //20-30
            let fourthPage = 0; //30-40
            let fifthPage = 0; //40-50
            let returnData = []; 

            let pageMap = new Map(); 
            let averageMap = new Map(); 
            let bestPages = [];
            let worstPages = []; 


            let returnAverage = 0; 

            for (let key in data){
                try{
                    console.log(data[key]["totalTime"]);
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
                    //console.log(todayMS); 

                    console.log(key);
                    console.log(data[key]);
                    
                    if(typeof data[key]["endTime"] !== 'undefined'){
                        pageTime = new Date(data[key]["endTime"]).getTime(); 
                        console.log("PAGETIME"); 
                        console.log(pageTime);

                    }
                    
                    //valid for this week, continue with rest of logic and count page load times
                    if(pageTime > (todayMS - (7*daySeconds))) {
                        
                        //input validation 
                        if(data[key]["totalTime"] == 0 || data[key]["totalTime"] > 10000){

                        }else{
                            if(!pageMap.has(data[key]["whichPage"]) && data[key]["whichPage"] !== null) {

                                pageMap.set(data[key]["whichPage"], [data[key]["totalTime"]]);
                                console.log("MAP INSERTION"); 
                            }else if(data[key]["whichPage"] !== null && pageMap.has(data[key]["whichPage"])){ //dont count null entries bc of existing db
                                let tmp = pageMap.get(data[key]["whichPage"]);
                                tmp.push(data[key]["totalTime"]); 
                                pageMap.set(data[key]["whichPage"], tmp); 
                            }   
                        }
                    }

                    let total = 0; 
                    let count = 0; 
                    for (const [key, value] of pageMap.entries()) {
                        //average each entry and place into averageMap 
                        //console.log("VALUE"); 
                        //console.log(value); 
                        for(let i in value){
                            //console.log(i); 
                            total = total + value[i]; 
                            count++; 
                        }
                        
                        averageMap.set(key, total/count)
                        total = 0; 
                        count = 0; 
                    }



                }catch(err){
                    console.log(err); 
                }
                    

            }

            const returnMap1 = new Map([...averageMap.entries()].sort((a, b) => b[1] - a[1]).slice(0,5));
            const returnMap2 = new Map([...averageMap.entries()].sort((a, b) => a[1] - b[1]).slice(0,5));

            let i = 0; 
            let j = 0; 

            for (const [key, value] of returnMap1.entries()) {
                bestPages.push({"url": key, "speed" :value});
                console.log("best page insertion");
                console.log(key); 
                console.log(value); 
                console.log(bestPages); 
                console.log("COUNTER"); 
                console.log(i); 
                i++; 
            }

            for (const [key, value] of returnMap2.entries()) {
                worstPages.push({"url": key, "speed" :value});
                console.log("worst page insertion"); 
                console.log(worstPages);
                j++; 
            }


            while(i<5){
                bestPages.push({"url": "N/A", "speed": 0}); 
                i++;
            }
            while(j<5){
                worstPages.push({"url": "N/A", "speed": 0}); 
                j++; 
            }

            console.log(averageMap); 
            console.log(pageMap); 
            console.log(returnMap1); 
            console.log(returnMap2); 

            console.log(i); 
            console.log(j); 
            console.log(bestPages); 
            console.log(worstPages); 

            returnData.push(firstPage); 
            returnData.push(secondPage); 
            returnData.push(thirdPage); 
            returnData.push(fourthPage); 
            returnData.push(fifthPage); 
            res.send([bestPages, worstPages]);
        }
    });
};