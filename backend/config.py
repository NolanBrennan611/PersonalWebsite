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

    FRONTEND_ORIGIN = os.getenv("FRONTEND_ORIGIN")

    ANTHROPIC_API_KEY = os.getenv("ANTHROPIC_API_KEY")

    VOYAGE_API_KEY = os.getenv("VOYAGE_API_KEY")

    LOG_LEVEL = logging.DEBUG if DEV_MODE else logging.INFO

config = Config()
