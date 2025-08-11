import { expect, describe, it, beforeEach, vi, afterEach } from "vitest";
import { CheckInUseCase } from "./";
import { InMemoryCheckInRepository } from "@/repositories/in-memory/in-memory-check-in.repository";
import { InMemoryGymsRepository } from "@/repositories/in-memory/in-memory-gyms.repository";
import { Decimal } from "@prisma/client/runtime/library";
import { MaxNumberOfCheckInsError } from "../errors/max-number-of-checkins.error";
import { MaxDistanceError } from "../errors/max-distance.error";

let usersRepository: InMemoryCheckInRepository;
let gymsRepository: InMemoryGymsRepository
let checkInUseCase: CheckInUseCase;

describe("Check-in Use Case", () => {
  beforeEach(async () => {
    usersRepository = new InMemoryCheckInRepository();
    gymsRepository = new InMemoryGymsRepository();
    checkInUseCase = new CheckInUseCase(usersRepository, gymsRepository);

    await gymsRepository.create({
        id: "gym-01",
        name: "Gym 01",
        description: "Description Gym 01",
        phone: "11999999999",
        latitude: -23.5505,
        longitude: -46.6333,
    })

    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("should be able to check in", async () => {
    vi.setSystemTime(new Date(2025, 9, 10, 8, 0, 0));

    const { checkIn } = await checkInUseCase.execute({
      gymId: "gym-01",
      userId: "user-01",
      userLatitude: -23.5505,
      userLongitude: -46.6333,
    });

    expect(checkIn.id).toEqual(expect.any(String));
  });

  it("should not make check in twice in the same day", async () => {
    await checkInUseCase.execute({
      gymId: "gym-01",
      userId: "user-01",
      userLatitude: -23.5505,
      userLongitude: -46.6333,
    });

    await expect(() =>
      checkInUseCase.execute({
        gymId: "gym-01",
        userId: "user-01",
        userLatitude: -23.5505,
        userLongitude: -46.6333,
      })
    ).rejects.toBeInstanceOf(MaxNumberOfCheckInsError);
  });

  it("should allow check in in differents dates", async () => {
    vi.setSystemTime(new Date(2025, 9, 10, 8, 0, 0));

    await checkInUseCase.execute({
      gymId: "gym-01",
      userId: "user-01",
      userLatitude: -23.5505,
      userLongitude: -46.6333,
    });

    vi.setSystemTime(new Date(2025, 9, 11, 8, 0, 0));

    const { checkIn } = await checkInUseCase.execute({
        gymId: "gym-01",
        userId: "user-01",
        userLatitude: -23.5505,
        userLongitude: -46.6333,
      });
  
      expect(checkIn.id).toEqual(expect.any(String));
  });

  it("should not check in at a distant gym ", async () => {
    gymsRepository.items.push({
        id: "gym-02",
        name: "Gym 01",
        description: "Description Gym 01",
        phone: "11999999999",
        latitude: new Decimal(-23.54094),
        longitude: new Decimal(-46.662118),
    });

    vi.setSystemTime(new Date(2025, 9, 11, 8, 0, 0));

    await expect(() =>
      checkInUseCase.execute({
        gymId: "gym-02",
        userId: "user-01",
        userLatitude: -23.5505,
        userLongitude: -46.6333,
      })
    ).rejects.toBeInstanceOf(MaxDistanceError);
  });
});
