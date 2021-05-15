import { Transform } from 'class-transformer';
import {
  IsString,
  IsEnum,
  IsNumberString,
  IsOptional,
  IsEmail,
  IsLatitude,
  IsLongitude,
  IsLowercase,
  IsMilitaryTime,
  IsPhoneNumber,
  IsNotEmpty,
  IsNumber,
  IsInt,
  MinLength,
  MaxLength,
  Min,
  Max,
} from 'class-validator';
import { IsValidString } from 'src/base/decorators/string.decorator';
import { PropertyType } from './entity/property.type.enum';

export class PropertyAdd {
  @Transform((val) => val.value?.trim())
  @IsNotEmpty()
  @MinLength(3)
  @MaxLength(100)
  @IsString()
  @IsValidString()
  title;

  @Transform((val) => val.value?.trim())
  @IsNotEmpty()
  @MinLength(100)
  @MaxLength(300)
  @IsString()
  @IsValidString()
  short_description;

  @Transform((val) => val.value?.trim())
  @IsNotEmpty()
  @MinLength(300)
  @MaxLength(1000)
  @IsString()
  @IsValidString()
  long_description;

  @IsEnum(PropertyType)
  type;

  @Transform((val) => val.value?.trim())
  @IsNotEmpty()
  @MinLength(15)
  @MaxLength(300)
  @IsString()
  @IsValidString()
  address;

  @Transform((val) => parseInt(val.value))
  @IsNotEmpty()
  @Min(25)
  @Max(50000)
  @IsNumber()
  @IsInt()
  sqft;
}
