import { Task } from "../models/task-model";
import { TasksRepository } from "../repositories/tasks-repository";

export class TaskService {
    private readonly tasksRepository: TasksRepository;

    constructor() {
        this.tasksRepository = new TasksRepository();
    }

    public async create(name: string): Promise<Task> {
        return this.tasksRepository.create(name);
    }

    public async delete(id: number): Promise<void> {
        await this.tasksRepository.delete(id);
    }
}

