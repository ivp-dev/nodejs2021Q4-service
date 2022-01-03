import { FastifyInstanceLoggerEnable } from "../types";

/**
 * Check if logger enable
 * @param obj - object to varify
 * @returns True if logger enable
 */
function isLoggerEnable(
  obj: unknown
): obj is FastifyInstanceLoggerEnable {
  return !!(obj as FastifyInstanceLoggerEnable).logger;
}

export default isLoggerEnable;