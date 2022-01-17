import { useState, useEffect, useMemo, useCallback } from "react";

/**
 * Create a memoized IntersectionObserver instance
 * that observes a single element on the page
 * @param {Object} element - the element to observe (i.e. as state or useCallbackRef)
 * @param {func} onObservation - callback (useCallback for stability) for when observer fires intersection event
 * @param {Object} options - configuration for observer, i.e. threshold, root, rootMargin
 * see https://developer.mozilla.org/en-US/docs/Web/API/IntersectionObserver/IntersectionObserver for details
 */
export const useIntersectionObserver = (
  element,
  onObservation,
  options = {}
) => {
  // destructure relevant options to provide exhaustive deps to memo without passing referentially unstable options object
  const { threshold, root, rootMargin } = options;
  // use memo for referential stability but update when options change
  const observer = useMemo(
    () =>
      new IntersectionObserver((entries) => onObservation?.(entries), {
        threshold,
        root,
        rootMargin,
      }),
    [onObservation, threshold, root, rootMargin]
  );

  useEffect(() => {
    if (element) {
      observer.observe(element);
    }

    return () => observer.disconnect();
  }, [observer, element]);
};

/**
 * Determine if a minimum proportion of an element is on the screen
 * @param {Object} element - the element to observe (i.e. as state or useCallbackRef)
 * @param {number} minimumIntersectionRatio - the exclusive minimum proportion of element
 * that must be on screen to return isOnScreen = true
 * Defaults to 0, so any nonzero amount qualifies as on screen
 * @param ...options - any additional configuration for intersection observer
 * (see https://developer.mozilla.org/en-US/docs/Web/API/IntersectionObserver/IntersectionObserver)
 * @return {bool} - true if more than minimumIntersectionRatio% of element is on screen
 */
export const useIsOnScreen = ({
  element,
  minimumIntersectionRatio = 0,
  initialValue = false,
  ...options
}) => {
  const [isOnScreen, setIsOnScreen] = useState(initialValue);

  const onObservation = useCallback(
    ([entry]) =>
      setIsOnScreen(entry.intersectionRatio > minimumIntersectionRatio),
    [minimumIntersectionRatio]
  );

  useIntersectionObserver(element, onObservation, {
    threshold: minimumIntersectionRatio,
    ...options,
  });

  return isOnScreen;
};

// granularity at which to observe intersections
// i.e. 1/NUM_THRESHOLDS
const NUM_THRESHOLDS = 200;
const THRESHOLDS = [...Array(NUM_THRESHOLDS).keys()].map(
  (num) => num / NUM_THRESHOLDS
);

/**
 * Maintain the proportion of element that is visible on screen
 * @param {Object} element - the element to observe (i.e. as state or useCallbackRef)
 * @param {Array | number} threshold - proportions of element with on-screen visibility
 * at which to fire observation events (e.g. [.1, .2, .3, ..., .9, 1] fires observations each time 10% of the element enters/leaves screen
 * Defaults to THRESHOLDS above for finer granularity
 * ...options - any other options to pass to intersection observer (i.e. root, rootMargin)
 * (see https://developer.mozilla.org/en-US/docs/Web/API/IntersectionObserver/IntersectionObserver)
 * @return {number} - the proportion [0, 1] of element that is on screen
 */
export const useOnScreenRatio = ({
  element,
  threshold = THRESHOLDS,
  ...options
}) => {
  const [ratio, setRatio] = useState(0);

  const onObservation = useCallback(
    ([entry]) => setRatio(entry.intersectionRatio),
    []
  );

  useIntersectionObserver(element, onObservation, { threshold, ...options });

  return ratio;
};
