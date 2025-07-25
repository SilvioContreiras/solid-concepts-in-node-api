import { PrismaUsersRepository } from "@/repositories/prisma/prisma-users.repository";
import { AuthenticateUseCase } from "@/use-cases/authenticate";

export function authenticateFactoryUseCase() {
    const usersRepository = new PrismaUsersRepository();
    const authenticateUseCase = new AuthenticateUseCase(usersRepository)

    return authenticateUseCase
}