export default function generateRecordItem() {
  let init = () => {
    let recordItemStructure = document.createElement("div")
    recordItemStructure.classList.add("record-item")
    recordItemStructure.innerHTML = "\
      <div class='item'></div>\
      <div class='value-comment'>\
          <input type='number' placeholder='Enter value' class='value' disabled='true'>\
          <input type='text' placeholder='Enter comment' class='comment pdb-hidden'>\
          <div class='btn-area pdb-hidden'>\
            <button>Cancel</button>\
            <button class='save-btn'>Submit</button>\
          </div>\
      </div>\
    "
    const handleClick = (e) => {
      let valueInput = inputs.children[0];
      if(!valueInput.getAttribute("disabled")){
        valueInput.value = ""
        valueInput.setAttribute("disabled", "true")
      } else {
        valueInput.removeAttribute("disabled")
      }
      let commentInput = inputs.children[1];
      if(commentInput.classList.contains("pdb-hidden")){
        commentInput.classList.remove("pdb-hidden")
      }else{
        commentInput.value = ""
        commentInput.classList.add("pdb-hidden")
      }
      let saveBtn = inputs.children[2];
      if(saveBtn.classList.contains("pdb-hidden")){
        saveBtn.classList.remove("pdb-hidden")
      }else{
        saveBtn.classList.add("pdb-hidden")
      }
    }
    let inputs = recordItemStructure.children[1]

    let editBtn = document.createElement("div")
    editBtn.classList.add('edit-save')
    editBtn.onclick = handleClick
    recordItemStructure.appendChild(editBtn)

    let cancelBtn = editBtn.previousElementSibling.children[2].children[0];
    cancelBtn.onclick = handleClick
    
    return recordItemStructure
  }

  let generateInput=(itemName, healthDataId, containerId, request)=>{
    let recordItemStructure = init();
    let id = itemName.replace(/[ ]/g, "-");
    recordItemStructure.id=id;
    recordItemStructure.children[0].innerHTML = itemName;
    recordItemStructure.children[1].children[2].children[1].onclick = (e) => {
      let value = e.target.previousElementSibling.previousElementSibling.value;
      let comment = e.target.previousElementSibling.value;
      request(healthDataId, value, comment);
    };
    document.getElementById(containerId).appendChild(recordItemStructure);
  }

  let generateDiv = (itemName, value, unit, dateTime, containerId) => {
    let recordItemStructure = init();
    let id = itemName.replace(/[ ]/g, "-");
    recordItemStructure.id=id;
    recordItemStructure.innerHTML = "<div class='item'></div>"
    recordItemStructure.children[0].innerHTML = itemName;
    let recordItemDiv = document.createElement('div'); 
    recordItemDiv.innerHTML = "\
    <div class='record-item'>\
      <div class='value-unit-time'>\
        <span class='record-item-value'>"+value+"</span> / <span class='record-item-unit'>"+unit+"</span><br>\
        <span class='record-time'>"+dateTime+"</span>\
      </div>\
    </div>\
    "
    recordItemStructure.appendChild(recordItemDiv)
    document.getElementById(containerId).appendChild(recordItemStructure);
  }

  let generateInvalid = (itemName,containerId) =>{
    let recordItemStructure = init();
    let id = itemName.replace(/[ ]/g, "-");
    recordItemStructure.classList.add("pdb-invalid")
    recordItemStructure.id=id;
    recordItemStructure.children[0].innerHTML = itemName;
    recordItemStructure.children[0].style.backgroundColor = "#5c4435b0"
    recordItemStructure.children[1].innerHTML = "\
    <div class='value-unit-time'>\
      <span class='record-item-invalid'> - </span><br>\
      <span class='record-item-invalid'>Not required</span>\
    </div>\
    "
    recordItemStructure.children[2].onclick = () => {}
    document.getElementById(containerId).appendChild(recordItemStructure);
  }

  return {
    generateInput,
    generateDiv,
    generateInvalid
  }
}

