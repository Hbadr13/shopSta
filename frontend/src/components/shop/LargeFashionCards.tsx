import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const GenderCard = ({ description, image, url, type }: { description: string, image: string, url: string, type: string }) => {
    return (
        <Link href={url} className=" w-full md:w-1/2 relative aspect-[6/4] max-w-xl overflow-hidden ">
            <Image className=' z-0 relative object-cover ' fill alt='man' src={image} />
            <div className={` absolute  inset-y-0 w-1/2  flex flex-col justify-center ${type == 'man' ? 'right-0 items-start' : "left-0 items-end"} space-y-5 md:space-y-10 z-10`}>
                <div className={`  fontfamily2 text-[#222222]  font-[600] text-2xl xs:text-3xl md:text-4xl lg:text-6xl  ${type == 'man' ? 'text-start' : "text-end"} `}>{description}</div>
                <button className='active:opacity-60 transition-all duration-200 px-2 py-1 text-base xs:text-lg md:px-4 md:py-2 md:text-xl font-medium w-max  bg-store-footer-hover text-white hover:bg-store-gray-800 duration-300'>
                    SHOP NOW
                </button>

            </div>
        </Link>
    )
}

const LargeFashionCards = () => {
    return (
        <div className='w-full my-20 px-2 space-y-4'>
            <div className="w-full flex flex-col items-center md:flex-row justify-center space-y-4 md:space-y-0 space-x-0 md:space-x-10 md:p-10">
                <GenderCard type='woman' url='/' description={"Woman's Fashion"} image={'/woman2.png'} />
                <GenderCard type='man' url='/' description={"Man's Fashion"} image={'/man2.png'} />
            </div>
            <div className="w-full flex justify-center">
                <Link href={'/'} className=" bg-red-200 w-full max-w-[400px]  relative aspect-[5/7] overflow-hidden ">
                    <Image className=' z-0 relative object-cover ' fill alt='man' src={'/kid3.png'} />
                    <div className={` absolute   inset-x-0 p-5 md:p-10 flex space-x-5 items-start justify-center z-10`}>
                        <div className={`  fontfamily2  text-2xl xs:text-3xl md:text-4xl lg:text-6xl  text-start  text-[#222222]  font-[600]`}>kids{`'`}is fashion</div>
                        <button className='active:opacity-60 transition-all px-2 py-1 text-base xs:text-lg md:px-4 md:py-2 md:text-xl font-medium w-max  bg-store-footer-hover text-white hover:bg-store-gray-800 duration-300'>
                            SHOP NOW
                        </button>

                    </div>
                </Link>
            </div>
        </div>
    )
}

export default LargeFashionCards


