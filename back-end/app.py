from fastapi import FastAPI, HTTPException, Request
from fastapi.middleware.cors import CORSMiddleware
from typing import Optional
from datetime import datetime, timedelta
from collections import deque

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class Throttler:
    def __init__(self, max_requests_per_minute: int):
        self.max_requests = max_requests_per_minute
        self.timestamps = deque()

    def add_request(self):
        current_time = datetime.now()
        self.timestamps.append(current_time)

    def refresh(self):
        current_time = datetime.now()
        while self.timestamps and (current_time - self.timestamps[0] > timedelta(minutes=1)):
            self.timestamps.popleft()

    def is_allowed(self):
        return len(self.timestamps) < self.max_requests

throttler = Throttler(10)  # Default value

@app.post("/echo")
async def echo(request: Request):
    print ("echo")
    throttler.refresh()
    if not throttler.is_allowed():
        raise HTTPException(status_code=429, detail="Too many requests.")
    
    throttler.add_request()
    body = await request.body()
    return body

@app.get("/rate")
def get_rate():
    return {"max_requests_per_minute": throttler.max_requests}

@app.post("/rate")
def set_rate(value: int):
    throttler.max_requests = value
    return {"max_requests_per_minute": value}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=5000)
