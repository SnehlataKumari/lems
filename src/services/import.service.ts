import { Injectable } from '@nestjs/common';
import { getJsonFromDocument } from 'src/utils';
import { DocumentsService } from './documents.service';
import * as fs from 'fs';
import { join } from 'path';

@Injectable()
export class ImportService {
  constructor(private documentService: DocumentsService) {
    // this.importQuestions({
    //   documentId: '5f720ef8e29b8d12081e82b5'
    // })
  }
  async importQuestions(requestBody) {
    const documentModel = await this.documentService.findById(requestBody.documentId);
    const validatedValues = [];
    const withError = [];

    const questions = await getJsonFromDocument(documentModel) as any[];
    console.log(questions);
    
    return questions;
  }
}