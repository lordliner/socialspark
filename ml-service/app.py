from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List, Optional
import uvicorn
import numpy as np
from datetime import datetime
import joblib
import nltk
from transformers import pipeline

# Download required NLTK data
nltk.download('punkt')
nltk.download('averaged_perceptron_tagger')
nltk.download('wordnet')

app = FastAPI(title="SocialSpark ML Service")

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Models
class PostContent(BaseModel):
    text: str
    platform: str
    category: Optional[str] = None

class TimeOptimization(BaseModel):
    platform: str
    timezone: str
    category: Optional[str] = None

# Load ML models (in production, these would be properly initialized)
try:
    sentiment_analyzer = pipeline("sentiment-analysis")
except Exception as e:
    print(f"Error loading sentiment model: {e}")
    sentiment_analyzer = None

@app.get("/health")
async def health_check():
    return {"status": "healthy"}

@app.post("/api/hashtags")
async def generate_hashtags(post: PostContent):
    """Generate relevant hashtags based on post content"""
    try:
        # Simple example - in production, use proper NLP models
        words = nltk.word_tokenize(post.text.lower())
        tags = nltk.pos_tag(words)
        relevant_words = [word for word, pos in tags if pos.startswith(('NN', 'JJ', 'VB'))]
        hashtags = [f"#{word}" for word in relevant_words[:5]]
        return {"hashtags": hashtags}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/api/best-time")
async def get_best_posting_time(data: TimeOptimization):
    """Predict the best time to post based on historical data"""
    try:
        # Placeholder logic - in production, use trained models
        hours = list(range(9, 21))  # 9 AM to 8 PM
        weights = np.random.dirichlet(np.ones(len(hours)))
        best_hour = np.random.choice(hours, p=weights)
        
        return {
            "best_time": f"{best_hour:02d}:00",
            "confidence": float(max(weights))
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/api/sentiment")
async def analyze_sentiment(post: PostContent):
    """Analyze sentiment of post content"""
    try:
        if not sentiment_analyzer:
            raise HTTPException(status_code=503, detail="Sentiment analysis model not available")
        
        result = sentiment_analyzer(post.text)[0]
        return {
            "sentiment": result["label"],
            "confidence": float(result["score"])
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/api/content-optimization")
async def optimize_content(post: PostContent):
    """Optimize content for better engagement"""
    try:
        # Placeholder logic - in production, use proper ML models
        suggestions = []
        
        # Length check
        if len(post.text) < 50:
            suggestions.append("Consider adding more content for better engagement")
        elif len(post.text) > 280 and post.platform == "twitter":
            suggestions.append("Content exceeds Twitter's character limit")
            
        # Hashtag check
        if "#" not in post.text:
            suggestions.append("Consider adding relevant hashtags")
            
        return {
            "suggestions": suggestions,
            "optimization_score": 0.8
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

if __name__ == "__main__":
    uvicorn.run("app:app", host="0.0.0.0", port=8000, reload=True) 