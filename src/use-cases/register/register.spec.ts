import { expect, describe, it, beforeEach } from 'vitest'
import { RegisterUseCase } from './'
import { compare } from 'bcryptjs'
import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users.repsotory'
import { UserAlreadyExistsError } from '../errors/user-already-exists.error'

let usersRepository: InMemoryUsersRepository
let registerUseCase: RegisterUseCase

describe('Register Use Case', () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository()
    registerUseCase = new RegisterUseCase(usersRepository)
  })
  it('should create an user', async () => {
    const { user } = await registerUseCase.execute({
      name: 'walter worth',
      email: 'walter@example.com',
      password: '123456',
    })

    expect(user.id).toEqual(expect.any(String))
  })

  it('should hash the password', async () => {
    const { user } = await registerUseCase.execute({
      name: 'walter worth',
      email: 'walter@example.com',
      password: '123456',
    })

    const hasPassewordHashed = await compare('123456', user.password_hash)

    expect(hasPassewordHashed).toBe(true)
  })

  it('should not create a user with same email', async () => {
    const email = 'walterworth@email.com'
    await registerUseCase.execute({
      name: 'walter worth',
      email,
      password: '123456',
    })

    await expect(() =>
      registerUseCase.execute({
        name: 'walter worth',
        email,
        password: '123456',
      }),
    ).rejects.toBeInstanceOf(UserAlreadyExistsError)
  })
})
