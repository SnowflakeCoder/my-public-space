import { QuestionConfig, QuestionType, GeneratedQuestion } from '../types';

export class QuestionGenerator {
  // Simple seeded random number generator
  static seededRandom(seed: number): number {
    const x = Math.sin(seed) * 10000;
    return x - Math.floor(x);
  }

  static generateRandomNumber(minDigits: number, maxDigits: number, seed: number): number {
    const min = Math.pow(10, minDigits - 1);
    const max = Math.pow(10, maxDigits) - 1;
    const random = this.seededRandom(seed);
    return Math.floor(random * (max - min + 1)) + min;
  }

  static generateQuestion(config: QuestionConfig, seed: number): GeneratedQuestion {
    let firstNumber = this.generateRandomNumber(config.firstNumberMinDigits, config.firstNumberMaxDigits, seed);
    let secondNumber = this.generateRandomNumber(config.secondNumberMinDigits, config.secondNumberMaxDigits, seed + 1);

    // Ensure first number is bigger than second if required
    if (config.firstNumberBigger && firstNumber < secondNumber) {
      [firstNumber, secondNumber] = [secondNumber, firstNumber];
    }

    let answer: number;
    switch (config.type) {
      case QuestionType.ADDITION:
        answer = firstNumber + secondNumber;
        break;
      case QuestionType.SUBTRACTION:
        answer = firstNumber - secondNumber;
        break;
      case QuestionType.MULTIPLICATION:
        answer = firstNumber * secondNumber;
        break;
      case QuestionType.DIVISION:
        // For division, ensure no remainder by adjusting second number
        if (secondNumber === 0) secondNumber = 1;
        answer = Math.floor(firstNumber / secondNumber);
        firstNumber = answer * secondNumber; // Adjust to ensure exact division
        break;
      default:
        throw new Error(`Unknown question type: ${config.type}`);
    }

    return {
      id: Math.random().toString(36).substr(2, 9),
      type: config.type,
      firstNumber,
      secondNumber,
      answer
    };
  }

  static generateQuestionsFromConfigs(configs: QuestionConfig[], exerciseCode: string): GeneratedQuestion[] {
    const questions: GeneratedQuestion[] = [];
    
    // Create a base seed from exercise code
    let baseSeed = 0;
    for (let i = 0; i < exerciseCode.length; i++) {
      baseSeed += exerciseCode.charCodeAt(i) * (i + 1);
    }
    
    let questionSeed = baseSeed;
    for (const config of configs) {
      for (let i = 0; i < config.count; i++) {
        questions.push(this.generateQuestion(config, questionSeed));
        questionSeed += 1; // Increment seed for each question
      }
    }

    // Shuffle questions using seeded random
    for (let i = questions.length - 1; i > 0; i--) {
      const j = Math.floor(this.seededRandom(baseSeed + i) * (i + 1));
      [questions[i], questions[j]] = [questions[j], questions[i]];
    }

    return questions;
  }

  static getOperatorSymbol(type: QuestionType): string {
    switch (type) {
      case QuestionType.ADDITION:
        return '+';
      case QuestionType.SUBTRACTION:
        return '-';
      case QuestionType.MULTIPLICATION:
        return '×';
      case QuestionType.DIVISION:
        return '÷';
      default:
        return '?';
    }
  }
}