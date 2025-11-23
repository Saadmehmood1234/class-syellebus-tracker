export type SubjectStatus = 'complete' | 'working-on' | 'incomplete' | '---';

export interface Subject {
  id: string;
  name: string;
  status: SubjectStatus;
  ut2Marks: number;
  annualMarks: number;
  fillMax: boolean;
  unitTestRank?: number;
  unitTestPercentage?: number;
  annualRank?: number;
  annualPercentage?: number;
  order: number;
}

export interface AppData {
  subjects: Subject[];
  classNumber: number;
  theme: 'light' | 'dark';
}