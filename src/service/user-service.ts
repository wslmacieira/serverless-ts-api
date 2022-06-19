import { DocumentClient } from "aws-sdk/clients/dynamodb";
import User from "../model/user";

export default class UserService {

  private tableName: string = "UsersTable";

  constructor(private docClient: DocumentClient) { }

  async getAllUsers(): Promise<User[]> {
    const users = await this.docClient.scan({
      TableName: this.tableName,
    }).promise()
    return users.Items as User[];
  }

  async createUser(user: User): Promise<User> {
    await this.docClient.put({
      TableName: this.tableName,
      Item: user
    }).promise()
    return user as User;
  }

  async getUser(id: string): Promise<User> {
    const user = await this.docClient.get({
      TableName: this.tableName,
      Key: {
        userId: id
      }
    }).promise()
    if (!user.Item) {
      throw new Error("Id does not exit");
    }
    return user.Item as User;
  }

  async updateUser(id: string): Promise<User> {
    const updated = await this.docClient
      .update({
        TableName: this.tableName,
        Key: { userId: id },
        UpdateExpression:
          "set #status = :status",
        ExpressionAttributeNames: {
          "#status": "status",
        },
        ExpressionAttributeValues: {
          ":status": true,
        },
        ReturnValues: "ALL_NEW",
      })
      .promise();
    return updated.Attributes as User;
  }

  async deleteUser(id: string): Promise<any> {
    return await this.docClient.delete({
      TableName: this.tableName,
      Key: {
        userId: id
      }
    }).promise();
  }

}