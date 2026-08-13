import React, { useState, useEffect } from 'react';
import { Link, useForm, usePage } from '@inertiajs/react';
import UserAuthMainLayout from '@/Layouts/UserAuthMainLayout';

export default function Privacy({

}) {

    return (
        <UserAuthMainLayout>            
            <div className="w-full mx-auto mb-20 md:mb-20 min-h-[100vh]">

                <div className="w-[92%] mx-auto my-[4%] mb-[6%] py-[50px] bg-white border border-gray-200 rounded-lg shadow-md">
                    <div className="w-[92%] max-w-[1000px] mx-auto">
                        <div className="text-[20px] mb-4 font-bold">利用規約</div>

                        <div className=" py-4 border-b border-gay-200">
                            <div className="flex items-center justify-between gap-2">
                                <div className="text-[14px]">
                                    テキストが入ります。テキストが入ります。
                                    テキストが入ります。テキストが入ります。
                                    テキストが入ります。テキストが入ります。
                                    テキストが入ります。テキストが入ります。
                                    テキストが入ります。テキストが入ります。
                                    テキストが入ります。テキストが入ります。
                                    テキストが入ります。テキストが入ります。
                                    テキストが入ります。テキストが入ります。
                                    テキストが入ります。テキストが入ります。
                                    テキストが入ります。テキストが入ります。
                                    テキストが入ります。テキストが入ります。
                                    テキストが入ります。テキストが入ります。
                                    テキストが入ります。テキストが入ります。
                                    テキストが入ります。テキストが入ります。
                                </div>                                
                            </div>
                        </div>
                    </div>

                </div>
                
            </div>
        </UserAuthMainLayout>
    );
}
