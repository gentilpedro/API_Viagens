import express from 'express'
const app = express()
const port = 3000

import viagem from './routes/vaigens'

app.use(express.json())
app.use("/viagem", viagem)

app.get('/', (req, res) => {
    res.send('API com Cadastro em Banco de Dados')
})

app.get('/aula2', (req, res) => {
    res.send('Exemplo de rota de consulta de dados')
})

app.listen(port, () => {    
    console.log(`Servidor rodando na porta: ${port}`)
})