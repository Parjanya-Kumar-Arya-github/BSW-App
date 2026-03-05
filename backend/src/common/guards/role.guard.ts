import { CanActivate, ExecutionContext, Injectable, SetMetadata } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { Role } from "@prisma/client";

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.getAllAndOverride<Role[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (!requiredRoles) {
      return true;
    }

    const request = context.switchToHttp().getRequest();
    
    const userRoles = request.role;  // Role set by AuthGuard
    //check if both have atleast one common element
    return requiredRoles.some((required) =>
      userRoles.some((role:Role) => role.toLowerCase() === required.toLowerCase())
    );
  }
}

export const ROLES_KEY = 'roles'
export const Roles = (...roles:Role[]) =>{
    return SetMetadata(ROLES_KEY,roles)
};