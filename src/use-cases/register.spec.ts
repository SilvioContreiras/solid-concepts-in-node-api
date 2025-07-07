import { expect, describe, it } from 'vitest'
import { RegisterUseCase } from './register'
import { compare } from 'bcryptjs'
import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users.repsotory'
import { UserAlreadyExistsError } from './errors/user-already-exists.error'

describe('Register Use Case', () => {
  it('should create an user', async () => {
    const usersRepository = new InMemoryUsersRepository()
    const registerUseCase = new RegisterUseCase(usersRepository)

    const { user } = await registerUseCase.execute({
      name: 'walter worth',
      email: 'walter@example.com',
      password: '123456',
    })

    expect(user.id).toEqual(expect.any(String))
  })

  it('should hash the password', async () => {
    const usersRepository = new InMemoryUsersRepository()
    const registerUseCase = new RegisterUseCase(usersRepository)

    const { user } = await registerUseCase.execute({
      name: 'walter worth',
      email: 'walter@example.com',
      password: '123456',
    })

    const hasPassewordHashed = await compare('123456', user.password_hash)

    expect(hasPassewordHashed).toBe(true)
  })

  it('should not create a user with same email', async () => {
    const usersRepository = new InMemoryUsersRepository()
    const registerUseCase = new RegisterUseCase(usersRepository)

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
