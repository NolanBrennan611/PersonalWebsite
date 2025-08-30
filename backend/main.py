from fastapi import FastAPI, WebSocket, WebSocketDisconnect
from fastapi.middleware.cors import CORSMiddleware
import logging
from ResponseDeterminer import ResponseDeterminer
from config import config
import bleach
import sys
import uvicorn

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

logger = logging.getLogger(__name__)
logger.setLevel(config.LOG_LEVEL)

stream_handler = logging.StreamHandler(sys.stdout)
log_formatter = logging.Formatter("%(asctime)s [%(processName)s: %(process)d] [%(threadName)s: %(thread)d] [%(levelname)s] %(name)s: %(message)s")
stream_handler.setFormatter(log_formatter)
logger.addHandler(stream_handler)

logger.info('API is starting up')

if config.DEV_MODE:
    logger.info(f"Running in dev mode")
else:
    logger.info(f"Running in prod mode")

@app.websocket("/ws/messages")
async def websocket_endpoint(websocket: WebSocket):
    await websocket.accept()

    try:
        while True:
            data = await websocket.receive_json()

            logger.info(f"Received message data: {data}")

            message = data.get("message", "")
            message = sanitize_message_data(message)

            message_response = ResponseDeterminer().determine_response(message)

            await websocket.send_json({ "status": "success", "message": message })

    except WebSocketDisconnect:
        logger.info("Disconnected")
    finally:

        if websocket.application_state == "connected":
            await websocket.close()
            logger.info("WebSocket instance closed")

def sanitize_message_data(message: str) -> str:
    sanitized_message = bleach.clean(message)
    sanitized_message = sanitized_message.strip().lower()
    return sanitized_message

if __name__ == "__main__":
    uvicorn.run(app, host=config.HOST, port=config.PORT)