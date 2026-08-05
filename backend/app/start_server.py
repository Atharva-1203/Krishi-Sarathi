import os
import sys

# Dynamically inject repository root into python search path
_current_dir = os.path.dirname(os.path.abspath(__file__)) # .../backend/app
_backend_dir = os.path.dirname(_current_dir)             # .../backend
_repo_root = os.path.dirname(_backend_dir)                # repo root
if _repo_root not in sys.path:
    sys.path.insert(0, _repo_root)

import uvicorn

if __name__ == "__main__":
    # Safely convert PORT env variable to integer, defaulting to 8000
    port = int(os.environ.get("PORT", 8000))
    print(f"Launching Krishi Sarathi server on host 0.0.0.0 and port {port}...")
    uvicorn.run("backend.app.main:app", host="0.0.0.0", port=port, reload=False)
