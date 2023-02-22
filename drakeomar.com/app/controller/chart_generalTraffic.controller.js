const chartObj = require("../model/static_general.model.js");

/** use static dimensions model object to get data, then manipulate and return */
exports.retrieve = (req, res) => {
    chartObj.getAll((err, data) =>{
        if (err){
            res.status(500).send({
                message:
                err.message
            });
        }else{
            let returnData = {}; // to return 
            let returnLang = []; 
            let returnConn = {}; 
            
            /**useragent string/count vars */
            let useragent; 
            let googleCount = 0; 
            let firefoxCount = 0; 
            let safariCount = 0; 
            let otherCount = 0; 

            let connType; 
            let countSlow2g = 0; 
            let count2g = 0; 
            let count3g = 0; 
            let count4g = 0; 

            let langMap = new Map(); 

            for (let key in data){

                //console.log(key);
                console.log(data[key]);

                if(typeof data[key]['userAgent'] !== 'undefined'){
                    console.log(data[key]); 
                    useragent = data[key]['userAgent']; 
                    if(useragent.indexOf("Chrome") > -1){
                        //update chrome count
                        googleCount++;
                    }else if(useragent.indexOf("Firefox")>-1){
                        firefoxCount++; 
                        //update firefox count
                    }else if(useragent.indexOf("Safari") > -1){
                        safariCount++; 
                        //update safari count
                    }else{
                        //update other count
                        otherCount++;
                    }
                }

                if(typeof data[key]['lang'] !== 'undefined'){
                    if(!langMap.has(data[key]['lang'])){
                        langMap.set(data[key]['lang'], 1);
                    }else{
                        let tmp = langMap.get(data[key]['lang']);
                        langMap.set(data[key]['lang'], tmp + 1);
                    }

                    console.log(langMap); 
                }
                
                if(typeof data[key]['connType'] !== 'undefined' && data[key]['connType']){
                    connType = data[key]['connType'];
                    console.log("CONNECTION TYPE:");
                    console.log(connType); 
                    if(connType.indexOf("slow-2g") == 0){
                        countSlow2g++; 
                    }else if(connType.indexOf("2g") == 0){
                        count2g++; 
                    }else if(connType.indexOf("3g") == 0){
                        count3g++; 
                    }else if(connType.indexOf("4g") == 0){
                        count4g++;
                    }
                }

                console.log("CONNECTION COUNTS"); 
                console.log(count4g); 
                
                
            }

            returnConn = {"slow-2g": countSlow2g, "2g": count2g, "3g":count3g, "4g":count4g}; 

            let max1 = 0; 
            let max2 = 0; 
            let max3 = 0; 
            let max4 = 0; 
            let max5 = 0;
            let other = 0; 

            //iterate through lang map for top 5 entries + others
            /*
            for (const [key, value] of langMap.entries()) {
                console.log("CURRENT VALUE:"); 
                console.log(value);
                if(value > max1){
                    /**find top 5 logic */
                    /*
                    if(max1 == 0){
                        max1 = value; 
                    }else if(max2 == 0){
                        max2 = max1; 
                        max1 = value; 
                    }else if(max3 == 0){
                        max3 = max2; 
                        max2 = max1; 
                        max1 = value; 
                    }else if(max4 == 0){
                            max4 = max3; 
                            max3 = max2; 
                            max2 = max1; 
                            max1 = value;                             
                    }else if(value > max2){
                        if(max2 == 0){
                            max2 = value; 
                        }else if(max3 == 0){
                            max3 = max2; 
                            max2 = value; 
                        }else if(max4 == 0){
                            max4 = max3; 
                            max3 = max2; 
                            max2 = value; 
                        }else if(max5 == 0){
                            max5 = max4;
                            max4 = max3; 
                            max3 = max2; 
                            max2 = value;  
                        }
                    }else if(value > max3){
                        if(max3 == 0){
                            max3 = value; 
                        }else if(max4 == 0){
                            max4 = max3; 
                            max3 = value; 
                        }
                    }else if(value > max4){
                        if(max4 == 0){
                            max4 = value; 
                        }
                    }else if(value > max5){
                        if(max5 == 0){
                            max5 = value; 
                        }
                    }
                }
                
            }
            */

            console.log("TOP FIVE:"); 


            const mapSort1 = new Map([...langMap.entries()].sort((a, b) => b[1] - a[1]).slice(0,5));
            console.log(mapSort1);

            console.log(mapSort1.entries());

            let stopNum = 5; 
            let i = 0; 
            let temp = {};
            
            /**get top 5 and count the rest */
            for (const [key, value] of langMap.entries()) {
                i++ 
                console.log(key, value);

                if(i < stopNum){
                    
                    temp["language"] = key;
                    temp["count"] = value;  
                    returnLang.push(temp); 
                    temp = {}; 
                    
                }else{
                    otherCount++; 
                }
            }

            returnLang.push({"otherCount":otherCount});
            /*
            console.log("MAX COUNTS:");
            console.log(max1); 
            console.log(max2); 
            console.log(max3); 
            console.log(max4); 
            console.log(max5); 
            */
            returnData = [{"googleCount":googleCount, "firefoxCount":firefoxCount, "safariCount":safariCount, "otherCount":otherCount}]; 
            res.send([returnLang, returnData, returnConn]);
        }
    });
};