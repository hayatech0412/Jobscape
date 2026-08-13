import React, { useState } from 'react';
import UserAuthLayout from '@/Layouts/UserAuthLayout';
import ProductRowItem from '@/Components/Users/ProductRowItem';
import { Link } from '@inertiajs/react';

export default function Index({}) {
    const [active, setActive] = useState(0)
    return (
        <UserAuthLayout>            
            <div className="w-full mx-auto mb-20 md:mb-20 bg-white">
                <div className="w-[92%] mx-auto max-w-[700px] py-[70px]">
                    <div className="text-[20px] mb-8 font-bold">紹介案件</div>
                    <ul className='flex items-stretch border-t border-b border-gray-200'>
                        <li className={`flex-1 font-bold ${active === 0 ? 'text-blue-600 border-b-2 border-blue-600' : ''}`}>
                            <button className='w-full h-full py-4' onClick={() => setActive(0)}>紹介済</button>
                        </li>
                        <li className={`flex-1 font-bold ${active === 1 ? 'text-blue-600 border-b-2 border-blue-600' : ''}`}>
                            <button className='w-full h-full py-4' onClick={() => setActive(1)}>進行中</button>
                        </li>
                        <li className={`flex-1 font-bold ${active === 2 ? 'text-blue-600 border-b-2 border-blue-600' : ''}`}>
                            <button className='w-full h-full py-4' onClick={() => setActive(2)}>取引完了</button>
                        </li>
                    </ul>
                    <div className='mt-12'>
                        <ProductRowItem />
                        <ProductRowItem />
                        <ProductRowItem />
                        <ProductRowItem />

                        <Link className="text-white flex items-center justify-center mx-auto mt-12 rounded-full w-[240px] bg-blue-600 py-4" href="">もっと見る</Link>
                    </div>
                </div>
            </div>
        </UserAuthLayout>
    );
}
