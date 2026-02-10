# API Testing Guide

## Manual Testing with cURL

### 1. Test Fibonacci Endpoint

```bash
# Valid request
curl -X POST http://localhost:3000/bfhl \
  -H "Content-Type: application/json" \
  -d '{"fibonacci": 7}'

# Expected Response:
# {
#   "is_success": true,
#   "official_email": "your.email@chitkara.edu.in",
#   "data": [0, 1, 1, 2, 3, 5, 8]
# }

# Edge case: Zero
curl -X POST http://localhost:3000/bfhl \
  -H "Content-Type: application/json" \
  -d '{"fibonacci": 0}'

# Edge case: Large number
curl -X POST http://localhost:3000/bfhl \
  -H "Content-Type: application/json" \
  -d '{"fibonacci": 15}'

# Error case: Negative number
curl -X POST http://localhost:3000/bfhl \
  -H "Content-Type: application/json" \
  -d '{"fibonacci": -5}'

# Error case: Too large
curl -X POST http://localhost:3000/bfhl \
  -H "Content-Type: application/json" \
  -d '{"fibonacci": 100000}'
```

### 2. Test Prime Endpoint

```bash
# Valid request
curl -X POST http://localhost:3000/bfhl \
  -H "Content-Type: application/json" \
  -d '{"prime": [2, 4, 7, 9, 11]}'

# Expected Response:
# {
#   "is_success": true,
#   "official_email": "your.email@chitkara.edu.in",
#   "data": [2, 7, 11]
# }

# Edge case: All primes
curl -X POST http://localhost:3000/bfhl \
  -H "Content-Type: application/json" \
  -d '{"prime": [2, 3, 5, 7, 11, 13]}'

# Edge case: No primes
curl -X POST http://localhost:3000/bfhl \
  -H "Content-Type: application/json" \
  -d '{"prime": [4, 6, 8, 9, 10]}'

# Edge case: Large primes
curl -X POST http://localhost:3000/bfhl \
  -H "Content-Type: application/json" \
  -d '{"prime": [97, 98, 99, 100, 101]}'

# Error case: Empty array
curl -X POST http://localhost:3000/bfhl \
  -H "Content-Type: application/json" \
  -d '{"prime": []}'
```

### 3. Test LCM Endpoint

```bash
# Valid request
curl -X POST http://localhost:3000/bfhl \
  -H "Content-Type: application/json" \
  -d '{"lcm": [12, 18, 24]}'

# Expected Response:
# {
#   "is_success": true,
#   "official_email": "your.email@chitkara.edu.in",
#   "data": 72
# }

# Edge case: Two numbers
curl -X POST http://localhost:3000/bfhl \
  -H "Content-Type: application/json" \
  -d '{"lcm": [15, 20]}'

# Edge case: Same numbers
curl -X POST http://localhost:3000/bfhl \
  -H "Content-Type: application/json" \
  -d '{"lcm": [10, 10, 10]}'

# Edge case: Prime numbers
curl -X POST http://localhost:3000/bfhl \
  -H "Content-Type: application/json" \
  -d '{"lcm": [3, 5, 7]}'
```

### 4. Test HCF Endpoint

```bash
# Valid request
curl -X POST http://localhost:3000/bfhl \
  -H "Content-Type: application/json" \
  -d '{"hcf": [24, 36, 60]}'

# Expected Response:
# {
#   "is_success": true,
#   "official_email": "your.email@chitkara.edu.in",
#   "data": 12
# }

# Edge case: Coprime numbers (HCF = 1)
curl -X POST http://localhost:3000/bfhl \
  -H "Content-Type: application/json" \
  -d '{"hcf": [7, 11, 13]}'

# Edge case: Multiple of each other
curl -X POST http://localhost:3000/bfhl \
  -H "Content-Type: application/json" \
  -d '{"hcf": [10, 20, 30]}'
```

### 5. Test AI Endpoint

