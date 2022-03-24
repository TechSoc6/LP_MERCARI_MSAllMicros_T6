# Documentation

## Reports

### Schema of each report

```js
{
    nhid: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Patient'
    },
    docId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Doctor'
    },
    description: {
        type: String,
        required: true
    },
    images: [{
        type: String,
    }]
}
```

### Read reports

```cmd
endpoint = https://mercari-t6.azurewebsites.net/api/appointSchedule?code=pkPjwp7e1IBVKH9SxvIUwdzBNakl3LQLqdOVHY6Z1f01ro8yJe3C2Q==
```

#### Request Query

```cmd
nhid = {nhid of the patient}
```

#### Response Body

```js
{
    success: true,
    data: {
        Array of reports
    },
    message: "All reports of the patient",
}
```

### Write reports

```cmd
endpoint = https://mercari-t6.azurewebsites.net/api/appointSchedule?code=pkPjwp7e1IBVKH9SxvIUwdzBNakl3LQLqdOVHY6Z1f01ro8yJe3C2Q==
```

#### Request Body

```js
{ 
    nhid: {NHID of patiend}, 
    docId: {Registration ID of Doctor}, 
    description: Text description, 
    images: {Urls of Images}
}
```

#### Response Body

```js
{
    success: true,
    data: {
        created report
    },
    message: "All reports of the patient",
}
```

## Images

In many microservices in the application, it's reuired to have the urls of images for reference. So, we created anoter microservice to upload and store images to blob storage.

### Upload Images

```cmd
endpoint = https://mercari-t6.azurewebsites.net/api/appointSchedule?code=pkPjwp7e1IBVKH9SxvIUwdzBNakl3LQLqdOVHY6Z1f01ro8yJe3C2Q==
```

Here is a simple html file that uses the microservice to upload image to the blob

```html
<html>
    <head>
        <title>Test</title>
    </head>
    <body>
        <form enctype="multipart/form-data" method="post" action="https://mercari-t6.azurewebsites.net/api/appointSchedule?code=pkPjwp7e1IBVKH9SxvIUwdzBNakl3LQLqdOVHY6Z1f01ro8yJe3C2Q==">
            <input type="file" id="myfile" name="filename" />
            <input type="submit">Submit</input>
        </form>
    </body>
</html>
```

## Appointment

```cmd
endpoint = https://mercari-t6.azurewebsites.net/api/appointSchedule?code=pkPjwp7e1IBVKH9SxvIUwdzBNakl3LQLqdOVHY6Z1f01ro8yJe3C2Q==
```

### Request body

```js
{
    patId: {NHID of the patient},
    docId: {Registration ID of the doctor},
    slot: {Slot object},
    date: {Date object},
    description: {Symptoms},
    images: {Urls of relavant images}
}
```

### Response

If no conflicts found it'll send positive message
```js
{
    message: "Appointment booked"
}
```
