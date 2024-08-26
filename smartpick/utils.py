# smartpick/utils.py

from .feedback_processing.processing import process_chunk

def get_or_process_reviews(category):
    # Используем заглушку для обработки данных
    dummy_df = None  # Поскольку это заглушка, передаем None
    processed_data = process_chunk(dummy_df)
    return processed_data
