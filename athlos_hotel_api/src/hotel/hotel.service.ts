import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Hotel } from './entities/hotel.entity';
import { CreateHotelDto } from './dto/create-hotel.dto';
import { UpdateHotelDto } from './dto/update-hotel.dto';
// import { main } from '../../../test_puppeteer/dist/index.js';

@Injectable()
export class HotelService {
  constructor(
    @InjectRepository(Hotel)
    private readonly hotelRepository: Repository<Hotel>,
  ) {}

  async createHotel(createHotelDto: CreateHotelDto): Promise<Hotel> {
    function hotelNameTransform(searchHotel: string): string {
      return searchHotel.toLocaleLowerCase().split(' ').join('+');
    }

    const searchUrl = `http://puppeteer:8080/search/${encodeURIComponent(hotelNameTransform(createHotelDto.name))}`;

    const response = await fetch(searchUrl);

    if (!response.ok) {
      throw new Error(
        `Failed to fetch data from ${searchUrl}, status: ${response.status}`,
      );
    }

    const hotelScrapeData = await response.json();
    const hotel: Hotel = new Hotel();
    hotel.name = hotelScrapeData.name;
    hotel.address = hotelScrapeData.address;
    hotel.description = hotelScrapeData.description;
    hotel.score = hotelScrapeData.score;
    return this.hotelRepository.save(hotel);
  }

  findAllHotel(): Promise<Hotel[]> {
    return this.hotelRepository.find();
  }

  viewHotel(id: number): Promise<Hotel> {
    return this.hotelRepository.findOneBy({ id });
  }

  updateHotel(id: number, updateHotelDto: UpdateHotelDto): Promise<Hotel> {
    const hotel: Hotel = new Hotel();
    hotel.name = updateHotelDto.name;
    hotel.address = updateHotelDto.address;
    hotel.description = updateHotelDto.description;
    hotel.id = id;
    return this.hotelRepository.save(hotel);
  }

  removeHotel(id: number): Promise<{ affected?: number }> {
    return this.hotelRepository.delete(id);
  }
}
