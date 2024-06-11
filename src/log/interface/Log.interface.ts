import { ObjectId } from 'mongodb';
import { Document } from 'mongoose';
import { methodAuth, statusAuth, typeAuth } from 'src/common/enums';

export interface Log extends Document {
  _id: ObjectId;
  type: typeAuth;
  status: statusAuth;
  result: object;
  method: methodAuth;
  user: ObjectId[]
}