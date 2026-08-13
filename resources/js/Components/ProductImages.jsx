import React, { useEffect, useState } from "react";

export default function ProductImages({    
    product
}) {    
    const [selectedImage, setSelectedImage] = useState(product.main_image);

    return (
        <div className="">
            <img 
                className='aspect-3/2 w-full object-cover' 
                src={selectedImage} 
                alt=""
            />         
            <div className='grid gap-3 grid-cols-3 lg:grid-cols-4 mt-4'>
                <div className="border rounded-sm aspect-3/2 object-fill relative cursor-pointer">
                    <img
                        onClick={() => {setSelectedImage(product.main_image)}}
                        src={product.main_image}
                        alt="商材資料"
                        className="w-full h-full object-cover"
                    />
                </div>
                {
                    Array(15).fill(0).map((__, index) => {
                        return (
                            <div
                                key={index}
                                className="border rounded-sm aspect-3/2 object-fill relative cursor-pointer"
                            >
                                {   
                                    index < product.attachments.length && 
                                    <img
                                        onClick={() => {setSelectedImage(product.attachments[index].url)}}
                                        src={ product.attachments[index].url }
                                        alt="商材資料"
                                        className="w-full h-full object-cover"
                                    />
                                }
                            </div>
                        );
                    })
                }
            </div>
            <p className='mt-2'>写真をクリックすると上に表示されます。</p>
        </div>
    );
}
