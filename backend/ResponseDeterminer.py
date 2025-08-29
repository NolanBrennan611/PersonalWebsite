import requests
from config import config
import logging

logger = logging.getLogger(__name__)

class ResponseDeterminer:
    def determine_response(self, message: str) -> dict:
        try:

            json = {
                "sender": "user",
                "message": message,
            }

            claude_response = requests.post(
                config.CLAUDE_SERVER,
                json=json,
                timeout=30
            )

            claude_response.raise_for_status()
            claude_response_data = claude_response.json()

            return {
                "content": claude_response_data[0]['text'],
                "status": "success"
            }

        except Exception as e:
            logger.error(f"Error in Claude response: {str(e)}")
            return {
                "content": "",
                "status": "error"
            }
