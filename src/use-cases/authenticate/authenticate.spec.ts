import { expect, describe, it, beforeEach } from "vitest";
import { hash } from "bcryptjs";
import { AuthenticateUseCase } from "@/use-cases/authenticate";
import { InMemoryUsersRepository } from "@/repositories/in-memory/in-memory-users.repsotory";
import { IvalidCredentialsError } from "../errors/invalid-credentials.error";

let usersRepository: InMemoryUsersRepository;
let authenticateUseCase: AuthenticateUseCase;

describe("Authenticate Use Case", () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository();
    authenticateUseCase = new AuthenticateUseCase(usersRepository);
  });

  it("should be able to authenticate", async () => {
    await usersRepository.create({
      name: "Walter Worth",
      email: "walter@example.com",
      password_hash: await hash("123456", 6),
    });

    const { user } = await authenticateUseCase.execute({
      email: "walter@example.com",
      password: "123456",
    });

    expect(user.id).toEqual(expect.any(String));
  });

  it("should not authenticate with wrong email", async () => {
    expect(() =>
      authenticateUseCase.execute({
        email: "walter@example.com",
        password: "123456",
      })
    ).rejects.toBeInstanceOf(IvalidCredentialsError);
  });

  it("should not authenticate with invalid password", async () => {
    await usersRepository.create({
      name: "Walter Worth",
      email: "walter@example.com",
      password_hash: await hash("123456", 6),
    });

    expect(() =>
      authenticateUseCase.execute({
        email: "walter@example.com",
        password: "12345609",
      })
    ).rejects.toBeInstanceOf(IvalidCredentialsError);
  });
});
