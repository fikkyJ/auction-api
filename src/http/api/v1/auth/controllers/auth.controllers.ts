import { BaseAppController } from 'src/http/api/base/base.controller';
import { Request, Response } from 'express';
import { AuthService } from '../services/auth.service';
import { Body, Controller, Post, Req, Res } from '@nestjs/common';
import { AuthSignUpDto } from '../dtos/auth.signup.dto';
import { CustomValidationPipe } from 'src/shared/pipes/customValidation.pipe';
import { AuthSignInDto } from '../dtos/auth.signin.dto';

@Controller('api/v1/auth')
export class AuthController extends BaseAppController {
  constructor(private authService: AuthService) {
    super();
  }

  @Post('register')
  public async signup(
    @Body(new CustomValidationPipe()) user: AuthSignUpDto,
    @Req() req: Request,
    @Res() res: Response,
  ) {
    const result = await this.authService.signUp(user);

    return this.getHttpResponse().setDataWithKey('data', result).send(res);
  }

  @Post('login')
  public async signin(
    @Body(new CustomValidationPipe()) data: AuthSignInDto,
    @Req() req: Request,
    @Res() res: Response,
  ) {
    const result = await this.authService.signIn(data);

    return this.getHttpResponse().setAuthDataWithKey('data', result).send(res);
  }
}
