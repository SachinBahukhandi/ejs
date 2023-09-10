let str = "Hello";

const func = (str)=>{
    return new Promise((resolve, reject)=>{
        setTimeout(()=>{
            console.log(str);
            resolve();
          }, Math.floor(Math.random() * 100) + 1);

    });




};

async function printAll(){

 await func("a").then(async ()=>{
        await func("b").then(async()=>{

        })
 })


}
printAll();
