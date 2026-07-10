import { registerAs } from '@nestjs/config';

export default registerAs('appConfig', () => ({
  apiVersion: process.env.API_VERSION,
  awsBucketName: process.env.AWS_BUCKET_NAME,
  awsCloudfrontUrl: process.env.AWS_CLOUDFRONT_URL,
  awsRegion: process.env.AWS_REGION,
  awsAccessKeySecret: process.env.AWS_ACCESS_KEY_SECRET,
  awsAccessKey: process.env.AWS_ACCESS_KEY,

  mailHost: process.env.MAIL_HOST,
  smtpUsername: process.env.SMTP_USERNAME,
  smtpPassword: process.env.SMTP_PASSWORD,
}));
