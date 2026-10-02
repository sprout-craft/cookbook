# Sprout Craft Engineering Cookbook 🌿

> A curated collection of battle-tested engineering recipes, architectural patterns, and production guidelines.

[![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)
[![Recipes](https://img.shields.io/badge/recipes-48%20modules-10b981.svg)](#recipes-catalog)
[![Contributions Welcome](https://img.shields.io/badge/contributions-welcome-orange.svg)](#)

---

## 📚 Overview

The **Sprout Craft Cookbook** provides clear, minimal, and dependency-conscious solutions to recurring software engineering challenges. Each recipe adheres to:
- **Zero or minimal external dependencies**
- **Strict type safety and robust error handling**
- **Real-world edge case coverage**

---

## 🗂 Recipes Catalog

| ID | Category | Recipe Title | Source |
|:---|:---|:---|:---|
| #01 | `TypeScript` | **TypeScript Exhaustive Type Narrowing with assertNever** | [`01_assert_never.ts`](recipes/typescript/01_assert_never.ts) |
| #02 | `TypeScript` | **Recursive DeepPartial & DeepReadonly Types** | [`02_deep_partial.ts`](recipes/typescript/02_deep_partial.ts) |
| #03 | `TypeScript` | **Nominal / Branded Types for Domain IDs** | [`03_branded_types.ts`](recipes/typescript/03_branded_types.ts) |
| #04 | `TypeScript` | **Type-Safe Event Emitter Pattern** | [`04_typed_event_emitter.ts`](recipes/typescript/04_typed_event_emitter.ts) |
| #05 | `TypeScript` | **Functional Result<T, E> Pattern for Predictable Error Handling** | [`05_result_type.ts`](recipes/typescript/05_result_type.ts) |
| #06 | `TypeScript` | **Const Assertions & Tuple-to-Union Derivation** | [`06_tuples_to_union.ts`](recipes/typescript/06_tuples_to_union.ts) |
| #07 | `React` | **Generic React useDebounce Hook with Cancel Support** | [`07_use_debounce.ts`](recipes/react/07_use_debounce.ts) |
| #08 | `React` | **Type-Safe useLocalStorage Hook with Cross-Tab Sync** | [`08_use_local_storage.ts`](recipes/react/08_use_local_storage.ts) |
| #09 | `React` | **Viewport Visibility Hook with IntersectionObserver** | [`09_use_intersection_observer.ts`](recipes/react/09_use_intersection_observer.ts) |
| #10 | `React` | **Tracking Previous State with usePrevious Hook** | [`10_use_previous.ts`](recipes/react/10_use_previous.ts) |
| #11 | `React` | **Click Away / Outside Listener Hook** | [`11_use_click_away.ts`](recipes/react/11_use_click_away.ts) |
| #12 | `React` | **Reactive Responsive Media Query Hook** | [`12_use_media_query.ts`](recipes/react/12_use_media_query.ts) |
| #13 | `Vue 3` | **Vue 3 Composition API useClickOutside Composable** | [`13_use_click_outside.ts`](recipes/vue/13_use_click_outside.ts) |
| #14 | `Vue 3` | **Vue 3 useWindowSize Composable with Throttle** | [`14_use_window_size.ts`](recipes/vue/14_use_window_size.ts) |
| #15 | `Vue 3` | **Vue 3 useDark Theme Switcher Composable** | [`15_use_dark_mode.ts`](recipes/vue/15_use_dark_mode.ts) |
| #16 | `Vue 3` | **Vue 3 Stale-While-Revalidate useFetchCache Composable** | [`16_use_fetch_cache.ts`](recipes/vue/16_use_fetch_cache.ts) |
| #17 | `Vue 3` | **Vue 3 v-focus Custom Directive with Delay Option** | [`17_v_focus_directive.ts`](recipes/vue/17_v_focus_directive.ts) |
| #18 | `Vue 3` | **Vue 3 v-copy Clipboard Directive** | [`18_v_copy_directive.ts`](recipes/vue/18_v_copy_directive.ts) |
| #19 | `Node.js` | **Node.js Stream Pipeline with Backpressure & Error Propagation** | [`19_stream_pipeline.js`](recipes/node/19_stream_pipeline.js) |
| #20 | `Node.js` | **Production Graceful Shutdown Handler for Node.js Services** | [`20_graceful_shutdown.js`](recipes/node/20_graceful_shutdown.js) |
| #21 | `Node.js` | **Node.js Multi-Core Cluster Worker Orchestration** | [`21_cluster_worker.js`](recipes/node/21_cluster_worker.js) |
| #22 | `Node.js` | **Async Retry with Full Jitter Exponential Backoff** | [`22_retry_exponential_backoff.js`](recipes/node/22_retry_exponential_backoff.js) |
| #23 | `Node.js` | **Timing-Safe String Comparison & HMAC Token Verification** | [`23_crypto_token_hasher.js`](recipes/node/23_crypto_token_hasher.js) |
| #24 | `Node.js` | **Kubernetes Liveness & Readiness Health Check Endpoint** | [`24_health_check_endpoint.js`](recipes/node/24_health_check_endpoint.js) |
| #25 | `Python` | **Python 3.11+ Structured Concurrency with asyncio.TaskGroup** | [`25_asyncio_task_group.py`](recipes/python/25_asyncio_task_group.py) |
| #26 | `Python` | **Thread-Safe In-Memory LRU Cache with Time-to-Live (TTL)** | [`26_lru_cache_ttl.py`](recipes/python/26_lru_cache_ttl.py) |
| #27 | `Python` | **Pydantic V2 Robust Domain Model & Custom Field Validation** | [`27_pydantic_custom_validator.py`](recipes/python/27_pydantic_custom_validator.py) |
| #28 | `Python` | **Benchmark Timing Context Manager & Decorator** | [`28_context_manager_timer.py`](recipes/python/28_context_manager_timer.py) |
| #29 | `Python` | **Memory-Efficient Generator Batch Chunker** | [`29_generator_chunker.py`](recipes/python/29_generator_chunker.py) |
| #30 | `Python` | **Thread-Safe Singleton Decorator with Double-Checked Locking** | [`30_singleton_decorator.py`](recipes/python/30_singleton_decorator.py) |
| #31 | `Modern CSS` | **Responsive Fluid Typography Scale with CSS clamp()** | [`31_fluid_typography.css`](recipes/css/31_fluid_typography.css) |
| #32 | `Modern CSS` | **Clean & Opinionated Modern CSS Reset** | [`32_modern_css_reset.css`](recipes/css/32_modern_css_reset.css) |
| #33 | `Modern CSS` | **Subtle Cross-Browser Custom Scrollbar Styling** | [`33_custom_scrollbar.css`](recipes/css/33_custom_scrollbar.css) |
| #34 | `Modern CSS` | **Intrinsic Responsive Grid with CSS auto-fit & minmax** | [`34_grid_auto_fit_cards.css`](recipes/css/34_grid_auto_fit_cards.css) |
| #35 | `Modern CSS` | **CSS Custom Properties Design Tokens with prefers-color-scheme** | [`35_dark_mode_vars.css`](recipes/css/35_dark_mode_vars.css) |
| #36 | `Modern CSS` | **Zero-Layout-Shift Media Containers with CSS aspect-ratio** | [`36_aspect_ratio_media.css`](recipes/css/36_aspect_ratio_media.css) |
| #37 | `DevOps` | **Hardened Multi-Stage Dockerfile for Node.js Services** | [`37_multi_stage_node.Dockerfile`](recipes/devops/37_multi_stage_node.Dockerfile) |
| #38 | `DevOps` | **Production Nginx Config for Single Page Applications (SPA)** | [`38_nginx_spa_router.conf`](recipes/devops/38_nginx_spa_router.conf) |
| #39 | `DevOps` | **GitHub Actions CI Matrix Workflow with Caching** | [`39_github_actions_ci.yml`](recipes/devops/39_github_actions_ci.yml) |
| #40 | `DevOps` | **Local Dev Stack with PostgreSQL 16 & Redis 7 Healthchecks** | [`40_docker_compose_redis_pg.yml`](recipes/devops/40_docker_compose_redis_pg.yml) |
| #41 | `DevOps` | **Git Pre-Commit Hook to Guard Against Secret Leaks** | [`41_git_pre_commit_hook.sh`](recipes/devops/41_git_pre_commit_hook.sh) |
| #42 | `DevOps` | **Systemd Service Unit Configuration for Linux Node.js Daemons** | [`42_systemd_node_service.service`](recipes/devops/42_systemd_node_service.service) |
| #43 | `Algorithms` | **In-Memory Token Bucket Rate Limiter** | [`43_token_bucket_limiter.ts`](recipes/algorithms/43_token_bucket_limiter.ts) |
| #44 | `Algorithms` | **O(1) LRU Cache via Hash Map & Doubly Linked List** | [`44_lru_cache_doubly_linked.ts`](recipes/algorithms/44_lru_cache_doubly_linked.ts) |
