/**
 * index of all api interface function
 */

import ajax from "./ajax.js";
const POST = "POST";
const GET = "GET";

export const getPatientList = (clinicianId) => ajax({
  path: "/patient/getList",
  method: GET,
  data: {
    clinicianId: clinicianId,
  },
});

export const getHealthDataList = () => ajax({
  path:"/healthData/getHealthDataList",
  method: GET,
  data:{}
})

export const postUpdateRecord = (patientId,healthDataId,value,comment) => ajax({
  path:"/record/update",
  method: POST,
  data:{
    patientId:patientId,
    healthDataId:healthDataId,
    value:value,
    comment:comment
  }
})

export const getOneRecordBypatientId = (patientId, date, healthDataId) => ajax({
  path:"/record/get",
  method: GET,
  data:{ patientId:patientId, date:date, healthDataId:healthDataId }
})