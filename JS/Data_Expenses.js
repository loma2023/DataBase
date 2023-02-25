let Expenses_URL = "https://script.google.com/macros/s/AKfycbwM_IIkqwPWufPwSn72I8_S164a4paPyBpQ-kDDDOJLQSTSRS43C7078fRrrc1VrhFU/exec";

fetch(Expenses_URL)
  .then((response) => response.json())
  .then((row) => Data(row))

function Data(row) {
  localStorage.removeItem("table")
  let table = []
  let obj = ""
  let colum = "";
  for (let i = 1; i < row.length; i++) {
    colum = row[i];
    obj = { nu: colum[0], name: colum[1] }
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
                  <td class="tdid">${table[i].nu + 1}</td>
                  <td class="tdname">${table[i].name}</td>
                  <td><a id="${table[i].nu}" class="fas fa-pen" onclick="Edit(event)"></a><a id="${table[i].nu}" class="fas fa-trash" onclick="deletevalue(event)" ></a></td>
              </tr>`
  }
  document.querySelector(".table-body").innerHTML = element
}

function deletevalue(event) {
  let btn = event.target;
  let id1 = btn.id;
  let name = "";
  btn.parentElement.innerText = " جارٍ الحذف "
  let url = Expenses_URL + "?callback=ctrlq&name=" + name + "&id=" + id1 + "&action=delete";

  let request = jQuery.ajax({ crossDomain: true, url: url, method: "GET", dataType: "jsonp" });

  setTimeout(() => { location.href = "Data_Expenses.html" }, 5000);
}

function insert_value() {
  let id1 = "=row()-2"
  let name = $(".name").val();

  let url = Expenses_URL + "?callback=ctrlq&name=" + name + "&id=" + id1 + "&action=insert"

  let request = jQuery.ajax({ crossDomain: true, url: url, method: "GET", dataType: "jsonp" });

}

function update_value() {
  let id1 = document.querySelector(".btn_save").id
  let name = $(".name").val();

  let url = Expenses_URL + "?callback=ctrlq&name=" + name + "&id=" + id1 + "&action=update"

  let request = jQuery.ajax({ crossDomain: true, url: url, method: "GET", dataType: "jsonp" });

}

function Edit(event) {
  let btn = event.target;
  let parent = btn.parentElement.parentElement

  let tdname = parent.querySelector(".tdname").innerText

  document.querySelector(".btn_save").id = btn.id;
  document.querySelector(".name").value = tdname

  window.scroll({ top: 0, behavior: 'smooth' });
}

function CRUD(id) {
  let table = []
  if (localStorage.table != null) { table = JSON.parse(localStorage.table) }

  let name = document.querySelector(".name").value;

  if (name == "") { alert("اكتب اسم المصروف"); return }

  document.querySelector(".btn_save").value = "...جارٍ الحفظ"

  if (id == "save") {
    for (let i = 0; i < table.length; i++) {
      let tname = table[i].name
      if (name == tname) { alert("الاسم موجود بالفعل"); return }
    }

    insert_value(); setTimeout(() => { alert("تم حفظ البيانات"); location.href = "Data_Expenses.html" }, 5000);
  } else {
    if (name != table[id].name) {
      for (let i = 0; i < table.length; i++) {
        let tname = table[i].name
        if (name == tname) { alert("الاسم موجود بالفعل"); return }
      }
    }

    update_value(); setTimeout(() => { alert("تم تعديل البيانات"); location.href = "Data_Expenses.html" }, 5000);
  }
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
                  <td class="tdid">${table[i].id}</td>
                  <td class="tdname">${table[i].name}</td>
                  <td><a id="${table[i].id}" class="fas fa-pen" onclick="Edit(event)"></a><a id="${table[i].id}" class="fas fa-trash" onclick="deletevalue(event)" ></a></td>   
              </tr>`
    }
  }
  document.querySelector(".table-body").innerHTML = element
}
