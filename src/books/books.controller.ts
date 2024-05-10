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
import { BooksService } from './books.service';
import { CreateBookDTO } from './dtos/create-book.dto';
import { UpdateBookDTO } from './dtos/update-book.dto';
import { ParseUUIDPipe } from '@nestjs/common';
import { Book } from '@prisma/client';

@Controller('books')
export class BooksController {
    constructor(private booksService: BooksService) {
        this.booksService = booksService;
    }

    @Get('/')
    getAll(): Promise<Book[]> {
        return this.booksService.getAll();
    }

    @Get('/:id')
    async getById(
        @Param('id', new ParseUUIDPipe()) id: string,
    ): Promise<Book | null> {
        const book = await this.booksService.getById(id);
        if (!book) {
            throw new NotFoundException('Book not found');
        }
        return book;
    }

    @Post('/')
    create(@Body() bookData: CreateBookDTO): Promise<Book> {
        return this.booksService.create(bookData);
    }

    @Put('/:id')
    async update(
        @Param('id', new ParseUUIDPipe()) id: string,
        @Body() bookData: UpdateBookDTO,
    ): Promise<Book> {
        if (!(await this.booksService.getById(id))) {
            throw new NotFoundException('Book not found');
        }
        return await this.booksService.updateById(id, bookData);
    }

    @Delete('/:id')
    async deleteById(
        @Param('id', new ParseUUIDPipe()) id: string,
    ): Promise<Book> {
        if (!(await this.booksService.getById(id)))
            throw new NotFoundException('Book not found');
        return await this.booksService.deleteById(id);
    }
}
