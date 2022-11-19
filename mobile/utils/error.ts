import { EndExecutionError } from "./types";
/*
asyncFunction: The function you want to execute
errorHandler: This is some sort of error handling function -- the first argument passed into
 this will always be the error message
 parameters: Additional arguments for our main function
 customErrors: An object allowing you to specify custom error messages based on the type of error
 errorFunctionParams: parameters for your error handler
*/
export const errorWrapper = async (
  /*eslint-disable */
  asyncFunction: Function,
  errorHandler: Function,
  /*eslint-enable */
  parameters?: Array<any>,
  customErrors?: Record<string, string>,
  errorFunctionParams?: Array<any>
) => {
  console.log(customErrors);
  if (!parameters) {
    parameters = [];
  }

  if (!errorFunctionParams) {
    errorFunctionParams = [];
  }

  const result = await asyncFunction(...parameters)
    .catch((e: Error) => {
      console.log(customErrors);
      if (
        customErrors &&
        Object.getOwnPropertyNames(customErrors).includes(e.name)
      ) {
        errorHandler(
          customErrors[e.name],
          ...(errorFunctionParams as Array<any>)
        );
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
