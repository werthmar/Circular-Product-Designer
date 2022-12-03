/**
 * "Borrowed" from https://stackoverflow.com/questions/66009011/how-to-use-local-or-session-storages-in-next-js
 */

import { useState, useEffect } from "react";

const useSessionStorage = (name) => {
  const [value, setValue] = useState('')

  useEffect(() => {
    setValue(sessionStorage.getItem(name))
  }, [])

  return value
}

export default useSessionStorage
