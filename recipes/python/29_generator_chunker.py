"""
Sprout Craft Engineering Cookbook
Recipe #29: Memory-Efficient Generator Batch Chunker

Problem: Processing millions of database rows or lines without causing high memory consumption.
"""

from typing import Iterable, Generator, List, TypeVar
from itertools import islice

T = TypeVar("T")


def chunk_iterable(iterable: Iterable[T], chunk_size: int) -> Generator[List[T], None, None]:
    if chunk_size <= 0:
        raise ValueError("chunk_size must be greater than zero")

    iterator = iter(iterable)
    while True:
        batch = list(islice(iterator, chunk_size))
        if not batch:
            break
        yield batch


# --- Usage Example ---
# for batch in chunk_iterable(range(100), 20):
#     bulk_insert(batch)
