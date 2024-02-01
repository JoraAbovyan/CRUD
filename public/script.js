let usName = document.getElementById("usName");
let usPrice = document.getElementById("usPrice");
let usImg_url = document.getElementById("usImg_url");
let usDescription = document.getElementById("usDescription");
let usUuid = document.getElementById("usUuid");

function sendData(){
   let res = fetch("http://localhost:3000/about", {
    method: "POST",
    headers: {
        "Content-Type": "application/json"
    },
    body: JSON.stringify({ name: usName.value, price: usPrice.value, img_url: usImg_url.value, description: usDescription.value, uuid: usUuid.value })
   })
}
