import {
  PutCommand,
  QueryCommand,
  GetCommand,
  ScanCommand,
} from "@aws-sdk/lib-dynamodb";
import { docClient } from "../dynamodb";
import { DiaryEntry } from "@/types/diary.types";

const TABLE_NAME = "petiary-diaries";

export async function createDiary(diary: DiaryEntry) {
  const command = new PutCommand({
    TableName: TABLE_NAME,
    Item: {
      userId: diary.userId,
      date: diary.date,
      content: diary.content,
      imageUrl: diary.imageUrl,
      generatedDiary: diary.generatedDiary,
      generatedImage: diary.generatedImage,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
  });

  return docClient.send(command);
}

export const getDiaryByDate = async (userId: string, date: string) => {
  try {
    console.log("Fetching diary with:", { userId, date });

    const command = new GetCommand({
      TableName: TABLE_NAME,
      Key: {
        userId,
        date,
      },
    });

    const response = await docClient.send(command);
    return response.Item;
  } catch (error) {
    console.error("Error fetching diary:", error);
    throw error;
  }
};

export async function updateDiary(date: string, updates: Partial<DiaryEntry>) {
  const userInfo = localStorage.getItem("userInfo");
  if (!userInfo) throw new Error("User info not found");

  const { sub: userId } = JSON.parse(userInfo);

  const command = new PutCommand({
    TableName: TABLE_NAME,
    Item: {
      userId,
      date,
      ...updates,
      updatedAt: new Date().toISOString(),
    },
  });

  return docClient.send(command);
}

export async function getDiaries(userId: string) {
  const command = new QueryCommand({
    TableName: TABLE_NAME,
    KeyConditionExpression: "userId = :userId",
    ExpressionAttributeValues: {
      ":userId": userId,
    },
  });

  return docClient.send(command);
}

export const scanDiaries = async () => {
  try {
    const command = new ScanCommand({
      TableName: TABLE_NAME,
      Limit: 10, // 처음 10개만 확인
    });

    const response = await docClient.send(command);
    console.log("Available data:", response.Items);
    return response.Items;
  } catch (error) {
    console.error("Error scanning diaries:", error);
    throw error;
  }
};
