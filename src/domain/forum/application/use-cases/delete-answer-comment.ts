import { AnswerCommentsRepository } from '../repositories/answer-comments-repository'

interface DeleteAnswerCommentUseCaseRequest {
  authorId: string
  answerCommentId: string
}

interface DeleteAnswerCommentUseCaseResponse {}

export class DeleteAnswerCommentUseCase {
  constructor(private answerCommentsRepository: AnswerCommentsRepository) {}

  async execute({
    authorId,
    answerCommentId,
  }: DeleteAnswerCommentUseCaseRequest): Promise<DeleteAnswerCommentUseCaseResponse> {
    const answerComment =
      await this.answerCommentsRepository.findById(answerCommentId)

    if (!answerComment) {
      const message = 'Answer coment not found'
      throw new Error(message)
    }

    if (answerComment.authorId.toString() !== authorId) {
      const message = 'Not allowed'
      throw new Error(message)
    }

    await this.answerCommentsRepository.delete(answerComment)

    return {}
  }
}
