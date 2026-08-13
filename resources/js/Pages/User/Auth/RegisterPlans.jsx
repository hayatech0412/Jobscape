import GuestLayout from '@/Layouts/GuestLayout';
import { Link, useForm, usePage } from '@inertiajs/react';
import BackButton from '@/Components/BackButton';
import ArrowRightTop from '@/Components/Icons/ArrowRightTop';

export default function RegisterPlans({
    isMonitor,
    plans,
    topPlan,
    planType,
    currentType
}) {
    const { data, setData, post, processing, errors, reset } = useForm({
        plan_id: '',
        is_trial: 0,
    });

    const submit = (e, plan_id) => {
        e.preventDefault();
        
        data.plan_id = plan_id;

        post(route('register.plans.store'), {
            onFinish: () => {},
        });
    };

    const trialSubmit = (plan_id) => {
        data.plan_id = plan_id;
        data.is_trial = 1;
    
        post(route('register.plans.store'), {
            onFinish: () => {
            },
        });
    };

    const formatNumber = (number) => {
        return new Intl.NumberFormat().format(number);
    }

    return (
        <GuestLayout>                    
            <div className="px-[4%] lg:px-8">
                <BackButton className="w-6 h-6 my-6"></BackButton>
            </div>
            <div className="w-[92%] max-w-[1074px] mx-auto mb-40">
                <div className="">
                    <div className="text-center text-[22px] mb-8">プランを選択する</div>
                    <p className="text-center text-[12px]">基本利用は¥300から</p>
                    <p className="text-center text-[12px] mb-10">用途に応じて柔軟にアップグレードできます</p>   

                    <div className="flex justify-center mb-16">
                        <div className="flex items-center gap-2 w-72 h-10 rounded-full bg-gray-200 p-[5px] text-[12px]">
                            <Link 
                                href={route('register.plans') + '?type=' + planType.MONTHLY}
                                className={ (currentType == planType.MONTHLY ? "bg-white " : "") + "  h-full w-1/2 rounded-full flex items-center justify-center cursor-pointer"}
                            >
                                月次請求
                            </Link>
                            <Link 
                                href={route('register.plans') + '?type=' +  planType.YEARLY}
                                className={(currentType == planType.YEARLY ? "bg-white " : "") + " h-full w-1/2 rounded-full flex items-center justify-center cursor-pointer"}
                            >
                                年次請求<span className="text-[#ff5256]">10%オフ</span>
                            </Link>
                        </div>
                    </div>

                    <div className="grid gap-0 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 sm:gap-2">
                        {plans.map((plan) => {
                            if (plan.reward_rate === 70 && !isMonitor) {
                                return;
                            }
                            
                            return (
                                <div 
                                    key={plan.id}
                                    className={
                                        "flex h-[560px] mb-4 flex-col justify-between px-6 pt-10 pb-12 shadow-lg bg-white rounded-lg relative " + 
                                        (plan.name === 'スタンダード' ? 'border-2 border-[#3370ff]' : '')
                                    }
                                >
                                    <div className="">
                                        <div className={plan.name === 'スタンダード' ? '' : 'hidden'}>
                                            <div className="absolute top-[-10px] right-[-2px] bg-[#3370ff] text-white text-[12px] px-2 py-1 rounded-bl-lg rounded-tr-lg">一番人気！</div>
                                        </div>

                                        <div className="text-[18px] text-center mt-10 mb-2">{plan.label}</div>
                                        <div className="text-[14px] text-center mt-8 mb-2">表示紹介手数料の</div>
                                        <div className="flex justify-center items-center">
                                            <span className="text-[#3370ff] mb-2 relative text-center leading-none font-semibold text-[50px]">
                                                {plan.reward_rate}
                                                <span className="text-[24px] absolute -right-6 bottom-1">%</span>
                                            </span>
                                        </div>
                                        <div className="text-[14px] text-center pb-8">が受け取れる</div>
                                        <div className="w-[92%] max-w-[100px] mx-auto border-b border-gray-200 mb-8"></div>

                                        <div className="text-[#3370ff] text-[18px] mb-3 text-center">{plan.name}</div>
                                        <div className="leading-none flex justify-center items-baseline mb-3">
                                            <span className="text-[18px]">¥ </span>
                                            <span className="text-[30px] font-semibold">{formatNumber(plan.amount)}</span>
                                            <span className="text-[14px]"> /{plan.type == planType.MONTHLY ? '月' : '年'}</span>
                                        </div>
                                        <div className="leading-none flex justify-center items-baseline mb-4 text-[14px]">
                                            <span className="">¥ </span>
                                            <span className=" font-semibold">{formatNumber(plan.amount * 1.1)} </span>
                                            <span className="">（税込）</span>
                                        </div>
                                    </div>

                                    {plan.name === 'トライアル' ? (
                                        <div className="bg-[#ff5256] absolute top-0 right-0 w-20 h-20 rounded-full flex justify-center items-center text-white text-center text-[14px] mb-3">
                                            10日間<br />無料あり
                                        </div>
                                    ) : ''}

                                    {plan.name === 'トライアル' ? (
                                        <div onClick={ () => {trialSubmit(plan.id) } } className="text-[#ff5256] flex justify-center items-center text-center text-[16px] mb-3 cursor-pointer">
                                            10日間無料で試す<ArrowRightTop className="w-4 h-4"></ArrowRightTop>
                                        </div>
                                    ) : ''}

                                    <button 
                                        onClick={(e) => submit(e, plan.id)} 
                                        className={
                                            "rounded-full w-full flex justify-center items-center text-[12px] h-12 hover:opacity-85 " + 
                                            (plan.name === 'スタンダード' ? 'bg-[#3370ff] text-white' : 'border-2 border-[#3370ff] text-[#3370ff]')
                                        }
                                    >
                                        プランを選ぶ
                                    </button>
                                </div>
                            )
                        })}
                    </div>
                    <div className="text-[11px] mt-4 mb-3">
                        ※年次でのお支払いの場合、途中解約された場合でも返金いたしかねます。
                    </div>
                    <div className="text-[11px] mb-3">
                        ※プレミアムプランのサポート内容に付きましては<Link className="text-[#3370ff]">お問い合わせ</Link>くださいませ。
                    </div>
                    <Link className="flex text-[11px] text-[#3370ff]">プランについて詳しく見る<ArrowRightTop className="size-3" ></ArrowRightTop></Link>
                </div>
            </div>
        </GuestLayout>
    );
}
