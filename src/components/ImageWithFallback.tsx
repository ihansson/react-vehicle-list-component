import { IMedia } from "../data/schema";
import { useState, Fragment, useEffect } from "react";

export const ImageWithFallback = ({ image }: { image: IMedia | null }) => {
  const [showFallback, setShowFallback] = useState(true);

  // Preload Image, depends on image and should only fire once for any given instance
  useEffect(() => {
    if (!image) return;
    const preloadImage = new Image();
    preloadImage.src = image.url;
    preloadImage.onload = () => {
      setShowFallback(false);
    };
  }, [image]);

  return (
    <Fragment>
      {/* If there is no image or we haven't loaded the image we should a fallback */}
      {showFallback || !image ? (
        <div className="imagePlaceholder" />
      ) : (
        <img src={image.url} alt={image.name} />
      )}
    </Fragment>
  );
};
