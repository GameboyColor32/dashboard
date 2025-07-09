export type Answer = "Oui" | "Non" | "N/A";

export interface TicketHeader {
  creation_date: string;
  source: string;
  request_by: string;
  status: string;
  type: string | null;
  priority: string;
  group: string;
  assigned_to: string;
}

export interface TicketDetails {
  total_time_spent: number;
  account_type: string;
  topic: string;
  language: string;
}

export interface TicketResponse {
  sender: string;
  date: string;
  content: string;
  evaluation?: Evaluation;
}

export interface Evaluation {
  evaluations: Response[];
  score: number;
}

export interface Response {
  answer: Answer;
  justification: string;
}

export interface Criteria {
  content: string;
  type: "full" | "partial" | "instant_fail";
  partial_level: number;
}

export interface Category {
  name: string;
  full_score: number;
  partial_scores: number[];
  criteria: Criteria[];
}

export interface Grid {
  categories: Category[];
}

export interface EvaluatedTicket {
  id: string;
  title: string;
  header: TicketHeader;
  details: TicketDetails;
  responses: TicketResponse[];
  grid: Grid;
}

export interface TicketAnalysis {
  tickets: EvaluatedTicket[];
  totalTickets: number;
  averageScore: number;
  categoryScores: Record<string, number>;
  scoreDistribution: Record<string, number>;
  agentPerformance: Record<string, { count: number; averageScore: number }>;
  responseTimeAnalysis: {
    averageResponseTime: number;
    responseTimeDistribution: Record<string, number>;
  };
}

export interface ChatMessage {
  id: string;
  sender: string;
  date: string;
  content: string;
  evaluation?: Evaluation;
  isAgent: boolean;
}

export interface TicketChat {
  id: string;
  title: string;
  header: TicketHeader;
  details: TicketDetails;
  messages: ChatMessage[];
} 