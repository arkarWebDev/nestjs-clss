import {
  BadRequestException,
  ConflictException,
  Injectable,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Upload } from '../upload.entity';
import { Repository } from 'typeorm';
import { ConfigService } from '@nestjs/config';
import { UploadToAwsProvider } from './upload-to-aws.provider';
import { UploadFile } from '../interfaces/upload-file.interface';

@Injectable()
export class UploadsService {
  constructor(
    /**
     * inject uploadtoawsProvider
     */
    private readonly uploadToAwsProvider: UploadToAwsProvider,
    /**
     * inject configService
     */
    private readonly configService: ConfigService,
    /**
     * inject uploadRepository
     */
    @InjectRepository(Upload)
    private uploadsRepository: Repository<Upload>,
  ) {}
  public async uploadFile(file: Express.Multer.File) {
    if (
      ![
        'image/gif',
        'image/jpeg',
        'image/jpg',
        'image/png',
        'image/wepb',
      ].includes(file.mimetype)
    ) {
      throw new BadRequestException('MIME type not allow.');
    }

    try {
      const filename = await this.uploadToAwsProvider.fileUpload(file);

      const uploadFile: UploadFile = {
        name: filename,
        path: `https://${this.configService.get<string>('appConfig.awsCloudfrontUrl')}/${filename}`,
        mime: file.mimetype,
        size: file.size,
      };
      const upload = this.uploadsRepository.create(uploadFile);
      return await this.uploadsRepository.save(upload);
    } catch (error) {
      throw new ConflictException(error);
    }
  }
}
