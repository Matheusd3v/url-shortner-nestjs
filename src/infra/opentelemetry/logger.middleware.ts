import { Injectable, NestMiddleware } from '@nestjs/common';
import { trace, Span } from '@opentelemetry/api';
import * as crypto from 'crypto';
import { NextFunction, Request, Response } from 'express';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
    use(req: Request, res: Response, next: NextFunction) {
        const requestId = crypto.randomUUID();
        req['requestId'] = requestId;

        const tracer = trace.getTracer('global-middleware');

        tracer.startActiveSpan('global-middleware-request', (span: Span) => {
            try {
                span.addEvent('invoking middleware()');
                span.setAttribute('requestId', requestId);
                span.setAttribute('method', req.method);
                span.setAttribute('url', req.url);
                span.setAttribute(
                    'headers',
                    safeJson(sanitizeHeaders(req?.headers)),
                );
                span.setAttribute(
                    'body',
                    safeJson(sanitizeBody(req?.body || {})),
                );
                span.setAttribute('query', safeJson(req?.query));
                span.setAttribute('params', safeJson(req?.params));
            } catch (err) {
                span.setAttribute('middleware.error', (err as Error).message);
            } finally {
                span.end();
                next();
            }
        });
    }
}

function safeJson(obj: any): string {
    try {
        return JSON.stringify(obj);
    } catch {
        return '[Unserializable]';
    }
}

function sanitizeHeaders(headers: Record<string, any>): Record<string, any> {
    const redacted = { ...headers };
    if (redacted?.authorization) redacted.authorization = '[REDACTED]';
    if (redacted?.cookie) redacted.cookie = '[REDACTED]';
    return redacted;
}

function sanitizeBody(body: Record<string, any>): Record<string, any> {
    const redacted = { ...body };
    for (const key of Object.keys(redacted)) {
        if (
            ['password', 'senha', 'token', 'accessToken'].includes(
                key.toLowerCase(),
            )
        ) {
            redacted[key] = '[REDACTED]';
        }
    }
    return redacted;
}
