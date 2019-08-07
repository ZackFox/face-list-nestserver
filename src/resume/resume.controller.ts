import {
  Res,
  Get,
  Post,
  Delete,
  Body,
  Param,
  Query,
  UseGuards,
  Controller,
  Put,
} from '@nestjs/common';
import {
  ApiUseTags,
  ApiBearerAuth,
  ApiResponse,
  ApiImplicitQuery,
  ApiOperation,
  ApiImplicitParam,
} from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { Response } from 'express';

import { ResumeDto } from './dto/resume.dto';
import { ResumeService } from './resume.service';
import { classToPlain } from 'class-transformer';

@ApiUseTags('resumes')
@Controller('resumes')
export class ResumeController {
  constructor(private readonly resumeService: ResumeService) {}

  @Get()
  @ApiOperation({ title: 'Get list of all Resumes' })
  @ApiResponse({
    status: 200,
    description: 'The list of resumes has been successfully retrieved.',
  })
  @ApiImplicitQuery({
    name: 'page',
    description: 'page number',
    required: false,
  })
  @ApiImplicitQuery({
    name: 'limit',
    description: 'quatity per page',
    required: false,
  })
  @ApiImplicitQuery({
    name: 'position',
    description: 'filter by position',
    required: false,
  })
  @ApiImplicitQuery({
    name: 'gender',
    description: 'filter by gender',
    required: false,
  })
  @ApiImplicitQuery({
    name: 'city',
    description: 'filter by city',
    required: false,
  })
  async findAll(@Query() query, @Res() res: Response) {
    const { page, limit, ...filters } = query;

    let currentPage = parseInt(page, 10);
    if (Number.isNaN(currentPage) || currentPage === 0) {
      currentPage = 1;
    }

    let perPage = parseInt(limit, 10);
    if (Number.isNaN(perPage) || perPage < 4) {
      perPage = 4;
    }

    const offset = perPage * currentPage - perPage;
    const data = await this.resumeService.findAll(filters, perPage, offset);
    const pages = Math.ceil(data[1] / perPage);

    return res.status(200).json({
      statusCode: '200',
      data: data[0],
      _meta: { total: data[1], pages, perPage, currentPage },
    });
  }

  //===================================================================

  @Post()
  @ApiBearerAuth()
  @ApiOperation({ title: 'Create new resume' })
  @ApiResponse({
    status: 201,
    description: 'The record has been successfully created.',
  })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @UseGuards(AuthGuard('jwt'))
  async create(@Body() resumeDto: ResumeDto, @Res() res: Response) {
    const data = await this.resumeService.save(resumeDto);
    return res.status(201).json({ data });
  }

  //===================================================================

  @Get(':id')
  @ApiOperation({ title: 'Get single resume' })
  @ApiImplicitParam({
    name: 'id',
    description: 'resume id',
  })
  @ApiResponse({
    status: 201,
    description: 'The record has been successfully found.',
  })
  async findOne(@Param('id') id, @Res() res: Response) {
    const data = await this.resumeService.findOneById(parseInt(id, 10));
    return res.status(200).json({ data });
  }

  //===================================================================

  @Put()
  @ApiBearerAuth()
  @ApiOperation({ title: 'update one resume' })
  @ApiResponse({
    status: 201,
    description: 'The record has been successfully updated.',
  })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @UseGuards(AuthGuard('jwt'))
  async updateOne(@Body() resumeDto: ResumeDto, @Res() res: Response) {
    const data = await this.resumeService.save(resumeDto);
    return res.status(201).json({ data });
  }

  //===================================================================

  @Delete(':id')
  @ApiBearerAuth()
  @ApiOperation({ title: 'Delete one resume' })
  @ApiImplicitParam({
    name: 'id',
    description: 'resume id',
  })
  @ApiResponse({
    status: 201,
    description: 'The record has been successfully deleted.',
  })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @UseGuards(AuthGuard('jwt'))
  async deleteOne(@Param('id') id) {
    await this.resumeService.deleteOne(parseInt(id, 10));
  }
}
