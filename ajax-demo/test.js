import {getPatientList} from "../api";

const test = async () => {
  // send request
  var patientList = await getPatientList("6254e9b4bcd6f0a12a5e5eda");

  // check the status
  if (patientList.status === 0) {
    // so here we get list of data
    var list = patientList.data;
    
    // present data into html
    var demoContainer = document.getElementById("demo-container");
    var pateints = document.createElement("ul");
    for (let item of list) {
      let patient = document.createElement("li");
      let name = document.createElement("span");
      name.innerText = "name: " + item.profileName + " ----- ";
      let id = document.createElement("span");
      id.innerText = "id: " + item._id;
      patient.appendChild(name);
      patient.appendChild(id);
      pateints.appendChild(patient);
    }
    demoContainer.appendChild(pateints);
  }
};
test();
