import { Inject } from '@nestjs/common';
import { ModuleRef } from '@nestjs/core';
import { HttpResponse } from 'src/shared/utils/http.utils';

export class BaseAppController {
  @Inject(ModuleRef)
  private readonly moduleRef: ModuleRef;

  getHttpResponse(): HttpResponse {
    return new HttpResponse(this.moduleRef);
  }

  getLanguageFrom(req: any): string {
    return req.headers['accept-language'] || 'en';
  }
}
