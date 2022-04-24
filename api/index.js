/**
 * index of all api interface function
 */

import ajax from "./ajax";
const POST = "POST";
const GET = "GET";

export const getPatientList = (clinicianId) => ajax({
  path: "/patient/getList",
  method: GET,
  data: {
    clinicianId: clinicianId,
  },
});