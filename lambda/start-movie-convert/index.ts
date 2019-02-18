import * as Aws from 'aws-sdk';
const MediaConvert = new Aws.MediaConvert({endpoint: 'YOUR_MEDIA_CONVERT_ENDPOINT'});

exports.handler = async(event: any) => {
    console.log(JSON.stringify(event));

    let params: Aws.MediaConvert.CreateJobRequest = {
        'Role': 'arn:aws:iam::YOUR_AWS_ACCOUNT_ID:role/movie_convert_role',
        'JobTemplate': 'mp4tohls',
        'Settings': {
            'Inputs': [
                {
                    'FileInput': 's3://' + event['Records'][0]['s3']['bucket']['name'] + '/' +  event['Records'][0]['s3']['object']['key']
                }
            ]
        }
    };

    let data: Aws.MediaConvert.CreateJobResponse = await MediaConvert.createJob(params).promise();
    console.log(JSON.stringify(data));

    return { statusCode: 200 };
}