export interface Question {
    title: string;
    description: string;
    options: string[];
    answers: string[];
    type: string;
}


export class QuestionType {
    static readonly longText = 'long-text';
    static readonly shortText = 'short-text';
    static readonly longNumber = 'long-number';
    static readonly shortNumber = 'short-number';
    static readonly mixed = 'mixed';
}
