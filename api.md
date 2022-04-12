# Api

## index

1. postPatientLogin
2. postClinicianLogin
3. getPatientList
4. getCommentList
5. getDataTypesByPatientId
6. getOneRecordBypatientId
7. postUpdateRecordValue
8. postUpdateComment

## postPatientLogin

### Request Url

http://localhost:3000/patientLogin

### Request method

post

### Parameters

| Parameters   | is required | Data Type | Description |
| :----------- | :---------: | :-------: | :---------- |
| email        |   Y         | string    | email       |
| password     |   Y         | string    | password    |

### Return Value

```json
  Success:
  {
    "status":0
  }
  Fail:
  {
    "status":1,
    "msg":"Incorrect username or password"
  }

```

## postClinicianLogin

### Request Url

http://localhost:3000/clinicianLogin

### Request method

post

### Parameters

| Parameters   | is required | Data Type | Description |
| :----------- | :---------: | :-------: | :---------- |
| username     |   Y         | string    | username    |
| password     |   Y         | string    | password    |

### Return Value

```json
  Success:
  {
    "status":0
  }
  Fail:
  {
    "status":1,
    "msg":"Incorrect username or password"
  }

```

## getPatientList

### Request Url

http://localhost:3000/clinician/getPatients

### Request method

get

### Parameters

| Parameters  | is required | Data Type | Description    |
| :---------- | :---------: | :-------: | :------------- |
| clinicianId |   Y         | string    | clinician id   |
| pageNum     |   Y         | number    | number of page |

### Return Value

```json
  Success:
  {
    "status":0,
    "data":[{
      "_id":"xxxxx",
      "username":"xxxxx"
    }]
  }

```

## getCommentList

### Request Url

http://localhost:3000/clinician/getComments

### Request method

get

### Parameters

| Parameters  | is required | Data Type | Description    |
| :---------- | :---------: | :-------: | :------------- |
| clinicianId |   Y         | string    | clinician id   |
| pageNum     |   Y         | number    | number of page |

### Return Value

```json
  Success:
  {
    "status":0,
    "data":[{
      "patientId":"5c3b297dea95883f340178b0",
      "patientName":"Pat",
      "dataType":"Exercise",
      "value":"5002",
      "unit":"steps",
      "comment":"I did it!",
      "dateTime":"20220405"
    }]
  }

```

## getDataTypesByPatientId

### Request Url

http://localhost:3000/patient/getDataTypes

### Request method

get

### Parameters

| Parameters | is required | Data Type | Description |
| :--------- | :---------: | :-------: | :---------- |
| patientId  |   Y         | string    | patient id  |

### Return Value

```json
  Success:
  {
    "status":0,
    "data":[{
      "dataType":"Exercise",
      "unit":"steps",
      "upperBound":"7000",
      "lowerBound":"3000"
    }]
  }

```

## getOneRecordBypatientId

### Request Url

http://localhost:3000/record/get

### Request method

get

### Parameters

| Parameters | is required | Data Type | Description    |
| :--------- | :---------: | :-------: | :------------- |
| patientId  |   Y         | string    | patient id     |
| date       |   Y         | string    | recording date |
| typeId     |   Y         | string    | data type id   |

### Return Value

```json
  already entered value and comment:
  {
    "status":0,
    "data":{
      "_id":"xxx",
      "value":"5002",
      "unit":"steps",
    }
  }
  already entered value but not comment:
  {
    "status":1,
    "data":{
      "_id":"xxx",
      "value":"5002",
      "unit":"steps",
    }
  }
  not yet entered:
  {
    "status":2,
  }

```

## postUpdateRecordValue

### Request Url

http://localhost:3000/record/updateValue

### Request method

post

### Parameters

| Parameters | is required | Data Type | Description    |
| :--------- | :---------: | :-------: | :------------- |
| patientId  |   Y         | string    | patient id     |
| date       |   Y         | string    | recording date |
| typeId     |   Y         | string    | data type id   |
| value      |   Y         | number    | value of data  |

### Return Value

```json
  success:
  {
    "status":0
  }

```

## postUpdateComment

### Request Url

http://localhost:3000/record/updateComment

### Request method

post

### Parameters

| Parameters | is required | Data Type | Description     |
| :--------- | :---------: | :-------: | :-------------- |
| recordId   |   Y         | string    | record id       |
| comment    |   Y         | string    | comment of data |

### Return Value

```json
  success:
  {
    "status":0
  }

```
