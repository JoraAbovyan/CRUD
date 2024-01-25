let Usname = document.getElementById("surname");
let Usemail = document.getElementById("email");
let Uspassword = document.getElementById("password");



function sendData(){
   fetch("http://localhost:3000/about", {
    method: "POST",
    headers: {
        "Content-Type": "application/json",
    },
    body: JSON.stringify({ name: Usname.email , email: Usemail.value, password: Uspassword.value})
   })
}
