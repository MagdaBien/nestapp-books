import { Transform } from 'class-transformer';
import { IsNotEmpty, IsString, Length, Min, Max, IsUUID } from 'class-validator';

export class UpdateBookDTO {
  @IsString()
  @Length(3, 100)
  @IsNotEmpty()
  title: string;

  @Min(1)
  @Max(5)
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

