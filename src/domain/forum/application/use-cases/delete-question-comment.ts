import { QuestionCommentsRepository } from './../repositories/question-comments-repository'

interface DeleteQuestionCommentUseCaseRequest {
  authorId: string
  questionCommentId: string
}

interface DeleteQuestionCommentUseCaseResponse {}

export class DeleteQuestionCommentUseCase {
  constructor(private questionCommentsRepository: QuestionCommentsRepository) {}

  async execute({
    authorId,
    questionCommentId,
  }: DeleteQuestionCommentUseCaseRequest): Promise<DeleteQuestionCommentUseCaseResponse> {
    const questionComment =
      await this.questionCommentsRepository.findById(questionCommentId)

    if (!questionComment) {
      const message = 'Question coment not found'
      throw new Error(message)
    }

    if (questionComment.authorId.toString() !== authorId) {
      const message = 'Not allowed'
      throw new Error(message)
    }

    await this.questionCommentsRepository.delete(questionComment)

    return {}
  }
}
