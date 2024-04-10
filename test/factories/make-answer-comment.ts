import { faker } from '@faker-js/faker'
import { UniqueEntityId } from '@/core/entities/unique-entity-id'
import {
  AnswerComment,
  AnswerCommentProps,
} from '@/domain/forum/enterprise/entities/answer-comment'

export function makeAnswerComment(
  override: Partial<AnswerCommentProps> = {},
  id?: UniqueEntityId,
) {
  const answercomment = AnswerComment.create(
    {
      authorId: new UniqueEntityId('1'),
      answerId: new UniqueEntityId('1'),
      content: faker.lorem.text(),
      ...override,
    },
    id,
  )

  return answercomment
}
