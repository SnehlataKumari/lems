import { Injectable } from "@nestjs/common";

@Injectable()
export class DummySmsService {
  constructor() {}

  async sendMessage({ body, to }) {
    console.log({
      body, to
    });
  }
}