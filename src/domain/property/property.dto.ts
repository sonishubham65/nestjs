import { Transform, Type } from 'class-transformer';
import {
  IsString,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsInt,
  MinLength,
  MaxLength,
  Min,
  Max,
  IsObject,
  ValidateNested,
} from 'class-validator';
import { IsValidString } from '../../../src/base/decorators/string.decorator';
import { PropertyType } from './entity/property.type.enum';

export class PropertyAdd {
  @IsNotEmpty()
  @Transform((val) => val.value?.trim())
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

class ValueRelation {
  @IsString()
  value;

  @IsEnum({
    MoreThan: 'MoreThan',
    LessThan: 'LessThan',
    MoreThanOrEqual: 'MoreThanOrEqual',
    LessThanOrEqual: 'LessThanOrEqual',
    Equal: 'Equal',
    ILike: 'ILike',
    Like: 'Like',
  })
  relation;
}
class WhereCondition {
  @IsObject()
  @ValidateNested()
  @Type(() => ValueRelation)
  sqft;
}

export class PropertyList {
  @IsObject()
  @ValidateNested()
  @Type(() => WhereCondition)
  where: WhereCondition;

  @IsObject()
  order;

  @Transform((val) => parseInt(val.value))
  @IsNotEmpty()
  @IsNumber()
  @IsInt()
  page;

  @Transform((val) => parseInt(val.value))
  @IsEnum([2, 10, 20, 30])
  limit;
}
