const pageObj = require("../model/activity_page.model.js");

function help(compData, data, key, returnData, pageMap, pageMap1, pageMap2, pageMap3, pageMap4, pageMap5, pageMap6, pageMap7){

               
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
    let tmp = 0; 
    if(pageTime > (todayMS - (daySeconds))) {
        compData["thisWeek"]++; 
        returnData["day1"]++; 

        if(pageMap.has(data[key]["whichPage"])){
            tmp = pageMap.get(data[key]["whichPage"]); 
            pageMap.set(data[key]["whichPage"], tmp + 1);
        }else{
            pageMap.set(data[key]["whichPage"], 1);
        }

        if(pageMap1.has(data[key]["whichPage"])){
            tmp = pageMap1.get(data[key]["whichPage"]); 
            pageMap1.set(data[key]["whichPage"], tmp + 1);
        }else{
            pageMap1.set(data[key]["whichPage"], 1);
        }
        console.log("updating dvCount1"); 
        //1
    }else if(pageTime > (todayMS - (2*daySeconds))){
        compData["thisWeek"]++; 
        returnData["day2"]++; 

        if(pageMap.has(data[key]["whichPage"])){
            tmp = pageMap.get(data[key]["whichPage"]); 
            pageMap.set(data[key]["whichPage"], tmp + 1);
        }else{
            pageMap.set(data[key]["whichPage"], 1);
        }

        if(pageMap2.has(data[key]["whichPage"])){
            tmp = pageMap2.get(data[key]["whichPage"]); 
            pageMap2.set(data[key]["whichPage"], tmp + 1);
        }else{
            pageMap2.set(data[key]["whichPage"], 1);
        }
        console.log("updating dvCount2"); 
        //2
    }else if(pageTime > (todayMS - (3*daySeconds))){
        compData["thisWeek"]++; 
        returnData["day3"]++; 

        if(pageMap.has(data[key]["whichPage"])){
            tmp = pageMap.get(data[key]["whichPage"]); 
            pageMap.set(data[key]["whichPage"], tmp + 1);
        }else{
            pageMap.set(data[key]["whichPage"], 1);
        }

        if(pageMap3.has(data[key]["whichPage"])){
            tmp = pageMap3.get(data[key]["whichPage"]); 
            pageMap3.set(data[key]["whichPage"], tmp + 1);
        }else{
            pageMap3.set(data[key]["whichPage"], 1);
        }
        console.log("updating dvCount3"); 
        //3
    }else if(pageTime > (todayMS - (4*daySeconds))){
        compData["thisWeek"]++; 
        returnData["day4"]++; 

        if(pageMap.has(data[key]["whichPage"])){
            tmp = pageMap.get(data[key]["whichPage"]); 
            pageMap.set(data[key]["whichPage"], tmp + 1);
        }else{
            pageMap.set(data[key]["whichPage"], 1);
        }

        if(pageMap4.has(data[key]["whichPage"])){
            tmp = pageMap4.get(data[key]["whichPage"]); 
            pageMap4.set(data[key]["whichPage"], tmp + 1);
        }else{
            pageMap4.set(data[key]["whichPage"], 1);
        }
        console.log("updating dvCount4");  
        //4
    }else if(pageTime > (todayMS - (5*daySeconds))){
        compData["thisWeek"]++; 
        returnData["day5"]++; 

        if(pageMap.has(data[key]["whichPage"])){
            tmp = pageMap.get(data[key]["whichPage"]); 
            pageMap.set(data[key]["whichPage"], tmp + 1);
        }else{
            pageMap.set(data[key]["whichPage"], 1);
        }

        if(pageMap5.has(data[key]["whichPage"])){
            tmp = pageMap5.get(data[key]["whichPage"]); 
            pageMap5.set(data[key]["whichPage"], tmp + 1);
        }else{
            pageMap5.set(data[key]["whichPage"], 1);
        }
        console.log("updating dvCount5"); 
        //5
    }else if(pageTime > (todayMS - (6*daySeconds))){
        compData["thisWeek"]++; 
        returnData["day6"]++; 

        if(pageMap.has(data[key]["whichPage"])){
            tmp = pageMap.get(data[key]["whichPage"]); 
            pageMap.set(data[key]["whichPage"], tmp + 1);
        }else{
            pageMap.set(data[key]["whichPage"], 1);
        }

        if(pageMap6.has(data[key]["whichPage"])){
            tmp = pageMap6.get(data[key]["whichPage"]); 
            pageMap6.set(data[key]["whichPage"], tmp + 1);
        }else{
            pageMap6.set(data[key]["whichPage"], 1);
        }
        console.log("updating dvCount6"); 
        //6
    }else if(pageTime > (todayMS - (7*daySeconds))){
        compData["thisWeek"]++; 
        returnData["day7"]++; 

        if(pageMap.has(data[key]["whichPage"])){
            tmp = pageMap.get(data[key]["whichPage"]); 
            pageMap.set(data[key]["whichPage"], tmp + 1);
        }else{
            pageMap.set(data[key]["whichPage"], 1);
        }

        if(pageMap7.has(data[key]["whichPage"])){
            tmp = pageMap7.get(data[key]["whichPage"]); 
            pageMap7.set(data[key]["whichPage"], tmp + 1);
        }else{
            pageMap7.set(data[key]["whichPage"], 1);
        }
        console.log("updating dvCount7"); 
        //7
    }else if(pageTime > (todayMS - (14*daySeconds))){
        compData["lastWeek"]++; 
    }

    console.log(pageMap);
    
}

