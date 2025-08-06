import { CheckIn } from '@prisma/client'
import { CheckInRepository } from '@/repositories/check-in'

interface CheckInUseCaseRequest {
   userId: string
   gymId: string
}

interface CheckInUseCaseResponse {
    checkIn: CheckIn
}

export class CheckInUseCase {
    constructor(private checkInRepository: CheckInRepository) {}

    async execute({ userId, gymId }: CheckInUseCaseRequest): Promise<CheckInUseCaseResponse> {
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