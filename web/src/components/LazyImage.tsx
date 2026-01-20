import React, { useState, useEffect, useRef } from 'react';

interface LazyImageProps {
  src: string;
  alt: string;
  className?: string;
  style?: React.CSSProperties;
  placeholder?: string;
  onLoad?: () => void;
  onError?: () => void;
}

export function LazyImage({ 
  src, 
  alt, 
  className, 
  style, 
  placeholder = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 300"%3E%3Crect fill="%23f3f4f6" width="400" height="300"/%3E%3C/svg%3E',
  onLoad,
  onError 
}: LazyImageProps) {
  const [imageSrc, setImageSrc] = useState(placeholder);
  const [isLoaded, setIsLoaded] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    let observer: IntersectionObserver;
    
    if (imgRef.current && 'IntersectionObserver' in window) {
      observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              const img = entry.target as HTMLImageElement;
              const dataSrc = img.dataset.src;
              
              if (dataSrc) {
                // Preload image
                const tempImg = new Image();
                tempImg.onload = () => {
                  setImageSrc(dataSrc);
                  setIsLoaded(true);
                  onLoad?.();
                };
                tempImg.onerror = () => {
                  onError?.();
                };
                tempImg.src = dataSrc;
              }
              
              observer.unobserve(img);
            }
          });
        },
        {
          rootMargin: '50px',
          threshold: 0.01
        }
      );

      observer.observe(imgRef.current);
    } else {
      // Fallback for browsers without IntersectionObserver
      setImageSrc(src);
    }

    return () => {
      if (observer && imgRef.current) {
        observer.unobserve(imgRef.current);
      }
    };
  }, [src, onLoad, onError]);

  return (
    <img
      ref={imgRef}
      src={imageSrc}
      data-src={src}
      alt={alt}
      className={className}
      style={{
        ...style,
        opacity: isLoaded ? 1 : 0.6,
        transition: 'opacity 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
        background: '#f3f4f6'
      }}
      loading="lazy"
      decoding="async"
    />
  );
}
