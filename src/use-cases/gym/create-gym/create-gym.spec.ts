import { expect, describe, it, beforeEach } from 'vitest'
import { CreateGymUseCase } from './'
import { InMemoryGymsRepository } from '@/repositories/in-memory/in-memory-gyms.repository'

let gymRepository: InMemoryGymsRepository
let createGymUseCase: CreateGymUseCase

describe('Register Use Case', () => {
  beforeEach(() => {
    gymRepository = new InMemoryGymsRepository()
    createGymUseCase = new CreateGymUseCase(gymRepository)
  })
  it('should create a gym', async () => {
    const { gym } = await createGymUseCase.execute({
        name: 'Gym 01',
        description: 'Gym Test Description',
        phone: '11999999999',
        latitude: -23.5505,
        longitude: -46.6333,
    })

    expect(gym.id).toEqual(expect.any(String))
  })
})
