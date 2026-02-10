# Deployment Guide

Complete step-by-step guide for deploying your Chitkara Qualifier API.

## Prerequisites

Before deploying, ensure you have:
- [x] Tested the API locally
- [x] GitHub account created
- [x] Code pushed to GitHub repository (public)
- [x] AI API key obtained (Gemini/OpenAI/Anthropic)
- [x] Chitkara email address ready

---

## Option 1: Deploy to Vercel (Recommended)

Vercel is the easiest and fastest deployment option.

### Step 1: Prepare GitHub Repository

```bash
# Initialize git (if not done)
git init

# Add all files
git add .

# Commit
git commit -m "Initial commit - Chitkara Qualifier API"

# Create repository on GitHub (via website)
# Then connect and push:
git remote add origin https://github.com/YOUR_USERNAME/chitkara-qualifier-api.git
git branch -M main
git push -u origin main
```

### Step 2: Deploy to Vercel

**Method A: Via GitHub Integration (Easiest)**

1. Go to https://vercel.com
2. Click "Sign Up" and use GitHub
3. Click "New Project"
4. Select your repository `chitkara-qualifier-api`
5. Configure:
   - **Framework Preset**: Other
   - **Root Directory**: `./`
   - **Build Command**: Leave empty
   - **Output Directory**: Leave empty
6. Add Environment Variables:
   ```
   OFFICIAL_EMAIL=your.email@chitkara.edu.in
   GEMINI_API_KEY=your_actual_api_key_here
   NODE_ENV=production
   ```
7. Click "Deploy"
8. Wait 2-3 minutes for deployment
9. Copy the deployment URL (e.g., `https://your-project.vercel.app`)

**Method B: Via Vercel CLI**

```bash
# Install Vercel CLI
npm install -g vercel

# Login
vercel login

# Deploy
vercel

# Follow prompts:
# - Set up and deploy? Yes
# - Which scope? Your account
# - Link to existing project? No
# - Project name? chitkara-qualifier-api
# - Directory? ./
# - Override settings? No

# Add environment variables
vercel env add OFFICIAL_EMAIL
# Enter: your.email@chitkara.edu.in

vercel env add GEMINI_API_KEY
# Enter: your_actual_api_key

vercel env add NODE_ENV
# Enter: production

# Deploy to production
vercel --prod
```

### Step 3: Test Deployment

```bash
# Replace with your actual Vercel URL
export VERCEL_URL="https://your-project.vercel.app"

# Test health
curl $VERCEL_URL/health

# Test Fibonacci
curl -X POST $VERCEL_URL/bfhl \
  -H "Content-Type: application/json" \
  -d '{"fibonacci": 7}'
```

---

## Option 2: Deploy to Railway

Railway provides excellent Node.js support.

### Step 1: Sign Up

1. Go to https://railway.app
2. Click "Login With GitHub"
3. Authorize Railway

### Step 2: Create New Project

1. Click "New Project"
2. Select "Deploy from GitHub repo"
3. Choose your repository
4. Click "Deploy Now"

### Step 3: Configure Environment

1. Click on your deployment
2. Go to "Variables" tab
3. Add variables:
   ```
   OFFICIAL_EMAIL=your.email@chitkara.edu.in
   GEMINI_API_KEY=your_actual_api_key
   NODE_ENV=production
   PORT=3000
   ```
4. Click "Save"

### Step 4: Get Public URL

1. Go to "Settings" tab
2. Scroll to "Networking"
3. Click "Generate Domain"
4. Copy the URL (e.g., `https://your-app.up.railway.app`)

### Step 5: Test

```bash
curl https://your-app.up.railway.app/health
```

---

## Option 3: Deploy to Render

Render offers free hosting with good performance.

### Step 1: Sign Up

1. Go to https://render.com
2. Sign up with GitHub

### Step 2: Create Web Service

1. Click "New +" → "Web Service"
2. Connect your GitHub repository
3. Click "Connect" next to your repo

### Step 3: Configure Service

Fill in the following:
- **Name**: `chitkara-qualifier-api`
- **Region**: Choose closest to you
- **Branch**: `main`
- **Root Directory**: Leave empty
- **Runtime**: `Node`
- **Build Command**: `npm install`
- **Start Command**: `npm start`
- **Instance Type**: `Free`

### Step 4: Add Environment Variables

Click "Advanced" → "Add Environment Variable":
```
OFFICIAL_EMAIL=your.email@chitkara.edu.in
GEMINI_API_KEY=your_actual_api_key
NODE_ENV=production
```

### Step 5: Deploy

1. Click "Create Web Service"
2. Wait 5-10 minutes for deployment
3. Copy URL from dashboard

