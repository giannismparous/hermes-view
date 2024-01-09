import { useEffect, useRef } from 'react';

const useScrollAnimation = () => {
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate');
          } else {
            entry.target.classList.remove('animate');
          }
        });
      },
      { threshold: 0.01 }
    );

    const observedElements = ref.current.querySelectorAll('.provider-item, .product-item, .project-item, .animate-on-scroll');
    observedElements.forEach((elem) => observer.observe(elem));

    return () => observedElements.forEach((elem) => observer.unobserve(elem));
  }, []);

  return ref;
};

export default useScrollAnimation;
