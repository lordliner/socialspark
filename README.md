# SocialSpark - Social Media Management Platform

SocialSpark is a comprehensive social media management platform that helps businesses and content creators schedule, publish, and analyze their social media content across multiple platforms.

## Features

- 📅 Visual Content Calendar
- 🎨 Content Creation Tools
- 📊 Analytics & Reporting
- 🤖 AI-Powered Hashtag Suggestions
- ⏰ Best Posting Time Prediction
- 🔄 Auto-repost of Best Performing Content
- 🔐 Secure Authentication
- 💰 Freemium Business Model

## Tech Stack

### Frontend
- React.js
- TypeScript
- Material-UI
- Redux Toolkit
- React Query

### Backend
- Node.js
- Express.js
- MongoDB
- Python (AI/ML Services)
- TensorFlow & scikit-learn

### Infrastructure
- AWS (Deployment)
- Docker
- CI/CD Pipeline

## Getting Started

### Prerequisites
- Node.js >= 18
- MongoDB >= 6.0
- Python >= 3.8
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/socialspark.git
cd socialspark
```

2. Install dependencies:
```bash
# Install frontend dependencies
cd frontend
npm install

# Install backend dependencies
cd ../backend
npm install

# Install Python dependencies
cd ../ml-service
pip install -r requirements.txt
```

3. Set up environment variables:
```bash
cp .env.example .env
```

4. Start the development servers:
```bash
# Start frontend
cd frontend
npm run dev

# Start backend
cd ../backend
npm run dev

# Start ML service
cd ../ml-service
python app.py
```

## Documentation

- [API Documentation](./docs/api.md)
- [Frontend Documentation](./docs/frontend.md)
- [Backend Documentation](./docs/backend.md)
- [ML Service Documentation](./docs/ml-service.md)
- [Deployment Guide](./docs/deployment.md)

## Contributing

Please read [CONTRIBUTING.md](./CONTRIBUTING.md) for details on our code of conduct and the process for submitting pull requests.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details. 