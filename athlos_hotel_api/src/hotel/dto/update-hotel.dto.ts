import { PartialType } from '@nestjs/mapped-types';
import { CreateHotelDto } from './create-hotel.dto';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateHotelDto extends PartialType(CreateHotelDto) {
  @ApiProperty({ example: 'Updated Name' })
  name: string;

  @ApiProperty({ example: 'Updated Address' })
  address: string;

  @ApiProperty({ example: 'Updated Description' })
  description: string;

  @ApiProperty({ example: '9.0' })
  score: string;
}
