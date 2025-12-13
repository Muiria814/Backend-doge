
let email=null;

function showRegister(){
  document.getElementById("login").style.display="none";
  document.getElementById("register").style.display="block";
}

async function registerUser(){
  const e=document.getElementById("re").value;
  const p=document.getElementById("rp").value;
  const r=await fetch("/api/register",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({email:e,password:p})});
  const j=await r.json();
  if(j.success){ alert("Conta criada"); location.reload(); }
  else alert(j.message);
}

async function login(){
  email=document.getElementById("email").value;
  const p=document.getElementById("password").value;
  const r=await fetch("/api/login",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({email,password:p})});
  const j=await r.json();
  if(!j.success) return alert("Credenciais inválidas");
  document.getElementById("login").style.display="none";
  document.getElementById("dash").style.display="block";
  document.getElementById("steps").innerText=j.steps;
  document.getElementById("doge").innerText=j.doge;
  document.getElementById("history").innerText=JSON.stringify(j.history,null,2);
}

async function mine(){
  const s=parseInt(document.getElementById("steps").innerText)+1;
  const r=await fetch("/api/steps",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({email,steps:s})});
  const j=await r.json();
  document.getElementById("steps").innerText=s;
  document.getElementById("doge").innerText=j.doge;
}

async function withdraw(){
  const amt=parseFloat(document.getElementById("amt").value);
  const r=await fetch("/api/withdraw",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({email,amount:amt})});
  const j=await r.json();
  if(!j.success) return alert(j.message);
  alert("TXID: "+j.txid);
  location.reload();
}
