
let Suppliers_URL = "https://script.google.com/macros/s/AKfycbwT3IFXZ3wzu-d_wpowldvuC32aY6wYLW54o-akI91S7JDxbi_4V_DVe6ZLi-NAF8F3/exec";

fetch(Suppliers_URL)
  .then((response) => response.json())
  .then((row) => Data(row))

function Data(row) {
  localStorage.removeItem("table")
  let table = []
  let obj = ""
  let colum = "";
  for (let i = 1; i < row.length; i++) {
    colum = row[i];
    obj = { name: colum[1], address: colum[2], phone: colum[3], balance: colum[4], pen: colum[0] }
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
                  <td class="tdfirst">${table[i].pen + 1}</td>
                  <td class="tdname">${table[i].name}</td>
                  <td class="tdaddress">${table[i].address}</td>
                  <td class="tdphone">${table[i].phone}</td>
                  <td class="tdbalance">${table[i].balance}</td>
                  <td><a id="${table[i].pen}" class="fas fa-pen"   onclick="Edit(event)"></a><a id="${table[i].pen}" class="fas fa-trash" onclick="deletevalue(event)" ></a></td>
              </tr>`
  }
  document.querySelector(".table-body").innerHTML = element
}

function deletevalue(event) {
  let btn = event.target;
  let id1 = btn.id;
  let name = "";
  btn.parentElement.innerText = " جارٍ الحذف "

  let url = Suppliers_URL + "?callback=ctrlq&name=" + name + "&id=" + id1 + "&action=delete";

  let request = jQuery.ajax({ crossDomain: true, url: url, method: "GET", dataType: "jsonp" });

  setTimeout(() => { location.href = "Data_Suppliers.html" }, 5000);
}

function insert_value() {
  let id1 = "=row()-2"
  let name = $(".name").val();
  let address = $(".address").val();
  let phone = $(".phone").val();
  let balance = $(".balance").val();

  let url = Suppliers_URL + "?callback=ctrlq&name=" + name + "&id=" + id1 + "&action=insert" + "&address=" + address + "&phone=" + phone
    + "&balance=" + balance;

  let request = jQuery.ajax({ crossDomain: true, url: url, method: "GET", dataType: "jsonp" });

}

function update_value() {
  let id1 = document.querySelector(".btn_save").id
  let name = $(".name").val();
  let address = $(".address").val();
  let phone = $(".phone").val();
  let balance = $(".balance").val();


  let url = Suppliers_URL + "?callback=ctrlq&name=" + name + "&id=" + id1 + "&action=update" + "&address=" + address + "&phone=" + phone
    + "&balance=" + balance;

  let request = jQuery.ajax({ crossDomain: true, url: url, method: "GET", dataType: "jsonp" });

}

function Edit(event) {
  let btn = event.target;
  let parent = btn.parentElement.parentElement

  let tdname = parent.querySelector(".tdname").innerText
  let tdaddress = parent.querySelector(".tdaddress").innerText
  let tdphone = parent.querySelector(".tdphone").innerText
  let tdbalance = parent.querySelector(".tdbalance").innerText

  document.querySelector(".btn_save").id = btn.id;
  document.querySelector(".name").value = tdname
  document.querySelector(".address").value = tdaddress
  document.querySelector(".phone").value = tdphone
  document.querySelector(".balance").value = tdbalance
  window.scroll({ top: 0, behavior: 'smooth' });
}

function CRUD(id) {
  let table = []
  if (localStorage.table != null) { table = JSON.parse(localStorage.table) }

  let name = document.querySelector(".name").value;

  if (name == "") { alert("اكتب اسم المورد"); return }

  document.querySelector(".btn_save").value = "...جارٍ الحفظ"

  if (id == "save") {
    for (let i = 0; i < table.length; i++) {
      let tname = table[i].name
      if (name == tname) { alert("الاسم موجود بالفعل"); return }
    }

    insert_value(); setTimeout(() => { alert("تم حفظ البيانات"); location.href = "Data_Suppliers.html" }, 5000);

  } else {
    if (name != table[id].name) {
      for (let i = 0; i < table.length; i++) {
        let tname = table[i].name
        if (name == tname) { alert("الاسم موجود بالفعل"); return }
      }
    }

    update_value(); setTimeout(() => { alert("تم تعديل البيانات"); location.href = "Data_Suppliers.html" }, 5000);
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
                  <td class="tdfirst">${table[i].pen}</td>
                  <td class="tdname">${table[i].name}</td>
                  <td class="tdaddress">${table[i].address}</td>
                  <td class="tdphone">${table[i].phone}</td>
                  <td class="tdbalance">${table[i].balance}</td>
                  <td><a id="${table[i].pen}" class="fas fa-pen" onclick="Edit(event)"></a><a id="${table[i].pen}" class="fas fa-trash" onclick="deletevalue(event)" ></a></td>
              </tr>`
    }
  }
  document.querySelector(".table-body").innerHTML = element
}
