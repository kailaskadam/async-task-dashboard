export const withTimeout = (taskFn:Function,timeout:number) => {
    return Promise.race([taskFn(),new Promise((_,reject)=>{ 
        setTimeout(()=>{
            reject("timeout")
        },timeout)
    })])
}


export const withRetry = (taskFn:Function,retries:number) => {
    return async () =>{
        let attempts = 0;
        while(attempts < retries){
            try{
                return await taskFn();
            }catch(error){
                attempts++;
                if(attempts === retries){
                    throw error;
                }
            }
        }
    }
}

