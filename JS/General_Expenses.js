
let Expenses_URL = "https://script.google.com/macros/s/AKfycbwM_IIkqwPWufPwSn72I8_S164a4paPyBpQ-kDDDOJLQSTSRS43C7078fRrrc1VrhFU/exec";
let General_URL = "https://script.google.com/macros/s/AKfycbxFnAn0dSbeWrUVh_GppFXKCqqF0YEXxKhY6hdHJwpmaw7wOF01TWWAhcXIMGTliQ_5/exec";

fetch(Expenses_URL)
  .then((response) => response.json())
  .then((row) => nameExpenses(row))

function nameExpenses(row) {
  let element = "";
  for (let i = 1; i < row.length; i++) {
    let colum = row[i];
    element += `<option value="${colum[1]}">${colum[1]}</option>`
  }
  document.querySelector(".nameExpenses").innerHTML += element
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
  else if (subcredit == null) { alert("اختر اسم المصروف"); return }
  else if (amountdebit === "") { alert("برجاء ادخال المبلغ"); return }

  if (id == "debit") { debit = "المصروفات"; credit = "الصندوق"; subdebit = document.querySelector(".nameExpenses").value; subcredit = "الصندوق" }
  else if (id == "credit") { debit = "الصندوق"; credit = "المصروفات"; subdebit = "الصندوق"; subcredit = document.querySelector(".nameExpenses").value }
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
