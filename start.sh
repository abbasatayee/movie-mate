#!/bin/bash

set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
PROJECT_ROOT="${SCRIPT_DIR}"

DATASET_NAME="${1:-abbasataiede/movielens-32m}"
TARGET_PATH="${2:-${PROJECT_ROOT}/data/mv-lens-32m}"

echo "Downloading dataset '${DATASET_NAME}' into '${TARGET_PATH}'..."

PYTHON_BIN="${PYTHON_BIN:-python3}"

MM_DATASET_NAME="${DATASET_NAME}" \
MM_TARGET_PATH="${TARGET_PATH}" \
PYTHONPATH="${PROJECT_ROOT}" \
"${PYTHON_BIN}" - <<'PYCODE'
import os
import sys

dataset = os.environ.get("MM_DATASET_NAME")
target_path = os.environ.get("MM_TARGET_PATH")

if not dataset or not target_path:
    sys.exit("Missing dataset or target path information.")

from src.utils.preprocessor import download_dataset_from_kaggle

download_dataset_from_kaggle(dataset, os.path.abspath(target_path))
PYCODE
