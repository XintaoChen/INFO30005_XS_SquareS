export default function generateRecordItem() {
  let init = () => {
    let recordItemStructure = document.createElement("div")
    recordItemStructure.classList.add("record-item")
    recordItemStructure.innerHTML = "\
      <div class='item'></div>\
      <div class='value-comment'>\
          <input type='number' placeholder='Enter value' class='value' disabled='true'>\
          <input type='text' placeholder='Enter comment' class='comment pdb-hidden'>\
      </div>\
    "
    let editBtn = document.createElement("div")
    editBtn.classList.add('edit-save')
    editBtn.innerHTML = "\
      <button class='edit-btn'><i class='icon-edit-patient'></i></button>\
      <button class='save-btn'><i class='icon-save'></i></button>\
    "
    editBtn.onclick = (e) => {
      let commentInput = e.target.parentElement.parentElement.previousElementSibling.children[1];
      if(commentInput.classList.contains("pdb-hidden")){
        commentInput.classList.remove("pdb-hidden")
      }else{
        commentInput.classList.add("pdb-hidden")
      }
    }
    recordItemStructure.appendChild(editBtn)
    return recordItemStructure
  }
  let generate=(itemName, containerId)=>{
    let recordItemStructure = init();
    let id = itemName.replace(/[ ]/g, "-");
    recordItemStructure.id=id;
    recordItemStructure.children[0].innerHTML = itemName;
    document.getElementById(containerId).appendChild(recordItemStructure);
  }
  return {
    generate
  }
}

