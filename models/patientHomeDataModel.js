module.exports =
    [
        {patientId: '000001',
        patientName: 'Pat the Patient',
        date: 20/04/2020,
        todayHealthData: [
        {
            dataType: 'Blood Glucose Level',
            dataRequirement: true,
            dataValue: '',
            dataUnit: 'mmol/L',
            dataTime: '',
            dataComment: '',
        },
        {
            dataType: 'Weight',
            dataRequirement: true,
            dataValue: '56.7',
            dataUnit: 'kg',
            dataTime: '12:06',
            dataComment: 'I wasn’t able to maintain my diet this week, so my weight is a little greater than usual.',
        },
        {
            dataType: '# Insulin Doses',
            dataRequirement: true,
            dataValue: '3',
            dataUnit: '',
            dataTime: '12:10',
            dataComment: '',
        },
        {
            dataType: 'Step Counts',
            dataRequirement: false,
            dataValue: '',
            dataUnit: '',
            dataTime: '',
            dataComment: '',
        }
    ]
}]

