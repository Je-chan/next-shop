"use client";
import React, { useCallback, useEffect, useState } from "react";
import sliderData from "@/components/slider/SliderData";
import { INTERVER_TIME } from "@/components/slider/CONSTANTS";
import { AiOutlineArrowLeft, AiOutlineArrowRight } from "react-icons/ai";
import styles from "./Slider.module.scss";
import Image from "next/image";

const Slider = () => {
  // SLIDER 기본
  const [currentSlide, setCurrentSlide] = useState(0);
  const sliderLength = sliderData.length;

  const nextSlide = useCallback(() => {
    // Slide 마지막 지점(length - 1) 에 도달했을 때 0 으로 다시 돌아감
    setCurrentSlide(currentSlide === sliderLength - 1 ? 0 : currentSlide + 1);
  }, [currentSlide, sliderLength]);

  const prevSlide = useCallback(() => {
    // Slide 시작점(0) 에 도달했을 때 마지막 요소로 돌아감
    setCurrentSlide(currentSlide === 0 ? sliderLength - 1 : currentSlide - 1);
  }, [currentSlide, sliderLength]);

  useEffect(() => {
    const intervalSlide = setInterval(nextSlide, INTERVER_TIME);

    return () => {
      clearInterval(intervalSlide);
    };
  }, [nextSlide]);
  return (
    <div className={styles.slider}>
      <AiOutlineArrowLeft
        className={`${styles.arrow} ${styles.prev}`}
        onClick={prevSlide}
      />
      <AiOutlineArrowRight
        className={`${styles.arrow} ${styles.next}`}
        onClick={nextSlide}
      />

      {sliderData.map((slider, index) => {
        const { image, heading } = slider;

        return (
          <div
            key={heading}
            className={`${styles.slide} ${index === currentSlide ? styles.current : ""}`}
          >
            {index === currentSlide ? (
              <Image src={image} alt={heading} fill />
            ) : null}
          </div>
        );
      })}
    </div>
  );
};

export default Slider;
