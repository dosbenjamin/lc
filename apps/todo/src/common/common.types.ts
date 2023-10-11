import type { ErrorHttpStatusCode } from '@ts-rest/core';

type ErrorCodeList = 'Sms.CodeVerificationFailed';

type ErrorCodeDescriptor<ErrorCode extends string> = {
  code: ErrorCode;
  description: string;
};

type ErrorCodes = {
  [ErrorCode in ErrorCodeList as number]: ErrorCodeDescriptor<ErrorCode>;
};

export type ProblemDetails<Body extends Record<string, unknown>> = {
  errors?: Record<Capitalize<keyof Body & string>, string[]>;
  errorCodes?: ErrorCodes;
  status: ErrorHttpStatusCode;
  title: string;
  traceId: string;
  type: string;
};
