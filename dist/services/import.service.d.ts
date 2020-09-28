import { DocumentsService } from './documents.service';
export declare class ImportService {
    private documentService;
    constructor(documentService: DocumentsService);
    importQuestions(requestBody: any): Promise<any[]>;
}
