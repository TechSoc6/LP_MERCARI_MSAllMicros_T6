const {BlobServiceClient} = require("@azure/storage-blob");
var multipart = require("parse-multipart");
var { v4 } = require('uuid');
const AZURE_STORAGE_CONNECTION_STRING = process.env["AZURE_STORAGE_CONNECTION_STRING"]

module.exports = async function (context, req) {
    var bodyBuffer = Buffer.from(req.body);
    var boundary = multipart.getBoundary(req.headers["content-type"]);
    var parts = multipart.Parse(bodyBuffer, boundary);
    try{
        const blobServiceClient = await BlobServiceClient.fromConnectionString(AZURE_STORAGE_CONNECTION_STRING);
        const container = "report-images";
        const containerClient = await blobServiceClient.getContainerClient(container);
        const blobName = v4();
        const blockBlobClient = containerClient.getBlockBlobClient(blobName);
        await blockBlobClient.upload(parts[0].data, parts[0].data.length);
        context.res = {
            body: {
                uri: `https://imagesformercari.blob.core.windows.net/report-images/${blobName}`
            }
        };
    } catch (e) {
        context.res = {
            body: {
                error: e
            }
        }
    }
    context.done();
}