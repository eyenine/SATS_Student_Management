function validate(){
    var username=document.getElementById("username").value;
    var password=document.getElementById("password").value;
    if(username=="eyenine"&&password=="2002"){
       window.open('/home')
    }
    else{
        alert("login Failed");
        window.open('/login')
    }

}