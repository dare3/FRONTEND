import { useState, useEffect } from "react";

/** Custom hook for keeping state data synced with localStorage.
 *
 * This creates `item` as state and looks in localStorage for the current value
 * (if not found, defaults to `firstValue`).
 *
 * When `item` changes, the effect re-runs:
 * - if new state is null, removes from localStorage
 * - else, updates localStorage.
 *
 * To the component, this just acts like state that is also synced to/from
 * localStorage:
 *
 *   const [myThing, setMyThing] = useLocalStorage("myThing")
 */

function useLocalStorage(key, firstValue = null) {
  const initialValue = () => {
    const storedValue = localStorage.getItem(key);
    return storedValue !== null ? JSON.parse(storedValue) : firstValue;
  };

  const [item, setItem] = useState(initialValue);

  useEffect(() => {
    console.debug("hooks useLocalStorage useEffect", "item=", item);

    if (item === null) {
      localStorage.removeItem(key);
    } else {
      localStorage.setItem(key, JSON.stringify(item));
    }
  }, [key, item]);

  return [item, setItem];
}

export default useLocalStorage;
