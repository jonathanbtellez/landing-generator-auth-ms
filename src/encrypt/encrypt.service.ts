import { Injectable, Logger } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

@Injectable()
export class EncryptService {
    private saltOrRounds : number;
    private readonly logger: Logger

    constructor() {
        this.saltOrRounds = 10;
        this.logger = new Logger(EncryptService.name);
    }

    async encrypt(password: string) {
        this.logger.log('Encrypting');
        return await bcrypt.hash(password, this.saltOrRounds);
    }

    async compare(password: string, hash: string) {
        this.logger.log('Comparing service');
        return await bcrypt.compare(password, hash);
    }

}
