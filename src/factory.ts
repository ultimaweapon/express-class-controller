import { Request, Response, NextFunction, RequestHandler } from 'express'

/**
 * Represents any class constructor.
 */
export interface Constructor<T> {
  new(...args: any[]): T
}

/**
 * Represents the callback to provide a method to handle requests.
 */
export type RequestHandlerSelector<T> = (controller: T) => RequestHandler

/**
 * Base class for controller factory.
 */
export abstract class Factory {
  /**
   * Get a request handler.
   *
   * @param controller identifier for the controller to handle requests.
   * @param selector callback to provide a method to handle requests.
   */
  public requestHandler<T>(
    controller: Symbol | string | Constructor<T>,
    selector: RequestHandlerSelector<T>): RequestHandler {
    return (req, res, next) => {
      let instance = this.createController<T>(controller);
      let handler = selector(instance)
      return handler.bind(instance)(req, res, next)
    }
  }

  /**
   * Create a new controller to handle request.
   *
   * @param id controller identifier.
   */
  protected abstract createController<T>(id: Symbol | string | Constructor<T>): T;
}
