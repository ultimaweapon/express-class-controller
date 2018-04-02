import { Request, Response, NextFunction, RequestHandler } from 'express'

export type ActionProvider<T> = (controller: T) => RequestHandler

export abstract class Factory {
  public resolve<T>(action: ActionProvider<T>): RequestHandler {
    return (req, res, next) => this.executeAction(action, req, res, next)
  }

  protected abstract createController<T>(): T;

  private executeAction<T>(action: ActionProvider<T>, req: Request, res: Response, next: NextFunction): any {
    let controller = this.createController<T>();
    let handler = action(controller)

    return handler(req, res, next)
  }
}
