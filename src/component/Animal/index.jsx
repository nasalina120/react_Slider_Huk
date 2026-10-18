import React, { useState } from "react";
import dogImage from "./dogImage.jpg";
import styles from "./AnimalSlider.module.sass";
import DOGS_COLLECTION from "./data/dogData";

export default function AnimalSlider() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const hasDogs = DOGS_COLLECTION && DOGS_COLLECTION.length > 0;

  const nextDog = () => {
    if (!hasDogs) return;

    setCurrentIndex((prevIndex) => {
      if (prevIndex < DOGS_COLLECTION.length - 1) {
        return prevIndex + 1;
      }
      return prevIndex;
    });
  };

  const prevDog = () => {
    if (!hasDogs) return;

    setCurrentIndex((prevIndex) => {
      if (prevIndex > 0) {
        return prevIndex - 1;
      }
      return prevIndex;
    });
  };

  const currentDog = hasDogs ? DOGS_COLLECTION[currentIndex] : null;
  const imgSrc = currentDog ? currentDog.imgSrc : dogImage;
  const caption = currentDog
    ? currentDog.caption
    : "No dog information available";

  return (
    <>
      <p>{currentIndex}</p>
      <figure className={styles.sliderContainer}>
        <img src={imgSrc} alt={caption} />
        <figcaption>{caption}</figcaption>
      </figure>
      <div>
        <button onClick={prevDog}>{"<"}</button>
        <button onClick={nextDog}>{">"}</button>
      </div>
    </>
  );
}
