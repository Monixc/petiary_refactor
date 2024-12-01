import { PutCommand, QueryCommand } from "@aws-sdk/lib-dynamodb";
import { docClient } from "../dynamodb";
import { v4 as uuidv4 } from "uuid";

export async function createPet(userId: string, pet: any) {
  const command = new PutCommand({
    TableName: "petiary-pets",
    Item: {
      userId: userId,
      petId: uuidv4(),
      name: pet.name,
      age: pet.age,
      species: pet.species,
      imageUrl: pet.imageUrl,
      gender: pet.gender,
      personality: pet.personality,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
  });

  return docClient.send(command);
}

export async function getPets(userId: string) {
  const command = new QueryCommand({
    TableName: "petiary-pets",
    KeyConditionExpression: "userId = :userId",
    ExpressionAttributeValues: {
      ":userId": userId,
    },
  });

  return docClient.send(command);
}
