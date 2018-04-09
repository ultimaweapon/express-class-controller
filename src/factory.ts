import { Request, Response, NextFunction, RequestHandler, ErrorRequestHandler } from 'express'

/**
 * Represents a callback to provide a method to handle requests.
 */
export type RequestHandlerSelector<T> = (controller: T) => RequestHandler

/**
 * Represents a callback to provide a method to handle errors.
 */
export type ErrorHandlerSelector<T> = (controller: T) => ErrorRequestHandler

/**
 * Base class for controller factory.
 */
export abstract class Factory {
  /**
   * Get a request handler.
   *
   * @param controller identifier of a controller to handle requests.
   * @param selector callback to provide a method to handle requests.
   */
  public requestHandler<T>(
    controller: symbol | string | { new(...args: any[]): T },
    selector: RequestHandlerSelector<T>
  ): RequestHandler {
    return (req, res, next) => {
      let instance = this.createController<T>(controller)
      let handler = selector(instance)
      return handler.bind(instance)(req, res, next)
    }
  }

  /**
   * Get an error handler.
   *
   * @param controller identifier of a controller to handle requests.
   * @param selector callback to provide a method to handle requests.
   */
  public errorHandler<T>(
    controller: symbol | string | { new(...args: any[]): T },
    selector: ErrorHandlerSelector<T>
  ): ErrorRequestHandler {
    return (err, req, res, next) => {
      let instance = this.createController<T>(controller)
      let handler = selector(instance)
      return handler.bind(instance)(err, req, res, next)
    }
  }

  /**
   * Create a new controller to handle request.
   *
   * @param id controller identifier.
   */
  protected abstract createController<T>(id: symbol | string | { new(...args: any[]): T }): T;
}
