import React, { useState } from "react";
import dogImage from "./dogImage.jpg";
import styles from "./AnimalSlider.module.sass";
import DOGS_COLLECTION from "./data/dogData";

export default function AnimalSlider() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextDog = () => {
    if (!DOGS_COLLECTION || DOGS_COLLECTION.length === 0) return;

    setCurrentIndex((prevIndex) => (prevIndex + 1) % DOGS_COLLECTION.length);
  };

  const hasDogs = DOGS_COLLECTION && DOGS_COLLECTION.length > 0;
  const currentDog = hasDogs ? DOGS_COLLECTION[currentIndex] : null;

  const imgSrc = currentDog ? currentDog.imgSrc : dogImage;
  const caption = currentDog
    ? currentDog.caption
    : "No dog information available";

  return (
    <>
      <figure className={styles.sliderContainer}>
        <img src={imgSrc} alt={caption} />
        <figcaption>{caption}</figcaption>
      </figure>

      <button onClick={nextDog}>Dogbutton</button>
    </>
  );
}
