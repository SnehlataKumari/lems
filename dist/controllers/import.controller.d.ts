import { ImportService } from 'src/services/import.service';
export declare class ImportController {
    private service;
    constructor(service: ImportService);
    importQuestions(requestBody: any): Promise<any[]>;
}
