import CompanyTitle from "@/Components/Companies/CompanyTitle";
import AdminAuthLayout from '@/Layouts/Admin/AdminAuthLayout';
import { Link, usePage, useForm } from "@inertiajs/react";
import CustomCard from "@/Pages/Company/Orders/CustomCard";
import StatusAccordian from "@/Components/StatusAccordian";
import ArrowIcon from "@/Components/Icons/ArrowIcon";
import StatusProgress from "@/Components/Companies/StatusProgress";
import { Inertia } from "@inertiajs/inertia";
import { useEffect, useRef, useState } from "react";
import { Toast } from "primereact/toast";
import ScheduleCard from "@/Pages/Company/Orders/ScheduleCard";
import dayjs from "dayjs";
import Amount from "@/Pages/User/Transfer/Amount";

export default function Show({
    tax_rate,
    service_fee_rate,
    order, 
    notCompleteReasons, 
    noResponseReasons,
    period_units
}) {
    const toast = useRef(null);

    const { data, setData, get, post, processing, errors, reset } = useForm({
        id: order.data.id ?? '',
        user_id: order.data.user_id ?? '',
        product_id: order.data.product_id ?? '',
        code: order.data.code ?? '',
        agency_code: order.data.agency_code ?? '',
        contact_type: order.data.contact_type ?? '',
        is_target_agree: order.data.is_target_agree ?? '',
        is_encrypt: order.data.is_encrypt ?? '',
        user_memo: order.data.user_memo ?? '',
        target_memo: order.data.target_memo ?? '',
        target_last_name: order.data.target_last_name ?? '',
        target_first_name: order.data.target_first_name ?? '',
        target_last_kana: order.data.target_last_kana ?? '',
        target_first_kana: order.data.target_first_kana ?? '',
        target_email: order.data.target_email ?? '',
        target_phone_number: order.data.target_phone_number ?? '',
        target_post_number: order.data.target_post_number ?? '',
        target_pref: order.data.target_pref ?? '',
        target_city: order.data.target_city ?? '',
        target_area: order.data.target_area ?? '',
        target_street: order.data.target_street ?? '',
        target_building: order.data.target_building ?? '',
        target_company_name: order.data.target_company_name ?? '',
        target_position: order.data.target_position ?? '',
        contact_with: order.data.contact_with ?? '',
        status: order.data.status ?? '',
        no_response_reason: order.data.no_response_reason ?? '',
        no_response_reason_detail: order.data.no_response_reason_detail ?? '',
        reported_at: order.data.reported_at ?? '',
        not_complete_reason: order.data.not_complete_reason ?? '',
        not_complete_reason_detail: order.data.not_complete_reason_detail ?? '',
        total_amount: order.data.total_amount ?? '',
        sales_amount: order.data.sales_amount ?? '',
        fee_amount: order.data.fee_amount ?? '',
        bill_amount: order.data.bill_amount ?? '',
        bill_url: order.data.bill_url ?? '',
        accepted_at: order.data.accepted_at ?? '',
        completed_at: order.data.completed_at ?? '',
        proposed_at: order.data.proposed_at ?? '',
        propose_updated_at: order.data.propose_updated_at ?? '',
        propose_update_reason: order.data.propose_update_reason ?? '',
        schedules: order.data.schedules ?? [],
        product: order.data.product ?? null,
        created_at_date: order.data.created_at_date ?? '',
        user: order.data.user ?? null,
    });

    const handleSetData = (form, key, value) => {
        form.setData({...form.data, [key]: value});
    }

    const getScheduleDate = (currentStatus) => {
        return data.schedules?.find(s => s.status === currentStatus)?.schedule_date ?? ''
    }

    const formatDate = (dateString) => {
        if (dateString) {
            return dayjs(dateString).format("YYYY/MM/DD");
        } else {
            return '';
        }
    }

    const convertDate = (dateString) => {
        if (dateString) {
            return dayjs(dateString).format("YYYY-MM-DD");
        } else {
            return '';
        }
    }

    const formatNumber = (number) => {
        if (number == 0) return '';
        return new Intl.NumberFormat().format(number);
    }

    const formatDateHm = (dateString) => {
        if (dateString) {
            return dayjs(dateString).format("YYYY/MM/DD hh:mm");
        } else {
            return '';
        }
    }

    function getLabelByValue(units, value) {
        const unit = units.find(u => u.value === value);
        return unit ? unit.label : '';
    }

    const showSuccess = (message) => {
        toast.current.show({ 
            severity: 'success', 
            summary: '成功', 
            detail: message
        });
    }

    const showError = (message) => {
        toast.current.show({ 
            severity: 'error', 
            summary: 'エラー', 
            detail: message
        });
    }

    const firstStepForm = useForm({
        value: order.data.schedules[0]?.value ?? 0,
        status: order.data.schedules[0]?.status ?? 0,
        canceled_reason: order.data.schedules[0]?.canceled_reason ?? 1,
        change_reason: order.data.schedules[0]?.change_reason ?? '',
        editable: order.data.schedules.length == 0 || order.data?.status == 0 || order.data.schedules[0]?.value == 0,
    });

    const firstStepFormSubmit = async () => {
        try {
            const response = await Inertia.post(route('company.orders.response', data.id), firstStepForm.data);
            showSuccess('操作が成功しました。');
        } catch (error) {
            showError('操作が失敗しました。');
        }
    }

    const secondStepForm = useForm({
        value: order.data.schedules[1]?.value ?? 0,
        status: order.data.schedules[1]?.status ?? 1,
        accepted_at: order.data.accepted_at ?? '',
        total_amount: parseInt(order.data.total_amount),
        sales_amount: parseInt(order.data.sales_amount),
        fee_amount: parseInt(order.data.fee_amount),
        bill_amount: order.data.bill_amount == 0 ? (data.product.reward_type == 1 ? data.product?.reward_amount : 0) : order.data.bill_amount,
        schedule_date: order.data.schedules[1]?.schedule_date ?? '',
        canceled_reason: order.data.schedules[1]?.canceled_reason ?? 0,
        change_reason: order.data.schedules[1]?.change_reason ?? '',
        editable: order.data?.status == 1,
        file: null,
    });

    const changeTotalAmount = (total_amount_str) => {
        const cleaned = total_amount_str.replace(/[^\d]/g, ''); // 数字以外を全て削除
        let total_amount = parseInt(cleaned, 10);
        total_amount = isNaN(total_amount) ? 0 : total_amount;
        if (!parseInt(total_amount)) total_amount = 0

        let fee_amount = Math.round(total_amount * tax_rate / (100 + tax_rate))
        let sales_amount = total_amount - fee_amount
        let bill_amount = data.product.reward_type == 1 ? data.product?.reward_amount : Math.round(total_amount * data.product.reward_amount / 100)

        secondStepForm.setData({
            ...secondStepForm.data, 
            total_amount: total_amount,
            bill_amount: bill_amount,
            fee_amount: fee_amount,
            sales_amount: sales_amount
        })
    }

    const successOrFail = () => {
        if (secondStepForm.data.value == 0) {
            showError('成立・不成立を選択してください。');
            return
        }

        if (secondStepForm.data.value == 1) {
            successReport()
        } else {
            failReport()
        }
    }

    const successReport = async () => {
        if (secondStepForm.data.accepted_at == '') {
            showError('成立日を選択してください。');
            return
        }

        if (secondStepForm.data.total_amount == 0) {
            showError('売上金額を入力してください。')
            return
        }

        if (secondStepForm.data.total_amount >= 1000000 && !secondStepForm.data.file) {
            showError('請求書を選択してください。')
            return
        }

        if (secondStepForm.data.file?.size > 5242880) {
            showError('請求書のサイズは5MBまでです。')
            return
        }

        try {
            const response = await Inertia.post(route('company.orders.success', data.id), secondStepForm.data);
            showSuccess('操作が成功しました。');
        } catch (error) {
            showError('操作が失敗しました。');
        }
    }

    const failReport = async () => {
        try {
            const response = await Inertia.post(route('company.orders.fail', data.id), secondStepForm.data);
            showSuccess('操作が成功しました。');
        } catch (error) {
            showError('操作が失敗しました。');
        }
    }

    const thirdStepForm = useForm({
        value: order.data.status == 4 ? 1 : 0,
        status: order.data.status,
        editable: order.data?.status == 2,
    });

    const reportPayed = async () => {
        if (thirdStepForm.data.value == 0) {
            showError('請求額を支払いました。にチェック入れてください。')
            return
        }

        try {
            const response = await Inertia.post(route('company.orders.report_payed', data.id), { payed_flag: thirdStepForm.data.value });
            showSuccess('操作が成功しました。');            
        } catch (error) {
            showError('操作が失敗しました。');
        }
    }

    const proposeForm = useForm({
        proposed_at: order.data?.proposed_at ?? '',
        propose_updated_at: order.data?.propose_updated_at ?? order.data?.created_at,
        propose_update_reason: order.data?.propose_update_reason ?? '',
        editable: order.data?.propose_updated_at ? false : true,
    });
    const proposeUpdate = async () => {
        if (proposeForm.data.proposed_at == '') {
            showError('取引完了予定日を選択してください。')
            return
        }

        if (proposeForm.data.propose_update_reason == '') {
            showError('変更理由を入力してください。')
            return
        }

        try {
            const response = await Inertia.post(route('company.orders.propose_update', data.id), proposeForm.data);
            showSuccess('操作が成功しました。');            
        } catch (error) {
            showError('操作が失敗しました。');
        }
    }

    return (
        <AdminAuthLayout>
            <Toast ref={toast} /> 
            <div className="w-[92%] mx-auto">
                <div className="flex mt-6 justify-between items-center bg-white md:pl-12 pl-4 rounded-lg shadow-md overflow-hidden">
                    <div className="py-3 font-bold">
                        取引ID：{data.code}
                    </div>
                    <div className="bg-primary text-white px-4 py-3">
                        取引完了予定日：{ formatDate(data.proposed_at) }
                    </div>
                </div>
                <CustomCard title="紹介者情報">
                    <div className="flex justify-between pb-6 border-b border-gray-200 flex-col md:flex-row">
                        <div>
                            <small className="text-base text-gray-500">
                                {data.referrer_kana}
                            </small><br />
                            <span className="text-xl pt-2 inline-block font-bold">
                                {data.referrer}
                            </span>
                        </div>
                        <div className="text-left md:text-right mt-4 md:mt-0">
                            <span className="font-xs">この商材の取次回数</span><br />
                            <span className="font-xs">5回</span>
                        </div>
                    </div>
                    <div className="pt-6">
                        <h2>
                            商材提供企業への取次メモ
                        </h2>
                        <div className="shadow-[0_0_10px_0_rgba(0,0,0,0.1)] max-w-[600px] p-4 mt-4" dangerouslySetInnerHTML={{ __html: data.note }}></div>
                    </div>
                </CustomCard>
                <CustomCard title="商材概要" link_title="商材詳細を見る" link={`/company/products/${data.product_id}`}>
                    <div className="flex justify-start items-center pb-6 border-b border-gray-200 flex-col md:flex-row">
                        <img
                            src={data.product.main_image}
                            alt="regist image"
                            className="w-[200px]"
                        />
                        <div className="ml-4">
                            <h3>商材名</h3>
                            <p className="text-gray-500 mt-2">{data.product.name}</p>
                        </div>
                    </div>
                    <div className="pt-6 border-t border-gray-200 pb-6">
                        <div className="flex flex-wrap">
                            <div className="w-1/3 md:w-1/6">
                                <p className="font-bold">基本紹介料</p>
                                <p className="text-gray-500 mt-2 text-xs">{data.product.reward_type === 1 ? '¥' : ''}{formatNumber(data.product.reward_amount)}{data.product.reward_type === 1 ? '' : '%'}</p>
                            </div>
                            <div className="w-1/3 md:w-1/6">
                                <p className="font-bold">最低報酬額</p>
                                <p className="text-gray-500 mt-2 text-xs">¥{formatNumber(data.product.reward_amount)}</p>
                            </div>
                            <div className="w-1/3 md:w-1/6">
                                <p className="font-bold">平均報酬額</p>
                                <p className="text-gray-500 mt-2 text-xs">¥12,000</p>
                            </div>
                            <div className="w-1/3 md:w-1/6 pt-4 md:pt-0">
                                <p className="font-bold">取引期間</p>
                                <p className="text-gray-500 mt-2 text-xs">約{data.product.transaction_period}{getLabelByValue(period_units, data.product.transaction_period_unit)}</p>
                            </div>
                            <div className="w-2/3 md:w-2/6 pt-4 md:pt-0">
                                <p className="font-bold">取引完了予定日</p>
                                <p className="text-gray-500 mt-2 text-xs">{ formatDate(data.proposed_at) } (延長あり)</p>
                            </div>
                        </div>
                    </div>
                    <div className="pt-6 border-t border-gray-200 pb-6">
                        <div className="flex flex-wrap">
                            <div className="md:w-3/6 w-full">
                                <p className="font-bold">募集制限</p>
                                <p className="text-gray-500 mt-2 text-xs">限定/新着（人数・固数など）</p>
                            </div>
                            <div className="md:w-3/6 w-full pt-4 md:pt-0">
                                <p className="font-bold">選考基準</p>
                                <p className="text-gray-500 mt-2 text-xs">面接：有無</p>
                            </div>
                        </div>
                    </div>
                    <div className="pt-6 border-t border-gray-200 pb-6">
                        <div className="flex flex-wrap">
                            <div className="md:w-3/6 w-full pr-4">
                                <p className="font-bold">募集条件</p>
                                <p className="text-gray-500 mt-2 text-xs">関東でお住まいで初回の訪問に同行いただける方（共通費は自己負担になります）。事前にzoomで概要を説明しますので、日中の連絡が取れる場合のみご応募ください。</p>
                            </div>
                            <div className="md:w-3/6 w-full pt-4 md:pt-0">
                                <p className="font-bold">特記事項</p>
                                <p className="text-gray-500 mt-2 text-xs">同業者の紹介は受け付けられません。</p>
                            </div>
                        </div>
                    </div>
                </CustomCard>

                <div className="flex flex-col md:flex-row mb-40">
                    <div className="w-full md:w-4/6 pr-0 md:pr-6 ">
                        <CustomCard title={`詳細コード：${data.code}`}>
                            <p className="pb-2">
                                紹介者：　{data.user.profile?.full_name}
                            </p>
                            <p className="pb-2">
                                紹介日：　{data.created_at_date}
                            </p>
                            <p className="pb-2">
                                商材名：　{data.product.name}
                            </p>
                            <div className="flex justify-between pt-4 pb-2">
                                <h3 className="text-blue-600 text-lg font-bold">{ order.data.status_text }</h3>
                                <p>取引完了予定日：{ formatDate(data.proposed_at) }</p>
                            </div>
                            <div className="flex justify-between pt-4 pb-2 bg-[#f1f1f1] md:px-12 md:py-12 px-0 py-2">
                                <StatusProgress status={data.status} currentStatus={0} statusText='未対応' />
                                <StatusProgress status={data.status} currentStatus={1} statusText='商談中' />
                                <StatusProgress status={data.status} currentStatus={2} statusText='成約 or 失注' />
                                <StatusProgress status={data.status} currentStatus={4} statusText='完了' />
                            </div>
                        </CustomCard>

                        
                        <CustomCard title="対応状況">
                            <div className="flex justify-between items-center mb-4">
                                <h3 className="text-lg">取引完了予定日</h3>
                                <p className="flex flex-col md:flex-row text-lg">
                                    { formatDate(data.proposed_at) } 
                                    {/* <button className="rounded-full border border-checkout text-checkout text-sm inline-flex items-center justify-center px-6 py-1 ml-4">修正</button>  */}
                                </p>
                            </div>
                            <div className="mb-12">
                                <StatusAccordian
                                    status={data.status} 
                                    title='取引完了予定日' 
                                    date={ proposeForm.data.propose_updated_at ? formatDateHm(proposeForm.data.propose_updated_at) : data.created_at_date }
                                    currentStatus={9}
                                    disabled={!proposeForm.data.editable}
                                    openable={true}
                                    notag={true}
                                >
                                    <div className="mt-4">
                                        <p className="text-xs mt-2">※1回に限り修正が可能です。</p>
                                        <input 
                                            type="date"
                                            disabled={!proposeForm.data.editable}
                                            onChange={(e) => handleSetData(proposeForm, 'proposed_at', e.target.value)}
                                            defaultValue={convertDate(proposeForm.data.proposed_at)}
                                            name="contract"
                                            className="border border-gray-200 mt-3"  />
                                    </div>
                                    <div className="mt-6">
                                        <label className="block" htmlFor="">変更理由</label>
                                        <textarea 
                                            disabled={!proposeForm.data.editable}
                                            onChange={(e) => handleSetData(proposeForm, 'propose_update_reason', e.target.value)} 
                                            className="w-full mt-2 border border-gray-200"
                                            defaultValue = { proposeForm.data.propose_update_reason }>
                                        </textarea>
                                        <p className="text-xs mt-2">※変更理由は紹介者様へ通知されます。</p>
                                    </div>
                                </StatusAccordian>
                                <StatusAccordian
                                    status={data.status} 
                                    title='未対応' 
                                    date={formatDateHm(order.data.created_at)}    
                                    currentStatus={0}
                                    disabled={!firstStepForm.data.editable}
                                    openable={true}
                                >
                                    <div className="bg-red-100 text-xs px-2 py-2">
                                        ※紹介されてから30日経っても商談が開始されない場合、取引は<span className="text-red-500">自動キャンセル</span>となります。
                                    </div>
                                    <div className="mt-4 flex items-center justify-between">
                                        <label htmlFor="transaction_responded">
                                            <input 
                                                type="radio" 
                                                disabled={!firstStepForm.data.editable} 
                                                id="transaction_responded" 
                                                name="transaction_responding" 
                                                value={1}
                                                checked={firstStepForm.data.value === 1}
                                                onChange={(e) => handleSetData(firstStepForm, 'value', Number(e.target.value))}
                                                className="mr-3" />
                                                商談を開始しました。
                                        </label>
                                        <button onClick={() => {handleSetData(firstStepForm, 'editable', true)}} className="border border-checkout text-checkout py-1 px-4 rounded-full ml-4">
                                            修正
                                        </button>
                                    </div>
                                    <div className="mt-2 flex items-center justify-between">
                                        <label htmlFor="transaction_responding_rejected">
                                            <input 
                                                type="radio" 
                                                disabled={!firstStepForm.data.editable} 
                                                id="transaction_responding_rejected" 
                                                name="transaction_responding" 
                                                value={2}
                                                checked={firstStepForm.data.value === 2}
                                                onChange={(e) => handleSetData(firstStepForm, 'value', Number(e.target.value))}
                                                className="mr-3" />
                                            商談を開始できません。
                                        </label>
                                    </div>
                                    <div className="mt-4 flex items-center justify-between border-none bg-white shadow-[0_0_10px_0_rgba(0,0,0,0.1)] rounded-lg">
                                        <select 
                                            disabled={!firstStepForm.data.editable || firstStepForm.data.value == 1} 
                                            value={firstStepForm.data.canceled_reason} 
                                            onChange={(e) => {handleSetData(firstStepForm, 'canceled_reason', e.target.value)}} className="text-sm border-none w-full">
                                            {
                                                noResponseReasons.map((reason, index) => (
                                                    <option value={reason.value} key={index}>{reason.label}</option>
                                                ))
                                            }
                                        </select>
                                    </div>
                                    <div className="mt-6">
                                        <label className="block" htmlFor="">商談を開始できない理由</label>
                                        <textarea 
                                            disabled={!firstStepForm.data.editable || firstStepForm.data.value == 1} 
                                            onChange={(e) => handleSetData(firstStepForm, 'change_reason', e.target.value)} 
                                            className="w-full mt-2 border border-gray-200"
                                            defaultValue = { firstStepForm.data.change_reason }>
                                        </textarea>
                                        <p className="text-xs mt-2">※商談を開始できない理由を紹介様へ通知されます。</p>
                                    </div>
                                </StatusAccordian>
                                <StatusAccordian
                                    status={data.status} 
                                    title='商談中' 
                                    date={getScheduleDate(0)} 
                                    currentStatus={0}
                                    disabled={data.status > 0 || !firstStepForm.data.editable}
                                    openable={false}
                                >
                                </StatusAccordian>
                                <StatusAccordian
                                    status={data.status} 
                                    title='商談結果報告' 
                                    date={formatDateHm(data.schedules[1]?.updated_at_date)} 
                                    currentStatus={1}
                                    disabled={data.status >= 2}
                                    openable={true}
                                >
                                    <label htmlFor="contract" className="mt-4 block">
                                        <input 
                                            type="radio" 
                                            disabled={!secondStepForm.data.editable} 
                                            name="contract" 
                                            id="contract" 
                                            value={1} 
                                            checked={secondStepForm.data.value == 1}
                                            onChange={(e) => handleSetData(secondStepForm, 'value', Number(e.target.value))}
                                            className="mr-4"/>
                                        <span className="text-sm">成立</span>
                                    </label>
                                    <p className="mt-3">
                                        お客様とサービス提供について契約を締結された日をご選択ください
                                    </p>
                                    <input 
                                        type="date"
                                        disabled={!secondStepForm.data.editable || secondStepForm.data.value != 1} 
                                        onChange={(e) => handleSetData(secondStepForm, 'accepted_at', e.target.value)}
                                        defaultValue={convertDate(secondStepForm.data.accepted_at)}
                                        name="contract"
                                        className="border border-gray-200 mt-4"  />
                                    <div className="bg-red-100 p-4 mt-4 text-xs">
                                        ※紹介を受けた方へサービスの提供が約束された目から、本取引紹介者への紹介手数料支払い業務が生じます。お客様と交わされた契約書類または領収書記載の期日を正確に申告してください。
                                    </div>
                                    <Link href="./" className="text-primary block text-xs mt-4 flex items-center justify-start">サービス提供契約の締結日とは<ArrowIcon className="rotate-45" size="4" color="#3370ff" /></Link>
                
                                    <div className="mt-6">
                                        <label htmlFor="">取引総額<span className="text-xs">（紹介された方が支払いされた費用）</span></label>
                                        <div className="mt-2 flex items-start text-lg">
                                            <div className="flex-1 mr-2 relative">
                                                <input 
                                                    type="text" 
                                                    disabled={!secondStepForm.data.editable || secondStepForm.data.value != 1} 
                                                    onChange={(e) => changeTotalAmount(e.target.value)} 
                                                    value={`${secondStepForm.data.total_amount == 0 ? '': '¥'}${formatNumber(secondStepForm.data.total_amount)}`} 
                                                    className="block w-full border border-gray-200 text-right pr-4 text-[18px]" />
                                                <p className="text-xs text-right mt-2">消費税（{ tax_rate }％）¥{formatNumber(secondStepForm.data.fee_amount)}</p>
                                            </div>
                                            <div className="mt-2 text-sm">税込</div>
                                        </div>
                                        <div className="mt-2 flex items-start text-lg">
                                            <div className="mt-2 mr-2 text-sm w-1/4">取引額</div>
                                            <div className="flex-1 mr-2 relative">
                                                <input 
                                                    disabled
                                                    type="text" 
                                                    className="block w-full border border-gray-200 text-right disabled text-transparent"
                                                    defaultValue={secondStepForm.data.sales_amount}/>
                                                <span className="absolute top-2 right-2 pointer-events-none">{secondStepForm.data.sales_amount == 0 ? '' : `¥${ formatNumber(secondStepForm.data.sales_amount) }`}</span>
                                            </div>
                                            <div className="mt-2 text-sm">税込</div>
                                        </div>
                                        <div className="mt-4 flex items-start text-lg">
                                            <div className="mt-2 mr-2 text-sm w-1/4">紹介手数料</div>
                                            <div className="flex-1 mr-2 relative">
                                                <input 
                                                    disabled
                                                    type="text" 
                                                    className="block w-full border border-gray-200 text-right disabled text-transparent" 
                                                    defaultValue={secondStepForm.data.bill_amount} />
                                                <span className="absolute top-2 right-2 pointer-events-none">{secondStepForm.data.bill_amount == 0 ? '' : `￥${formatNumber(secondStepForm.data.bill_amount)}`}</span>
                                                <p className="text-xs text-right mt-2">内消費税（10％）¥{formatNumber(Math.round(secondStepForm.data.bill_amount*0.1))}</p>
                                            </div>
                                            <div className="mt-2 text-sm">税込</div>
                                        </div>
                                        <div className="mt-6 border-t-2 border-primary p-2 px-4 bg-gray-100 pb-12">
                                            <p className="text-base mt-4">
                                                100万円以上の取引の場合
                                            </p>
                                            <p className="text-base flex justify-between items-center mt-2">
                                                <span>請求書の添付が必要です。</span>
                                                <span className="bg-rose-600 rounded-md text-white px-2 py-1 text-xs">
                                                    必修
                                                </span>
                                            </p>
                                            <p className="text-sm mt-4">
                                                お写真撮影時には、お客様の個人情報が写り込まないよう、付箋や紙をかぶせて隠すようにしてください。
                                            </p>
                                            <Link href="./" className="text-primary block text-xs mt-4 flex items-center justify-start">100万円を超えるお取引について<ArrowIcon className="rotate-45" size="4" color="#3370ff" /></Link>
                                            
                                        </div>
                                        <div className="mt-6 border-t-2 border-primary p-2 px-4 bg-gray-100 pb-12">
                                            <p className="text-base mt-4">
                                                請求書をプレビューする
                                            </p>
                                            <p className="text-sm mt-4 text-rose-500">
                                                「請求書確定」ボタンを押すとJOBSCAPEへのお支払いが確定し、請求書が発行されます。プレビューにて請求書をご確認のうえ、お進みください。
                                            </p>
                                            <Link href="./" className="text-primary block text-xs mt-4 flex items-center justify-start">お支払いいついて<ArrowIcon className="rotate-45" size="4" color="#3370ff" /></Link>
                                            <button className="bg-white mt-4 relative w-full py-3 text-md text-primary text-center flex items-center justify-center border border-blue-600 rounded-full cursor-pointer">
                                                プレビュー
                                            </button>
                                        </div>
                                    </div>

                                    <label htmlFor="uncontract" className="mt-8 block" >
                                        <input 
                                            type="radio" 
                                            disabled={!secondStepForm.data.editable } 
                                            name="contract" 
                                            id="uncontract"
                                            value={2}
                                            checked={secondStepForm.data.value == 2}
                                            onChange={(e) => handleSetData(secondStepForm, 'value', e.target.value)}
                                            className="mr-4" 
                                        />
                                        <span className="text-sm">不成立</span>
                                    </label>
                                    <select 
                                        disabled={!secondStepForm.data.editable || secondStepForm.data.value != 2} 
                                        onChange={(e) => handleSetData(secondStepForm, 'canceled_reason', e.target.value)}
                                        className="border border-gray-200 mt-4"                                    
                                        defaultValue = { secondStepForm.data.canceled_reason }>
                                        {
                                            notCompleteReasons.map((reason, index) => (
                                                <option value={reason.value} key={index}>{reason.label}</option>
                                            ))
                                        }
                                    </select>
                                    <div className="mt-4">
                                        <label className="" htmlFor="">不成立理由詳細</label>
                                        <textarea 
                                            disabled={!secondStepForm.data.editable || secondStepForm.data.value != 2} 
                                            rows="3"
                                            onChange={(e) => handleSetData(secondStepForm, 'change_reason', e.target.value)} 
                                            className="mt-2 block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                                            defaultValue={secondStepForm.data.change_reason}></textarea>
                                        <p className="text-xs mt-2">※不成立理由は紹介様へ通知されます。</p>
                                    </div>
                                </StatusAccordian>
                                <StatusAccordian
                                    status={data.status} 
                                    title='成立・不成立' 
                                    date={data.schedules[1]?.value == 1 ? formatDate(data.accepted_at) + " 00:00" : data.schedules[1]?.value == 2 ? getScheduleDate(3) : ''} 
                                    currentStatus={2}
                                    disabled={data.status >= 2}
                                    openable={false}
                                >
                                </StatusAccordian>
                                <StatusAccordian
                                    status={data.status} 
                                    title='支払報告' 
                                    date={getScheduleDate(2)} 
                                    currentStatus={2}
                                    disabled={data.status == 4}
                                    openable={true}
                                    notag={true}
                                >
                                    <div className="mt-4 flex items-center justify-between">
                                        <label htmlFor="payed_report" className="flex items-center">
                                            <input 
                                                type="checkbox" 
                                                id="payed_report" 
                                                value="1" 
                                                disabled={!thirdStepForm.data.editable}
                                                onChange={(e) => handleSetData(thirdStepForm, 'value', e.target.checked ? 1 : 0)} 
                                                checked={thirdStepForm.data.value === 1} 
                                                className="mr-3" 
                                            />
                                            請求額を支払いしました。
                                        </label>
                                    </div>
                                </StatusAccordian>
                                <StatusAccordian
                                    status={status} 
                                    title='完了' 
                                    date={getScheduleDate(5)} 
                                    currentStatus={5}
                                    disabled={data.status > 4}
                                    openable={false}
                                    notag={true}
                                >
                                </StatusAccordian>
                            </div>
                        </CustomCard>
                    </div>
                    <div className="w-full md:w-2/6 mb-5">
                        <div className={'mt-6 bg-white rounded-lg px-4 md:px-8 pb-4 md:pb-8 pt-4 shadow-[0_0_10px_0_rgba(0,0,0,0.1)]'}>   
                            <div className="flex justify-end items-center">
                                {formatDateHm(proposeForm.data.propose_updated_at)} 
                            </div>
                            <div className="flex justify-between items-center my-4">
                                <h3 className="text-[18px] font-bold">取引完了予定日</h3>
                                <p className="flex flex-col md:flex-row text-[18px]">
                                    { formatDate(data.proposed_at) } 
                                </p>
                            </div>
                            {
                                order.data.propose_updated_at? <p>1回目：{formatDate(order.data.created_at)}</p> : <></>
                            }
                            {
                                order.data.propose_updated_at? <p>2回目：{formatDate(order.data.propose_updated_at)}</p> : <></>
                            }

                            {
                                order.data.propose_updated_at? 
                                    <div className="mt-6">
                                        <label className="block" htmlFor="">変更理由</label>
                                        <div className="w-full mt-2 whitespace-pre">
                                            {order.data.propose_update_reason}
                                        </div>
                                    </div> : <></>
                            }
                        </div>
                        {
                            data.schedules?.map((schedule, index) => (
                                <ScheduleCard key={index} data={order.data} schedule={schedule} />
                            ))
                        }
                    </div>
                </div>
            </div>
        </AdminAuthLayout>
    );
}