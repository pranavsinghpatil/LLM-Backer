from dotenv import load_dotenv
from pydantic_settings import BaseSettings, SettingsConfigDict

# Load environment variables from .env file
load_dotenv()

class Settings(BaseSettings):
    """
    Why use Pydantic for settings?
    - Type Safety: It ensures keys are strings.
    - Validation: It can check if required variables are missing.
    """
    GROQ_API_KEY: str
    SUPABASE_URL: str
    SUPABASE_KEY: str
    DEBUG: bool = True

    model_config = SettingsConfigDict(env_file=".env", extra="ignore")

# Create a singleton instance
settings = Settings()
