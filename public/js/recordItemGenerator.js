export default function generateRecordItem() {
  let recordItemStructure = document.createElement("div")
  recordItemStructure.classList.add("record-item")
  recordItemStructure.innerHTML = "\
    <div class='item'></div>\
    <div class='value-comment'>\
        <input type='number' placeholder='Enter value' class='value' disabled='true'>\
        <input type='text' placeholder='Enter comment' class='comment'>\
    </div>\
    <div class='edit-save'>\
        <button class='edit-btn'><i class='icon-edit-patient'></i></button>\
        <button class='save-btn'><i class='icon-save'></i></button>\
    </div>\
  "
  let generate=(itemName, containerId)=>{
    recordItemStructure.children[0].innerHTML = itemName;
    document.getElementById(containerId).appendChild(recordItemStructure);
  }
  return {
    generate
  }
}

