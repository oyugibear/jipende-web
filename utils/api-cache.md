# API Caching Documentation

## Overview

The API utility now includes automatic caching functionality to reduce redundant network requests and improve performance. The cache has a **1-minute TTL (Time To Live)** to balance between performance and data freshness.

## Features

### 1. Automatic Caching

- **GET requests** are automatically cached
- Cache entries expire after **1 minute**
- **POST/PUT/DELETE** operations automatically invalidate related cache entries
- Memory management with periodic cleanup

### 2. Cache Invalidation

- When data is modified (POST/PUT/DELETE), related cache entries are automatically cleared
- Smart invalidation based on resource type (e.g., modifying a user clears all user-related cache)

### 3. Cache Bypass

All GET methods now accept an optional `bypassCache` parameter:

```javascript
// Use cache (default)
const users = await userAPI.getAll();

// Bypass cache for fresh data
const users = await userAPI.getAll(true);

// Or for specific user
const user = await userAPI.getById(userId, true);
```

## Usage Examples

### Basic Usage (Cached by default)

```javascript
// First call - fetches from server and caches
const users = await userAPI.getAll();

// Second call within 1 minute - returns cached data
const usersAgain = await userAPI.getAll();
```

### Bypassing Cache

```javascript
// Force fresh data from server
const freshUsers = await userAPI.getAll(true);
const freshUser = await userAPI.getById(userId, true);
```

### Manual Cache Management

```javascript
import { cacheUtils } from "@/utils/api";

// Clear entire cache
cacheUtils.clear();

// Invalidate specific pattern
cacheUtils.invalidate("/users");

// Get cache info
console.log("Cache size:", cacheUtils.getSize());
console.log("Cache keys:", cacheUtils.getKeys());
```

## API Methods Updated

All GET methods now support cache bypass:

- `userAPI.getAll(bypassCache)`
- `userAPI.getById(id, bypassCache)`
- `bookingAPI.getAll(bypassCache)`
- `bookingAPI.getById(id, token, bypassCache)`
- `serviceAPI.getAll(bypassCache)`
- `paymentAPI.getAll(bypassCache)`
- `api.get(endpoint, bypassCache)`

## Cache Behavior

### Cached Operations

- ✅ GET requests (with 1-minute TTL)
- ✅ Automatic invalidation on data modification

### Not Cached

- ❌ POST requests
- ❌ PUT requests
- ❌ DELETE requests
- ❌ Requests with `bypassCache: true`

### Cache Keys

Cache keys are generated based on:

- HTTP method
- Endpoint URL
- Authorization headers

### Memory Management

- Automatic cleanup of expired entries every minute
- Cache entries include timestamp for TTL validation
- Failed or expired entries are automatically removed

## Benefits

1. **Reduced Network Traffic**: Eliminates redundant API calls
2. **Faster UI Response**: Cached data loads instantly
3. **Reduced Server Load**: Fewer requests to the backend
4. **Better UX**: Smoother navigation and data loading
5. **Automatic**: Works transparently without code changes

## Considerations

- Cache is stored in memory and cleared on page refresh
- 1-minute TTL ensures data stays reasonably fresh
- Large datasets may consume memory (consider implementing size limits if needed)
- Cache invalidation is automatic but can be manually managed if needed

## Troubleshooting

### Getting Stale Data

If you need the absolute latest data:

```javascript
const freshData = await userAPI.getAll(true);
```

### Clearing Cache

If experiencing issues:

```javascript
cacheUtils.clear();
```

### Debug Cache

Check what's cached:

```javascript
console.log("Cached keys:", cacheUtils.getKeys());
console.log("Cache size:", cacheUtils.getSize());
```
