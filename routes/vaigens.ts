import { Router } from "express";
import { PrismaClient } from '@prisma/client'
import { z } from "zod"

const prisma = new PrismaClient();
const router = Router();



router.get("/", async (req, res) => {
    const viagens = await prisma.viagens.findMany()
    res.status(200).json(viagens)
})

router.post("/", async (req, res) => {
    const { destino, transporte, dataSaida, preco, duracao } = req.body

    // const usuarioSchema = z.object({
    //     nome: z.string().min(3),
    //     email: z.string().email(),
    //     idade: z.number().min(18)
    //    });

    if (!destino || !transporte || !dataSaida || !preco) {
        res.status(400).json({ erro: "Informe todos os dados" })
        return
    }

    const viagens = await prisma.viagens.create({
        data: { destino, transporte, dataSaida, preco, duracao }
    })

    res.status(201).json(viagens)
})

router.put("/:id", async (req, res) => {
    // recebe o id passado como parâmetro
    const { id } = req.params

    // recebe as variáveis vindas no corpo da requisição
    const { destino, transporte, dataSaida, preco, duracao } = req.body

    // verifica se os campos obrigatórios foram passados
    if (!destino || !transporte || !dataSaida || !preco || !duracao) {
        res.status(400).json({ erro: "Informe todos os dados" })
        return
    }

    try {
        const viagens = await prisma.viagens.update({
            where: { id: Number(id) },
            data: { destino, transporte, dataSaida, preco, duracao }
        })
        res.status(200).json(viagens)
    } catch (error) {
        res.status(400).json({ erro: error })
    }
})

router.delete("/:id", async (req, res) => {
    // recebe o id passado como parâmetro
    const { id } = req.params

    // realiza a exclusão do viagens
    try {
        const viagens = await prisma.viagens.delete({
            where: { id: Number(id) }
        })
        res.status(200).json(viagens)
    } catch (error) {
        res.status(400).json({ erro: error })
    }
})


export default router;  