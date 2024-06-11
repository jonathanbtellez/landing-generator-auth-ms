import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { methodAuth, statusAuth, typeAuth } from 'src/common/enums';

export type LogDocument = HydratedDocument<Log>;

@Schema()
export class Log {
  @Prop({ required: true, enum: typeAuth })
  type:   typeAuth;
  @Prop({ required: true, enum: statusAuth })
  status: statusAuth;
  @Prop({ required: true, type: Object })
  result: object;
  @Prop({ required: true, enum: methodAuth })
  method: methodAuth;
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  user: mongoose.Types.ObjectId; 
  @Prop({ required: true, type: Date, default: Date.now })
  createdAt: Date;
}



export const LogSchema = SchemaFactory.createForClass(Log);

LogSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})