"use client";

export interface Subject {
  id: string;
  name: string;
  status: "complete" | "working-on" | "incomplete" | "---";
  ut2Marks: number;
  annualMarks: number;
  fillMax: boolean;
  unitTestRank?: number;
  unitTestPercentage?: number;
  annualRank?: number;
  annualPercentage?: number;
  order: number;
}

export const storage = {
  getSubjects: (): Subject[] => {
    if (typeof window === "undefined") return [];
    const stored = localStorage.getItem("syllabus-subjects");
    return stored ? JSON.parse(stored) : [];
  },

  saveSubjects: (subjects: Subject[]): void => {
    if (typeof window !== "undefined") {
      localStorage.setItem("syllabus-subjects", JSON.stringify(subjects));
    }
  },

  getTheme: (): "light" | "dark" => {
    if (typeof window === "undefined") return "light";
    return (localStorage.getItem("syllabus-theme") as "light" | "dark") || "light";
  },

  setTheme: (theme: "light" | "dark"): void => {
    if (typeof window !== "undefined") {
      localStorage.setItem("syllabus-theme", theme);
    }
  },

  getClass: (): string => {
    if (typeof window === "undefined") return "9";
    return localStorage.getItem("syllabus-class") || "9";
  },

  setClass: (classNum: string): void => {
    if (typeof window !== "undefined") {
      localStorage.setItem("syllabus-class", classNum);
    }
  },

  resetAllData: (): void => {
    if (typeof window !== "undefined") {
      localStorage.removeItem("syllabus-subjects");
      localStorage.removeItem("syllabus-theme");
      localStorage.removeItem("syllabus-class");
    }
  }
};