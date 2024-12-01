import { PutCommand, QueryCommand, GetCommand } from "@aws-sdk/lib-dynamodb";
import { docClient } from "../dynamodb";

export async function createDiary(userId: string, diary: any) {
  const command = new PutCommand({
    TableName: "petiary-diaries",
    Item: {
      userId,
      date: new Date().toISOString(),
      content: diary.content,
      imageUrl: diary.imageUrl,
      generatedDiary: diary.generatedDiary,
      generatedImage: diary.generatedImage,
      createdAt: Date.now(),
      updatedAt: Date.now(),
    },
  });

  return docClient.send(command);
}

export async function getDiaries(userId: string) {
  const command = new QueryCommand({
    TableName: "petiary-diaries",
    KeyConditionExpression: "userId = :userId",
    ExpressionAttributeValues: {
      ":userId": userId,
    },
  });

  return docClient.send(command);
}
