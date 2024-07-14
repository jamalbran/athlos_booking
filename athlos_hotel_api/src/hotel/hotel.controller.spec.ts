import { Test, TestingModule } from '@nestjs/testing';
import { HotelController } from './hotel.controller';
import { HotelService } from './hotel.service';
import { CreateHotelDto } from './dto/create-hotel.dto';
import { UpdateHotelDto } from './dto/update-hotel.dto';

describe('HotelController', () => {
  let controller: HotelController;
  let hotelService: HotelService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [HotelController],
      providers: [
        {
          provide: HotelService,
          useValue: {
            createHotel: jest.fn(),
            findAllHotel: jest.fn(),
            viewHotel: jest.fn(),
            updateHotel: jest.fn(),
            removeHotel: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<HotelController>(HotelController);
    hotelService = module.get<HotelService>(HotelService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    it('should create a hotel', async () => {
      const createHotelDto: CreateHotelDto = {
        name: 'Hotel ABC',
      };

      const mockCreatedHotel = {
        id: 1,
        address: '123 Main St',
        description: 'A nice hotel',
        score: '8.0',
        ...createHotelDto,
      };

      jest
        .spyOn(hotelService, 'createHotel')
        .mockResolvedValue(mockCreatedHotel);

      const result = await controller.create(createHotelDto);
      expect(result).toEqual(mockCreatedHotel);
    });
  });

  describe('findAll', () => {
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
          score: '9.5',
        },
      ];

      jest.spyOn(hotelService, 'findAllHotel').mockResolvedValue(mockHotels);

      const result = await controller.findAll();
      expect(result).toEqual(mockHotels);
    });
  });

  describe('findOne', () => {
    it('should return a single hotel', async () => {
      const mockHotel = {
        id: 1,
        name: 'Hotel ABC',
        address: '123 Main St',
        description: 'A nice hotel',
        score: '8.0',
      };

      jest.spyOn(hotelService, 'viewHotel').mockResolvedValue(mockHotel);

      const result = await controller.findOne('1');
      expect(result).toEqual(mockHotel);
    });
  });

  describe('update', () => {
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

      jest
        .spyOn(hotelService, 'updateHotel')
        .mockResolvedValue(mockUpdatedHotel);

      const result = await controller.update('1', updateHotelDto);
      expect(result).toEqual(mockUpdatedHotel);
    });
  });

  describe('remove', () => {
    it('should remove a hotel', async () => {
      const mockResult = { affected: 1 };

      jest.spyOn(hotelService, 'removeHotel').mockResolvedValue(mockResult);

      const result = await controller.remove('1');
      expect(result).toEqual(mockResult);
    });
  });
});
