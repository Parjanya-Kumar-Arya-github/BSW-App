import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';

@Injectable()
export class PortalGuard implements CanActivate {
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();

    // 1. Extract the secret from headers
    const apiSecret = request.headers['x-api-secret'];
    const userId = request.headers['x-target-user'];

    // 2. Check if the secret exists
    if (!apiSecret) {
      throw new UnauthorizedException('Portal verification failed: Secret missing');
    }

    // 3. Verify against your environment variable
    // This strictly checks if the sender knows your secret key
    if (apiSecret !== process.env.PORTAL_API_SECRET) {
      throw new UnauthorizedException('Portal verification failed: Invalid Secret');
    }

    request.userId = userId; // Optionally attach the target user ID to the request for downstream use
    return true;
  }
}