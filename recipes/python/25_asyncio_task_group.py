"""
Sprout Craft Engineering Cookbook
Recipe #25: Structured Concurrency with asyncio.TaskGroup

Problem: asyncio.gather does not automatically cancel sibling coroutines if one raises an exception,
leaving orphan tasks running in the background.
"""

import asyncio
from typing import List, Dict, Any


async def fetch_stock_quote(symbol: str) -> Dict[str, Any]:
    await asyncio.sleep(0.1)
    if symbol == "INVALID":
        raise ValueError(f"Unknown symbol: {symbol}")
    return {"symbol": symbol, "price": 100.0}


async def fetch_all_quotes(symbols: List[str]) -> List[Dict[str, Any]]:
    results = []
    # TaskGroup guarantees: all tasks complete or are cancelled if any exception occurs
    async with asyncio.TaskGroup() as tg:
        tasks = [tg.create_task(fetch_stock_quote(s)) for s in symbols]

    for t in tasks:
        results.append(t.result())
    return results


if __name__ == "__main__":
    quotes = asyncio.run(fetch_all_quotes(["AAPL", "GOOGL", "MSFT"]))
    print("Retrieved quotes:", quotes)
