
let Profits_URL = "https://script.google.com/macros/s/AKfycbxR7bTT42-LYZFSR1TgtEqy7yzgqi1KaKZrE_E5DMmLc96ORnBv_ugYYsswhFR_PUGu/exec";

fetch(Profits_URL)
    .then((response) => response.json())
    .then((row) => Data(row))

function Data(row) {
    localStorage.removeItem("table")
    let table = []
    let colum = "";
    for (let i = 1; i < row.length; i++) {
        colum = row[i];
        let obj = { name: colum[0], tageer: colum[1], astagar: colum[2], subtotal: colum[3], Revenues: colum[4], Expenses: colum[5], total: colum[6] }
        table.push(obj)
        localStorage.setItem("table", JSON.stringify(table))
    }
    showData()
}

function showData() {
    let table = []
    if (localStorage.table != null) { table = JSON.parse(localStorage.table) }
    let element = "";
    for (let i = 0; i < table.length; i++) {
        element += `
              <tr>
                <td >${table[i].name}</td>
                <td >${table[i].tageer}</td>
                <td >${table[i].astagar}</td>
                <td >${table[i].subtotal}</td>
                <td >${table[i].Revenues}</td>
                <td >${table[i].Expenses}</td>
                <td >${table[i].total}</td>
              </tr>`
    }
    document.querySelector(".table-body").innerHTML = element
    let x = new Date().getMonth()
    document.querySelectorAll("tr")[x + 1].style.border = "2px solid #999";
    document.querySelectorAll(".chart-title")[1].innerText = "الشكل التوضيحي لشهر " + table[x].name;
    document.querySelectorAll(".chart-title")[2].innerText = "الشكل التوضيحي لعام " + new Date().getFullYear();
    charts()
}

function Search() {
    let table = []
    if (localStorage.table != null) { table = JSON.parse(localStorage.table) }
    let element = "";
    let value = document.querySelector(".inputSearch").value
    for (let i = 0; i < table.length; i++) {
        if (table[i].name.includes(value)) {
            element += `
              <tr>
                <td >${table[i].name}</td>
                <td >${table[i].tageer}</td>
                <td >${table[i].astagar}</td>
                <td >${table[i].subtotal}</td>
                <td >${table[i].Revenues}</td>
                <td >${table[i].Expenses}</td>
                <td >${table[i].total}</td>
              </tr>`
        }
    }
    document.querySelector(".table-body").innerHTML = element
}

function Doprint() {
    document.querySelector(".topbar").classList.add("print")
    document.querySelector(".cardBox1").classList.add("print")
}

