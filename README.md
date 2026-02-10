# Chitkara Qualifier API - Bajaj Finserv Placement

[![Node.js](https://img.shields.io/badge/Node.js-18+-green.svg)](https://nodejs.org/)
[![Express](https://img.shields.io/badge/Express-4.18-blue.svg)](https://expressjs.com/)

Production-ready REST API for Chitkara University Qualifier 2026 - Bajaj Finserv Placement

**Candidate**: [Ashok Kumar Mishra]  
**Email**: [ashok1130.be23@chitkarauniversity.edu.in]  
**Date**: February 10, 2026

---

## 🎯 Overview

This API implements 5 core operations as per the qualifier requirements:
1. **Fibonacci Series Generation**
2. **Prime Number Filtering**
3. **LCM Calculation**
4. **HCF Calculation**
5. **AI-Powered Question Answering**

---

## 🚀 API Endpoints

### POST /bfhl

Main processing endpoint supporting 5 operations.

#### 1. Fibonacci Series
**Request:**
```json
{
  "fibonacci": 7
}
```
**Response:**
```json
{
  "is_success": true,
  "official_email": "your.email@chitkara.edu.in",
  "data": [0, 1, 1, 2, 3, 5, 8]
}
```

#### 2. Prime Number Filter
**Request:**
```json
{
  "prime": [2, 4, 7, 9, 11]
}
```
**Response:**
```json
{
  "is_success": true,
  "official_email": "your.email@chitkara.edu.in",
  "data": [2, 7, 11]
}
```

#### 3. LCM Calculation
**Request:**
```json
{
  "lcm": [12, 18, 24]
}
```
**Response:**
```json
{
  "is_success": true,
  "official_email": "your.email@chitkara.edu.in",
  "data": 72
}
```

#### 4. HCF Calculation
**Request:**
```json
{
  "hcf": [24, 36, 60]
}
```
**Response:**
```json
{
  "is_success": true,
  "official_email": "your.email@chitkara.edu.in",
  "data": 12
}
```

#### 5. AI Question Answering
**Request:**
```json
{
  "AI": "What is the capital city of Maharashtra?"
}
```
**Response:**
```json
{
  "is_success": true,
  "official_email": "your.email@chitkara.edu.in",
  "data": "Mumbai"
}
```

### GET /health

Health check endpoint for monitoring.

**Response:**
```json
{
  "is_success": true,
  "official_email": "your.email@chitkara.edu.in",
  "status": "healthy",
  "timestamp": "2026-02-10T10:30:00.000Z",
  "uptime": 3600.5
}
```

---

## 🛠️ Technology Stack

- **Runtime**: Node.js 18+
- **Framework**: Express.js 4.18
- **AI Integration**: Google Gemini API
- **Security**: Helmet, CORS, Rate Limiting
- **Logging**: Winston
- **Validation**: Express Validator

---

## 📦 Installation & Setup

### Prerequisites
- Node.js 18+ installed
- Google Gemini API Key (free from https://aistudio.google.com)

### Steps

1. **Clone Repository**
```bash
git clone https://github.com/YOUR_USERNAME/chitkara-qualifier-api.git
cd chitkara-qualifier-api
```

2. **Install Dependencies**
```bash
npm install
```

3. **Configure Environment**
```bash
cp .env.example .env
```

Edit `.env`:
```env
PORT=3000
NODE_ENV=development
OFFICIAL_EMAIL=your.email@chitkara.edu.in
GEMINI_API_KEY=your_gemini_api_key
```

4. **Run Locally**
```bash
npm start
```

Server starts on `http://localhost:3000`

5. **Test**
```bash
curl http://localhost:3000/health
```

---

## 🧪 Testing

See [TESTING.md](TESTING.md) for comprehensive testing guide.

**Quick Test:**
```bash
# Fibonacci
curl -X POST http://localhost:3000/bfhl \
  -H "Content-Type: application/json" \
  -d '{"fibonacci": 7}'

# Prime
curl -X POST http://localhost:3000/bfhl \
  -H "Content-Type: application/json" \
  -d '{"prime": [2,4,7,9,11]}'
```

---

## 🚀 Deployment

See [DEPLOYMENT.md](DEPLOYMENT.md) for detailed deployment instructions.

**Quick Deploy to Vercel:**
1. Push to GitHub (public repo)
2. Import project in Vercel
3. Add environment variables
4. Deploy

---

## 📁 Project Structure

```
chitkara-qualifier-api/
├── src/
│   ├── server.js              # Entry point
│   ├── app.js                 # Express configuration
│   ├── controllers/
│   │   └── bfhlController.js  # Request handlers
│   ├── services/
│   │   ├── mathService.js     # Mathematical operations
│   │   └── aiService.js       # AI integration
│   ├── middleware/
│   │   ├── errorHandler.js    # Error handling
│   │   └── security.js        # Security middleware
│   ├── routes/
│   │   └── index.js           # API routes
│   └── utils/
│       ├── logger.js          # Logging utility
│       └── validation.js      # Input validation
├── package.json               # Dependencies
├── vercel.json               # Deployment config
└── README.md                 # Documentation
```

---

## 🔒 Security Features

✅ **Rate Limiting**: 100 requests per 15 minutes per IP  
✅ **Input Validation**: Comprehensive validation for all inputs  
✅ **Security Headers**: Helmet.js for XSS, CSRF protection  
✅ **CORS**: Configurable cross-origin requests  
✅ **Error Handling**: Graceful error handling, no crashes  
✅ **Logging**: Structured logging with Winston  

---

## 📊 Validation Rules

### Fibonacci
- **Input**: Integer (0-10,000)
- **Output**: Array of Fibonacci numbers

### Prime
- **Input**: Array of positive integers
- **Max Elements**: 1,000
- **Max Value**: 100,000 per element

### LCM/HCF
- **Input**: Array of positive integers
- **Max Elements**: 1,000
- **Max Value**: 100,000 per element

### AI
- **Input**: Non-empty string
- **Max Length**: 500 characters
- **Output**: Single word answer

---

## ⚠️ Error Handling

All errors return proper HTTP status codes and structured responses:

| Status Code | Description |
|------------|-------------|
| 200 | Success |
| 400 | Bad Request (validation failed) |
| 404 | Not Found (invalid endpoint) |
| 429 | Too Many Requests (rate limit) |
| 500 | Internal Server Error |
| 503 | Service Unavailable (AI API down) |

**Error Response Format:**
```json
{
  "is_success": false,
  "official_email": "your.email@chitkara.edu.in",
  "error": "Error message",
  "details": [...]
}
```

---

## 🎯 API Requirements Met

✅ Strict API response structure  
✅ Correct HTTP status codes  
✅ Robust input validation  
✅ Graceful error handling (no crashes)  
✅ Security guardrails (rate limiting, helmet, CORS)  
✅ Public accessibility  
✅ Production-ready code  

---

## 📚 Documentation

- **BAJAJ_DEPLOYMENT_GUIDE.md** - Complete step-by-step deployment guide
- **TESTING.md** - Testing examples and guidelines
- **DEPLOYMENT.md** - Deployment instructions for multiple platforms

---

## 🔧 Troubleshooting

### Common Issues

**Issue**: "Cannot find module 'express'"  
**Solution**: Run `npm install`

**Issue**: "No AI API key configured"  
**Solution**: Add `GEMINI_API_KEY` to `.env` file

**Issue**: "Port already in use"  
**Solution**: Change `PORT` in `.env` or kill existing process

**Issue**: AI endpoint returns 503  
**Solution**: Verify Gemini API key is valid and active

---

## 📞 Support

For deployment help, see **BAJAJ_DEPLOYMENT_GUIDE.md**

---

## 📄 License

This project is created for Chitkara University Qualifier 2026 - Bajaj Finserv Placement.

---

## Deployment Information

**GitHub Repository**: [Add your GitHub URL here after deployment]  
**Deployed API**: [Add your Vercel URL here after deployment]  
**Candidate**: [Ashok Kumar Mishra]  
**Email**: [ashok1130.be23@chitkarauniversity.edu.in]  
**Date**: February 10, 2026  
**Purpose**: Bajaj Finserv Placement via Chitkara Qualifier  

---

**Status**: ✅ All requirements met | ✅ Production ready | ✅ Fully tested
