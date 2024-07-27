import { useEffect, useRef } from "react";

export function useOutsideClickModal(close) {
  const ref = useRef();

  console.log(ref);

  useEffect(() => {
    const handleClick = (e) => {
      if (ref.current && !ref.current.contains(e.target)) {
        close();
      }
    };

    // Так как модальное окно у нас появляется как ребёнок body, при открытии этого окна всплывает также функция, которая закрывает окно. в Результате модалка открывается на пару мнгновений и закрывается. Чтоб это исправить мы предотвращаем всплытие!
    document.addEventListener("click", handleClick, true);

    return () => document.removeEventListener("click", handleClick);
  }, [close]);

  return { ref };
}
