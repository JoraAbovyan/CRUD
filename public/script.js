let usName = document.getElementById("usName");
let usEmail = document.getElementById("usEmail");
let usPassword = document.getElementById("usPassword");

function sendData(){
   let res = fetch("http://localhost:3000/about", {
    method: "POST",
    headers: {
        "Content-Type": "application/json"
    },
    body: JSON.stringify({ name: usName.value, email: usEmail.value, password: usPassword.value})
   })
}
