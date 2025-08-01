import { UsersRepository } from '@/repositories/users'
import { IvalidCredentialsError } from '@/use-cases/errors/invalid-credentials.error'
import bcrypt from 'bcryptjs'
import { User } from '@prisma/client'

interface AuthenticateUseCaseRequest {
   email: string
   password: string 
}

interface AuthenticateUseCaseResponse {
    user: User
}

export class AuthenticateUseCase {
    constructor(private usersRepository: UsersRepository) {}

    async execute({ email, password }: AuthenticateUseCaseRequest): Promise<AuthenticateUseCaseResponse> {
        const user = await this.usersRepository.findByEmail(email)

        if (!user) {
            throw new IvalidCredentialsError()
        }


        const isValidPassword = await bcrypt.compare(password, user.password_hash)

        if (!isValidPassword) {
            throw new IvalidCredentialsError()
        }

        return {
            user
        }
    }
}