import { HttpContext, HttpParams, HttpHeaders } from '@angular/common/http';

export interface Options {
  headers?: HttpHeaders | { [header: string]: string | string[] };
  context?: HttpContext;
  observe?: 'body';
  params?:
    | HttpParams
    | {
        [param: string]:
          | string
          | number
          | boolean
          | (string | number | boolean)[];
      };
  reportProgress?: boolean;
  responseType?: 'json';
  withCredentials?: boolean;
  transferCache?: { includeHeaders?: string[] } | boolean;
}
