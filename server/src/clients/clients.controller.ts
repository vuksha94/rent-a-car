import { Controller, Get, Post, Param, Body } from '@nestjs/common';
import { ClientsService } from './clients.service';
import { CreateClientDto } from './dto/create-client.dto';

@Controller('clients')
export class ClientsController {
  constructor(private clientsService: ClientsService) {}

  // get all clients
  @Get()
  findAll() {
    return this.clientsService.findAll();
  }

  @Get(':num_id')
  findOne(@Param('num_id') numId: string) {
    return this.clientsService.findOne(numId);
  }

  // create new client
  @Post()
  createCar(@Body() createClientDto: CreateClientDto) {
    return this.clientsService.createClient(createClientDto);
  }
}
