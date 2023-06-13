
let Customers_URL = "https://script.google.com/macros/s/AKfycbymBgQT9pQ_wBhXWG6MA_cYO0N6iL3i3rhzNGPwGQ9IRUTzYuRit2iFM_CKMAmePhWF/exec";
let General_URL = "https://script.google.com/macros/s/AKfycbxFnAn0dSbeWrUVh_GppFXKCqqF0YEXxKhY6hdHJwpmaw7wOF01TWWAhcXIMGTliQ_5/exec";

fetch(Customers_URL)
  .then((response) => response.json())
  .then((row) => nameCustomer(row))

function nameCustomer(row) {
  let element = "";
  for (let i = 1; i < row.length; i++) {
    let colum = row[i];
    element += `<option value="${colum[1]}">${colum[1]}</option>`
  }
  document.querySelector(".nameCustomer").innerHTML += element
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

  if (id == "debit") { debit = "الصندوق"; credit = "العملاء"; subdebit = "الصندوق"; subcredit = document.querySelector(".nameCustomer").value; }
  else if (id == "credit") { debit = "العملاء"; credit = "الصندوق"; subdebit = document.querySelector(".nameCustomer").value; subcredit = "الصندوق" }
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
