import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CreateTaskInput } from 'src/task/dto/createTask.input';
import { Task } from 'src/task/models/task.model';
import { TaskService } from 'src/task/task.service';

@Resolver()
export class TaskResolver {
  constructor(private readonly taskService: TaskService) {}

  @Query(() => [Task], { nullable: 'items' })
  getTasks(): Task[] {
    return this.taskService.getTasks();
  }

  @Mutation(() => Task)
  createTask(@Args('createTaskInput') createTaskInput: CreateTaskInput): Task {
    return this.taskService.createTask(createTaskInput);
  }
}
