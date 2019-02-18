import * as Aws from 'aws-sdk';
const DynamoDB = new Aws.DynamoDB.DocumentClient();

exports.handler = async(event: any) => {
    console.log(JSON.stringify(event));

    let params: Aws.DynamoDB.DocumentClient.PutItemInput = {
        'TableName': 'movie_list',
        'Item': {
            'Name': event.Records[0].s3.object.key,
            'EventTime': event.Records[0].eventTime
        }
    };

    let data: Aws.DynamoDB.DocumentClient.PutItemOutput = await DynamoDB.put(params).promise();
    console.log(JSON.stringify(data));

    return { statusCode: 200 };
}