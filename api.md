# Api

## index

1. postLogin
2. getPatientList
3. getCommentList
4. getDataTypesByPatientId
5. getOneRecordBypatientId
6. postUpdateRecordValue
7. postUpdateComment

## 1. postLogin

### Request Url

http://localhost:3000/login

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
    "status":0,
    "data":{
      "_id":"5c3b297dea95883f340178b0",
      "username":"user001",
      "role":"P",
      "avatarName":"Pat",
      "email":"pat123@gmail.com",
      "phoneNum":"0411111111",
      "address":"10 Wreckyn Street, North Melbourne, Melbourne, VIC"
    }
  }
  Fail:
  {
    "status":1,
    "msg":"Incorrect username or password"
  }

```

## 2. getPatientList

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

## 3. getCommentList

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

## 4. getDataTypesByPatientId

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

## 5. getOneRecordBypatientId

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

## 6. postUpdateRecordValue

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

## 7. postUpdateComment

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
