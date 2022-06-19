import { DocumentClient } from "aws-sdk/clients/dynamodb";
import User from "../model/user";

export default class TodoService {

  private tableName: string = "UsersTable";

  constructor(private docClient: DocumentClient) { }

  async createUser(user: User): Promise<User> {
    await this.docClient.put({
      TableName: this.tableName,
      Item: user
    }).promise()
    return user as User;
  }

  async getAllUsers(): Promise<User[]> {
    const users = await this.docClient.scan({
      TableName: this.tableName,
    }).promise()
    return users.Items as User[];
  }
}