"""
Sprout Craft Engineering Cookbook
Recipe #28: Benchmark Timing Context Manager & Decorator

Problem: Measuring and logging critical function durations without polluting business logic.
"""

import time
import logging
from contextlib import contextmanager
from typing import Generator

logger = logging.getLogger("perf")


@contextmanager
def execution_timer(operation_name: str) -> Generator[None, None, None]:
    start_time = time.perf_counter()
    try:
        yield
    finally:
        elapsed_ms = (time.perf_counter() - start_time) * 1000
        logger.info(f"[{operation_name}] elapsed: {elapsed_ms:.2f}ms")


# --- Usage Example ---
# with execution_timer("Database Migration"):
#     migrate()
