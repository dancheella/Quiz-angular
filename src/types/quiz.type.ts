export type QuizResponseType = {
  test: QuizType;
}

export type QuizType = {
  id: number,
  name: string,
  questions: Array<QuizQuestionType>
}

export type QuizQuestionType = {
  id: number, 
  question: string,
  answers: Array<QuizAnswersType>,
}

export type QuizAnswersType = {
  id: number,
  answer: string
  correct?: boolean;
}