import { Router } from "express";
import { PrismaClient, Transportes } from "@prisma/client"
import { z } from "zod"

const prisma = new PrismaClient();
const router = Router();



router.get("/", async (req, res) => {
    const viagem = await prisma.viagem.findMany()
    res.status(200).json(viagem)
})

router.post("/", async (req, res) => {
    const { destino, transporte, dataSaida, preco, duracao } = req.body

    const viagemSchema = z.object({
        destino: z.string(),
        transporte: z.string(),
        dataSaida: z.string().refine((date) => !isNaN(Date.parse(date)), {
            message: "Invalid date format",
        }),
        preco: z.number(),
        duracao: z.number().optional(),
    });

    try {
        viagemSchema.parse({ destino, transporte, dataSaida, preco, duracao });
    } catch (error) {
        if (error instanceof z.ZodError) {
            res.status(400).json({ erro: error.errors });
        } else {
            res.status(500).json({ erro: "Unexpected error" });
        }
        return;
    }

    if (!destino || !transporte || !dataSaida || !preco) {
        res.status(400).json({ erro: "Informe todos os dados" })
        return
    }

    const viagem = await prisma.viagem.create({
        data: { destino, transporte, dataSaida, preco, duracao }
    })

    res.status(201).json(viagem)
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
        const viagem = await prisma.viagem.update({
            where: { id: Number(id) },
            data: { destino, transporte, dataSaida, preco, duracao }
        })
        res.status(200).json(viagem)
    } catch (error) {
        res.status(400).json({ erro: error })
    }
})


router.delete("/:id", async (req, res) => {
    // recebe o id passado como parâmetro
    const { id } = req.params

    // realiza a exclusão do viagem
    try {
        const viagem = await prisma.viagem.delete({
            where: { id: Number(id) }
        })
        res.status(200).json(viagem)
    } catch (error) {
        res.status(400).json({ erro: error })
    }
})

router.get("/filter/transporte/:transp", async (req, res) => {
    const { transp } = req.params
    try {
        const viagem = await prisma.viagem.findMany({
            where: { transporte: transp as Transportes }
        });
        res.status(200).json(viagem);
    } catch (error) {
        res.status(400).json({ erro: error });
    }
});

router.get("/filter/preco/:preco", async (req, res) => {
    const { preco } = req.params;

    try {
        const viagem = await prisma.viagem.findMany({
            where: {
                preco: {
                    lte: Number(preco)
                }
            }
        });
        res.status(200).json(viagem);
    } catch (error) {
        res.status(400).json({ erro: error });
    }
});


export default router;  