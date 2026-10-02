"""
Sprout Craft Engineering Cookbook
Recipe #30: Thread-Safe Singleton Decorator with Double-Checked Locking

Problem: Standard singletons can instantiate multiple instances if called concurrently during initialization.
"""

import threading
from typing import Type, Any, Dict


def singleton(cls: Type[Any]) -> Type[Any]:
    instances: Dict[Type[Any], Any] = {}
    lock = threading.Lock()

    def get_instance(*args: Any, **kwargs: Any) -> Any:
        if cls not in instances:
            with lock:
                if cls not in instances:
                    instances[cls] = cls(*args, **kwargs)
        return instances[cls]

    return get_instance  # type: ignore
