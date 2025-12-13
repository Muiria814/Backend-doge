
const fs=require('fs');
const path=require('path');
module.exports=(req,res)=>{
  if(req.method!=="POST") return res.end("Method not allowed");
  const {email,steps}=req.body;
  const file=path.join(__dirname,"..","users.json");
  let users=JSON.parse(fs.readFileSync(file,"utf8"));
  const i=users.findIndex(u=>u.email===email);
  if(i===-1) return res.end(JSON.stringify({success:false}));
  users[i].steps=steps;
  users[i].doge = steps/10000;
  fs.writeFileSync(file,JSON.stringify(users,null,2));
  res.end(JSON.stringify({success:true,doge:users[i].doge}));
};
