import React, { useState, useEffect } from 'react';
import { Box } from '@chakra-ui/react';

const CubeCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const images = [
    '/landingpage/landingpage1.png',
    '/landingpage/landingpage2.png',
    '/landingpage/landingpage3.png',
    '/landingpage/landingpage4.png',
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex === images.length - 1 ? 0 : prevIndex + 1
      );
    }, 3000); 
    return () => clearInterval(timer);
  }, []);

  return (
    <Box
      position="relative"
      height="450px" 
      width="360px"  
      margin="3rem auto" 
      sx={{
        perspective: "1000px",
        transformStyle: "preserve-3d"
      }}
    >
      <Box
        position="relative"
        width="100%"
        height="100%"
        sx={{
          transformStyle: "preserve-3d",
          transform: "translateZ(-225px)", 
          transition: "transform 1.0s" 
        }}
        style={{
          transform: `translateZ(-225px) rotateY(${currentIndex * -90}deg)`
        }}
      >
        {images.map((img, index) => (
          <Box
            key={index}
            mt="10%"
            position="absolute"
            width="360px" 
            height="450px" 
            sx={{
              backfaceVisibility: "hidden",
              transformStyle: "preserve-3d",
              transition: "all 0.5s", 
            }}
            style={{
              transform: `rotateY(${index * 90}deg) translateZ(225px) scale(${
                currentIndex === index ? 1.05 : 0.95
              })`, 
              opacity: currentIndex === index ? 1 : 0.8
            }}
          >
            <Box
              as="img"
              src={img}
              width="100%"
              height="100%"
              objectFit="cover"
              borderRadius="15px"
              sx={{
                backfaceVisibility: "hidden",
                boxShadow: "0 0 20px rgba(0,0,0,0.4)",
                transition: "transform 0.5s", 
              }}
            />
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default CubeCarousel;