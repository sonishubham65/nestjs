import {
  Ability,
  AbilityBuilder,
  AbilityClass,
  ExtractSubjectType,
  InferSubjects,
} from '@casl/ability';
import { Injectable } from '@nestjs/common';
import { PropertyEntity } from 'src/domain/property/entity/property.entity';
import { UserEntity } from 'src/domain/user/entity/user.entity';
import { Role } from '../../domain/role/enum.role';

export enum Action {
  Manage = 'manage',
  Create = 'create',
  Read = 'read',
  Update = 'update',
  Delete = 'delete',
}
type Subjects =
  | InferSubjects<typeof PropertyEntity | typeof UserEntity>
  | 'all';

export type AppAbility = Ability<[Action, Subjects]>;

@Injectable()
export class CaslProperty {
  createForUser(user) {
    const { can, cannot, build } = new AbilityBuilder<
      Ability<[Action, Subjects]>
    >(Ability as AbilityClass<AppAbility>);

    if (user.roles.includes(Role.Admin)) {
      can(Action.Manage, 'all'); // read-write access to everything
    } else {
      can(Action.Read, 'all');
      if (user.roles.includes(Role.User)) {
        can(Action.Update, PropertyEntity, { userId: user.id });
        can(Action.Delete, PropertyEntity, { userId: user.id });
      }
    }

    return build({
      // Read https://casl.js.org/v5/en/guide/subject-type-detection#use-classes-as-subject-types for details
      detectSubjectType: (item) =>
        item.constructor as ExtractSubjectType<Subjects>,
    });
  }
}
