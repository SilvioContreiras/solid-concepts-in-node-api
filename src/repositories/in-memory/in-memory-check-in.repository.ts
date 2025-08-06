import { Prisma, CheckIn } from '@prisma/client'
import { CheckInRepository } from '@/repositories/check-in'
import { randomUUID } from 'node:crypto'
import dayjs from 'dayjs'

export class InMemoryCheckInRepository implements CheckInRepository {
  public items: CheckIn[] = []

  async findByUserId(userId: string, date: Date) {
    const startOfTheDay = dayjs(date).startOf('date')
    const endOfTheDay = dayjs(date).endOf('date')

    const checkInOnSameDate = this.items.find((checkIn) => {
        const checkInDate = dayjs(checkIn.created_at)
        const isSameDay = checkInDate.isAfter(startOfTheDay) && checkInDate.isBefore(endOfTheDay)

       return checkIn.user_id === userId && isSameDay
    })

    if (!checkInOnSameDate) {
      return null
    }

    return checkInOnSameDate
}

  async create(data: Prisma.CheckInUncheckedCreateInput) {
    const checkIn = {
        id: randomUUID(),
        user_id: data.user_id,
        gym_id: data.gym_id,
        created_at: new Date(),
        validated_at: data.validated_at ? new Date(data.validated_at) : null,
    }

    this.items.push(checkIn)

    return checkIn
  }
}
