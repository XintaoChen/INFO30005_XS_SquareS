import recordItemGenerator from "/js/recordItemGenerator.js"
import { getHealthDataList, postUpdateRecord, getOneRecordBypatientId } from "./api/index.js";
import "/js/Plugins/completionRateChartPlugin.js"
import {dateFormat, dateTimeFormat} from "./utils/dateUtil.js";


const updateRecordArea = async (request)=> {
    let healthDataList = await getHealthDataList();
    let containerId = "record-area"
    if(healthDataList.status === 0){
        let datalist = healthDataList.data;
        for(let item of datalist){
            let record = await getOneRecordBypatientId(localStorage.getItem("patientId"), new Date(), item._id)
            if(record.status === 0){
                recordItemGenerator().generateDiv(item.dataName, record.data.value, record.data.unit, dateTimeFormat(record.data.date), containerId)
            }else{
                recordItemGenerator().generateInput(item.dataName, item._id, containerId, request);
            }
        }
    }
}

const updateRecord = async (healthDataId,value,comment) => {
    let result = await postUpdateRecord(localStorage.getItem("patientId"),healthDataId,value,comment)
    if(result.status === 0){
        document.getElementById("record-area").innerHTML = "";
        updateRecordArea(updateRecord)
    }
    else{
        window.alert("error")
    }
}

const initPatientDashboard = ()=>{
    localStorage.setItem("patientId", "62554eb9bcd6f0a12a5e5f52")
    updateRecordArea(updateRecord)
    document.getElementById("displayDate").innerHTML = dateFormat(Date.now());
    CompletionRateChartPlugin("completion-container", 66)
}

initPatientDashboard();