import { expect, describe, it, beforeEach, vi, afterEach } from "vitest";
import { CheckInUseCase } from "./";
import { InMemoryCheckInRepository } from "@/repositories/in-memory/in-memory-check-in.repository";

let usersRepository: InMemoryCheckInRepository;
let checkInUseCase: CheckInUseCase;

describe("Check-in Use Case", () => {
  beforeEach(() => {
    usersRepository = new InMemoryCheckInRepository();
    checkInUseCase = new CheckInUseCase(usersRepository);

    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("should create a Check-in", async () => {
    vi.setSystemTime(new Date(2025, 9, 10, 8, 0, 0));

    const { checkIn } = await checkInUseCase.execute({
      gymId: "gym-01",
      userId: "user-01",
    });

    expect(checkIn.id).toEqual(expect.any(String));
  });

  it("should not make checkin twice in the same day", async () => {
    await checkInUseCase.execute({
      gymId: "gym-01",
      userId: "user-01",
    });

    await expect(() =>
      checkInUseCase.execute({
        gymId: "gym-01",
        userId: "user-01",
      })
    ).rejects.toBeInstanceOf(Error);
  });

  it("should allow check-in in differents dates", async () => {
    vi.setSystemTime(new Date(2025, 9, 10, 8, 0, 0));

    await checkInUseCase.execute({
      gymId: "gym-01",
      userId: "user-01",
    });

    vi.setSystemTime(new Date(2025, 9, 11, 8, 0, 0));

    const { checkIn } = await checkInUseCase.execute({
        gymId: "gym-01",
        userId: "user-01",
      });
  
      expect(checkIn.id).toEqual(expect.any(String));
  });
});