### Step 6: Test

```bash
curl https://your-app.onrender.com/health
```

---

## Option 4: Using ngrok (Temporary/Testing Only)

**Warning**: ngrok URLs expire when you close the terminal. Only use for testing.

### Step 1: Install ngrok

```bash
# Download from https://ngrok.com/download
# Or using npm
npm install -g ngrok
```

### Step 2: Start Local Server

```bash
npm start
# Server running on http://localhost:3000
```

### Step 3: Expose via ngrok

```bash
# In a new terminal
ngrok http 3000
```

### Step 4: Copy Public URL

You'll see output like:
```
Forwarding    https://abc123.ngrok.io -> http://localhost:3000
```

Copy the HTTPS URL.

**Note**: 
- Keep both terminals running
- URL changes every time you restart ngrok
- Free tier has request limits
- Not suitable for production/submission

---

## Post-Deployment Checklist

After deploying to any platform:

### 1. Update README

Edit `README.md` and add your URLs:
```markdown
**Deployment URL**: https://your-actual-deployment-url.com
**GitHub Repository**: https://github.com/yourusername/chitkara-qualifier-api
```

### 2. Test All Endpoints

```bash
# Set your deployment URL
export API_URL="https://your-deployment-url.com"

# Test each endpoint
curl $API_URL/health
curl -X POST $API_URL/bfhl -H "Content-Type: application/json" -d '{"fibonacci": 7}'
curl -X POST $API_URL/bfhl -H "Content-Type: application/json" -d '{"prime": [2,4,7,9,11]}'
curl -X POST $API_URL/bfhl -H "Content-Type: application/json" -d '{"lcm": [12,18,24]}'
curl -X POST $API_URL/bfhl -H "Content-Type: application/json" -d '{"hcf": [24,36,60]}'
curl -X POST $API_URL/bfhl -H "Content-Type: application/json" -d '{"AI": "What is the capital city of Maharashtra?"}'
```

### 3. Verify Response Structure

Each response should have:
- ✅ `is_success` field
- ✅ `official_email` with your Chitkara email
- ✅ `data` field with correct result
- ✅ Correct HTTP status code

### 4. Test Error Cases

```bash
# Should return 400
curl -X POST $API_URL/bfhl -H "Content-Type: application/json" -d '{}'

# Should return 404
curl $API_URL/invalid-endpoint

# Should return 400
curl -X POST $API_URL/bfhl -H "Content-Type: application/json" -d '{"fibonacci": -5}'
```

### 5. Monitor Logs

- **Vercel**: Dashboard → Your Project → Logs
- **Railway**: Project → Deployments → Logs
- **Render**: Service → Logs tab

### 6. Update Repository

```bash
# Commit final changes
git add README.md
git commit -m "Add deployment URL"
git push origin main
```

---

## Troubleshooting

### Build Fails

**Error**: "Cannot find module 'express'"
```bash
# Ensure package.json is committed
git add package.json
git commit -m "Add package.json"
git push
```

### Environment Variables Not Working

1. Double-check variable names (case-sensitive)
2. Redeploy after adding variables
3. Check for extra spaces in values

### API Returns 500 Errors

1. Check deployment logs for errors
2. Verify AI API key is valid
3. Test AI API key locally first:

```bash
# Test Gemini key
curl -X POST "https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=YOUR_KEY" \
  -H "Content-Type: application/json" \
  -d '{"contents":[{"parts":[{"text":"Hello"}]}]}'
```

### Rate Limiting Issues

If testing causes rate limits:
1. Wait 15 minutes
2. Or adjust in environment:
   ```
   RATE_LIMIT_MAX_REQUESTS=1000
   ```

---

## Final Submission Format

When submitting your qualifier:

1. **GitHub Repository URL**: 
   `https://github.com/yourusername/chitkara-qualifier-api`

2. **Deployed API URL**: 
   `https://your-app.vercel.app`

3. **Test the URLs work**:
   - Click on GitHub URL → See code
   - Click on API URL → See API response

4. **Ensure repository is public**:
   - GitHub → Settings → Danger Zone → Change visibility → Public

---

## Performance Optimization (Optional)

After successful deployment, consider:

1. **Enable caching** (Vercel does this automatically)
2. **Add monitoring** (Vercel Analytics, Sentry)
3. **Optimize AI responses** (cache common questions)
4. **Add request compression** (already implemented)

---

## Support

If you encounter issues:
1. Check deployment platform status page
2. Review platform documentation
3. Check logs for specific errors
4. Test locally first with same environment variables

Good luck with your qualifier! 🚀
