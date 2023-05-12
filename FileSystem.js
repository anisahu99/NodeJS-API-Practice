const fs=require('fs');
const path=require('path');
const ext={
    type:'MakiChoo'
}
//const dirPath=path.join(__dirname,'files');
//console.log(dirPath);
// fs.writeFileSync(`${dirPath}/abc.txt`,JSON.stringify(ext));
// try{
//     const data=fs.readFileSync(`${dirPath}\\abc.txt`,'utf8');
//     console.log(data);
// }catch(err){
//     console.log(err);
// }
//fs.unlinkSync(`${dirPath}/abc.txt`);//to delete file 'it is not work for directories'
let imageName = 'bob_smith';
let filepath = path.join(__dirname, 'files', imageName, '.png');
// console.log(filepath);
//path.basename method will give you the trailing part of a path.
let fileName=path.basename(filepath);
// console.log(fileName);
let filePath=`C:/Users/moose/Pictures/Photos/India2019/DSC_0002.jpg`
let directoryOfFile=path.dirname(filePath);
console.log(directoryOfFile);