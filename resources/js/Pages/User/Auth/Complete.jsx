import React, { useState, useEffect, useRef } from 'react';
import InputLabel from '@/Components/InputLabel';
import GuestLayout from '@/Layouts/GuestLayout';
import PrimaryButton from '@/Components/PrimaryButton';
import BackButton from '@/Components/BackButton';
import { Head, Link, useForm } from '@inertiajs/react';

export default function Complete({
}) {
    const { data, setData, get, processing, errors, reset } = useForm({
    });

    useEffect(() => {
        // Set a timer to submit the form after 30 seconds (30000 ms)
        const timer = setTimeout(() => {
            submit();
        }, 3000); // 30 seconds

        // Clean up the timer when the component unmounts
        return () => clearTimeout(timer);
    }, []);
  
    const submit = () => {
        location.href= route('mypage');
    };

    return (
        <GuestLayout>          
            <div className="px-[4%] lg:px-8">
                <BackButton back_url={route('register.category')} className="w-6 h-6 my-6"></BackButton>
            </div> 
            <div className="w-[92%] max-w-[1024px] py-[4%] px-[8%] mx-auto mb-20 md:mb-20 bg-white">
                <img 
                    src="/assets/images/register_complete.png" 
                    className=""
                    alt="Register Complete" />                
            </div>
        </GuestLayout>
    );
}
