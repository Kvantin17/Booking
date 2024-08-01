import { useEffect, useRef } from "react";

export function useOutsideClickModal(close, listenCapturing = true) {
  const ref = useRef();

  useEffect(() => {
    const handleClick = (e) => {
      if (ref.current && !ref.current.contains(e.target)) {
        close();
      }
    };

    // Так как модальное окно у нас появляется как ребёнок body, при открытии этого окна всплывает также функция, которая закрывает окно. в Результате модалка открывается на пару мнгновений и закрывается. Чтоб это исправить мы предотвращаем всплытие!
    document.addEventListener("click", handleClick, listenCapturing);

    return () => document.removeEventListener("click", handleClick);
  }, [close, listenCapturing]);

  return { ref };
}
