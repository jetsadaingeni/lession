import express, { Application, NextFunction, Request, Response } from 'express';
import dotenv from 'dotenv';
import * as Sentry from '@sentry/node';
import * as Tracing from '@sentry/tracing';
import { awilixSetUp } from './awilixSetup';
import { db } from './connection';
dotenv.config();
awilixSetUp();
//Migrate Database
db.migrate.latest();
const port = process.env.PORT || 4000;
const app: Application = express();
if (process.env.NODE_ENV === 'production') {
  Sentry.init({
    dsn: process.env.SENTRY_DSN,
    integrations: [
      // enable HTTP calls tracing
      new Sentry.Integrations.Http({ tracing: true }),
      // enable Express.js middleware tracing
      new Tracing.Integrations.Express({ app }),
    ],
    tracesSampleRate: 1.0,
    debug: true,
  });
  // RequestHandler creates a separate execution context using domains, so that every
  // transaction/span/breadcrumb is attached to its own Hub instance
  app.use(Sentry.Handlers.requestHandler());
  // TracingHandler creates a trace for every incoming request
  app.use(Sentry.Handlers.tracingHandler());
  // The error handler must be before any other error middleware and after all controllers
  app.use(
    Sentry.Handlers.errorHandler({
      shouldHandleError(error) {
        // Capture all 404 and 500 errors
        if (error.status === 404 || error.status === 500) {
          return true;
        }
        return false;
      },
    })
  );
  // Optional fallthrough error handler
  app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    res.status(500).send(err);
  });
  app.get('/test-sentry', (req: Request, res: Response) => {
    try {
      console.error('test');
      throw new Error('Test Sentry error!');
    } catch (err) {
      Sentry.captureException(err);
    }
  });
}

app.listen(port, () => {
  console.log(`Express server has started on port ${port}`);
});
import routes from './routes';
import { SetIp } from './middlewares/setHeader';
import RequestLogs from './middlewares/logs';
import swaggerUi from 'swagger-ui-express';
import swaggerFile from './swagger/swagger-output.json';
app.use('/doc', swaggerUi.serve, swaggerUi.setup(swaggerFile));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(SetIp);
app.use(RequestLogs);
app.use('/', routes);
