import { Router } from 'express';
import { TaskService } from '../services/task-service'; // Verifique se esta é a localização correta

const router = Router();
const taskService = new TaskService();

// Validação de parâmetro opcional
if (!req.params.id) {
    return res.status(400).send({ message: "ID da tarefa é necessário" });
}

router.delete('/tasks/:id', async (req, res) => {
    try {
        const { id } = req.params;
        await taskService.delete(Number(id));
        res.status(204).send(); // Status 204 indica que a requisição foi processada com sucesso, mas não há conteúdo para retornar
    } catch (error) {
        // Tratamento de erros específicos pode ser adicionado aqui
        res.status(500).send({ message: "Erro interno do servidor", error: error.message });
    }
});

export default router;