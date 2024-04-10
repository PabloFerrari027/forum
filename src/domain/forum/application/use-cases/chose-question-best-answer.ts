import { AnswersRepository } from '@/domain/forum/application/repositories/answers-repository'
import { QuestionsRepository } from '../repositories/questions-repository'
import { Question } from '../../enterprise/entities/question'

interface ChooseQuestionBestAnswerUseCaseRequest {
  answerId: string
  authorId: string
}

interface ChooseQuestionBestAnswerUseCaseResponse {
  question: Question
}

export class ChooseQuestionBestAnswerUseCase {
  constructor(
    private answersRepository: AnswersRepository,
    private questionsRepository: QuestionsRepository,
  ) {}

  async execute({
    answerId,
    authorId,
  }: ChooseQuestionBestAnswerUseCaseRequest): Promise<ChooseQuestionBestAnswerUseCaseResponse> {
    const answer = await this.answersRepository.findById(answerId)

    if (!answer) {
      const message = `Answer not found`
      throw new Error(message)
    }

    const question = await this.questionsRepository.findById(
      answer.questionId.toString(),
    )

    if (!question) {
      const message = `Question not found`
      throw new Error(message)
    }

    if (authorId !== question.authorId.toString()) {
      const message = 'Not allowed'
      throw new Error(message)
    }

    question.bestAnswerId = answer.id

    await this.questionsRepository.save(question)

    return { question }
  }
}
