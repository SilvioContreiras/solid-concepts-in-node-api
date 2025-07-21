import { expect, describe, it, beforeEach } from "vitest";
import { hash } from "bcryptjs";
import { InMemoryUsersRepository } from "@/repositories/in-memory/in-memory-users.repsotory";
import { GetUserProfileUseCase } from "./";
import { ResourceNotFoudError } from "@/use-cases/errors/resource-not-found.error";

let usersRepository: InMemoryUsersRepository;
let getUserProfileUsecase: GetUserProfileUseCase;

describe("Get user profile Use Case", () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository();
    getUserProfileUsecase = new GetUserProfileUseCase(usersRepository);
  });

  it("should be able to get a user", async () => {
    const response  = await usersRepository.create({
      name: "Walter Worth",
      email: "walter@example.com",
      password_hash: await hash("123456", 6),
    });

    const { user } = await getUserProfileUsecase.execute({
      userId: response.id,
    });

    expect(user.id).toEqual(expect.any(String));
    expect(user.name).toEqual("Walter Worth");
    expect(user.email).toEqual("walter@example.com")
  });

  it("should not get a user with wrong id", async () => {
    expect(() =>
      getUserProfileUsecase.execute({
        userId: "not-found-id",
      })
    ).rejects.toBeInstanceOf(ResourceNotFoudError);
  });

});
