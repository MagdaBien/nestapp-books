import { IsNotEmpty, IsString, Length } from 'class-validator';

export class UpdateAuthorDTO {
  @IsNotEmpty()
  @IsString()
  @Length(3, 100)
  name: string;

  @IsString()
  @IsNotEmpty()
  @Length(1, 3)
  country: string;
}
