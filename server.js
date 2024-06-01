import express from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
const app = express();

app.use(express.json());

app.get('/usuarios', async (req, res) => {
  try {
    const users = await prisma.user.findMany();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar usuários' });
  }
});

app.put('/usuarios/:id', async (req, res) => {
  const id = req.params.id;

  try {
    const updatedUser = await prisma.user.update({
      where: { id: id },
      data: {
        email: req.body.email,
        age: req.body.age,
        name: req.body.name,
      },
    });

    res.status(200).json(updatedUser);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao atualizar usuário' });
  }
});

app.post('/usuarios', async (req, res) => {
  try {
    const newUser = await prisma.user.create({
      data: {
        email: req.body.email,
        age: req.body.age,
        name: req.body.name,
      },
    });

    res.status(201).json({ message: 'Usuário criado com sucesso!' });
  } catch (error) {
    res.status(500).json({ error: 'Erro ao criar usuário' });
  }
});

app.delete('/usuarios/:id', async (req, res) => {
  const id = req.params.id;
  
  try {
    await prisma.user.delete({
      where: {
        id: id,
      },
    });
    res.status(200).json({ message: 'Usuário deletado com sucesso!' });
  } catch (error) {
    res.status(500).json({ error: 'Erro ao deletar usuário' });
  }
});

app.listen(3000, () => {
  console.log('Servidor rodando na porta 3000');
});
