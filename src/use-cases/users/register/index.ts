import { UsersRepository } from '@/repositories/users'
import bcrypt from 'bcryptjs'
import { UserAlreadyExistsError } from '../../errors/user-already-exists.error'
import type { User } from '@prisma/client'

interface RegisterUseCaseRequest {
  name: string
  email: string
  password: string
}

interface RegisterUseCaseResponse {
  user: User
}

export class RegisterUseCase {
  constructor(private userRepository: UsersRepository) {}
  async execute({
    name,
    email,
    password,
  }: RegisterUseCaseRequest): Promise<RegisterUseCaseResponse> {
    const password_hash = await bcrypt.hash(password, 6)

    const hasUserSameEmail = await this.userRepository.findByEmail(email)

    if (hasUserSameEmail) {
      throw new UserAlreadyExistsError()
    }

    const user = await this.userRepository.create({
      name,
      email,
      password_hash,
    })

    return {
      user,
    }
  }
}
