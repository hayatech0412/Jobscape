import React from 'react';

export default function TransferModal({ data, isOpen, onClose, onSubmit }) {
    if (!isOpen) return null;

    return (
        <div 
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
            onClick={onClose} 
        >
            <div 
                className="bg-white rounded-lg p-[50px] shadow-lg w-[300px]"
                onClick={(e) => e.stopPropagation()}
            >
                <div className="text-center font-semibold text-[14px] mb-6">
                    こちらの振込先で<br />
                    登録してよろしいでしょうか?
                </div>
                <div className="text-center text-[12px] mb-6 leading-5">
                    銀行：{ data.bank_name }<br />
                    口座種別：{ data.account_type }<br />
                    支店コード：{ data.shop_code }<br />
                    口座番号：{ data.account_code }<br />
                    口座名義(メイ)：{ data.account_last_name }<br />
                    口座名義(セイ)：{ data.account_first_name }
                </div>
                {/* <button onClick={onSubmit} className="bg-[#3370ff] h-12 rounded-full w-full flex justify-center items-center text-white text-[12px] mb-3 hover:opacity-80 focus:opacity-80 font-semibold">
                    登録する
                </button> */}
                <button onClick={onClose} className="border border-gray-200 h-12 rounded-full w-full flex justify-center items-center text-[12px] hover:opacity-80 focus:opacity-80 font-semibold">
                    修正する
                </button>
            </div>
        </div>
    );
}
