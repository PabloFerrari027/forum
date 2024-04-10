import { AnswersRepository } from '../repositories/answers-repository'

interface DeleteAnswerUseCaseRequest {
  answerId: string
  authorId: string
}

interface DeleteAnswerUseCaseResponse {}

export class DeleteAnswerUseCase {
  constructor(private answersRepository: AnswersRepository) {}

  async execute({
    authorId,
    answerId,
  }: DeleteAnswerUseCaseRequest): Promise<DeleteAnswerUseCaseResponse> {
    const answer = await this.answersRepository.findById(answerId)

    if (!answer) {
      const message = 'Answer not found.'
      throw new Error(message)
    }

    if (authorId !== answer.authorId.toString()) {
      const message = 'Not allowed.'
      throw new Error(message)
    }

    await this.answersRepository.delete(answer)

    return {}
  }
}
