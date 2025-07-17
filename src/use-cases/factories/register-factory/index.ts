import { PrismaUsersRepository } from "@/repositories/prisma/prisma-users.repository"
import { RegisterUseCase } from "@/use-cases/register"

export function registerFactoryUseCase() {
   const usersRepository = new PrismaUsersRepository()
   const resgisterUseCase = new RegisterUseCase(usersRepository)

    return resgisterUseCase
}