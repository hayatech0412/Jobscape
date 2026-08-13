import { Link } from '@inertiajs/react';
import ArrowRight from '@/Components/Icons/ArrowRight';
import ArrowLeft from '@/Components/Icons/ArrowLeft';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Navigation } from 'swiper/modules';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import 'swiper/css';

export default function FeaturedContentsList({
    id = '',
    active = false,
    className = '',
    contents,
    ...props
}) {
    return (
        <div className="relative">
            <Swiper
                modules={[Pagination, Navigation]}
                navigation={{
                    nextEl: '.custom-next' + id,
                    prevEl: '.custom-prev' + id,
                }}
                spaceBetween={20}
                slidesPerView={'auto'}
                className="max-w-[96vw]"
                breakpoints={{
                    0: {
                        spaceBetween: 10,
                    },
                    768: {
                        spaceBetween: 20,
                    },
                }}                            
            >
                {contents.map((content, index) => (
                    <SwiperSlide className="max-w-[34vw] md:max-w-[360px] w-[38%]" key={id + "-" + content.id + "-" + index}>
                        <Link className="bg-white flex flex-col">
                            <img
                                src="https://dummyimage.com/200x300/cccccc/ffffff?text=Hello"
                                alt="content"
                                className="h-[22vw] md:h-36 w-full object-cover rounded-md"
                            />
                        </Link>
                    </SwiperSlide>
                ))}
            </Swiper> 

            <div className={"select-none hidden md:flex z-10 absolute top-16 -left-3 items-center bg-white border border-gray-500 justify-center size-6 rounded-full cursor-pointer hover:opacity-80 custom-prev" + id}>
                <ArrowLeft className="size-3" />
            </div>
            <div className={ "select-none hidden md:flex z-10 absolute top-16 -right-3 items-center bg-white border border-gray-500 justify-center size-6 rounded-full cursor-pointer hover:opacity-80 custom-next" + id }>
                <ArrowRight className="size-3" />
            </div>
        </div>
                   
    );
}
