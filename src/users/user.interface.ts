import { ObjectId } from 'mongodb';
import { Document } from 'mongoose';

export interface User extends Document {
  _id: ObjectId;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  logs: ObjectId[]
}