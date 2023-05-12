const bcrypt=require('bcrypt');

async function run(){
    const salt=await bcrypt.genSalt(10);
    const hashed_password=await bcrypt.hash('5486',salt);
    console.log(salt);
    console.log(hashed_password);
}
run();