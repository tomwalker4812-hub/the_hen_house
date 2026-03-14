# Middleware & Logging Documentation

## Overview

This project includes comprehensive middleware and logging infrastructure to handle session management for anonymous users and provide request tracking/error monitoring.

## Middleware (`src/middleware.ts`)

### Features

1. **Session ID Management for Anonymous Users**
   - Automatically generates and manages sessionId cookies for cart operations
   - Allows anonymous users to maintain a shopping cart without authentication
   - Uses HTTP-only cookies for security
   - 7-day expiration time

2. **Request Logging**
   - Logs all cart-related API requests with timestamps
   - Tracks which cart operations are being performed
   - Distinguishes between authenticated and anonymous users

3. **Request Monitoring**
   - Adds request timing headers to API responses
   - Helps track performance metrics

### How It Works

The middleware intercepts requests to:
- `/api/cart` - Shopping cart endpoints
- `/cart/*` - Cart page routes
- `/api/auth/*` - Authentication endpoints
- `/api/products/*` - Product endpoints
- `/checkout/*` - Checkout flow

For authenticated users:
- The middleware reads the NextAuth token
- Continues the request normally

For anonymous users accessing cart endpoints:
- Checks for existing `sessionId` cookie
- If none exists, generates a new unique sessionId
- Sets it as an HTTP-only, secure cookie
- Logs the session creation

### Environment Requirements

The middleware requires:
```
NEXTAUTH_SECRET=your-secret-key
NODE_ENV=development|production
```

## Logger (`src/lib/logger.ts`)

### Features

Centralized logging with specialized methods for different operation types:

#### General Logging
```typescript
logger.info(message, context);     // Info level
logger.warn(message, context);     // Warning level
logger.error(message, error, context);  // Error level
logger.debug(message, context, data);   // Debug level (dev only)
```

#### Request/Response Logging
```typescript
logger.logRequest(method, path, userId, sessionId);
logger.logResponse(method, path, status, duration);
logger.trackApiError(method, path, error, statusCode, context);
```

#### Domain-Specific Logging
```typescript
logger.logCartOperation(operation, userId, sessionId);        // 'add' | 'update' | 'remove' | 'fetch'
logger.logAuthEvent(event, email, success);                  // 'signin' | 'signout' | 'signup'
logger.logPaymentEvent(event, orderId, amount);              // 'intent_created' | 'succeeded' | 'failed'
```

### Log Format

All logs include timestamps in ISO 8601 format:
```
[2026-03-13T10:30:45.123Z] [INFO] User logged in successfully
[2026-03-13T10:30:46.456Z] [CART] add (user: 507f1f77bcf86cd799439011)
[2026-03-13T10:30:47.789Z] [PAYMENT] ✅ succeeded - Order: 507f1f77bcf86cd799439012 Amount: $99.99
```

### Development vs Production

- **Development**: Full debug logging, stack traces displayed
- **Production**: Minimal logging, no sensitive information, stack traces hidden

## Usage Examples

### In API Routes

```typescript
import { logger } from '@/lib/logger';

export async function POST(request: NextRequest) {
  const session = await getServerSession(authOptions);
  const sessionId = request.cookies.get('sessionId')?.value;
  
  try {
    // Log the operation
    logger.logCartOperation('add', session?.user?.id, sessionId);
    
    // Your operation code...
    
  } catch (error) {
    // Log the error with context
    logger.trackApiError('POST', '/api/cart', error, 500);
    return NextResponse.json({ error: 'Failed to add item' }, { status: 500 });
  }
}
```

### In Page Components

```typescript
import { logger } from '@/lib/logger';

const handleSignin = async (email: string, password: string) => {
  try {
    const result = await signIn('credentials', { email, password, redirect: false });
    logger.logAuthEvent('signin', email, !!result?.ok);
  } catch (error) {
    logger.error('Sign in failed', error);
  }
};
```

## Monitoring & Analytics

### What Gets Logged

1. **Cart Operations**
   - Add item
   - Update quantity
   - Remove item
   - Fetch cart

2. **Authentication Events**
   - Sign up
   - Sign in
   - Sign out

3. **Payment Events**
   - Payment intent created
   - Payment succeeded
   - Payment failed

4. **API Errors**
   - Route
   - Method
   - Error message
   - Stack trace (dev only)

### Log Output Examples

**Cart Operation:**
```
[2026-03-13T10:30:45.123Z] [CART] add (session: abc123def456)
```

**Auth Event:**
```
[2026-03-13T10:30:50.456Z] [AUTH] ✅ SIGNUP - user@example.com
```

**Payment Event:**
```
[2026-03-13T10:31:00.789Z] [PAYMENT] ✅ SUCCEEDED - Order: 507f1f77<...> Amount: $99.99
```

**API Error:**
```
[2026-03-13T10:31:05.000Z] API Error: GET /api/cart - 500
{
  "message": "Cart not found",
  "userId": "507f1f77bcf86cd799439011"
}
```

## Best Practices

1. **Always log operation context**
   - Include userId or sessionId
   - Add relevant identifiers

2. **Use appropriate log levels**
   - `info` for normal operations
   - `warn` for unexpected but handled situations
   - `error` for failures
   - `debug` only for development

3. **Include meaningful messages**
   - "Payment succeeded" is better than "Success"
   - Include order/user identifiers when relevant

4. **Handle sensitive data carefully**
   - Never log passwords
   - Don't log full credit card numbers
   - Be cautious with personal information

## Future Enhancements

- Export logs to external service (e.g., Sentry, LogRocket)
- Add performance metrics tracking
- Create admin dashboard for log viewing
- Implement log rotation for long-term storage
- Add rate limiting based on logs
