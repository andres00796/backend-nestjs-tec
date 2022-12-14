import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const rols = this.reflector.get<string[]>('rols', context.getHandler());
    if (!rols) {
      return true;
    }
    const request = context.switchToHttp().getRequest();
    const user = request.user;
    const hasRol=() =>user.rols.some((rol: string) => rols.includes(rol));
    return user && hasRol();
  }
}