id, destino, transporte (“Terrestre”, “Marítimo” ou “Aéreo”) dataSaida (valor
default deve ser a data atual - now()), preco e duracao (em dias).
Ajustar para que o nome da tabela fique viagens.
Criar e armazenar os dados no banco turismo_nome_aluno


tem que criar o banco de dados turismo_nome_aluno e criar a tabela viagens 

nao esquecer de trocar no arquivo .env o nome do banco de dados e o nome do usuario e senha para o banco de dados

// This is your Prisma schema file,
// learn more about it in the docs: https://pris.ly/d/prisma-schema

// Looking for ways to speed up your queries, or scale easily with your serverless or edge functions?
// Try Prisma Accelerate: https://pris.ly/cli/accelerate-init

generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "mysql"
  url      = env("DATABASE_URL")
}


model Viagens {
  id        Int      @id @default(autoincrement())
  destino    String   @db.VarChar(50)
  transporte    String   @db.VarChar(20)
  dataSaida  DateTime @default(now())
  preco     Decimal  @db.Decimal(7, 2)
  duracao   DateTime @default(now())
  @@map("viagens")
}