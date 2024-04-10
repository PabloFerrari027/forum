import { Either, right } from '@/core/either'
import { Question } from '../../enterprise/entities/question'
import { QuestionsRepository } from '../repositories/questions-repository'

interface FetchRecentsTopicsUseCaseRequest {
  page: number
}

type FetchRecentsTopicsUseCaseResponse = Either<
  null,
  {
    questions: Question[]
  }
>

export class FetchRecentsTopicsUseCase {
  constructor(private questionsRepository: QuestionsRepository) {}

  async execute({
    page,
  }: FetchRecentsTopicsUseCaseRequest): Promise<FetchRecentsTopicsUseCaseResponse> {
    const questions = await this.questionsRepository.findManyRecent({ page })

    return right({
      questions,
    })
  }
}
