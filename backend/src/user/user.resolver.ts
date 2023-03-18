import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { User } from '@prisma/client';
import { CreateUserInput } from 'src/user/dto/createUser.input';
import { UserService } from 'src/user/user.service';
import { UserModel } from './models/user.model';

@Resolver()
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Mutation(() => UserModel)
  async createUser(
    @Args('createUserInput') createUserInput: CreateUserInput,
  ): Promise<User> {
    return await this.userService.createUser(createUserInput);
  }
}
