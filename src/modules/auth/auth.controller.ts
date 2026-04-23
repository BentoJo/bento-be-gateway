import { Controller, Get } from '@nestjs/common';

@Controller()
export class AuthController {
  //   constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    // return this.appService.getHello();
    return 'Hello Auth';
  }
}
