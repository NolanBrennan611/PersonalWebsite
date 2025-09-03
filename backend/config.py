from dotenv import load_dotenv
import os
import logging

load_dotenv()

class Config:

    DEV_MODE = True
    USE_CACHING = True
    MAX_CONNECTIONS = 10

    HOST = os.getenv("HOST")
    PORT = int(os.getenv("PORT"))

    CLAUDE_SERVER = os.getenv("CLAUDE_SERVER")

    FRONTEND_ORIGIN = os.getenv("FRONTEND_ORIGIN")

    LOG_LEVEL = logging.DEBUG if DEV_MODE else logging.INFO

config = Config()
