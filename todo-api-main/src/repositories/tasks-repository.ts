import { v4 as uuidv4 } from 'uuid';
import { Task } from '../models/task-model';
import { PrismaClient } from '@prisma/client';

export class TasksRepository {
    private prisma: PrismaClient = new PrismaClient();

    public async update(id: number, name: string): Promise<Task | null> {
        try {
            const updateTask = await this.prisma.task.update({
                where: { id },
                data: { name },
            });
            return updateTask? updateTask : null;
        } catch (error) {
            console.error("Erro ao atualizar tarefa:", error);
            throw error;
        }
    }

    public async create(name: string): Promise<Task> {
        try {
            const task = await this.prisma.task.create({
                data: {
                    name,
                    createdAt: new Date(),
                },
            });
            return task;
        } catch (error) {
            console.error("Erro ao criar tarefa:", error);
            throw error;
        }
    }

    public async delete(id: number): Promise<void> {
        try {
            await this.prisma.task.delete({
                where: { id },
            });
        } catch (error) {
            console.error("Erro ao deletar tarefa:", error);
            throw error;
        }
    }

    public async listAll(): Promise<Task[]> {
        try {
            const tasks = await this.prisma.task.findMany({});
            return tasks;
        } catch (error) {
            console.error("Erro ao listar tarefas:", error);
            throw error;
        }
    }

    public async getById(id: number): Promise<Task | null> {
        try {
            const task = await this.prisma.task.findUnique({
                where: { id },
            });
            return task || null;
        } catch (error) {
            console.error("Erro ao obter tarefa por ID:", error);
            throw error;
        }
    }

    public async findByName(name: string): Promise<Task[] | []> {
        try {
            const tasks = await this.prisma.task.findMany({
                where: { name },
            });
            return tasks.length > 0? tasks : [];
        } catch (error) {
            console.error("Erro ao encontrar tarefas por nome:", error);
            throw error;
        }
    }
}