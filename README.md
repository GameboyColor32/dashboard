# Ticket Analysis Dashboard

A TypeScript React dashboard for analyzing Leboncoin customer service ticket quality with both macro (overview) and micro (chat analysis) views.

## 🌟 Features

### Macro Dashboard (Overview)
- **Key Metrics**: Average score, total tickets, response times, evaluated responses
- **Score Distribution**: Bar chart showing distribution of quality scores
- **Agent Performance**: Performance comparison across different agents
- **Detailed Tables**: Comprehensive agent performance breakdown

### Micro Dashboard (Chat Analysis)
- **Ticket Selection**: Choose specific tickets for detailed analysis
- **Chat Interface**: View complete conversation threads
- **Message Analysis**: Expand individual messages to see detailed evaluations
- **Quality Scoring**: Color-coded scores for each evaluated response
- **Evaluation Details**: Detailed breakdown of each evaluation criterion

## 🚀 Live Demo

Visit the live dashboard: [Ticket Analysis Dashboard](https://GameboyColor32.github.io/dashboard_tickets)

## 🛠️ Setup

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Local Development

1. **Clone the repository**
   ```bash
   git clone https://github.com/GameboyColor32/dashboard_tickets.git
   cd dashboard_tickets
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:3000`

### Build for Production

```bash
npm run build
```

The built files will be in the `dist/` directory.

## 📊 Data Structure

The dashboard expects ticket analysis data in JSON format with the following structure:

```typescript
interface EvaluatedTicket {
  id: string;
  title: string;
  header: TicketHeader;
  details: TicketDetails;
  responses: TicketResponse[];
  grid: Grid;
}
```

## 📁 File Structure

```
src/
├── components/
│   ├── MacroDashboard.tsx    # Overview charts and statistics
│   ├── MicroDashboard.tsx    # Chat analysis interface
│   ├── LoadingSpinner.tsx    # Loading component
│   └── ErrorBoundary.tsx     # Error handling
├── types/
│   └── index.ts             # TypeScript type definitions
├── utils/
│   ├── dataLoader.ts        # Data loading and processing utilities
│   └── cn.ts               # CSS class utilities
├── App.tsx                  # Main application component
├── main.tsx                 # React entry point
└── index.css               # Global styles
```

## 🏗️ Technologies Used

- **React 18** with TypeScript
- **Vite** for build tooling
- **Tailwind CSS** for styling
- **Recharts** for data visualization
- **Lucide React** for icons

## 📈 Quality Scoring System

The dashboard uses a comprehensive scoring system with multiple categories:

- **Formule d'appel** (Greeting formula) - 3 points
- **Structure du message** (Message structure) - 6 points
- **Formule de fin** (Closing formula) - 3 points
- **Aspect visuel et typographie** (Visual and typography) - 4 points
- **Respect du process** (Process compliance) - 15 points
- **Pertinence** (Relevance) - 40 points
- **Ton, empathie** (Tone, empathy) - 10 points
- **Personnalisation** (Personalization) - 10 points
- **Orthographe, syntaxe** (Spelling, syntax) - 9 points

Each response is evaluated against these criteria with answers of "Oui" (Yes), "Non" (No), or "N/A" (Not Applicable).

## 🚀 Deployment

### GitHub Pages (Automatic)

The project is configured for automatic deployment to GitHub Pages:

1. **Push to main branch**: The CI/CD pipeline automatically builds and deploys
2. **Manual deployment**: Run `npm run deploy` to deploy manually

### Manual Deployment

1. **Build the project**
   ```bash
   npm run build
   ```

2. **Deploy to GitHub Pages**
   ```bash
   npm run deploy
   ```

### CI/CD Pipeline

The project includes a GitHub Actions workflow (`.github/workflows/deploy.yml`) that:

- Triggers on pushes to main branch
- Installs dependencies
- Builds the project
- Deploys to GitHub Pages

## 📝 Usage

1. **Macro View**: Navigate to the "Macro Overview" tab to see high-level statistics and performance metrics
2. **Micro View**: Switch to "Chat Analysis" to examine individual ticket conversations and message evaluations
3. **Interactive Features**: 
   - Click on ticket cards to view detailed chat analysis
   - Expand message evaluations to see detailed criteria breakdown
   - Hover over charts for detailed tooltips

## 🔧 Configuration

### Environment Variables

No environment variables are required for basic functionality.

### Data Sources

The dashboard loads ticket analysis data from the `public/outputs/` directory. Make sure your JSON files are accessible at:

- `public/outputs/36925759.json`
- `public/outputs/37238273.json`
- `public/outputs/37376177.json`
- `public/outputs/36824999.json`

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Leboncoin for the ticket analysis data
- React team for the amazing framework
- Vite team for the fast build tool
- Recharts team for the beautiful charts 