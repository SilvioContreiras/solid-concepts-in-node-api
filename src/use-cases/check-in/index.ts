import { CheckIn } from '@prisma/client'
import { CheckInRepository } from '@/repositories/check-in'
import { GymsRepository } from '@/repositories/gyms'
import { ResourceNotFoudError } from '../errors/resource-not-found.error'
import { calculateCoordinatesDistances } from '@/utils/calculate-coordinates-distances'

interface CheckInUseCaseRequest {
   userId: string
   gymId: string
   userLatitude: number
   userLongitude: number
}

interface CheckInUseCaseResponse {
    checkIn: CheckIn
}

const MAX_DISTANCE_IN_KILOMETERS = 0.1 // 100 meters

export class CheckInUseCase {
    constructor(
        private checkInRepository: CheckInRepository,
        private gymsRepository: GymsRepository
    ) {}

    async execute({ 
        userId, 
        gymId,
        userLatitude,
        userLongitude
    }: CheckInUseCaseRequest): Promise<CheckInUseCaseResponse> {
        const gym = await this.gymsRepository.findById(gymId)

        if (!gym) {
            throw new ResourceNotFoudError()
        }

        // calculate distance between user and gym
        const distance = calculateCoordinatesDistances(
            { latitude: userLatitude, longitude: userLongitude },
            { latitude: gym.latitude.toNumber(), longitude: gym.longitude.toNumber() }
        )

        if (distance > MAX_DISTANCE_IN_KILOMETERS) { 
            throw new Error('You are too far from the gym to check in.')
        }

        const checkInOnSameDate = await this.checkInRepository.findByUserId(userId, new Date())
        if (checkInOnSameDate) {
            throw new Error('You can only check in once per day.')
        }

        const checkIn = await this.checkInRepository.create({
            user_id: userId,
            gym_id: gymId,
        })

        return {
            checkIn
        }
    }
}