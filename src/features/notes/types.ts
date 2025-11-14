export interface User {
  id: string;
  name: string;
  email: string;
  pass: string;
  createdAt: string;
}

export interface Note {
  id: string;
  title: string;
  description: string;
  type: "urgent" | "normal" | "recurring";
  date: string;
  remember: boolean;
  participants: string[];
}

export interface event {
  message: string;
  typeEvent: "urgent" | "normal" | "recurring";
  remember: boolean;
  userId: string | number;
}

export const priorityOrder = {
  urgent: 1,
  normal: 2,
  recurring: 3,
};
