import logging
import anthropic
from config import config
from langchain_voyageai import VoyageAIEmbeddings
from langchain_community.vectorstores import FAISS
from langchain.text_splitter import RecursiveCharacterTextSplitter

logger = logging.getLogger(__name__)

def build_vectorstore():
    with open("knowledge.txt", "r", encoding="utf-8") as f:
        content = f.read()

    splitter = RecursiveCharacterTextSplitter(chunk_size=400, chunk_overlap=50)
    chunks = splitter.split_text(content)

    embeddings = VoyageAIEmbeddings(
        voyage_api_key=config.VOYAGE_API_KEY,
        model="voyage-3.5-lite"
    )

    return FAISS.from_texts(chunks, embeddings)

vectorstore = build_vectorstore()

class ResponseDeterminer:
    def determine_response(self, message: str) -> dict:
        try:
            docs = vectorstore.similarity_search(message, k=3)
            context = "\n\n".join([d.page_content for d in docs])

            client = anthropic.Anthropic(api_key=config.ANTHROPIC_API_KEY)

            response = client.messages.create(
                model="claude-3-5-sonnet-latest",
                max_tokens=1000,
                temperature=0,
                system="You are a helpful assistant. "
                       "Use ONLY the provided context to answer. "
                       "Keep responses concise and under 2-3 sentences. "
                       "If the context doesn't contain relevant information, say so clearly. "
                       "If the user engages in chit-chat, tell them that you can answer questions about Nolan. "
                       "Answer as if you know all of the information by heart, "
                       "do it naturally without using any of the following phrases: - According to the context - Based on the provided information - The context states that"
                       "Nolan is no longer a student or working at any of the places you will talk about.",
                messages=[
                    {
                        "role": "user",
                        "content": [
                            {
                                "type": "text",
                                "text": f"Context:\n{context}\n\nQuestion: {message}"
                            }
                        ]
                    }
                ]
            )

            return {
                "content": response.content[0].text,
                "status": "success",
                # "sources": [{"content": d.page_content[:100] + "..."} for d in docs]
            }

        except Exception as e:
            logger.error(f"Error in Claude response: {str(e)}")
            return {
                "content": "Sorry, I encountered an error processing your request.",
                "status": "error"
            }
