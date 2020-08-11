import { Injectable } from "@nestjs/common";

@Injectable()
export class DummySmsService {
  async sendMessage({ body, to }) {
    console.log({
      body, to
    });
  }
}