/*
function getTopFive(sortedMap, returnTotal){
            const mapSort1 = new Map([...objMap.entries()].sort((a, b) => b[1] - a[1]));

            let i = 0; 
            let stopNum = 5; 
            let temp = {}; 

            /**get top 5*/
            /*
            for (const [key, value] of sortedMap.entries()) {
                i++ 
                console.log(key, value);

                if(i < stopNum){
                    
                    temp[key] = value; 
                    returnTotal.push(temp); 
                    temp = {}; 
                }
            }            
}
*/

/** use static dimensions model object to get data, then manipulate and return */
exports.retrieve = (req, res) => {
    pageObj.getAll((err, data) =>{
        if (err){
            res.status(500).send({
                message:
                err.message
            });
        }else{
            let objMap = new Map(); 
            let pageArr = [];
            let pageMap = new Map(); 

            let pageMap1 = new Map(); 
            let pageMap2 = new Map(); 
            let pageMap3 = new Map(); 
            let pageMap4 = new Map(); 
            let pageMap5 = new Map(); 
            let pageMap6 = new Map(); 
            let pageMap7 = new Map(); 

            //init return objects
            //top 5 this week
            let compData = {"thisWeek": 0, "lastWeek": 0};
            let returnData = {"day1": 0, "day2": 0, "day3": 0, "day4":0, "day5":0, "day6":0, "day7":0}; 
            let returnPage1 = {"day1": 0, "day2": 0, "day3": 0, "day4":0, "day5":0, "day6":0, "day7":0}; 
            let returnPage2 = {"day1": 0, "day2": 0, "day3": 0, "day4":0, "day5":0, "day6":0, "day7":0};  
            let returnPage3 = {"day1": 0, "day2": 0, "day3": 0, "day4":0, "day5":0, "day6":0, "day7":0};  
            let returnPage4 = {"day1": 0, "day2": 0, "day3": 0, "day4":0, "day5":0, "day6":0, "day7":0}; 
            let returnPage5 = {"day1": 0, "day2": 0, "day3": 0, "day4":0, "day5":0, "day6":0, "day7":0}; 
            let returnPages = [returnPage1, returnPage2, returnPage3, returnPage4, returnPage5];
            
            let lines = []; 
            let page1Str; 
            let page2Str; 
            let page3Str; 

            //MAYBE
            //let returnTotal = {"day1": 0, "day2": 0, "day3": 0, "day4":0, "day5":0, "day6":0, "day7":0};
            
            //
            let returnTop5WeekTotals = []; 

            //top 5 total in pie chart
            let returnTopFiveAllTime = [];
                
            let dvCount1 = 0; 
            let dvCount2 = 0; 
            let dvCount3 = 0; 
            let dvCount4 = 0; 
            let dvCount5 = 0; 
            let dvCount6 = 0; 
            let dvCount7 = 0; 

            for (let key in data){

                if(!objMap.has(data[key]["whichPage"])){
                    objMap.set(data[key]["whichPage"], 1);
                    console.log("MAP INSERTION"); 
                    console.log(data[key]["whichPage"]);
                    console.log(objMap.get(data[key]["whichPage"]));
                }else{
                    console.log(objMap); 

                    let tmp = objMap.get(data[key]["whichPage"]);
                    console.log(tmp); 
                    objMap.set(data[key]["whichPage"], tmp + 1); 
                    console.log("MAP UPDATE"); 
                    console.log(objMap.get(data[key]["whichPage"]));
                }

                help(compData, data, key, returnData, pageMap, pageMap1, pageMap2, pageMap3, pageMap4, pageMap5, pageMap6, pageMap7); 
                
            }
            /**decide which pages are the best and worst */
                
            const returnMap1 = new Map([...pageMap.entries()].sort((a, b) => b[1] - a[1]).slice(0,5));
            const returnMap2 = new Map([...objMap.entries()].sort((a, b) => b[1] - a[1]).slice(0,5));
            let i = 0; 
            let j = 0; 

            for (const [key, value] of pageMap.entries()) {
                let firstCount = pageMap1.get(key);
                let secondCount = pageMap2.get(key);
                let thirdCount = pageMap3.get(key);
                let fourthCount = pageMap4.get(key);
                let fifthCount = pageMap5.get(key);
                let sixthCount = pageMap6.get(key);
                let seventhCount = pageMap7.get(key);

                if(!firstCount){
                    firstCount = 0; 
                }
                if(!secondCount){
                    secondCount = 0; 
                }
                if(!thirdCount){
                    thirdCount = 0; 
                }
                if(!fourthCount){
                    fourthCount = 0; 
                }
                if(!fifthCount){
                    fifthCount = 0; 
                }
                if(!sixthCount){
                    sixthCount = 0; 
                }
                if(!seventhCount){
                    seventhCount = 0; 
                }

                lines.push({"page":key, "day1": firstCount, "day2": secondCount, "day3": thirdCount, "day4": fourthCount, "day5": fifthCount, "day6": sixthCount, "day7": seventhCount});
                returnTop5WeekTotals.push([key, value]);
                i++; 
            }

            for (const [key, value] of objMap.entries()) {
                returnTopFiveAllTime.push([key, value]);
                j++; 
            }

            while(i<5){
                returnTop5WeekTotals.push(["https://N/A", 0]); 
                i++; 
            }

            while(j<5){
                returnTopFiveAllTime.push(["https://N/A", 0]); 
                j++;
            }


            for (let key in data){
                //fill in line chart data with daily page visits for top 5 pages 

            }

            res.send([lines, returnData, returnTop5WeekTotals.sort((a,b)=> b[1] - a[1]), returnTopFiveAllTime.sort((a,b)=> b[1] - a[1]), compData]);
        }

         

    });
};