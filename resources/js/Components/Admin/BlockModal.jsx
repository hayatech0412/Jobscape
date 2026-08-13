import React from 'react';

export default function BlockModal({ data, isOpen, product, onClose, onSubmit }) {
    if (!isOpen) return null;

    return (
        <div
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
            onClick={onClose}
        >
            <div
                className="bg-white rounded-lg p-[50px] shadow-lg w-[400px]"
                onClick={(e) => e.stopPropagation()}
            >
                <div className="text-center font-semibold text-[14px] mb-6">
                    {data ? (data + '番目') : ('こ')}の項目を本当に{product.status == 5 ? '解除' : 'ブロック'}しますか。
                </div>
                <div className="flex items-center justify-center gap-4">
                    <button onClick={onSubmit} className="bg-[#3370ff] h-10 rounded-full w-[120px] flex justify-center items-center text-white text-[12px] hover:opacity-80 focus:opacity-80 font-semibold">
                        {product.status == 5 ? '解除' : 'ブロック'}する
                    </button>
                    <button onClick={onClose} className="border border-gray-200 h-10 rounded-full w-[120px] flex justify-center items-center text-[12px] hover:opacity-80 focus:opacity-80 font-semibold">
                        キャンセル
                    </button>
                </div>
            </div>
        </div>
    );
}
