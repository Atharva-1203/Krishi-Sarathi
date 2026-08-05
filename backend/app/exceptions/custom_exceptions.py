class ModelNotLoadedException(Exception):
    def __init__(self, message="Machine learning model is not loaded in memory."):
        self.message = message
        super().__init__(self.message)

class InvalidInputException(Exception):
    def __init__(self, message, details=None):
        self.message = message
        self.details = details or []
        super().__init__(self.message)
