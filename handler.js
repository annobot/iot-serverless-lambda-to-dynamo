const AWS = require("aws-sdk");

const dynamoDB = new AWS.DynamoDB.DocumentClient();

module.exports.processIoTMessage = async (event) => {
  console.log("Received event:", JSON.stringify(event, null, 2));

  const payload = event;

  const params = {
    TableName: "itotemperaturedata",
    Item: {
      deviceId: payload.deviceId,
      timeStamp: Date.now(),
      temperature: payload.temperature,
    },
  };

  await dynamoDB.put(params).promise();
  console.log("Data saved:", params.Item);

  return {
    statusCode: 200,
    body: JSON.stringify({ message: "Data processed" }),
  };
};
