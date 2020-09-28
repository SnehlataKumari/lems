"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ImportService = void 0;
const common_1 = require("@nestjs/common");
const utils_1 = require("../utils");
const documents_service_1 = require("./documents.service");
let ImportService = (() => {
    let ImportService = class ImportService {
        constructor(documentService) {
            this.documentService = documentService;
            this.importQuestions({
                documentId: '5f720ef8e29b8d12081e82b5'
            });
        }
        async importQuestions(requestBody) {
            const documentModel = await this.documentService.findById(requestBody.documentId);
            const validatedValues = [];
            const withError = [];
            const questions = await utils_1.getJsonFromDocument(documentModel);
            console.log(questions);
            return questions;
        }
    };
    ImportService = __decorate([
        common_1.Injectable(),
        __metadata("design:paramtypes", [documents_service_1.DocumentsService])
    ], ImportService);
    return ImportService;
})();
exports.ImportService = ImportService;
//# sourceMappingURL=import.service.js.map