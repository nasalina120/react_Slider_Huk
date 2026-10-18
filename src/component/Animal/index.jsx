import React, { useEffect, useState } from "react";
import dogImage from "./dogImage.jpg";
import styles from "./AnimalSlider.module.sass";
import DOGS_COLLECTION from "./data/dogData";

export default function AnimalSlider() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(2000);
  const [inputValue, setInputValue] = useState(currentTime);

  const hasDogs = DOGS_COLLECTION && DOGS_COLLECTION.length > 0;
  const currentDog = hasDogs ? DOGS_COLLECTION[currentIndex] : null;
  const imgSrc = currentDog ? currentDog.imgSrc : dogImage;
  const caption = currentDog
    ? currentDog.caption
    : "No dog information available";

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

  const changePlay = () => {
    setIsPlaying((prevIsPlay) => !prevIsPlay);
  };

  useEffect(() => {
    let timerId = null;
    if (isPlaying) {
      timerId = setInterval(() => {
        setCurrentIndex((prev) => (prev + 1) % DOGS_COLLECTION.length);
      }, currentTime);
    }
    console.log(timerId);
    return () => {
      clearInterval(timerId);
    };
  }, [currentIndex, isPlaying]);

  const handlerChangeTimer = () => {
    setCurrentTime(Number(inputValue));
  };
  return (
    <div className={styles.sliderWrapper}>
      <p className={styles.counter}>Поточний індекс: {currentIndex}</p>

      <figure className={styles.sliderContainer}>
        <img className={styles.sliderImg} src={imgSrc} alt={caption} />
        <figcaption className={styles.sliderCaption}>{caption}</figcaption>
      </figure>

      <div className={styles.controlsRow}>
        <button className={styles.navButton} onClick={prevDog}>
          {"<"}
        </button>
        <button className={styles.navButton} onClick={nextDog}>
          {">"}
        </button>
      </div>

      <div className={styles.controlsRow}>
        <button
          className={
            isPlaying ? styles.actionButtonActive : styles.actionButton
          }
          onClick={changePlay}
        >
          {isPlaying ? "Пауза" : "Старт"}
        </button>
      </div>

      <div className={styles.timerSettings}>
        <label className={styles.timerLabel}>
          <input
            className={styles.timerInput}
            type="text"
            name="timer"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
          />
          Интервал (мс):
        </label>
        <button className={styles.actionButton} onClick={handlerChangeTimer}>
          Змінити час
        </button>
      </div>
    </div>
  );
}
