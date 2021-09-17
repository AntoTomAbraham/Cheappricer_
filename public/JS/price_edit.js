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
d3.json("/JSON_Data/price_data.json").then(function(data_json) {
    console.log(data_json);
})


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

});

function addActivityItem() {
    // ... Code to add item here
}