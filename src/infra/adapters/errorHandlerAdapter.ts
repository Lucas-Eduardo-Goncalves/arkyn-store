import { errorHandler } from "@arkyn/server";

class ErrorHandlerAdapter {
  static handle(error: any) {
    return errorHandler(error);
  }
}

export { ErrorHandlerAdapter };
