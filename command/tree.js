let fs = require("fs")
let path=require("path");

function treeFn(src) {
    if(fs.existsSync(src))
    {
        
        let entities = fs.readdirSync(src);
        for(let i=0;i<entities.length;i++)
        {
            let isFile = fs.lstatSync(path.join(src,entities[i])).isFile();
            if (isFile == true) {
            let filename = path.basename(entities[i]);
            console.log("|--",filename);
        }
          
            }
    }
    
}

module.exports = {
    treefxn: treeFn
}