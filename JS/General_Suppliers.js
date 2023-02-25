
let Suppliers_URL = "https://script.google.com/macros/s/AKfycbwT3IFXZ3wzu-d_wpowldvuC32aY6wYLW54o-akI91S7JDxbi_4V_DVe6ZLi-NAF8F3/exec";
let General_URL = "https://script.google.com/macros/s/AKfycbxFnAn0dSbeWrUVh_GppFXKCqqF0YEXxKhY6hdHJwpmaw7wOF01TWWAhcXIMGTliQ_5/exec";

fetch(Suppliers_URL)
  .then((response) => response.json())
  .then((row) => nameSuppliers(row))

function nameSuppliers(row) {
  let element = "";
  for (let i = 1; i < row.length; i++) {
    let colum = row[i];
    element += `<option value="${colum[1]}">${colum[1]}</option>`
  }
  document.querySelector(".nameSuppliers").innerHTML += element
}

function insert_value(id) {
  let nu = 0
  let date = $(".date").val();
  let item = ""
  let statement = $(".statement").val();
  let amountdebit = $(".price").val();
  let amountcredit = $(".price").val();

  let debit = ""; let credit = ""; let subdebit = ""; let subcredit = ""

  if (date === "") { alert("برجاء ادخال التاريخ"); return }
  else if (subcredit == null) { alert("اختر اسم العميل"); return }
  else if (amountdebit === "") { alert("برجاء ادخال المبلغ"); return }

  if (id == "debit") { debit = "الصندوق"; credit = "الموردين"; subdebit = "الصندوق"; subcredit = document.querySelector(".nameSuppliers").value; }
  else if (id == "credit") { debit = "الموردين"; credit = "الصندوق"; subdebit = document.querySelector(".nameSuppliers").value; subcredit = "الصندوق"; }
  document.querySelector(".btn_save").value = "...جارٍ الحفظ"

  fetch(General_URL)
    .then((response) => response.json())
    .then((data) => {
      let row = data.length + 1

      let url = General_URL + "?callback=ctrlq&row=" + row + "&date=" + date + "&nu=" + nu + "&action=insert" + "&statement=" + statement + "&debit=" + debit + "&item=" + item
        + "&credit=" + credit + "&subdebit=" + subdebit + "&subcredit=" + subcredit + "&amountdebit=" + amountdebit + "&amountcredit=" + amountcredit;

      let request = jQuery.ajax({ crossDomain: true, url: url, method: "GET", dataType: "jsonp" });
    })
    .then(() => { alert("تم حفظ البيانات بنجاح");document.querySelector(".btn_save").value = "حـفـظ" })
}
