import { FastifyInstanceLoggerEnabled } from "../types";

/**
 * Check if logger enable
 * @param obj - object to varify
 * @returns True if logger enable
 */
function isFastifyInstanceLoggerEnabled(
  obj: unknown
): obj is FastifyInstanceLoggerEnabled {
  return !!(obj as FastifyInstanceLoggerEnabled).logger;
}

export default isFastifyInstanceLoggerEnabled;