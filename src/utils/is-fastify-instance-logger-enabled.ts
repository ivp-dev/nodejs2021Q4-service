import { FastifyInstanceLoggerEnabled } from "../types";

function isFastifyInstanceLoggerEnabled(
  obj: unknown
): obj is FastifyInstanceLoggerEnabled {
  return !!(obj as FastifyInstanceLoggerEnabled).logger;
}

export default isFastifyInstanceLoggerEnabled;