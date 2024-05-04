function selectOperation(choice, id, compareTo) {
  let packDiv = document.getElementById("pack-div-" + id);
  let pack = document.getElementById("pack-" + id);
  let description = document.getElementById("withdrawDescription");
  if (choice.value === compareTo) {
    packDiv.style.display = "";
    description.style.display = "none";
    pack.setAttribute("required", "");
  } else {
    pack.removeAttribute("required");
    packDiv.style.display = "none";
    description.style.display = "";
  }
}
function selectOperation2(id, choice, compareTo) {
  let packDiv = document.getElementById("pack-div-" + id);
  let pack = document.getElementById("pack-" + id);
  let description = document.getElementById("withdrawDescription");
  if (choice.value === compareTo) {
    packDiv.style.display = "";
    description.style.display = "none";
    pack.setAttribute("required", "");
  } else {
    pack.removeAttribute("required");
    packDiv.style.display = "";
    description.style.display = "";
  }
}
