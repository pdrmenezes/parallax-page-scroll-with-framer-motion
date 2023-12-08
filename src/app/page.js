"use client";
import Image from "next/image";
import styles from "./page.module.css";
import { useTransform, useScroll, motion } from "framer-motion";
import { useLayoutEffect, useRef } from "react";
import Lenis from "@studio-freight/lenis";
import useWindowDimensions from "@/hooks/useWindowDimensions";

const images = [
  "1.jpg",
  "2.jpg",
  "3.jpg",
  "4.jpg",
  "5.jpg",
  "6.jpg",
  "7.jpg",
  "8.jpg",
  "9.jpg",
  "10.jpg",
  "11.jpg",
  "12.jpg",
];

export default function Home() {
  const galleryRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: galleryRef,
    // offest for when the animation starts and ends
    // start: when the gallery enters on view = top of the gallery && bottom of screen
    // end: when the gallery leaves the page = bottom of the gallery && top of the page
    offset: ["start end", "end start"],
  });

  const { height, width } = useWindowDimensions();
  const firstColumnYTransform = useTransform(scrollYProgress, [0, 1], [0, height * 2]);
  const secondColumnYTransform = useTransform(scrollYProgress, [0, 1], [0, height * 3.3]);
  const thirdColumnYTransform = useTransform(scrollYProgress, [0, 1], [0, height * 1.25]);
  const fourthColumnYTransform = useTransform(scrollYProgress, [0, 1], [0, height * 3]);

  useLayoutEffect(() => {
    const lenis = new Lenis();

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);
  }, []);

  return (
    <main>
      <div className={styles.spacer}></div>
      <div className={styles.gallery} ref={galleryRef}>
        <Column images={images.slice(0, 3)} yTransform={firstColumnYTransform} />
        <Column images={images.slice(3, 6)} yTransform={secondColumnYTransform} />
        <Column images={images.slice(6, 10)} yTransform={thirdColumnYTransform} />
        <Column images={images.slice(10, -1)} yTransform={fourthColumnYTransform} />
      </div>
      <div className={styles.spacer}></div>
    </main>
  );
}

const Column = ({ images, yTransform = 0 }) => {
  return (
    <motion.div style={{ y: yTransform }} className={styles.column}>
      {images.map((imageSrc, index) => {
        return (
          <div key={index} className={styles.imageContainer}>
            <Image src={`/images/${imageSrc}`} className={styles.image} fill alt="image" />
          </div>
        );
      })}
    </motion.div>
  );
};
