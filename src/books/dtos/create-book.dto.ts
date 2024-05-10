import { Transform } from 'class-transformer';
import { IsNotEmpty, IsString, Length, Min, Max, IsUUID } from 'class-validator';

export class CreateBookDTO {
  @IsString()
  @Length(3, 100)
  @IsNotEmpty()
  title: string;

  @Min(1)
  @Max(5)
  @Transform(({ value }) => {
    return Number(value);
  })
  @IsNotEmpty()
  rating: number;

  @Min(1)
  @Max(1000)
  @Transform(({ value }) => {
    return Number(value);
  })
  @IsNotEmpty()
  price: number;

  @IsNotEmpty()
  @IsUUID()
  @IsString()
  authorId: string;
}
