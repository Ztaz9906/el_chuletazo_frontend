import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Box } from '@chakra-ui/react';

const ImageCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const images = [
    '/landingpage1.png',
    '/landingpage2.png',
    '/landingpage3.png',
    '/landingpage4.png'
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex === images.length - 1 ? 0 : prevIndex + 1
      );
    }, 2300);

    return () => clearInterval(timer);
  }, []);

  const slideVariants = {
    enter: (direction) => ({
      scale: 0.7,
      y: direction > 0 ? 100 : -100,
      opacity: 0,
      rotateY: direction > 0 ? 45 : -45,
      transition: {
        duration: 0.8
      }
    }),
    center: {
      zIndex: 1,
      scale: 1,
      y: 0,
      opacity: 1,
      rotateY: 0,
      transition: {
        duration: 0.8
      }
    },
    exit: (direction) => ({
      scale: 0.7,
      y: direction < 0 ? 100 : -100,
      opacity: 0,
      rotateY: direction < 0 ? 45 : -45,
      transition: {
        duration: 0.8
      }
    })
  };

  const swipeConfidenceThreshold = 10000;
  const swipePower = (offset, velocity) => {
    return Math.abs(offset) * velocity;
  };

  const paginate = (newDirection) => {
    setCurrentIndex((prevIndex) => {
      const nextIndex = prevIndex + newDirection;
      if (nextIndex < 0) return images.length - 1;
      if (nextIndex >= images.length) return 0;
      return nextIndex;
    });
  };

  return (
    <Box 
      position="relative" 
      height="500px" 
      width="400px" 
      margin="0 auto"
      perspective="1000px"
    >
      <AnimatePresence initial={false} custom={1}>
        <motion.img
          key={currentIndex}
          src={images[currentIndex]}
          custom={1}
          variants={slideVariants}
          initial="enter"
          animate="center"
          exit="exit"
          style={{
            position: "absolute",
            width: "100%",
            height: "100%",
            objectFit: "contain",
            borderRadius: "15px",
          }}
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          dragElastic={1}
          onDragEnd={(e, { offset, velocity }) => {
            const swipe = swipePower(offset.x, velocity.x);
            if (swipe < -swipeConfidenceThreshold) {
              paginate(1);
            } else if (swipe > swipeConfidenceThreshold) {
              paginate(-1);
            }
          }}
        />
      </AnimatePresence>
    </Box>
  );
};

export default ImageCarousel;