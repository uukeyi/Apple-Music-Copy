import React from "react";
import { Carousel as CarouselMUI } from "react-responsive-carousel";
import CarouselItem from "../CarouselItem/CarouselItem";
import "react-responsive-carousel/lib/styles/carousel.min.css";
function Carousel() {
   const carouselImg = [
      {
         artist: "The weeknd",
         img: "https://wallpaperaccess.com/full/793938.png",
      },
      {
         artist: "BTS",
         img: "https://www.xtrafondos.com/wallpapers/miembros-de-bts-8117.jpg",
      },
      {
         artist: "Lana Del Rey",
         img: "https://images.hdqwalls.com/wallpapers/lana-del-rey-2019-a8.jpg",
      },
      {
        artist : 'Queen',
        img : "https://media.pitchfork.com/photos/634831ba8ddca99732410639/16:9/w_3200,h_1800,c_limit/Queen.jpg"
      }
   ];
   return (
      <CarouselMUI
         axis="horizontal"
         infiniteLoop
         showStatus={false}
         autoPlay
         transitionTime={700}
         showArrows = {false}
         stopOnHover = {false}
         showThumbs = {false}
      >
         {carouselImg.map((obj, index) => {
            return (
               <CarouselItem img={obj.img} title={obj.artist} key={index} />
            );
         })}
      </CarouselMUI>
   );
}

export default Carousel;
