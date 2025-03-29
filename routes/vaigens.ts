import { Router } from "express";
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient();
const router = Router();



router.get("/", async (req, res) => {
    const viagemss = await prisma.viagemss.findMany()
    res.status(200).json(viagemss)
})

router.post("/", async (req, res) => {
    const { titulo, genero, duracao, preco, sinopse } = req.body

    if (!titulo || !genero || !duracao || !preco) {
        res.status(400).json({ erro: "Informe todos os dados" })
        return
    }

    const viagems = await prisma.viagems.create({
        data: { titulo, genero, duracao, preco, sinopse }
    })

    res.status(201).json(viagems)
})

router.put("/:id", async (req, res) => {
    // recebe o id passado como parâmetro
    const { id } = req.params

    // recebe as variáveis vindas no corpo da requisição
    const { titulo, genero, duracao, preco, sinopse } = req.body

    // verifica se os campos obrigatórios foram passados
    if (!titulo || !genero || !duracao || !preco) {
        res.status(400).json({ erro: "Informe todos os dados" })
        return
    }

    try {
        const viagems = await prisma.viagems.update({
            where: { id: Number(id) },
            data: { titulo, genero, duracao, preco, sinopse }
        })
        res.status(200).json(viagems)
    } catch (error) {
        res.status(400).json({ erro: error })
    }
})

router.delete("/:id", async (req, res) => {
    // recebe o id passado como parâmetro
    const { id } = req.params

    // realiza a exclusão do viagems
    try {
        const viagems = await prisma.viagems.delete({
            where: { id: Number(id) }
        })
        res.status(200).json(viagems)
    } catch (error) {
        res.status(400).json({ erro: error })
    }
})


export default router;  