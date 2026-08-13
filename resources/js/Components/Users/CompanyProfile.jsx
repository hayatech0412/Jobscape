import ShieldWithCheck from "@/Components/Icons/ShieldWithCheck";
import CheckIcon from "../Icons/CheckIcon";

export default function CompanyProfile({company}) {
    return (
        <div className="md:flex justify-start items-center mb-4">
            <div className="flex items-center gap-4">
                <img src={company.user?.avatar_url ?? '/assets/images/no-user.png'} alt="Profile" className="w-20 h-20 rounded-full object-cover" />

                <div className="">
                    <div className="text-base font-semibold flex items-center gap-2">
                        <span>{company?.nickname}</span>
                    </div>

                    <div>
                        <ul className='flex items-center'>
                            { company?.coporate_code && <li className='flex items-center mr-4'>
                                法人確認済み <ShieldWithCheck className="text-[#00b364] size-6 ml-2" />
                            </li> }
                            <div className="flex items-center jsutify-start leading-none py-1 gap-1">
                                <span className="text-[12px] text-[#666666]">
                                    実績
                                </span>
                                <span className='font-bold text-[20px] px-1 text-[#333333]'>
                                    {company?.performance_count}
                                </span>
                                <span className="text-[12px] text-[#666666]">
                                    件
                                </span>
                            </div>
                        </ul>
                    </div>
                </div>
            </div>

        </div>
    )
}
