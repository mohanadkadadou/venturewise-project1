#!/bin/bash
set -e
PORT=${PORT:-8080}
PYTHON_LIBS="/home/runner/workspace/.pythonlibs"
export PATH="$PYTHON_LIBS/bin:$PATH"
export PYTHONPATH="$PYTHON_LIBS/lib/python3.11/site-packages:$PYTHONPATH"
cd /home/runner/workspace/artifacts/api-server
exec uvicorn main:app --host 0.0.0.0 --port "$PORT" --reload
