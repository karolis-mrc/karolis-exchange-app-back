const asyncLabas = () => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            console.log("asynclabas");
            resolve("resolve");
        }, 2000)
    }) 
}


const labas = async() => {
   const data = await asyncLabas();
    console.log(data);
    console.log("labas1");
}

labas().then(() => console.log("bue bue"));
// console.log("bye bye");