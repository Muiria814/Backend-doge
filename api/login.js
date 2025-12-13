
const fs=require('fs');
const path=require('path');
module.exports=(req,res)=>{
  if(req.method!=="POST") return res.end("Method not allowed");
  const file=path.join(__dirname,"..","users.json");
  let users=JSON.parse(fs.readFileSync(file,"utf8"));
  const {email,password}=req.body;
  const u=users.find(x=>x.email===email && x.password===password);
  if(!u) return res.end(JSON.stringify({success:false}));
  res.end(JSON.stringify({success:true,steps:u.steps,doge:u.doge,wallet:u.wallet_testnet,history:u.history}));
};
