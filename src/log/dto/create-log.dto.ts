import { IsDate, IsDateString, IsNotEmpty, IsObject, IsOptional, IsString } from "class-validator";
import { ObjectId } from "mongodb";
import { methodAuth, statusAuth, typeAuth } from "src/common/enums";

export class CreateLogDto {
    @IsNotEmpty()
    @IsString()
    type: typeAuth;

    @IsNotEmpty()
    @IsString()
    status: statusAuth;

    @IsNotEmpty()
    @IsString()
    method: methodAuth;

    @IsObject()
    result: object;

    @IsNotEmpty()
    @IsString()
    user: ObjectId;

    @IsDateString()
    @IsOptional()
    createdAt?: Date = new Date();
}
