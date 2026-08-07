"""Conftest hook to inject repository root into python path for V3 tests."""

import os
import sys

# Dynamically inject repository root
_v3_tests_dir = os.path.dirname(os.path.abspath(__file__)) # .../tests/v3
_tests_dir = os.path.dirname(_v3_tests_dir)                # .../tests
_repo_root = os.path.dirname(_tests_dir)                  # repo root
if _repo_root not in sys.path:
    sys.path.insert(0, _repo_root)
