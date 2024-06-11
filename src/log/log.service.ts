import { Injectable } from '@nestjs/common';
import { CreateLogDto } from './dto/create-log.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Log as LogSchema } from './schema/log.schema';
import { Log } from './interface/Log.interface';

@Injectable()
export class LogService {
  constructor(@InjectModel(LogSchema.name) private logModel: Model<Log>) {}

  create(createLogDto: CreateLogDto) {
    return this.logModel.create(createLogDto);
  }

  findAll() {
    return this.logModel.find();
  }

  findOne(idUser: string) {
    return this.logModel.find({user: idUser});
  }
}
