import { Test, TestingModule } from '@nestjs/testing';
import { HotelService } from './hotel.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { DeleteResult, Repository } from 'typeorm';
import { Hotel } from './entities/hotel.entity';
import { CreateHotelDto } from './dto/create-hotel.dto';
import { UpdateHotelDto } from './dto/update-hotel.dto';

describe('HotelService', () => {
  let service: HotelService;
  let repository: Repository<Hotel>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        HotelService,
        {
          provide: getRepositoryToken(Hotel),
          useClass: Repository,
        },
      ],
    }).compile();

    service = module.get<HotelService>(HotelService);
    repository = module.get<Repository<Hotel>>(getRepositoryToken(Hotel));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('createHotel', () => {
    it('should create a hotel', async () => {
      const createHotelDto: CreateHotelDto = {
        name: 'Hotel ABC',
      };

      const mockHotel = new Hotel();
      mockHotel.id = 1;
      mockHotel.address = '123 Main St';
      mockHotel.description = 'A nice hotel';
      mockHotel.score = '8.0';
      Object.assign(mockHotel, createHotelDto);

      jest.spyOn(repository, 'save').mockResolvedValue(mockHotel);

      const result = await service.createHotel(createHotelDto);
      expect(result).toEqual(mockHotel);
    });
  });

  describe('findAllHotel', () => {
    it('should return an array of hotels', async () => {
      const mockHotels = [
        {
          id: 1,
          name: 'Hotel ABC',
          address: '123 Main St',
          description: 'A nice hotel',
          score: '8.0',
        },
        {
          id: 2,
          name: 'Hotel XYZ',
          address: '456 Elm St',
          description: 'A luxurious hotel',
          score: '9.0',
        },
      ];

      jest.spyOn(repository, 'find').mockResolvedValue(mockHotels);

      const result = await service.findAllHotel();
      expect(result).toEqual(mockHotels);
    });
  });

  describe('viewHotel', () => {
    it('should return a single hotel', async () => {
      const mockHotel = {
        id: 1,
        name: 'Hotel ABC',
        address: '123 Main St',
        description: 'A nice hotel',
        score: '8.0',
      };

      jest.spyOn(repository, 'findOneBy').mockResolvedValue(mockHotel);

      const result = await service.viewHotel(1);
      expect(result).toEqual(mockHotel);
    });

    it('should return null if hotel is not found', async () => {
      jest.spyOn(repository, 'findOneBy').mockResolvedValue(null);

      const result = await service.viewHotel(999);
      expect(result).toBeNull();
    });
  });

  describe('updateHotel', () => {
    it('should update a hotel', async () => {
      const updateHotelDto: UpdateHotelDto = {
        name: 'Updated Hotel',
        address: 'Updated Address',
        description: 'Updated Description',
        score: '5.0',
      };

      const mockUpdatedHotel = {
        id: 1,
        ...updateHotelDto,
      };

      jest.spyOn(repository, 'save').mockResolvedValue(mockUpdatedHotel);

      const result = await service.updateHotel(1, updateHotelDto);
      expect(result).toEqual(mockUpdatedHotel);
    });
  });

  describe('removeHotel', () => {
    it('should remove a hotel', async () => {
      const mockResult: DeleteResult = { affected: 1, raw: {} };

      jest.spyOn(repository, 'delete').mockResolvedValue(mockResult);

      const result = await service.removeHotel(1);
      expect(result).toEqual(mockResult);
    });

    it('should return { affected: 0 } if hotel is not found', async () => {
      const mockResult: DeleteResult = { affected: 0, raw: {} };

      jest.spyOn(repository, 'delete').mockResolvedValue(mockResult);

      const result = await service.removeHotel(999);
      expect(result).toEqual(mockResult);
    });
  });
});
