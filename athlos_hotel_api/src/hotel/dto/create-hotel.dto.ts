import { ApiProperty } from '@nestjs/swagger';

export class CreateHotelDto {
  @ApiProperty({ example: 'Catalonia Barcelona Plaza' })
  name: string;
}
