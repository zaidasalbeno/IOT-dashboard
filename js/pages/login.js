const form=document.querySelector("form"),user=document.getElementById("username"),pass=document.getElementById("password");
if(sessionStorage.getItem("auth")==="1")location.replace("main.html");
const err=Object.assign(document.createElement("div"),{className:"alert alert-danger py-2 d-none",role:"alert",textContent:"Wrong username or password"});
form.prepend(err);
form.addEventListener("submit",e=>{
  e.preventDefault();
  if(user.value.trim()==="admin"&&pass.value==="admin"){sessionStorage.setItem("auth","1");location.href="main.html";}
  else{err.classList.remove("d-none");pass.value="";pass.focus();}
});
