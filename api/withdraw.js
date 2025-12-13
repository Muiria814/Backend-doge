
const fs=require('fs');
const path=require('path');
module.exports=(req,res)=>{
  if(req.method!=="POST") return res.end("Method not allowed");
  const {email,amount}=req.body;
  const file=path.join(__dirname,"..","users.json");
  let users=JSON.parse(fs.readFileSync(file,"utf8"));
  const i=users.findIndex(u=>u.email===email);
  if(i===-1) return res.end(JSON.stringify({success:false}));
  if(users[i].doge < amount) return res.end(JSON.stringify({success:false,message:"Saldo insuficiente"}));
  const txid="testnet_tx_"+Math.random().toString(36).slice(2);
  users[i].doge -= amount;
  users[i].history.push({type:"withdraw",amount,txid,date:Date.now()});
  fs.writeFileSync(file,JSON.stringify(users,null,2));
  res.end(JSON.stringify({success:true,txid}));
};
