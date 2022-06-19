import dynamoDBClient from "../db";
import UserService from "./user-service"

const userService = new UserService(dynamoDBClient());
export default userService;