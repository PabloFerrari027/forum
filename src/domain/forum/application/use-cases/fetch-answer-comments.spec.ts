import { expect, describe, it } from 'vitest'
import { FetchAnswerCommentsUseCase } from './fetch-answer-comments'
import { InMemoryAnswerCommentsRepository } from 'test/repositories/in-memory-answer-comments-repository'
import { makeAnswerComment } from 'test/factories/make-answer-comment'
import { UniqueEntityId } from '@/core/entities/unique-entity-id'

let inMemoryAnswerCommentsRepository: InMemoryAnswerCommentsRepository
let sut: FetchAnswerCommentsUseCase

describe('Fetch Answer Comments', () => {
  beforeEach(() => {
    inMemoryAnswerCommentsRepository = new InMemoryAnswerCommentsRepository()
    sut = new FetchAnswerCommentsUseCase(inMemoryAnswerCommentsRepository)
  })

  it('should be able to fetch answer comments', async () => {
    await inMemoryAnswerCommentsRepository.create(
      makeAnswerComment({
        answerId: new UniqueEntityId('answer-comment-1'),
      }),
    )

    await inMemoryAnswerCommentsRepository.create(
      makeAnswerComment({
        answerId: new UniqueEntityId('answer-comment-1'),
      }),
    )

    await inMemoryAnswerCommentsRepository.create(
      makeAnswerComment({
        answerId: new UniqueEntityId('answer-comment-1'),
      }),
    )

    const { answerComments } = await sut.execute({
      page: 1,
      answerId: 'answer-comment-1',
    })

    expect(answerComments).toHaveLength(3)
  })

  it('should be able to fetch paginated answer comments', async () => {
    for (let i = 0; i < 22; i++) {
      await inMemoryAnswerCommentsRepository.create(
        makeAnswerComment({
          answerId: new UniqueEntityId('answer-comment-1'),
        }),
      )
    }

    const { answerComments } = await sut.execute({
      page: 2,
      answerId: 'answer-comment-1',
    })

    expect(answerComments).toHaveLength(2)
  })
})
