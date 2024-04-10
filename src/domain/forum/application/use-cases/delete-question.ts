import { QuestionsRepository } from '../repositories/questions-repository'

interface DeleteQuestionUseCaseRequest {
  questionId: string
  authorId: string
}

interface DeleteQuestionUseCaseResponse {}

export class DeleteQuestionUseCase {
  constructor(private questionsRepository: QuestionsRepository) {}

  async execute({
    authorId,
    questionId,
  }: DeleteQuestionUseCaseRequest): Promise<DeleteQuestionUseCaseResponse> {
    const question = await this.questionsRepository.findById(questionId)

    if (!question) {
      const message = 'Question not found.'
      throw new Error(message)
    }

    if (authorId !== question.authorId.toString()) {
      const message = 'Not allowed.'
      throw new Error(message)
    }

    await this.questionsRepository.delete(question)

    return {}
  }
}
