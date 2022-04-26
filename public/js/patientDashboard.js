import recordItemGenerator from "/js/recordItemGenerator.js"
import { getHealthDataList, postUpdateRecord, getOneRecordBypatientId, getDataTypesByPatientId } from "./api/index.js";
import "/js/Plugins/completionRateChartPlugin.js"
import {dateFormat, dateTimeFormat} from "./utils/dateUtil.js";


const updateRecordArea = async (request)=> {
    let healthDataList = await getHealthDataList();
    let recordingData = await getDataTypesByPatientId(localStorage.getItem("patientId"));
    let containerId = "record-area"
    if(healthDataList.status === 0){
        let datalist = healthDataList.data;
        let requireList = recordingData.data.map((item)=>{
            return item.dataName
        });
        for(let item of datalist){
            let record = await getOneRecordBypatientId(localStorage.getItem("patientId"), new Date(), item._id)
            if(record.status === 0){
                recordItemGenerator().generateDiv(item.dataName, record.data.value, record.data.unit, dateTimeFormat(record.data.date), containerId)
            }else{
                if(requireList.indexOf(item.dataName) !== -1){
                    recordItemGenerator().generateInput(item.dataName, item._id, containerId, request);
                } else {
                    recordItemGenerator().generateInvalid(item.dataName, containerId);
                }
                
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
    localStorage.setItem("patientId", "6263935e63fc6f46bcea6877")
    updateRecordArea(updateRecord)
    document.getElementById("displayDate").innerHTML = dateFormat(Date.now());
    CompletionRateChartPlugin("completion-container", 66)
}

initPatientDashboard();