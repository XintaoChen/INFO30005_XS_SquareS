const Patient = require('../models/patient')
const HealthData = require("../models/healthData");
const Record = require('../models/record');
const Note = require("../models/note")
const moment = require('moment');
const mongoose = require('mongoose')

const getPatientInfo = async (req, res, next) => {
    try {
        // to retrieve patient's data
        const patientId = req.params.id;
        const patientData = await Patient.findById(patientId).lean()
        var patientDoB = moment(patientData.dateOfBirth)
        var timeNow = moment(new Date)
        const patientAge = timeNow.diff(patientDoB, 'years')

        // to retrieve list of health data with their units
        const untrackedHealthDataList = await HealthData.find({}, "dataName unit");
        let healthDataList = untrackedHealthDataList.map((healthData) => {
            return {
            healthTitle: healthData.dataName + " (" + healthData.unit + ")",
            }
        })

        // to retrieve list of clinician notes, sorted in descending order
        const untrackedNoteList = await Note.find({patientId}, "note date");
        let noteList = untrackedNoteList.map((singleNote) => {
            var formattedDate = moment(singleNote.date).format('DD/MM/YYYY')
            var formattedTime = moment(singleNote.date).format("HH:mm:ss")

            return {
                note: singleNote.note,
                dateTime: singleNote.date,
                date: formattedDate,
                time: formattedTime
            }
        })
        const sortedNoteList = noteList.sort(
            (objA,objB) => objB.dateTime - objA.dateTime)

        // to retrieve patient's data threshold and isRequired state
        let dataList = await Promise.all(
            untrackedHealthDataList.map(async (dataType) => {
                let healthDataId = dataType._id
                let healthDataMatched = patientData.recordingData.find((item) => {
                    return (
                    item.healthDataId.toString() == healthDataId.toString() &&
                    item.isRequired != false
                    )
                })
                let { upperBound, lowerBound } = healthDataMatched || {};
                let { dataName, unit } = dataType;
                let isRequired = healthDataMatched ? true : false
                let value = undefined;
                let comment = undefined;
                let date = undefined;
                if (isRequired) {
                    let record = await Record.findOne({
                    patientId: patientData._id,
                    date: healthDataMatched.date,
                    healthDataId: healthDataId,
                    })
                    if (record) {
                    value = record.value;
                    comment = record.comment;
                    tempDate = (record.date>tempDate) ? record.date:tempDate;
                    }
                }
                return {
                    upperBound: upperBound,
                    lowerBound: lowerBound,
                    healthDataTitle: dataName + " (" + unit + ")",
                    // dataName: dataName,
                    // unit: unit,
                    // value: value,
                    // comment: comment,
                    // date: date,
                    isRequired: isRequired
                }
            })
        )

        // to retrieve all of the patient's past records
        const untrackedRecordList = await Record.find(
            { patientId: patientId },
            "healthDataId value date"
        );
        let recordList = await Promise.all(
            untrackedRecordList.map(async (record) => {
                dataList
            return {
                //date: date,
                recordingData: dataList
            }
        })
        )
            let tempData = {
                patientData: patientData,
                patientAge: patientAge,
                recordList: recordList,
                dataSetting: dataList,
                noteList: sortedNoteList,
                healthDataList: healthDataList,
            };
          
        console.log(tempData.patientData._id);


        if (patientData) {
            res.render('singlePatient.hbs', { singlePatientData: tempData })
        } else {
            res.render('noRecords.hbs')
        }

        console.log()
        // const noteList = await Note.find()
        // console.log(noteList)

        // let noteList = await Promise.all(
        //     let notes = Note.find({})
        // )
    } catch (err) {
        return next(err)
    }
}

const addNote = async (req, res) => {
    console.log("from addNote:" + req.note)

    var newNote = new Note({
        patientId: req.patientId,
        note: req.note,
    })

    newNote.save(function (err, res) {
        if (err) return console.error(err);
    })
}

const updateSupportMessage = async (req, res, next) => {
    try {
        const patientId = req.patientId;

        // console.log(update);
        await Patient.findByIdAndUpdate(patientId, {supportMessage: req.supportMessage}, { new : true }).lean();

    } catch (error) {
        console.log("err");
    }
}

// const getPatientNote = async (req, res) => {
//     try {
//         const patientID = req.params.id
//         console.log(patientID)
//         const patientNotes = await Note.find({patientID: patientID},{}).lean()
//         console.log(patientNotes)
//         res.render('singlePatient.hbs', {"notes": patientNotes})
//     } catch (err) {
//         return next(err)
//     }
// }

function compare(p){
    return function(m,n){
        var a = m[p];
        var b = n[p];
        return b - a; 
    }
}

module.exports = {
    getPatientInfo,
    addNote,
    updateSupportMessage
}