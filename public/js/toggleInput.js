function selectOperation(choice, id,compareTo) {
  console.log(choice,id,compareTo);
  console.log(choice.value === compareTo);

  let packDiv = document.getElementById("pack-div-" + id);
  let pack = document.getElementById("pack-" + id);
  if (choice.value === compareTo) {
    packDiv.style.display = "";
    pack.setAttribute("required", "");
  } else {
    pack.removeAttribute("required");
    packDiv.style.display = "none";
  }
}
function selectOperation2(id, choice,compareTo) {
  let pack2 = document.getElementById("pack-" + id);
  let select = document.getElementById(id).value;

  if (choice === "إعادة الإستثمار" || select === "إعادة الإستثمار") {
    pack2.style.display = "";
  } else {
    pack2.style.display = "none";
  }
}
