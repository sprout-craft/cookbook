"""
Sprout Craft Engineering Cookbook
Recipe #26: Thread-Safe In-Memory LRU Cache with TTL

Problem: functools.lru_cache has no expiration time; stale data persists indefinitely.
"""

import time
import threading
from collections import OrderedDict
from typing import Any, Callable


class TTLCache:
    def __init__(self, maxsize: int = 128, ttl_seconds: float = 300.0):
        self.maxsize = maxsize
        self.ttl = ttl_seconds
        self.cache: OrderedDict[Any, tuple[Any, float]] = OrderedDict()
        self.lock = threading.Lock()

    def get(self, key: Any) -> Any:
        with self.lock:
            if key not in self.cache:
                return None
            value, expires_at = self.cache[key]
            if time.time() > expires_at:
                del self.cache[key]
                return None
            self.cache.move_to_end(key)
            return value

    def set(self, key: Any, value: Any) -> None:
        with self.lock:
            expires_at = time.time() + self.ttl
            if key in self.cache:
                self.cache.move_to_end(key)
            self.cache[key] = (value, expires_at)
            if len(self.cache) > self.maxsize:
                self.cache.popitem(last=False)


def cached_with_ttl(maxsize: int = 128, ttl_seconds: float = 300.0) -> Callable:
    cache = TTLCache(maxsize, ttl_seconds)

    def decorator(fn: Callable) -> Callable:
        def wrapper(*args: Any, **kwargs: Any) -> Any:
            key = (args, tuple(sorted(kwargs.items())))
            hit = cache.get(key)
            if hit is not None:
                return hit
            result = fn(*args, **kwargs)
            cache.set(key, result)
            return result
        return wrapper
    return decorator
