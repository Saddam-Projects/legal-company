import { Reference } from '@/entity/Reference';
import { FileUploadDto } from './file';

export interface ReferenceDto extends Reference, FileUploadDto {}
