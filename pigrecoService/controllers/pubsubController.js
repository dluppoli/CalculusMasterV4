import { PubSub } from '@google-cloud/pubsub';

const pubSubClient = new PubSub({projectId:process.env.PROJECT_ID});

export async function publishMessage(data) {
  const dataBuffer = Buffer.from(data);
  console.log(process.env.PROJECT_ID)
  try {
    const messageId = await pubSubClient
      .topic(process.env.TOPIC_NAME)
      .publishMessage({data: dataBuffer});
  } catch (error) {
    console.error(`Received error while publishing: ${error.message}`);
    process.exitCode = 1;
  }
}
