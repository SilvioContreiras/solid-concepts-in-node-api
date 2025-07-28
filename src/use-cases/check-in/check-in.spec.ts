import { expect, describe, it, beforeEach } from 'vitest'
import { CheckInUseCase } from './'
import { InMemoryCheckInRepository } from '@/repositories/in-memory/in-memory-check-in.repository'

let usersRepository: InMemoryCheckInRepository
let checkInUseCase: CheckInUseCase

describe('Check-in Use Case', () => {
  beforeEach(() => {
    usersRepository = new InMemoryCheckInRepository()
    checkInUseCase = new CheckInUseCase(usersRepository)
  })
  it('should create a Check-in', async () => {
    const { checkIn } = await checkInUseCase.execute({
      gymId: 'gym-01',
      userId: 'user-01',
    })

    expect(checkIn.id).toEqual(expect.any(String))
  })
})
