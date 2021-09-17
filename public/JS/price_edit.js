function startTime() {
    const today = new Date();
    let h = today.getHours();
    let m = today.getMinutes();
    let s = today.getSeconds();
    m = checkTime(m);
    s = checkTime(s);
    document.getElementById('time').innerHTML =  h + ":" + m + ":" + s;
    setTimeout(startTime, 1000);
}

function checkTime(i) {
    if (i < 10) {i = "0" + i};  // add zero in front of numbers < 10
    return i;
}

// fetch('api/priceData?proId=ALL')
// .then(response => {
//     if (!response.ok) {
//         throw new Error("HTTP error " + response.status);
//     }
//    j_data=response.json();
// })
var jdata;

async function readJson(){
    fetch('api/priceData?proId=ALL').then(response => {
        return response.json();
      }).then(data => {
        // Work with JSON data here
        jdata=data;
      }).catch(err => {
        // Do something for an error here
      });
}


var s_proid;
var s_prodate;
var s_vendor;

const proid=document.querySelector("#proId");
const prodate=document.querySelector('#proDate');
const provendor=document.querySelector('#vendor');
console.log(provendor);
proid.addEventListener('input', ()=>{
    s_proid=proid.value;
    console.log(s_proid);
});

prodate.addEventListener('input', ()=>{
    s_prodate=prodate.value;
    console.log(s_prodate);
});

provendor.addEventListener("click", function() {
    var options = provendor.querySelectorAll("option");
    var count = options.length;
    if(typeof(count) === "undefined" || count < 2)
    {
        addActivityItem();
    }
});

provendor.addEventListener("change", function() {
    s_vendor=provendor.value;
    console.log(jdata);

});

function addActivityItem() {
    // ... Code to add item here
}