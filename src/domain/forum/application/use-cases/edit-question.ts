import { Question } from '../../enterprise/entities/question'
import { QuestionsRepository } from '../repositories/questions-repository'

interface EditQuestionUseCaseRequest {
  authorId: string
  questionId: string
  title: string
  content: string
}

interface EditQuestionUseCaseResponse {
  question: Question
}

export class EditQuestionUseCase {
  constructor(private questionsRepository: QuestionsRepository) {}

  async execute({
    authorId,
    content,
    questionId,
    title,
  }: EditQuestionUseCaseRequest): Promise<EditQuestionUseCaseResponse> {
    const question = await this.questionsRepository.findById(questionId)

    if (!question) {
      const message = 'Question not found.'
      throw new Error(message)
    }

    if (authorId !== question.authorId.toString()) {
      const message = 'Not allowed.'
      throw new Error(message)
    }

    question.title = title
    question.content = content

    await this.questionsRepository.save(question)

    return {
      question,
    }
  }
}
