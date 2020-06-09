import { Injectable } from '@nestjs/common';
import { CreateClient } from './interfaces/create-client.interface';
import { InjectRepository } from '@nestjs/typeorm';
import { Client } from './entities/client.entity';
import { Repository } from 'typeorm';
import { ApiResponse } from 'src/api-response/api-response';
import { CreateClientDto } from './dto/create-client.dto';

@Injectable()
export class ClientsService {
  constructor(
    @InjectRepository(Client)
    private clientRepository: Repository<Client>,
  ) {}

  async findAll(): Promise<ApiResponse> {
    const apiResponse = new ApiResponse();

    const clients = await this.clientRepository.find();
    apiResponse.data = clients;
    return Promise.resolve(apiResponse);
  }

  async findOne(numId: string): Promise<ApiResponse> {
    const apiResponse = new ApiResponse();
    const client = await this.clientRepository.findOne({
      where: { clientIdNumber: numId },
    });
    if (!client) {
      apiResponse.status = 'error';
      apiResponse.message = 'Client not found.';
    } else {
      apiResponse.data = client;
    }
    return Promise.resolve(apiResponse);
  }

  async createClient(createClient: CreateClientDto): Promise<ApiResponse> {
    const apiResponse = new ApiResponse();
    const newClient = new Client();
    newClient.clientIdNumber = createClient.clientIdNumber;
    newClient.clientName = createClient.clientName;
    console.log(newClient);
    try {
      const client = await this.clientRepository.save(newClient);
      apiResponse.data = client;
    } catch (err) {
      apiResponse.status = 'error';
      apiResponse.message = 'ID is taken.';
    }
    return Promise.resolve(apiResponse);
  }
}
