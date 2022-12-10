import React from 'react';

import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

export default function MultiCarousel(props) {
    const responsive = {
        superLargeDesktop: {
            // the naming can be any, depends on you.
            breakpoint: { max: 4000, min: 3000 },
            items: 5
        },
        desktop: {
            breakpoint: { max: 3000, min: 1400 },
            items: 4
        },
        laptop: {
            breakpoint: { max: 1400, min: 1024 },
            items: 3
        },
        tablet: {
            breakpoint: { max: 1024, min: 768 },
            items: 2
        },
        mobile: {
            breakpoint: { max: 768, min: 0 },
            items: 1
        }
    };
    return (
        <Carousel
            responsive={responsive}
            infinite={true}
        >
            <img src="https://via.placeholder.com/200" alt="Placeholder" />
            <img src="https://via.placeholder.com/200" alt="Placeholder" />
            <img src="https://via.placeholder.com/200" alt="Placeholder" />
            <img src="https://via.placeholder.com/200" alt="Placeholder" />
            <img src="https://via.placeholder.com/200" alt="Placeholder" />
            <img src="https://via.placeholder.com/200" alt="Placeholder" />
        </Carousel>
    );
}