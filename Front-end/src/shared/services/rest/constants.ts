export const API_URL = 'http://127.0.0.1:3000/api/';
export const NODE_RED_API_URL = 'http://127.0.0.1:1880/api/';
export const API_WEATHER_URL = 'http://api.openweathermap.org/data/2.5/';
export const APP_ID = 'bb3274b7b66c5b130a9c83b68439aacb';

export class HTTP_METHOD {
  static GET = new HTTP_METHOD('get');
  static POST = new HTTP_METHOD('post');
  static PUT = new HTTP_METHOD('put');
  static DELETE = new HTTP_METHOD('delete');
  static PATCH = new HTTP_METHOD('patch');
  static HEAD = new HTTP_METHOD('head');

  readonly methodName: string;

  constructor(methodName: string) {
    this.methodName = methodName;
  }
}
