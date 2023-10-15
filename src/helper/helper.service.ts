import { Injectable, HttpException } from '@nestjs/common';

@Injectable()
export class HelperService {
  async serializeUser(user) {
    try {
      user = JSON.parse(JSON.stringify(user));
      if (user.otp || user.otp !== null) {
        delete user.otp;
      }
      return user;
    } catch (e) {
      throw new HttpException('internal server error', 500);
    }
  }
}
