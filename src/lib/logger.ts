/**
 * Centralized logging and error tracking utility
 * Provides structured logging for debugging and monitoring
 */

interface LogContext {
  path?: string;
  method?: string;
  userId?: string;
  sessionId?: string;
  duration?: number;
}

type LogLevel = 'info' | 'warn' | 'error' | 'debug';

class Logger {
  private isDevelopment = process.env.NODE_ENV === 'development';

  /**
   * Log an informational message
   */
  info(message: string, context?: LogContext) {
    this.log('info', message, context);
  }

  /**
   * Log a warning message
   */
  warn(message: string, context?: LogContext) {
    this.log('warn', message, context);
  }

  /**
   * Log an error message
   */
  error(message: string, error?: Error | unknown, context?: LogContext) {
    const errorMessage = error instanceof Error ? error.message : String(error ?? '');
    const stack = error instanceof Error ? error.stack : undefined;
    
    this.log('error', message, context, errorMessage, stack);
  }

  /**
   * Log a debug message (only in development)
   */
  debug(message: string, context?: LogContext, data?: any) {
    if (this.isDevelopment) {
      this.log('debug', message, context);
      if (data) {
        console.debug('[DEBUG]', data);
      }
    }
  }

  /**
   * Log API request
   */
  logRequest(method: string, path: string, userId?: string, sessionId?: string) {
    const timestamp = new Date().toISOString();
    const userInfo = userId ? `user: ${userId}` : sessionId ? `session: ${sessionId}` : 'anonymous';
    
    console.log(`[${timestamp}] ${method} ${path} (${userInfo})`);
  }

  /**
   * Log API response
   */
  logResponse(method: string, path: string, status: number, duration: number) {
    const timestamp = new Date().toISOString();
    const statusColor = status >= 400 ? '❌' : status >= 300 ? '⚠️' : '✅';
    
    console.log(`[${timestamp}] ${statusColor} ${method} ${path} ${status} (${duration}ms)`);
  }

  /**
   * Track and log API error with context
   */
  trackApiError(
    method: string,
    path: string,
    error: unknown,
    statusCode: number = 500,
    context?: LogContext
  ) {
    const errorMessage = error instanceof Error ? error.message : String(error ?? '');
    const stack = error instanceof Error ? error.stack : undefined;
    
    const timestamp = new Date().toISOString();
    console.error(
      `[${timestamp}] API Error: ${method} ${path} - ${statusCode}`,
      {
        message: errorMessage,
        ...(stack && { stack }),
        ...context,
      }
    );
  }

  /**
   * Monitor cart operations
   */
  logCartOperation(operation: 'add' | 'update' | 'remove' | 'fetch', userId?: string, sessionId?: string) {
    const timestamp = new Date().toISOString();
    const userInfo = userId ? `user: ${userId}` : sessionId ? `session: ${sessionId}` : 'anonymous';
    
    console.log(`[${timestamp}] [CART] ${operation.toUpperCase()} (${userInfo})`);
  }

  /**
   * Monitor authentication events
   */
  logAuthEvent(event: 'signin' | 'signout' | 'signup', email: string, success: boolean) {
    const timestamp = new Date().toISOString();
    const status = success ? '✅' : '❌';
    
    console.log(`[${timestamp}] [AUTH] ${status} ${event.toUpperCase()} - ${email}`);
  }

  /**
   * Monitor payment events
   */
  logPaymentEvent(event: 'intent_created' | 'succeeded' | 'failed', orderId: string, amount?: number) {
    const timestamp = new Date().toISOString();
    const statusIcon = event === 'failed' ? '❌' : '✅';
    
    console.log(
      `[${timestamp}] [PAYMENT] ${statusIcon} ${event.toUpperCase()} - Order: ${orderId}${
        amount ? ` Amount: $${(amount / 100).toFixed(2)}` : ''
      }`
    );
  }

  /**
   * Internal logging method
   */
  private log(
    level: LogLevel,
    message: string,
    context?: LogContext,
    errorMessage?: string,
    stack?: string
  ) {
    const timestamp = new Date().toISOString();
    const levelUpper = level.toUpperCase();
    const contextStr = context ? ` ${JSON.stringify(context)}` : '';
    const errorStr = errorMessage ? ` - Error: ${errorMessage}` : '';

    const logMessage = `[${timestamp}] [${levelUpper}] ${message}${errorStr}${contextStr}`;

    switch (level) {
      case 'error':
        console.error(logMessage);
        if (stack && this.isDevelopment) {
          console.error(stack);
        }
        break;
      case 'warn':
        console.warn(logMessage);
        break;
      case 'debug':
        if (this.isDevelopment) {
          console.debug(logMessage);
        }
        break;
      case 'info':
      default:
        console.log(logMessage);
    }
  }
}

// Export singleton instance
export const logger = new Logger();

/**
 * Measure execution time of async operations
 */
export async function measureTime<T>(
  operation: () => Promise<T>,
  label: string
): Promise<{ result: T; duration: number }> {
  const startTime = performance.now();
  try {
    const result = await operation();
    const duration = Math.round(performance.now() - startTime);
    logger.debug(`${label} completed in ${duration}ms`);
    return { result, duration };
  } catch (error) {
    const duration = Math.round(performance.now() - startTime);
    logger.error(`${label} failed after ${duration}ms`, error);
    throw error;
  }
}
