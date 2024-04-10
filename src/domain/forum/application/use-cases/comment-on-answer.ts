import { AnswerCommentsRepository } from '../repositories/answer-comments-repository'
import { UniqueEntityId } from '@/core/entities/unique-entity-id'
import { AnswersRepository } from '../repositories/answers-repository'
import { AnswerComment } from '../../enterprise/entities/answer-comment'

interface CommentOnAnswerUseCaseRequest {
  authorId: string
  answerId: string
  content: string
}

interface CommentOnAnswerUseCaseResponse {
  answerComment: AnswerComment
}

export class CommentOnAnswerUseCase {
  constructor(
    private answersRepository: AnswersRepository,
    private answerCommentsRepository: AnswerCommentsRepository,
  ) {}

  async execute({
    authorId,
    answerId,
    content,
  }: CommentOnAnswerUseCaseRequest): Promise<CommentOnAnswerUseCaseResponse> {
    const answer = await this.answersRepository.findById(answerId)

    if (!answer) {
      const message = 'Answer not found'
      throw new Error(message)
    }

    const answerComment = AnswerComment.create({
      authorId: new UniqueEntityId(authorId),
      answerId: new UniqueEntityId(answerId),
      content,
    })

    await this.answerCommentsRepository.create(answerComment)

    return {
      answerComment,
    }
  }
}
