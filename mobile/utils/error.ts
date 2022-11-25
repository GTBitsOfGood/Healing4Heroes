import { EndExecutionError } from "./types";
/*
functionToExecute: The function you want to execute
errorHandler: This is some sort of error handling function -- the first argument passed into
 this will always be the error message

 parameters: Additional arguments for our main function

 customErrors: An object allowing you to specify custom error messages based on the original 
 error message

 errorFunctionParams: parameters for your error handler
*/
export const errorWrapper = async (
  /*eslint-disable */
  functionToExecute: Function,
  errorHandler: Function,
  /*eslint-enable */
  parameters?: Array<any>,
  customErrors?: Record<string, string>,
  errorFunctionParams?: Array<any>
) => {
  if (!parameters) {
    parameters = [];
  }

  if (!errorFunctionParams) {
    errorFunctionParams = [];
  }

  const result = await functionToExecute(...parameters)
    .catch((e: Error) => {
      if (customErrors) {
        if (Object.getOwnPropertyNames(customErrors).includes(e.message)) {
          errorHandler(
            customErrors[e.message],
            ...(errorFunctionParams as Array<any>)
          );
        } else if (
          Object.getOwnPropertyNames(customErrors).includes("default")
        ) {
          errorHandler(
            customErrors["default"],
            ...(errorFunctionParams as Array<any>)
          );
        }
        throw new EndExecutionError("");
      }
      errorHandler(
        (e as Error).message,
        ...(errorFunctionParams as Array<any>)
      );
      throw new EndExecutionError("");
    })
    .then((result: any) => {
      return result;
    });

  return result;
};

export const endOfExecutionHandler = (e: Error) => {
  if (e instanceof EndExecutionError) {
    return;
  }

  throw e;
};
