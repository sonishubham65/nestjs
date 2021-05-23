import { Transform } from 'class-transformer';
import {
  IsString,
  IsEmail,
  IsNotEmpty,
  MinLength,
  MaxLength,
} from 'class-validator';
import { IsValidDate } from 'src/base/decorators/date.decorator';
import { IsValidString } from 'src/base/decorators/string.decorator';

export class UserAdd {
  @IsNotEmpty()
  @Transform((val) => val.value?.trim())
  @MinLength(1)
  @MaxLength(30)
  @IsString()
  @IsValidString()
  first_name;

  @Transform((val) => val.value?.trim())
  @IsNotEmpty()
  @MinLength(1)
  @MaxLength(30)
  @IsString()
  @IsValidString()
  last_name;

  @Transform((val) => val.value?.trim())
  @IsNotEmpty()
  @MaxLength(300)
  @IsEmail()
  email;

  @Transform((val) => val.value?.trim())
  @IsNotEmpty()
  @MinLength(8)
  @MaxLength(16)
  @IsString()
  password;

  @Transform((val) => val.value?.trim())
  @IsNotEmpty()
  @IsValidDate('YYYY-MM-DDTHH:mm:ssZ')
  dob;
}
