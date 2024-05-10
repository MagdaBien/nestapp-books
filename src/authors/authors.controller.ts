import {
  Controller,
  Get,
  Delete,
  Post,
  Put,
  Param,
  Body,
  NotFoundException,
} from '@nestjs/common';
import { AuthorsService } from './authors.service';
import { CreateAuthorDTO } from './dtos/create-author.dto';
import { UpdateAuthorDTO } from './dtos/update-author.dto';
import { ParseUUIDPipe } from '@nestjs/common';
import { Author } from '@prisma/client';

@Controller('authors')
export class AuthorsController {
  constructor(private authorsService: AuthorsService) {
    this.authorsService = authorsService;
  }

  @Get('/')
  getAll(): Promise<Author[]> {
    return this.authorsService.getAll();
  }

  @Get('/:id')
  async getById(
    @Param('id', new ParseUUIDPipe()) id: string,
  ): Promise<Author | null> {
    const author = await this.authorsService.getById(id);
    if (!author) {
      throw new NotFoundException('Author not found');
    }
    return author;
  }

  @Post('/')
  create(@Body() authorData: CreateAuthorDTO): Promise<Author> {
    return this.authorsService.create(authorData);
  }

  @Put('/:id')
  async update(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() authorData: UpdateAuthorDTO,
  ): Promise<Author> {
    if (!(await this.authorsService.getById(id))) {
      throw new NotFoundException('Author not found');
    }
    return await this.authorsService.updateById(id, authorData);
  }

  @Delete('/:id')
  async deleteById(
    @Param('id', new ParseUUIDPipe()) id: string,
  ): Promise<Author> {
    if (!(await this.authorsService.getById(id)))
      throw new NotFoundException('Author not found');
    return await this.authorsService.deleteById(id);
  }

}
