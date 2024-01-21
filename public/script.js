let Usname = document.getElementById("name");
let Usage = document.getElementById("age");



function sendData(){
   fetch("http://localhost:3000/about", {
    method: "POST",
    headers: {
        "Content-Type": "application/json",
    },
    body: JSON.stringify({ name: Usname.value , age: Usage.value})
   })
}
