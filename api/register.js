
const fs = require('fs');
const path = require('path');
module.exports = (req,res)=>{
  if(req.method!=="POST") return res.end("Method not allowed");
  const file = path.join(__dirname,"..","users.json");
  let users = fs.existsSync(file)?JSON.parse(fs.readFileSync(file,"utf8")):[];
  const {email,password}=req.body;
  if(users.find(u=>u.email===email))
    return res.end(JSON.stringify({success:false,message:"Já existe"}));
  users.push({email,password,steps:0,doge:0,wallet_testnet:"testnet_"+Math.random().toString(36).slice(2),history:[]});
  fs.writeFileSync(file,JSON.stringify(users,null,2));
  res.end(JSON.stringify({success:true}));
};
