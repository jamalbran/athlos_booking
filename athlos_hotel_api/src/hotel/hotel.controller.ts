import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
} from '@nestjs/common';
import { HotelService } from './hotel.service';
import { CreateHotelDto } from './dto/create-hotel.dto';
import { UpdateHotelDto } from './dto/update-hotel.dto';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { Hotel } from './entities/hotel.entity';

@ApiTags('hotels')
@Controller('hotels')
export class HotelController {
  constructor(private readonly hotelService: HotelService) {}

  @Post('/scrape')
  @ApiOperation({ summary: 'Create a new hotel' })
  @ApiResponse({ status: 201, type: Hotel })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  create(@Body() createHotelDto: CreateHotelDto) {
    return this.hotelService.createHotel(createHotelDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all hotels' })
  @ApiResponse({ status: 200, description: 'Return all hotels', type: [Hotel] })
  findAll() {
    return this.hotelService.findAllHotel();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a single hotel' })
  @ApiResponse({ status: 200, description: 'Return the hotel', type: Hotel })
  @ApiResponse({ status: 404, description: 'Hotel not found.' })
  findOne(@Param('id') id: string) {
    return this.hotelService.viewHotel(+id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update a hotel' })
  @ApiResponse({ status: 200, type: Hotel })
  @ApiResponse({ status: 404, description: 'Hotel not found.' })
  update(@Param('id') id: string, @Body() updateHotelDto: UpdateHotelDto) {
    return this.hotelService.updateHotel(+id, updateHotelDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a hotel' })
  @ApiResponse({ status: 200, description: 'The hotel has been deleted.' })
  @ApiResponse({ status: 404, description: 'Hotel not found.' })
  remove(@Param('id') id: string) {
    return this.hotelService.removeHotel(+id);
  }
}
