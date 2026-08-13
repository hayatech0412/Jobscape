import dayjs from "dayjs";

export default function ScheduleCard({ schedule, data }) {
    const getTitle = () => {
        switch (schedule.status) {
            case 0:
                return '対応状況'
            case 1:
                return '商談結果報告'
            case 2:
                return '支払報告';
            default:
                break;
        }
    }
    
    const formatDate = (dateString) => {
        if (dateString) {
            return dayjs(dateString).format("YYYY/MM/DD");
        } else {
            return '';
        }
    }
    
    switch (schedule.status) {
        case 0:
            return <div className={'mt-6 bg-white rounded-lg px-8 pb-8 pt-4 shadow-[0_0_10px_0_rgba(0,0,0,0.1)]'}>
                        <div className="flex justify-end items-center">
                            <p>{schedule.schedule_date}</p>
                        </div>
                        <h3 className="text-xl font-bold py-4">{getTitle()}</h3>
                        <div className="items-start">
                            <p>{schedule.value == 2 ? '開始できません。' : '開始しました。'}</p>
                        </div>
                        {
                            schedule.value == 2 ? <>
                                    <h4 className="text-lg font-bold py-2 mt-4">
                                        理由（選択）
                                    </h4>
                                    <p className="text-xs">{schedule.canceled_reason_text}</p>
                                    <h4 className="text-lg font-bold py-2 mt-4">
                                        理由
                                    </h4>
                                    <p className="text-xs">{schedule.change_reason}</p>
                                </> : <></>
                        }
                    </div>
        case 1:
            return <div className={'mt-6 bg-white rounded-lg px-8 pb-8 pt-4 shadow-[0_0_10px_0_rgba(0,0,0,0.1)]'}>
                        <div className="flex justify-end items-center">
                            <p>{schedule.schedule_date}</p>
                        </div>
                        <h3 className="text-xl font-bold py-4">{getTitle()}</h3>
                        <div className="items-start">
                            <p>{schedule.canceled_reason ? '不成立' : '成立'}</p>
                        </div>
                        {
                            schedule.canceled_reason ? 
                                <>
                                    <h4 className="text-lg font-bold py-2 mt-4">
                                        理由（選択）
                                    </h4>
                                    <p className="text-xs">{schedule.canceled_reason_text}</p>
                                    <h4 className="text-lg font-bold py-2 mt-4">
                                        理由
                                    </h4>
                                    <p className="text-xs">{schedule.change_reason}</p>
                                </> :
                                <>
                                    <div className="flex mt-4">
                                        <div className="w-1/2">紹介手数料</div>
                                        <div className="w-1/2">¥{data.bill_amount}</div>
                                    </div>
                                    <div className="flex mt-2">
                                        <div className="w-1/2">内消費税</div>
                                        <div className="w-1/2">¥{data.fee_amount}</div>
                                    </div>
                                    <div className="flex mt-2">
                                        <div className="w-1/2 text-base">支払い総額</div>
                                        <div className="w-1/2 text-rose-500 font-bold text-lg">¥{data.total_amount}</div>
                                    </div>
                                    <div className="">
                                        <button className="bg-rose-600 text-white rounded-md flex items-center justify-center w-full py-3 font-bold mt-6">
                                            最終支払期間 : {formatDate(data.proposed_at)}
                                        </button>
                                    </div>
                                </>
                        }
                    </div>
        case 2:
            return <div className={'mt-6 bg-white rounded-lg px-8 pb-8 pt-4 shadow-[0_0_10px_0_rgba(0,0,0,0.1)]'}>
                        <div className="flex justify-end items-center">
                            <p>{schedule.schedule_date}</p>
                        </div>
                        <h3 className="text-xl font-bold py-4">{getTitle()}</h3>
                        <div className="items-start">
                            <p>請求額を支払いました</p>
                        </div>
                    </div>
    
        default:
            break;
    }
    
}