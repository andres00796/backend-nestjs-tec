import { SetMetadata } from "@nestjs/common";

export const RolDecorator = (... rols: string[]) => SetMetadata('rols', rols);