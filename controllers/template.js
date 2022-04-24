// 
let clinicianInfo = await ajax({})
let patientList = await ajax({pageNum: 1, pageSize: 10, clinicianInfo})
let healthDataList = await ajax({});
patientList.map((item)=>{
    let id = item._id;
    let patientInfo = await ajax({patientId:id})
    let requiredData = healthDataList.map((item)=>{
        let upperBound = "", lowerBound = "";
        for(dataType of patientInfo.recordingData){
            if(dataType.healthDataId === item._id){
                upperBound = dataType.upperBound;
                lowerBound = dataType.lowerBound;
            }
        }
        return {
            healthDataId:item._id,
            lowerBound: lowerBound,
            upperBound:upperBound,
            unit: item.unit,
            isRequired: Boolean(upperBound)
        }
    })
    
    return {recordingData:requiredData, ...item}
})