import { Injectable } from '@nestjs/common';
import { CreateClient } from './interfaces/create-client.interface';

@Injectable()
export class ClientsService {
  findAll() {
    return 'Find all clients';
  }

  findOne(numId: string) {
    return `Car number ${numId}`;
  }

  createClient(createClient: CreateClient) {
    return createClient;
  }
}