function charts() {
let table = []
if (localStorage.table != null) { table = JSON.parse(localStorage.table)}
let x = new Date().getMonth()

var barChartOptions = {
    series: [{name:" ",data: [table[x].total, table[x].Expenses, table[x].Revenues, table[x].subtotal, table[x].astagar,table[x].tageer]}],
    chart: {type: 'bar',height: 350,toolbar: {show: false},},
    colors: ["#246dec","#cc3c43","#367952","#f5b74f","#4f35a1","#035e7b"],
    plotOptions: {bar: {distributed: true,borderRadius: 4,horizontal: false,columnWidth: '40%',}},
    dataLabels: {enabled: false},
    legend: {show: false},
    xaxis: {categories: ["صافي الربح", "المصروفات", "الإيرادات", "مجمل الربح", "الاستئجار" , "التأجير"],},
    yaxis: {title: {text: ""}}
};
  var barChart = new ApexCharts(document.querySelector("#bar-chart"), barChartOptions);
  barChart.render();
 
//====================الشكل الثاني =======================  
  var barChartOptions2 = {
    series:[
    {name: 'صافي الربح ', data:[table[11].total,table[10].total,table[9].total,table[8].total,table[7].total,table[6].total,table[5].total,table[4].total,table[3].total,table[2].total,table[1].total,table[0].total]},
    {name: 'المصروفات ',  data:[table[11].Expenses,table[10].Expenses,table[9].Expenses,table[8].Expenses,table[7].Expenses,table[6].Expenses,table[5].Expenses,table[4].Expenses,table[3].Expenses,table[2].Expenses,table[1].Expenses,table[0].Expenses]},
    {name: 'الإيرادات ',   data:[table[11].Revenues,table[10].Revenues,table[9].Revenues,table[8].Revenues,table[7].Revenues,table[6].Revenues,table[5].Revenues,table[4].Revenues,table[3].Revenues,table[2].Revenues,table[1].Revenues,table[0].Revenues]},
    {name: 'مجمل الربح ', data:[table[11].subtotal,table[10].subtotal,table[9].subtotal,table[8].subtotal,table[7].subtotal,table[6].subtotal,table[5].subtotal,table[4].subtotal,table[3].subtotal,table[2].subtotal,table[1].subtotal,table[0].subtotal]},
    {name: 'الأستئجار ',   data:[table[11].astagar,table[10].astagar,table[9].astagar,table[8].astagar,table[7].astagar,table[6].astagar,table[5].astagar,table[4].astagar,table[3].astagar,table[2].astagar,table[1].astagar,table[0].astagar]}, 
    {name: 'التأجير ',    data:[table[11].tageer,table[10].tageer,table[9].tageer,table[8].tageer,table[7].tageer,table[6].tageer,table[5].tageer,table[4].tageer,table[3].tageer,table[2].tageer,table[1].tageer,table[0].tageer]}],

    chart: {height: 350,type: 'bar',toolbar: {show: false,},},
    colors: ["#246dec","#cc3c43","#367952","#f5b74f","#4f35a1","#035e7b"],
    dataLabels: {enabled: false,},
    stroke: {curve: 'smooth'},
    labels: ["ديسمبر", "نوفمبر", "أكتوبر", "سبتمبر", "أغسطس", "يونيو", "يوليو", "مايو" , "أبريل" , "مارس" ,"فبراير","يناير" ],
  };
  var areaChart = new ApexCharts(document.querySelector("#bar-chart2"), barChartOptions2);
  areaChart.render();

  //====================الشكل الثالث =======================  
  var radarChartOptions = {
    series:[
      {name: ' التأجير ',    data:[table[0].tageer,table[1].tageer,table[2].tageer,table[3].tageer,table[4].tageer,table[5].tageer,table[6].tageer,table[7].tageer,table[8].tageer,table[9].tageer,table[10].tageer,table[11].tageer]},
      {name: ' الأستئجار ',   data:[table[0].astagar,table[1].astagar,table[2].astagar,table[3].astagar,table[4].astagar,table[5].astagar,table[6].astagar,table[7].astagar,table[8].astagar,table[9].astagar,table[10].astagar,table[11].astagar]}, 
      {name: ' مجمل الربح ', data:[table[0].subtotal,table[1].subtotal,table[2].subtotal,table[3].subtotal,table[4].subtotal,table[5].subtotal,table[6].subtotal,table[7].subtotal,table[8].subtotal,table[9].subtotal,table[10].subtotal,table[11].subtotal]},
      {name: ' الإيرادات ',   data:[table[0].Revenues,table[1].Revenues,table[2].Revenues,table[3].Revenues,table[7].Revenues,table[5].Revenues,table[6].Revenues,table[7].Revenues,table[8].Revenues,table[9].Revenues,table[10].Revenues,table[11].Revenues]},
      {name: ' المصروفات ',  data:[table[0].Expenses,table[1].Expenses,table[2].Expenses,table[3].Expenses,table[7].Expenses,table[5].Expenses,table[6].Expenses,table[7].Expenses,table[8].Expenses,table[9].Expenses,table[10].Expenses,table[11].Expenses]},
      {name: ' صافي الربح ', data:[table[0].total,table[1].total,table[2].total,table[3].total,table[4].total,table[5].total,table[6].total,table[7].total,table[8].total,table[9].total,table[10].total,table[11].total]},],
  
    chart: {height: 350,type: 'radar',toolbar: {show: false,},},
    colors: ["#246dec","#cc3c43","#367952","#f5b74f","#4f35a1","#035e7b"],
    dataLabels: {enabled: false,},
    stroke: {curve: 'smooth'},
    labels: ["يناير", "فبراير", "مارس", "أبريل", "مايو", "يوليو", "يونيو", "أغسطس" , "سبتمبر" , "أكتوبر" ,"نوفمبر","ديسمبر" ],
  };
  var radarChart = new ApexCharts(document.querySelector("#radar-chart"), radarChartOptions);
  radarChart.render();
} 

//1-bar
//2-area
//3-radar
//4-line
//5-scatter 

