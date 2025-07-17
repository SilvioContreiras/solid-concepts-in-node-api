import { FastifyRequest, FastifyReply } from 'fastify'
import { z } from 'zod'
import { IvalidCredentialsError } from '@/use-cases/errors/invalid-credentials.error'
import { authenticateFactoryUseCase } from '@/use-cases/factories'

export async function authenticateController(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const authenticateBodySchema = z.object({
    email: z.string().email(),
    password: z.string().min(6),
  })

  const { email, password } = authenticateBodySchema.parse(request.body)

  try {
    const authenticateUseCase = authenticateFactoryUseCase()

    await authenticateUseCase.execute({
      email,
      password,
    })
  } catch (error) {
    if (error instanceof IvalidCredentialsError) {
      return reply.status(400).send({ message: error.message })
    }

    return reply.status(500).send()
  }

  return reply.status(200).send()
}
