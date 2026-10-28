import React, { useEffect, useState } from "react";

import { AiOutlineFullscreen } from "react-icons/ai";
import { AiOutlineFullscreenExit } from "react-icons/ai";

import DOGS_COLLECTION from "./data/dogData";

import dogImage from "./dogImage.jpg";
import styles from "./AnimalSlider.module.sass";

export default function AnimalSlider() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(2000);
  const [inputValue, setInputValue] = useState(currentTime);
  const [isFullScreen, setFullScreen] = useState(false);
  const [isBtnVisibleFullS, setBtnVisibleFullS] = useState(false);

  const hasDogs = DOGS_COLLECTION && DOGS_COLLECTION.length > 0;
  const currentDog = hasDogs ? DOGS_COLLECTION[currentIndex] : null;
  const imgSrc = currentDog ? currentDog.imgSrc : dogImage;
  const caption = currentDog
    ? currentDog.caption
    : "No dog information available";

  const nextDog = () => {
    if (!hasDogs) return;
    setCurrentIndex((prevIndex) =>
      prevIndex === DOGS_COLLECTION.length - 1 ? 0 : prevIndex + 1,
    );
  };

  const prevDog = () => {
    if (!hasDogs) return;
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? DOGS_COLLECTION.length - 1 : prevIndex - 1,
    );
  };

  const changePlay = () => {
    setIsPlaying((prevIsPlay) => !prevIsPlay);
  };

  useEffect(() => {
    let timerId = null;
    if (isPlaying && hasDogs) {
      timerId = setInterval(() => {
        setCurrentIndex((prevIndex) =>
          prevIndex === DOGS_COLLECTION.length - 1 ? 0 : prevIndex + 1,
        );
      }, currentTime);
    }
    return () => {
      clearInterval(timerId);
    };
  }, [isPlaying, currentTime, hasDogs]);

  const handlerChangeTimer = () => {
    setCurrentTime(Number(inputValue));
  };

  const handelMouseEnter = () => {
    setBtnVisibleFullS(true);
  };

  const handelMouseLeave = () => {
    setBtnVisibleFullS(false);
  };

  const toggleFullScreen = () => {
    setFullScreen((prevFullScreen) => !prevFullScreen);
  };
  return (
    <div className={styles.sliderWrapper}>
      <p className={styles.counter}>Поточний індекс: {currentIndex}</p>

      <figure className={styles.sliderContainer}>
        <div
          onMouseEnter={handelMouseEnter}
          onMouseLeave={handelMouseLeave}
          className={
            isFullScreen ? styles.imgContainerFull : styles.sliderImgWrapper
          }
        >
          <img className={styles.sliderImg} src={imgSrc} alt={caption} />

          {isBtnVisibleFullS && (
            <button onClick={toggleFullScreen} className={styles.fullScreenBtn}>
              {isFullScreen ? (
                <AiOutlineFullscreenExit />
              ) : (
                <AiOutlineFullscreen />
              )}
            </button>
          )}
        </div>

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
