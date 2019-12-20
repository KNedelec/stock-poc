import _ from 'lodash';
import { createSelectorCreator } from 'reselect';

const defaultEquality = (a, b) => a === b;

/**
 * custom memoization function that check reference equality of args and deep
 * equality of results. Useful to avoid cascading updates when the root list
 * is changed every second.
 */
export function memoizeResult(func,
  resultCheck = defaultEquality,
  argsCheck = defaultEquality) {
  let lastArgs = null;
  let lastResult = null;
  return (...args) => {
    if (lastArgs !== null &&
      lastArgs.length === args.length &&
      args.every((value, index) => argsCheck(value, lastArgs[index]))) {
      return lastResult;
    }
    lastArgs = args;
    let result = func(...args);
    return resultCheck(lastResult, result) ? lastResult : (lastResult = result);
  }
}

/**
 * custom selector creator that check reference equality of args and deep
 * equality of results. Useful to avoid cascading updates when the root list
 * is changed every second.
 */
export const createResultMemoizedSelector = createSelectorCreator(
  memoizeResult,
  (a, b) => a === b,
  _.isEqual,
);
