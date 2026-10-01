export interface Question {
  prompt: string;
  choices: string[];
  answerIndex: number;
}

export interface QuizResult {
  correct: number;
  total: number;
  percent: number;
}

export class Quiz {
  private readonly answers: number[] = [];

  constructor(private readonly questions: Question[]) {}

  answer(questionIndex: number, choiceIndex: number): void {
    const question = this.questions[questionIndex];
    if (!question) throw new Error("unknown question");
    if (choiceIndex < 0 || choiceIndex >= question.choices.length) {
      throw new Error("unknown choice");
    }
    this.answers[questionIndex] = choiceIndex;
  }

  grade(): QuizResult {
    const correct = this.questions.reduce((sum, question, index) => {
      return sum + (this.answers[index] === question.answerIndex ? 1 : 0);
    }, 0);
    const total = this.questions.length;
    return { correct, total, percent: total === 0 ? 0 : (correct / total) * 100 };
  }
}
