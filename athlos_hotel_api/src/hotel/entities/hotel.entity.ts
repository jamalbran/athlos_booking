import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class Hotel {
  @PrimaryGeneratedColumn()
  @ApiProperty({ example: 1 })
  id: number;

  @Column()
  @ApiProperty({ example: 'Catalonia Barcelona Plaza' })
  name: string;

  @Column()
  @ApiProperty({
    example: 'Plaza España, 6-8, Sants-Montjuic, 08014 Barcelona, España',
  })
  address: string;

  @Column()
  @ApiProperty({
    example:
      'El Hotel Catalonia Barcelona Plaza está ubicado en Barcelona, en la plaza de España, y tiene piscina de temporada en la azotea y terraza con vistas panorámicas a la ciudad. También cuenta con sala de fitness, salón de belleza y wifi gratuita.',
  })
  description: string;

  @Column()
  @ApiProperty({
    example: '9.0',
  })
  score: string;
}
