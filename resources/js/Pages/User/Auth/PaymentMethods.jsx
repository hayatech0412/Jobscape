import React, { useRef, useEffect } from 'react';
import InputError from '@/Components/InputError';
import CardNumberInput from '@/Components/CardNumberInput';
import InputLabel from '@/Components/InputLabel';
import BackButton from '@/Components/BackButton';
import CustomSelect from "@/Components/CustomSelect";
import TextInput from '@/Components/TextInput';
import CustomCheckbox from '@/Components/CustomCheckbox';
import GuestLayout from '@/Layouts/GuestLayout';
import CustomRadioButtons from "@/Components/CustomRadioButtons";
import PrimaryButton from '@/Components/PrimaryButton';
import { Head, Link, useForm } from '@inertiajs/react';
import { Toast } from 'primereact/toast';
import { showError } from '@/Plugins/helper';

export default function PaymentMethods({
    Profile,
    Plan,
    gmoShopId
}) {
    const toast = useRef(null);
    const formRef = useRef(null);
    // limit_atの入力フォーマットを YYYY-MM に変更する関数
    const formatDate = (date) => {
        const formattedDate = new Date(date);
        return formattedDate.toISOString().slice(0, 7); // 'YYYY-MM' 形式で取得
    };

    const { data, setData, post, processing, errors, reset } = useForm({
        card_number_input: '',
        card_number: '',
        limit_at: Profile.limit_at ? formatDate(Profile.limit_at) : '',
        security_code: Profile.security_code ?? '',
        is_checked: false,
        token: null
    });

    // エラーメッセージがある場合にトーストを表示
    useEffect(() => {
        if (errors.is_checked) {
            toast.current.show({
                severity: 'error',
                summary: 'エラー',
                detail: errors.is_checked
            });
        }
    }, [errors.is_checked]); // errors.is_checkedが変更された時にトースト表示

    useEffect(() => {
        const script = document.createElement('script');
        script.src = 'https://stg.static.mul-pay.jp/ext/js/token.js';
        script.onload = () => {
            if (window.Multipayment) {
                window.Multipayment.init(gmoShopId);
            }
        };
        document.body.appendChild(script);
    }, [gmoShopId]);

    const submit = (e) => {
        e.preventDefault();

        // Validate card number format
        if (!/^\d{16}$/.test(data.card_number)) {
            alert('カード番号は16桁の数字で入力してください');
            return;
        }

        // Validate security code format
        if (!/^\d{3,4}$/.test(data.security_code)) {
            alert('セキュリティコードは3桁または4桁の数字で入力してください');
            return;
        }

        // Validate expiration date format
        if (!/^\d{4}-\d{2}$/.test(data.limit_at)) {
            alert('有効期限はYYYY-MM形式で入力してください');
            return;
        }

        const card = {
            cardno: data.card_number,
            expire: data.limit_at.replace(/-/g, '').slice(2), // Convert YYYY-MM to YYMM
            securitycode: data.security_code,
        };

        console.log('Sending card info to GMO:', card);

        window.Multipayment.getToken(card, async (response) => {
            if (response.resultCode === '000') {
                try {
                    const token = response.tokenObject.token;
                    data.token = token

                    post(route('register.payment.methods.store'), {
                        onFinish: () => {},
                    });
                } catch (err) {
                    alert('Server error: ' + err.message);
                }
            } else {
                console.error('GMO Error:', response);
                console.log('カード情報の認証に失敗しました。入力内容を確認してください。');
            }
        })
    };

    const handleDateChange = (e) => {
        const value = e.target.value;
        setData({ ...data, limit_at: value });
    };

    const handleCheckboxChange = () => {
        setData({ ...data, is_checked: !data.is_checked });
    };

    const formatNumber = (number) => {
        return new Intl.NumberFormat().format(number);
    }

    const options = [
        { label: '新規クレジットカード', key: 'key', value: 1 }
    ]

    const handleCardNumberChange = (number) => {
        const formattedNumber = number.replace(/\s/g, '');
        setData({ ...data, card_number_input: number, card_number: formattedNumber })
    }

    return (
        <GuestLayout>
            <Toast ref={toast} />

            <div className="px-[4%] lg:px-8">
                <BackButton back_url={route('register.plans')} className="w-6 h-6 my-6"></BackButton>
            </div>

            <form ref={formRef} onSubmit={submit} className="w-[92%] bg-white max-w-[1024px] mx-auto mb-20 md:mb-20 ">
                <div className="w-[92%] mx-auto max-w-[700px] pt-[70px] pb-[100px] ">
                    <div className="text-[20px] mb-6">支払い方法を選択</div>
                    <p className="text-[12px] mb-1">会費のお支払いはクレジットーカード決済のみとなります。ご登録後お支払い情報はいつでも変更できます。</p>
                    <p className="text-[12px] mb-10">また、お支払い情報は暗号化され安全にご利用いただけます。</p>

                    <div className="border border-gray-200 rounded-md px-[6%] py-[6%] mb-6 ">
                        <CustomRadioButtons currentOption={1} options={options} />

                        <div className="rounded-md bg-[#f5f9fc] p-[4%] mt-6 mb-4">
                            <div className="mb-4 ">
                                <InputLabel className="mb-2" htmlFor="card_number" value="カード番号" />

                                <CardNumberInput
                                    type="text"
                                    name="card_number"
                                    value={data.card_number_input}
                                    className="mt-1 block w-full"
                                    placeholder="1234 1234 1234 1234"
                                    isFocused={true}
                                    handleChange={(number) => {
                                        handleCardNumberChange(number)
                                    }}
                                />
                                <InputError message={errors.card_number} className="mt-2" />
                            </div>
                            <div className="grid gap-0 grid-cols-1 sm:grid-cols-2 sm:gap-2">
                                <div className="mb-4">
                                    <InputLabel className="mb-2" htmlFor="code" value="有効期限" />
                                    <TextInput
                                        type="month"
                                        name="limit_at"
                                        value={data.limit_at}
                                        className="mt-1 block w-full"
                                        placeholder="月月/年年"
                                        onChange={handleDateChange}
                                    />
                                    <InputError message={errors.limit_at} className="mt-2" />
                                </div>
                                <div className="mb-4">
                                    <InputLabel className="mb-2" htmlFor="code" value="セキュリティコード" />

                                    <TextInput
                                        id="secuirity_code"
                                        type="text"
                                        name="secuirty_code"
                                        value={data.security_code}
                                        className="mt-1 block w-full"
                                        placeholder="セキュリティコード"
                                        onChange={(e) => setData({ ...data, security_code: e.target.value })}
                                    />
                                    <InputError message={errors.security_code} className="mt-2" />
                                </div>
                            </div>
                        </div>

                        <div className="rounded-md bg-[#f5f9fc] p-[4%] mb-8">
                            <div className="text-[12px] mb-4">
                                ※お客様のクレジットカード番号は本サイトを経由せず、カード会社に安全に送信されるため安心です。<br />
                            </div>
                            <div className="text-[12px] mb-4">
                                ※ご請求時期についてはご利用の各カード会社にお問い合わせください。
                            </div>
                            <div className="inline-flex items-center gap-2 md:gap-3 justify-between bg-white rounded-md px-2 md:px-6 py-2">
                                <img 
                                    src="/assets/images/visa.png" 
                                    className="block w-10 md:w-16 object-cover"
                                    alt="Application Logo" />
                                <img 
                                    src="/assets/images/master.png" 
                                    className="block h-5 md:h-8 object-cover"
                                    alt="Application Logo" />
                                <img 
                                    src="/assets/images/jcb.png" 
                                    className="block h-5 md:h-8 object-cover"
                                    alt="Application Logo" />
                                <img 
                                    src="/assets/images/jaccs.png" 
                                    className="block w-10 md:w-16 object-cover"
                                    alt="Application Logo" />
                                <img 
                                    src="/assets/images/diner.png" 
                                    className="block h-5 md:h-8 object-cover"
                                    alt="Application Logo" />
                                <img 
                                    src="/assets/images/amer.png" 
                                    className="block h-5 md:h-8 object-cover"
                                    alt="Application Logo" />
                            </div>
                        </div>
                        <div>
                            <InputLabel className="mb-2" htmlFor="code" value="選択したプラン" />
                            <div className="rounded-md border border-gray-200 p-[6%] mb-4">
                                <div className="max-w-[400px] mx-auto leading-none">
                                    <div className="flex justify-between text-[12px] mb-3 border-b border-gray-200 pb-3">
                                        <div className=" text-[14px] ">{Plan.name}プラン</div>
                                        <div className="flex items-center text-[14px]">
                                            <span className=" text-[12px]">月額　</span>
                                            <span className=" text-[15px]">¥{formatNumber(Plan.amount)}</span>
                                        </div>
                                    </div>
                                    <div className="flex justify-end items-center text-[12px]">
                                        <span className="">ご請求額（税込）</span>
                                        <span className=" text-[15px]">¥{formatNumber(Plan.amount * 1.1)}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="flex justify-center mt-8">
                        <div className="text-[12px]">
                            以下のチェックボックスをチェックすることにより、お客様がキャンセルするまでご選択<br />
                            プランの会員料金をご指定のお支払い方法にて自動引き落としいたします。<br />
                            キャンセル手続きが行われた場合は、それ以降は料金を請求されることはありません。
                        </div>
                    </div>

                    <div className="flex justify-center text-center text-[10px] mt-8">
                        <CustomCheckbox
                            label="確認しました。"
                            checked={data.is_checked}
                            onChange={handleCheckboxChange}
                        />
                    </div>
                    <div className="text-center mt-10">
                        <PrimaryButton onClick={submit} className="text-center h-[50px] bg-[#3370ff] hover:opacity-80 focus:opacity-80" disabled={processing}>
                            会員プランをはじめる
                        </PrimaryButton>
                    </div>
                </div>
            </form>
        </GuestLayout>
    );
}
