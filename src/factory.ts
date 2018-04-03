import { Request, Response, NextFunction, RequestHandler } from 'express'

/**
 * The callback to provide a method to handle requests.
 */
export type RequestHandlerSelector<T> = (controller: T) => RequestHandler

/**
 * Base class for controllers factory.
 */
export abstract class Factory {
  /**
   * Get a request handler for passing to Express.
   *
   * @param selector A call back to provide a method to handler requests.
   */
  public requestHandler<T>(selector: RequestHandlerSelector<T>): RequestHandler {
    return (req, res, next) => this.executeRequestHandler(selector, req, res, next)
  }

  /**
   * Create a new controller to handle request.
   */
  protected abstract createController<T>(): T;

  private executeRequestHandler<T>(
    selector: RequestHandlerSelector<T>,
    req: Request,
    res: Response,
    next: NextFunction): any {
    let controller = this.createController<T>();
    let handler = selector(controller)
    return handler(req, res, next)
  }
}
