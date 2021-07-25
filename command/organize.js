let fs=require("fs");
let path=require("path");

let types = {
    media: ["mp4", "mkv"],
    archives: ['zip', '7z', 'rar', 'tar', 'gz', 'ar', 'iso', "xz"],
    documents: ['docx', 'doc', 'pdf', 'xlsx', 'xls', 'odt', 'ods', 'odp', 'odg', 'odf', 'txt', 'ps', 'tex'],
    app: ['exe', 'dmg', 'pkg', "deb"]
}

// this function for only file present in directory
function organizeFn(src) {
    let filepath;
    if(fs.existsSync(src)==true)
    {
        filepath=path.join(src,"organised file");
        if(fs.existsSync(filepath) == false)
        {
            fs.mkdirSync(filepath);
        }
    
    let entities = fs.readdirSync(src);

    for(let i=0;i<entities.length;i++){

        let entityPath = path.join(src,entities[i]);
        let isfile = fs.lstatSync(entityPath).isFile();
        if(isfile == true){
        let type = typedefiner(entities[i]);
        
        let modulepath=path.join(filepath,type);
        if(fs.existsSync(modulepath)==false)
        {
            fs.mkdirSync(modulepath);
        }
        let tobeCopiedFrom = path.basename(entityPath);
        let destpath = path.join(modulepath,tobeCopiedFrom);
        fs.copyFileSync(entityPath,destpath);
    }
        }
}


function typedefiner(entityName){
    let ext = path.extname(entityName);
    ext = ext.slice(1);

    for(let type in types)
    {
        let cTypes = types[type];
        for(let j=0;j<cTypes.length;j++)
        {
            if(ext == cTypes[j]){
                return type;
            }
        }
    }

    return "others";

}

    
}
module.exports = {
    organizefxn: organizeFn
}
