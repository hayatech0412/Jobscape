import CheckCircleIcon from "../Icons/CheckCircleIcon";
import CheckOutlineCircleIcon from "../Icons/CheckOutlineCircleIcon";

export default function StatusProgress({ status, currentStatus, statusText }) {
    const getStatus = () => {
        if (status === currentStatus) {
            return <div className="text-center flex-1 flex justify-center items-center flex-col relative">
                        <CheckCircleIcon className="relative z-10 bg-[#f1f1f1] rounded-full p-0" size="8" color="#3370fe"></CheckCircleIcon>
                        {
                            currentStatus !== 4 && <div className="w-full top-[16px] left-1/2 bg-[#e1e1e1] h-[2px] absolute z-0" ></div>
                        }
                        <p className="text-primary text-xs md:text-sm">{statusText}</p>
                    </div>;
        } else if (status > currentStatus) {
            return <div className="text-center flex-1 flex justify-center items-center flex-col relative">
                        <CheckOutlineCircleIcon className="relative z-10 bg-[#f1f1f1] rounded-full p-0" fill="white" color="#3370fe" size="8"></CheckOutlineCircleIcon>
                        <div className="w-full top-[16px] left-1/2 bg-[#3370fe] h-[2px] absolute z-0" ></div>
                        <p className="text-primary text-xs md:text-sm">{statusText}</p>
                    </div>;
        } else if (status < currentStatus) {
            return <div className="text-center flex-1 flex justify-center items-center flex-col relative">
                        <CheckOutlineCircleIcon className="relative z-10 bg-[#f1f1f1] rounded-full p-0" fill="white" color="#d3d3d3" size="8"></CheckOutlineCircleIcon>
                        {
                            currentStatus !== 4 &&  <div className="w-full top-[16px] left-1/2 bg-[#e1e1e1] h-[2px] absolute z-0" ></div>
                        }
                        <p className="text-gray-300 text-xs md:text-sm">{statusText}</p>
                    </div>
        }
    }
    return (
        <>{getStatus()}</>
    );
}