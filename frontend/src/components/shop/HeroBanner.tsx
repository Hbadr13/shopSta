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
            <Swiper className='z-0 relative h-[3 0vh] md:h-[70vh] max-h-[800px] w-screen' modules={[Virtual]} spaceBetween={0} slidesPerView={1} virtual>
                {slides.map((slideContent, index) => (
                    <SwiperSlide className=' ' key={slideContent.category} virtualIndex={index}>
                        <div className="flex  h-full">

                            <div className="relative h-full w-1/2">
                                <Image
                                    src={slideContent.image}
                                    alt="man"
                                    fill
                                    className="object-cover"
                                />
                            </div>

                            <div className=" h-full w-1/2 text-white  bg-store-hero space-y-5 pl-20 flex flex-col pt-[2vw] ">
                                <div className="text-xl md:text-2xl text-store-gray-500">
                                    {slideContent.shorDescription}
                                </div>
                                <div className="text3xl md:text-[5vw] fontfamily2 font-medium  leading-[80px]  ">
                                    {slideContent.description}
                                </div>
                                <Link className='w-40 h-12 bg-store-footer-hover flex justify-center items-center' href={slideContent.slug}>
                                    SHOP NOW
                                </Link>
                            </div>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
            <div className="absolute z-10  bottom-[2vw]  -right-20 w-1/2 space-x-3 text-xl">
                {
                    slides.map((it, index) =>
                        <button
                            key={index}
                            onClick={() => setAudience(it.category)}
                            className={`${audience == it.category ? 'text-store-footer-hover border-b-1 border-store-footer-hover' : 'text-white'}`}  >{it.category}</button>
                    )
                }
            </div>
        </div>
    );
};
export default HeroBanner