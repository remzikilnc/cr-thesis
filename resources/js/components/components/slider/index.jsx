import React from 'react';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const ProductSlider = ({ products }) => {
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 6,
        slidesToScroll: 3,
        initialSlide: 0,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 3,
                    infinite: true,
                    dots: true
                }
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2,
                    initialSlide: 2
                }
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            }
        ]
    };

    console.log(products)

    return (
            <Slider {...settings}>
                {products.map((product) => (
                    <div key={product.id} className={"border-[1px] border-gray-200 flex hover:drop-shadow-2xl mb-3"}>
                        <a className={"cursor-pointer flex flex-col overflow-hidden py-5 px-3 pb-5"}>
                            <span className={"text-center overflow-hidden text-gray-800 mb-3 mt-1 h-7 p-0 text-xs leading-none"}>{product.title}</span>
                            <div className="inset-0 z-0 w-full flex justify-center">
                                <picture>
                                    <img className={"w-[200px] "} src={product.images && product.images[0] ? product.images[0]['url'] : ''} alt={product.name} />
                                </picture>
                            </div>
                            <span className="text-center mt-3 text-blue-500 text-lg font-semibold">{product.price} <span className="text-sm">TL</span></span>
                        </a>
                    </div>
                ))}
            </Slider>
    );
}

export default ProductSlider;
