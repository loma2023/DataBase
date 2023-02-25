
let General_URL = "https://script.google.com/macros/s/AKfycbxFnAn0dSbeWrUVh_GppFXKCqqF0YEXxKhY6hdHJwpmaw7wOF01TWWAhcXIMGTliQ_5/exec";

fetch(General_URL)
  .then((response) => response.json())
  .then((row) => Data(row))

function Data(row) {
  localStorage.removeItem("account")
  let account = []
  let colum = "";
  for (let i = 1; i < row.length; i++) {
    colum = row[i];
    if (colum[4] === "الاستئجار") {
      let obj = { nu: colum[0], date: colum[1], item: colum[2], statement: colum[3], name: colum[6], amountdebit: colum[8], amountcredit: 0, balance: colum[15] }
      account.push(obj)

    } else if (colum[5] === "الاستئجار") {
      let obj = { nu: colum[0], date: colum[1], item: colum[2], statement: colum[3], name: colum[7], amountdebit: 0, amountcredit: colum[9], balance: colum[15] }
      account.push(obj)
    }
    localStorage.setItem("account", JSON.stringify(account))
  }
  showData()
}

function showData() {
  let account = []
  if (localStorage.account != null) { account = JSON.parse(localStorage.account) }
  let element = "";
  for (let i = 0; i < account.length; i++) {
    element += `
              <tr>
                <td >${account[i].nu}</td>
                <td >${account[i].date}</td>
                <td >${account[i].item}</td>
                <td >${account[i].statement}</td>
                <td >${account[i].name}</td>
                <td >${account[i].amountdebit}</td>
                <td >${account[i].amountcredit}</td>
                <td >${account[i].balance}</td>
              </tr>`
  }
  document.querySelector(".table-body").innerHTML = element
}

function Search() {
  let table = []
  if (localStorage.table != null) { table = JSON.parse(localStorage.table) }
  let account = []
  if (localStorage.account != null) { account = JSON.parse(localStorage.account) }

  let value = document.querySelector(".inputSearch").value
  let SDate = document.querySelector(".SDate").value
  let EDate = document.querySelector(".EDate").value

  if (SDate === "") { SDate = "01-01-1997" }
  if (EDate === "") { index = account.length - 1; EDate = account[index].date }

  let element = "";
  for (let i = 0; i < account.length; i++) {
    if (account[i].date >= SDate && account[i].date <= EDate && account[i].name.includes(value)) {
      element += `
              <tr>
              <td >${account[i].nu}</td>
              <td >${account[i].date}</td>
              <td >${account[i].item}</td>
              <td >${account[i].statement}</td>
              <td >${account[i].name}</td>
              <td >${account[i].amountdebit}</td>
              <td >${account[i].amountcredit}</td>
              <td >${account[i].balance}</td>
            </tr>`
    }
  }
  document.querySelector(".table-body").innerHTML = element
}

function Doprint() {
  document.querySelector(".topbar").classList.add("print")
  document.querySelectorAll(".cardBox1")[0].classList.add("print")
}
