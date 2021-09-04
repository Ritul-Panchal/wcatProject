#!/usr/bin/env node


const fs = require("fs");
let arguments = process.argv.slice(2);

let flags = [];
let filenames = [];
let secondaryArguments = [];

for (let i of arguments){
    if (i[0] == "-"){
        flags.push(i);
    }else if (i[0] == "%") {
        secondaryArguments.push(i.slice(1));
    }else {
        filenames.push(i);
    }
}


// for (let file of filenames){
//     let fileData = fs.readFileSync(file, "utf-8");
//     for (let flag of flags){
//         if (flag == "-rs"){
//             fileData = removeAll(fileData, " ");
//         }

//         if (flag == "-rn"){
//             fileData = removeAll(fileData, "\r\n"); // \r\n is for new line 
//         }

//         if (flag == "-rsc") { // here rs i have signified for removing the special characters
//             for (let secondaryArgument of secondaryArguments){
//                 fileData = removeAll(fileData, secondaryArgument);
//             }
//         }
//     }

//     console.log(fileData);
// }


// function removeAll(string, removalData){
//     return string.split(removalData).join("");
// }

// NOW LET'S TALK ABOUT CREATION OF TERMINAL COMMAND OF OUR OWN 
// By following the below process we will be able to change node index.js to whatever we like (for 
// an instance wcat)

// 1. we will change node index.js in such a way that  we will be able to run this command 
//    by using nmd run 

// 2. we will change the node index.js in such a way that we will be able to run this command 
//    directly by using "wcat".

// process for 1.

// go to package.json
// "scripts": {
//     "test": "echo \"Error: no test specified\" && exit 1", // ye kisi kaam ka nhi hota
//     "wcat": "node index.js" // iska matlab apan iss command ke badle wcat ka istemaal karenge 
//     // in simple words a longer command can be converted to small one 
//   },

// process for 2.

// go to package.json
// "scripts": {
//     "test": "echo \"Error: no test specified\" && exit 1", // ye kisi kaam ka nhi hota
//     "wcat": "node index.js" // iska matlab apan iss command ke badle wcat ka istemaal karenge 
//     // in simple words a longer command can be converted to small one 
//   },

//   "devDependencies": {},

// after the above already written command we need to write the below command 


//   "bin": {
//     "wcat": "index.js"
//   },


// LET'S ADD SOME NEW COMMANDS AS WELL TO THIS WCAT PROJECT

for (let file of filenames){
    let fileData = fs.readFileSync(file, "utf-8");
    for (let flag of flags){
        if (flag == "-rs"){
            fileData = removeAll(fileData, " ");
        }

        if (flag == "-rn"){
            fileData = removeAll(fileData, "\r\n"); // \r\n is for new line 
        }

        if (flag == "-rsc") { // here rs i have signified for removing the special characters
            for (let secondaryArgument of secondaryArguments){
                fileData = removeAll(fileData, secondaryArgument);
            }
        }

        if (flag == "-s"){
            fileData = addSequence(fileData);
        }

        if (flag == "-sn") {
            fileData = addOnlySequence(fileData);
        }

        if (flag == "-en"){
            fileData = removeXtraLines(fileData);
        }
    }

    console.log(fileData);
}


function removeAll(string, removalData){
    return string.split(removalData).join("");
} 

function addSequence(fileData){
    let currArr = fileData.split("\r\n");
    for (let i = 0; i < currArr.length; i++){
        currArr[i] = [i + 1] + " " +  currArr[i];
    }
    return currArr;
}

function addOnlySequence(fileData){
    let currArr = fileData.split("\r\n");
    for (let i = 0; i < currArr.length; i++){
        if (currArr[i] != ""){
            currArr[i] = [i + 1] + " " + currArr[i];
        }
    }
    return currArr;
}

function removeXtraLines(fileData){
    let currArr = fileData.split("\r\n");
    for (let i = 0; i < currArr.length; i++){
        if (currArr[i] == "" && currArr[i - 1] == ""){
            currArr[i] = null;
        }
        if (currArr[i] == "" && currArr[i - 1] == null){
            currArr[i] = null;
        }
    }
    
    let data = [];
    for (let i = 0; i < currArr.length; i++){
        if (currArr[i] != null){
            data.push(currArr[i]);
        }
    }

    return data;
}