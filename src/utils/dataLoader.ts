import { EvaluatedTicket, TicketAnalysis, TicketChat, ChatMessage } from '../types';

export async function loadTicketData(): Promise<EvaluatedTicket[]> {
  const ticketFiles = [
    '36925759.json',
    '37238273.json', 
    '37376177.json',
    '36824999.json'
  ];

  const tickets: EvaluatedTicket[] = [];

  for (const file of ticketFiles) {
    try {
      // Use relative path for GitHub Pages
      const response = await fetch(`./outputs/${file}`);
      if (response.ok) {
        const ticket: EvaluatedTicket = await response.json();
        tickets.push(ticket);
      }
    } catch (error) {
      console.error(`Failed to load ${file}:`, error);
    }
  }

  return tickets;
}

export function analyzeTickets(tickets: EvaluatedTicket[]): TicketAnalysis {
  const totalTickets = tickets.length;
  let totalScore = 0;
  let totalEvaluatedResponses = 0;
  const categoryScores: Record<string, number> = {};
  const scoreDistribution: Record<string, number> = {};
  const agentPerformance: Record<string, { count: number; totalScore: number; averageScore: number }> = {};
  const responseTimes: number[] = [];

  // Initialize category scores
  if (tickets.length > 0 && tickets[0].grid.categories) {
    tickets[0].grid.categories.forEach(category => {
      categoryScores[category.name] = 0;
    });
  }

  tickets.forEach(ticket => {
    ticket.responses.forEach((response, index) => {
      if (response.evaluation) {
        totalScore += response.evaluation.score;
        totalEvaluatedResponses++;

        // Track agent performance
        if (!agentPerformance[response.sender]) {
          agentPerformance[response.sender] = { count: 0, totalScore: 0, averageScore: 0 };
        }
        agentPerformance[response.sender].count++;
        agentPerformance[response.sender].totalScore += response.evaluation.score;

        // Score distribution
        const scoreRange = getScoreRange(response.evaluation.score);
        scoreDistribution[scoreRange] = (scoreDistribution[scoreRange] || 0) + 1;

        // Response time analysis (if not first message)
        if (index > 0) {
          const currentTime = new Date(response.date).getTime();
          const previousTime = new Date(ticket.responses[index - 1].date).getTime();
          const responseTimeHours = (currentTime - previousTime) / (1000 * 60 * 60);
          responseTimes.push(responseTimeHours);
        }
      }
    });
  });

  // Calculate averages
  const averageScore = totalEvaluatedResponses > 0 ? totalScore / totalEvaluatedResponses : 0;
  const averageResponseTime = responseTimes.length > 0 
    ? responseTimes.reduce((a, b) => a + b, 0) / responseTimes.length 
    : 0;

  // Calculate agent performance averages
  Object.keys(agentPerformance).forEach(agent => {
    const perf = agentPerformance[agent];
    perf.averageScore = perf.totalScore / perf.count;
  });

  return {
    tickets,
    totalTickets,
    averageScore,
    categoryScores,
    scoreDistribution,
    agentPerformance,
    responseTimeAnalysis: {
      averageResponseTime,
      responseTimeDistribution: {}
    }
  };
}

export function convertToChatView(ticket: EvaluatedTicket): TicketChat {
  const messages: ChatMessage[] = ticket.responses.map((response, index) => {
    // Determine if this is an agent message (simple heuristic)
    const isAgent = response.sender.toLowerCase().includes('service') || 
                   response.sender.toLowerCase().includes('client') ||
                   response.sender.toLowerCase().includes('support') ||
                   response.sender.toLowerCase().includes('tomcine') ||
                   response.sender.toLowerCase().includes('thomas');

    return {
      id: `${ticket.id}-${index}`,
      sender: response.sender,
      date: response.date,
      content: response.content,
      evaluation: response.evaluation,
      isAgent
    };
  });

  return {
    id: ticket.id,
    title: ticket.title,
    header: ticket.header,
    details: ticket.details,
    messages
  };
}

function getScoreRange(score: number): string {
  if (score >= 90) return '90-100';
  if (score >= 80) return '80-89';
  if (score >= 70) return '70-79';
  if (score >= 60) return '60-69';
  if (score >= 50) return '50-59';
  if (score >= 40) return '40-49';
  if (score >= 30) return '30-39';
  if (score >= 20) return '20-29';
  if (score >= 10) return '10-19';
  return '0-9';
}

export function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleString('fr-FR', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
}

export function getScoreColor(score: number): string {
  if (score >= 80) return 'text-green-600';
  if (score >= 60) return 'text-yellow-600';
  if (score >= 40) return 'text-orange-600';
  return 'text-red-600';
}

export function getScoreBackgroundColor(score: number): string {
  if (score >= 80) return 'bg-green-100';
  if (score >= 60) return 'bg-yellow-100';
  if (score >= 40) return 'bg-orange-100';
  return 'bg-red-100';
} 