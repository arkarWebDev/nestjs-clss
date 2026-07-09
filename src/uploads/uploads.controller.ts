import {
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import {
  ApiBearerAuth,
  ApiBody,
  ApiConsumes,
  ApiOperation,
} from '@nestjs/swagger';
import { Auth } from 'src/auth/decorators/auth.decorator';
import { AuthType } from 'src/auth/enums/auth-type-enum';
import { UploadsService } from './providers/uploads.service';

@Auth(AuthType.Bearer)
@Controller('uploads')
export class UploadsController {
  constructor(
    //**
    // inject uploadService */
    private readonly uploadService: UploadsService,
  ) {}
  @Post('file')
  @UseInterceptors(FileInterceptor('file'))
  @ApiOperation({
    summary: 'Upload new image to the server',
  })
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        file: {
          type: 'string',
          format: 'binary',
        },
      },
    },
  })
  @ApiBearerAuth()
  public uploadFile(@UploadedFile() file: Express.Multer.File) {
    return this.uploadService.uploadFile(file);
  }
}
