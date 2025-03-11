import { Virtual } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/virtual';
import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';

const HeroBanner = () => {
    const [audience, setAudience] = useState('Woman')
    const slides = [
        {
            id: 0,
            category: 'Woman',
            shorDescription: 'Fashion sale up to 40% off',
            description: 'Latest trend in fashion',
            image: '/woman1.png',
            slug: '#'
        },
        {
            id: 1,
            category: 'Man',
            shorDescription: 'Fashion sale up to 40% off',
            description: 'Latest trend in fashion',
            image: '/man1.png',
            slug: '#'
        },
        {
            id: 2,
            category: 'Kids',
            shorDescription: 'Fashion sale up to 40% off',
            description: 'Latest trend in fashion',
            image: '/kid1.png',
            slug: '#'
        },
    ]

    return (
        <div className="w-full relative overflow-hidden ">
            <Swiper className='z-0 relative w-screen' modules={[Virtual]} spaceBetween={0} slidesPerView={1} virtual>
                {slides.map((slideContent, index) => (
                    <SwiperSlide className=' ' key={slideContent.category} virtualIndex={index}>
                        <div className="flex flex-1 flex-col md:flex-row h-full">

                            <div className="relative  w-full md:w-1/2  aspect-auto">
                                <Image

                                    src={slideContent.image}
                                    alt="man"
                                    width={1000}
                                    height={1000}
                                    className="w-full  aspect-auto   max-h-[200px] md:max-h-[950px] object-cover"
                                />
                            </div>

                            <div className="flex-1 w-full md:w-1/2  text-white  justify-center   bg-store-hero md:space-y-5 space-y-10  pl-2 md:pl-20 flex flex-col pt-[2vw] ">
                                <div className="text-xl md:text-2xl text-store-gray-500">
                                    {slideContent.shorDescription}
                                </div>
                                <div className="text-2xl md:text-3xl lg:text-5xl xl:text-7xl fontfamily2 font-medium   ">
                                    {slideContent.description}
                                </div>
                                <Link className=' w-36 h-9 md:w-40  md:h-12 bg-store-footer-hover flex justify-center items-center' href={slideContent.slug}>
                                    SHOP NOW
                                </Link>
                                <div className="block md:hidden h-20">

                                </div>

                            </div>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
            <div className="absolute z-10  bottom-2  w-max right-2   lg:bottom-[4vw]  hiddenlg:block  lg:-right-20  lg:w-1/2 space-x-3 text-xl">
                {
                    slides.map((it, index) =>
                        <button
                            key={index}
                            onClick={() => setAudience(it.category)}
                            className={`active:opacity-60 transition-all duration-200 ${audience == it.category ? 'text-store-footer-hover border-b-1 border-store-footer-hover' : 'text-white'}`}  >{it.category}</button>
                    )
                }
            </div>
        </div>
    );
};
export default HeroBanner