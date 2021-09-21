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


const JsonData=async()=>{
    const response=await fetch('api/priceData?proId=ALL')
    let data=await response.json();
    return data;
}

jdata=(async () => {
    var jdata=await JsonData();
    return jdata;
})()






var s_proid;
var s_prodate;
var s_vendor;

const proid=document.querySelector("#proId");
const prodate=document.querySelector('#proDate');
const provendor=document.querySelector('#vendor');
console.log(provendor);
proid.addEventListener('input', ()=>{
    s_proid=proid.value;
    //console.log(s_proid);
});

prodate.addEventListener('input', ()=>{
    s_prodate=prodate.value;
    //console.log(s_prodate);
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
    jdata.then((data)=>{
        console.log(data[s_proid][s_prodate][s_vendor]);

        document.getElementById("cr-price").innerHTML = "₹"+data[s_proid][s_prodate][s_vendor];
    });

});

function addActivityItem() {
    // ... Code to add item here
}

