import { Injectable } from '@nestjs/common';
import { CreateClient } from './interfaces/create-client.interface';
import { InjectRepository } from '@nestjs/typeorm';
import { Client } from './entities/client.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ClientsService {
  constructor(
    @InjectRepository(Client)
    private clientRepository: Repository<Client>,
  ) {}

  findAll(): Promise<Client[]> {
    return this.clientRepository.find();
  }

  findOne(numId: string) {
    return this.clientRepository.findOne(numId);
  }

  createClient(createClient: CreateClient): Promise<Client> {
    let newClient = new Client();
    newClient.clientIdNumber = createClient.client_id_number;
    newClient.clientName = createClient.client_name;
    return this.clientRepository.save(newClient);
  }
}
