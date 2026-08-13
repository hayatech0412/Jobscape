import { Link } from '@inertiajs/react';
import ArrowRight from '@/Components/Icons/ArrowRight';
import ArrowLeft from '@/Components/Icons/ArrowLeft';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Navigation } from 'swiper/modules';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import 'swiper/css';

export default function PickupProductList({
    id = '',
    active = false,
    className = '',
    products,
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
                preventClicks={true}
                preventClicksPropagation={true}
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
                {products.map((product, index) => (
                    <SwiperSlide className="max-w-[34vw] md:max-w-[280px] w-[38%]"  key={id + "-" + product.id + "-" + index}>
                        <Link className="bg-white flex flex-col">
                            <img
                                src={product.main_image}
                                alt="product"
                                className="h-[22vw] md:h-44 w-full object-cover rounded-md"
                            />
                            <div className="flex flex-col gap-2 mt-3 pb-0 md:pb-6">
                                <div className="hidden md:flex flex-wrap gap-1">
                                    {product.categories.map((category, i) => (
                                        <div
                                            key={id + "-" + product.id + "-" + category.id + "-" + i}
                                            className="leading-none py-[4px] px-[14px] rounded-full border border-gray-400 text-[10px] text-gray-400">
                                            {category.name}
                                        </div>
                                    ))}
                                </div>
                                <h2 className="text-[12px] font-bold line-clamp-2">
                                    {product.overview}
                                </h2>
                            </div>
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
