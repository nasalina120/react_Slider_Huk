import React, { Component } from "react";
import dogImage from "./dogImage.jpg";
import styles from "./AnimalSlider.module.sass";
import DOGS_COLLECTION from "./data/dogData";

export default class AnimalSlider extends Component {
  constructor(props) {
    super(props);

    this.state = {
      currentIndex: 0,
    };
  }

  nextDog = () => {
    if (!DOGS_COLLECTION || DOGS_COLLECTION.length === 0) return;

    this.setState((prevState) => ({
      currentIndex: (prevState.currentIndex + 1) % DOGS_COLLECTION.length,
    }));
  };

  render() {
    const hasDogs = DOGS_COLLECTION && DOGS_COLLECTION.length > 0;
    const currentDog = hasDogs
      ? DOGS_COLLECTION[this.state.currentIndex]
      : null;

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

        <button onClick={this.nextDog}>Dogbutton</button>
      </>
    );
  }
}
