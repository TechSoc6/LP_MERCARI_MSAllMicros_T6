# Documentation

## Reports

### Schema of each report

```json
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
endpoint =
```

#### Request Query

```cmd
nhid = {nhid of the patient}
```

#### Response Body

```json
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
endpoint =
```

#### Request Body

```json
{ 
    nhid: {NHID of patiend}, 
    docId: {Registration ID of Doctor}, 
    description: Text description, 
    images: {Urls of Images}
}
```

#### Response Body

```json
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
endpoint = 
```

Here is a simple html file that uses the microservice to upload image to the blob

```html
<html>
    <head>
        <title>Test</title>
    </head>
    <body>
        <form enctype="multipart/form-data" method="post" action="https://mercari-image-upload.azurewebsites.net/api/imageUploadTrigger?code=Mo/r/z09Cu421p6Ds7R22Pm5h5thxxogfm5GOLLcYbN6JhIlV8av1A==">
            <input type="file" id="myfile" name="filename" />
            <input type="submit">Submit</input>
        </form>
    </body>
</html>
```

## Appointment

```cmd
endpoint
```

### Request body

```json
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
```
{
    message: "Appointment booked"
}
```