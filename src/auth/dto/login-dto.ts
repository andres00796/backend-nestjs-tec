import { IsString, MaxLength } from "class-validator";
import { IsNotBlank } from "src/decorators/is-not-blank.decorator";

export class LoginDto {
    @IsString()
    @MaxLength(10,{message:'nombre tiene una longitud maxima de 10 caracteres'})
    @IsNotBlank({message:'el nombre no puede ir vacio'})
    readonly name: string;

    @IsNotBlank({message:'la contraseña no puede ir vacia'})
    readonly password: string;
}
