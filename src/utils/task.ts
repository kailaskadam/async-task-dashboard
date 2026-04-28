//Task Creator

//normal function
export const CreateTask = (name: string, time: number,sucess: boolean) => {
    return new Promise<String>((resolve,reject)=>{
        setTimeout(()=>{
            if(sucess){
                resolve(`Task ${name} completed successfully in ${time} ms`);
            }else{
                reject(`Task ${name} failed after ${time} ms`);
            }
        }, time)
    })
}


//task creator with currying
export const CreateTaskCurried = (name:string) => {
    return (time:number) => {
        return (success:boolean) => {                                 
            return new Promise<String>((resolve,reject)=>{
                setTimeout(()=>{
                    if(success){
                        resolve(`Task ${name} completed successfully in ${time} ms`);
                    }else{
                        reject(`Task ${name} failed after ${time} ms`);
                    }
                }, time)
            })  
        }
    }
}
     