```bash
# Valid request
curl -X POST http://localhost:3000/bfhl \
  -H "Content-Type: application/json" \
  -d '{"AI": "What is the capital city of Maharashtra?"}'

# Expected Response:
# {
#   "is_success": true,
#   "official_email": "your.email@chitkara.edu.in",
#   "data": "Mumbai"
# }

# Other test questions
curl -X POST http://localhost:3000/bfhl \
  -H "Content-Type: application/json" \
  -d '{"AI": "What color is the sky?"}'

curl -X POST http://localhost:3000/bfhl \
  -H "Content-Type: application/json" \
  -d '{"AI": "What is 2+2?"}'

# Error case: Empty string
curl -X POST http://localhost:3000/bfhl \
  -H "Content-Type: application/json" \
  -d '{"AI": ""}'

# Error case: Very long string
curl -X POST http://localhost:3000/bfhl \
  -H "Content-Type: application/json" \
  -d "{\"AI\": \"$(python3 -c 'print("a"*600)')\"}"
```

### 6. Test Health Endpoint

```bash
curl http://localhost:3000/health

# Expected Response:
# {
#   "is_success": true,
#   "official_email": "your.email@chitkara.edu.in",
#   "status": "healthy",
#   "timestamp": "2026-02-10T10:30:00.000Z",
#   "uptime": 3600.5
# }
```

### 7. Test Error Cases

```bash
# Invalid endpoint
curl http://localhost:3000/invalid

# Multiple keys in one request
curl -X POST http://localhost:3000/bfhl \
  -H "Content-Type: application/json" \
  -d '{"fibonacci": 5, "prime": [2,3,5]}'

# No valid key
curl -X POST http://localhost:3000/bfhl \
  -H "Content-Type: application/json" \
  -d '{"invalid": "data"}'

# Invalid JSON
curl -X POST http://localhost:3000/bfhl \
  -H "Content-Type: application/json" \
  -d '{invalid json}'

# Empty body
curl -X POST http://localhost:3000/bfhl \
  -H "Content-Type: application/json" \
  -d '{}'
```

## Testing with Postman

### Import Collection
1. Open Postman
2. Click Import → Raw Text
3. Paste the following JSON:

```json
{
  "info": {
    "name": "Chitkara Qualifier API",
    "schema": "https://schema.getpostman.com/json/collection/v2.1.0/collection.json"
  },
  "variable": [
    {
      "key": "base_url",
      "value": "http://localhost:3000",
      "type": "string"
    }
  ],
  "item": [
    {
      "name": "Health Check",
      "request": {
        "method": "GET",
        "url": "{{base_url}}/health"
      }
    },
    {
      "name": "Fibonacci",
      "request": {
        "method": "POST",
        "header": [{"key": "Content-Type", "value": "application/json"}],
        "body": {
          "mode": "raw",
          "raw": "{\"fibonacci\": 7}"
        },
        "url": "{{base_url}}/bfhl"
      }
    },
    {
      "name": "Prime",
      "request": {
        "method": "POST",
        "header": [{"key": "Content-Type", "value": "application/json"}],
        "body": {
          "mode": "raw",
          "raw": "{\"prime\": [2, 4, 7, 9, 11]}"
        },
        "url": "{{base_url}}/bfhl"
      }
    }
  ]
}
```

### Update Base URL
After deployment, update `base_url` variable to your deployed URL.

## Rate Limit Testing

```bash
# Run multiple requests quickly
for i in {1..110}; do
  curl -X POST http://localhost:3000/bfhl \
    -H "Content-Type: application/json" \
    -d '{"fibonacci": 5}'
  echo "Request $i completed"
done

# You should receive 429 error after 100 requests
```

## Performance Testing

```bash
# Using Apache Bench (install with: apt-get install apache2-utils)
ab -n 1000 -c 10 -p data.json -T application/json http://localhost:3000/bfhl

# Where data.json contains:
# {"fibonacci": 10}
```

## Testing Checklist

- [ ] Fibonacci with valid input
- [ ] Fibonacci with boundary values (0, 1, large)
- [ ] Prime with valid array
- [ ] Prime with empty result
- [ ] LCM with valid array
- [ ] HCF with valid array
- [ ] AI with valid question
- [ ] Health endpoint responds
- [ ] Multiple operations in one request (should fail)
- [ ] Invalid key (should fail)
- [ ] Empty request body (should fail)
- [ ] Invalid data types (should fail)
- [ ] Rate limiting works
- [ ] 404 for invalid endpoints
- [ ] CORS headers present
