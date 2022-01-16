import { useState } from "react";

const useScrollContainer = () => {
  const [scrollContainer, setScrollContainer] = useState(null);
  const scroll = (...scrollOptions) => {
    if (scrollContainer?.scrollBy) {
      scrollContainer.scrollBy(...scrollOptions);
    }
  };

  return [scrollContainer, setScrollContainer, scroll];
};

export default useScrollContainer;
