let Usname = document.getElementById('name').value;
let Usage = document.getElementById("age").value;


function sendData(){
   fetch("http://localhost:3000/about", {
    method: "POST",
    headers: {
        "Content-Type": "application/json"
    },
    body: JSON.stringify({name:Usname , age:Usage})
   })
}
