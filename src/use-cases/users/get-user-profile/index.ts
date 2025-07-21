import { UsersRepository } from '@/repositories/users'
import { User } from '@prisma/client'
import { ResourceNotFoudError } from '@/use-cases/errors/resource-not-found.error'

interface GetUserProfileUseCaseRequest {
   userId: string
}

interface GetUserProfileUseCaseResponse {
    user: User
}

export class GetUserProfileUseCase {
    constructor(private usersRepository: UsersRepository) {}

    async execute({ userId }: GetUserProfileUseCaseRequest): Promise<GetUserProfileUseCaseResponse> {
        const user = await this.usersRepository.findById(userId)

        if (!user) {
            throw new ResourceNotFoudError()
        }

        return {
            user
        }
    }
}