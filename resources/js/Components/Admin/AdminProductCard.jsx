import { Link, usePage } from '@inertiajs/react';

export default function AdminProductCard({product}) {
    return (
        <Link href={route('admin.products.show', [product.id])} as='div' className="cursor-pointer">
            <div className="relative pb-[66.66%] mb-3">
                <img className="absolute h-full w-full object-cover" src={product?.main_image} alt="" />
            </div>
            <div className='flex flex-wrap gap-2 mb-3'>
                {product?.categories?.map((category, index) => (
                    <Link href={`${route('search')}?category=${category?.id}`} key={"category" + index} className='border border-gray-200 text-gray-500 py-1 px-3 rounded-full hover:bg-purple-200 hover:border-purple-600'>
                        {category?.name}
                    </Link>
                ))}
            </div>
            <h4 className="text-sm mt-3 text-gray-500 font-bold line-clamp-2">{product?.overview}</h4>
            {
                <p className="mt-3 text-xs text-gray-500">{product?.company?.nickname ?? ''}</p>
            }
            <p className="text-lg mt-2 text-gray-500 font-bold">
                { product?.reward_type === 1 && `￥${product?.reward_amount}` }
                { product?.reward_type === 2 && `${product?.reward_amount}%` }
            </p>
        </Link>
    )
}
