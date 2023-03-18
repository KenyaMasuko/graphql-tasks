import { Injectable } from '@nestjs/common';
import { Task } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateTaskInput } from 'src/task/dto/createTask.input';
import { UpdateTaskInput } from 'src/task/dto/updateTask.input';

@Injectable()
export class TaskService {
  tasks: Task[] = [];

  constructor(private readonly prismaService: PrismaService) {}

  async getTasks(userId: number): Promise<Task[]> {
    return await this.prismaService.task.findMany({
      where: {
        userId,
      },
    });
  }

  async createTask(createTaskInput: CreateTaskInput): Promise<Task> {
    const { name, dueDate, description, userId } = createTaskInput;
    return await this.prismaService.task.create({
      data: {
        name,
        dueDate,
        description,
        userId,
      },
    });
  }

  async updateTask(updateTaskInput: UpdateTaskInput): Promise<Task> {
    const { id, name, dueDate, status, description } = updateTaskInput;

    return await this.prismaService.task.update({
      data: {
        name,
        dueDate,
        status,
        description,
      },
      where: { id },
    });
  }

  async deleteTask(id: number): Promise<Task> {
    return await this.prismaService.task.delete({
      where: {
        id,
      },
    });
  }
}
