import React, { useState, useEffect, useRef } from "react";

export default function DateRangePicker(props) {
    const [currentDate, setCurrentDate] = useState(new Date());
    const [selectedStartDate, setSelectedStartDate] = useState(null);
    const [selectedEndDate, setSelectedEndDate] = useState(null);
    const [isOpen, setIsOpen] = useState(false);

    const datepickerRef = useRef(null);

    const renderCalendar = () => {
        const year = currentDate.getFullYear();
        const month = currentDate.getMonth();

        const firstDayOfMonth = new Date(year, month, 1).getDay();
        const daysInMonth = new Date(year, month + 1, 0).getDate();
        const daysArray = [];

        for (let i = 0; i < firstDayOfMonth; i++) {
            daysArray.push(<div key={`empty-${i}`}></div>);
        }

        for (let i = 1; i <= daysInMonth; i++) {
            const day = new Date(year, month, i);
            const dayString = day.toLocaleDateString("ja");
            let className =
                "flex items-center justify-center cursor-pointer w-[46px] h-[46px] rounded-full text-slate-500 hover:bg-primary hover:text-white";

            if (selectedStartDate && dayString === selectedStartDate) {
                className += " bg-primary text-white rounded-r-none";
            }
            if (selectedEndDate && dayString === selectedEndDate) {
                className += " bg-primary text-white rounded-l-none";
            }
            if (
                selectedStartDate &&
                selectedEndDate &&
                new Date(day) > new Date(selectedStartDate) &&
                new Date(day) < new Date(selectedEndDate)
            ) {
                className += " bg-slate-600 text-white rounded-none";
            }

            daysArray.push(
                <div
                    key={i}
                    className={className}
                    data-date={dayString}
                    onClick={() => handleDayClick(dayString)}
                >
                    {i}
                </div>
            );
        }

        return daysArray;
    };

    const handleDayClick = (selectedDay) => {
        if (!selectedStartDate || (selectedStartDate && selectedEndDate)) {
            setSelectedStartDate(selectedDay);
            setSelectedEndDate(null);
        } else {
            if (new Date(selectedDay) < new Date(selectedStartDate)) {
                setSelectedEndDate(selectedStartDate);
                setSelectedStartDate(selectedDay);
            } else {
                setSelectedEndDate(selectedDay);
            }
        }
    };

    const updateInput = () => {
        if (props.currentPeriod !== "") {
            return props.currentPeriod
        } else if (selectedStartDate && selectedEndDate) {
            return `${selectedStartDate} - ${selectedEndDate}`;
        } else if (selectedStartDate) {
            return selectedStartDate;
        } else {
            return "";
        }
    };

    const toggleDatepicker = () => {
        setIsOpen(!isOpen);
    };

    const handleApply = () => {
        console.log("Applied:", selectedStartDate, selectedEndDate);
        props.onChangeDate(selectedStartDate, selectedEndDate);
        setIsOpen(false);
    };

    const handleCancel = () => {
        setSelectedStartDate(null);
        setSelectedEndDate(null);
        props.onChangeDate(null, null);
        setIsOpen(false);
    };

    const handleDocumentClick = (e) => {
        if (
            datepickerRef.current &&
            !datepickerRef.current.contains(e.target)
        ) {
            setIsOpen(false);
        }
    };

    useEffect(() => {
        document.addEventListener("click", handleDocumentClick);

        return () => {
            document.removeEventListener("click", handleDocumentClick);
        };
    }, []);

    return (
        <section className="w-full bg-white rounded-lg">
            <div className="container">
                <div className="-mx-4 flex flex-wrap">
                    <div className="w-full px-4">
                        <div className="relative" ref={datepickerRef}>
                            <div className="relative flex items-center">
                                <span className="absolute left-0 pl-4 text-slate-500">
                                    最終発生日<span className="ml-6">▼</span>
                                </span>

                                <input
                                    id="datepicker"
                                    type="text"
                                    placeholder="期間を選択してください"
                                    className="w-full rounded-lg border border-stroke bg-transparent py-2.5 pl-[140px] pr-8 text-slate-500 outline-none transition focus:border-primary "
                                    value={updateInput()}
                                    onClick={toggleDatepicker}
                                    readOnly
                                />

                                <span
                                    className="absolute right-0 cursor-pointer pr-4 text-slate-500"
                                    onClick={toggleDatepicker}
                                >
                                    <svg
                                        className="fill-current stroke-current"
                                        width="16"
                                        height="16"
                                        viewBox="0 0 16 16"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path
                                            d="M2.29635 5.15354L2.29632 5.15357L2.30055 5.1577L7.65055 10.3827L8.00157 10.7255L8.35095 10.381L13.701 5.10603L13.701 5.10604L13.7035 5.10354C13.722 5.08499 13.7385 5.08124 13.7499 5.08124C13.7613 5.08124 13.7778 5.08499 13.7963 5.10354C13.8149 5.12209 13.8187 5.13859 13.8187 5.14999C13.8187 5.1612 13.815 5.17734 13.7973 5.19552L8.04946 10.8433L8.04945 10.8433L8.04635 10.8464C8.01594 10.8768 7.99586 10.8921 7.98509 10.8992C7.97746 10.8983 7.97257 10.8968 7.96852 10.8952C7.96226 10.8929 7.94944 10.887 7.92872 10.8721L2.20253 5.2455C2.18478 5.22733 2.18115 5.2112 2.18115 5.19999C2.18115 5.18859 2.18491 5.17209 2.20346 5.15354C2.222 5.13499 2.2385 5.13124 2.2499 5.13124C2.2613 5.13124 2.2778 5.13499 2.29635 5.15354Z"
                                            fill=""
                                            stroke=""
                                        />
                                    </svg>
                                </span>
                            </div>

                            {isOpen && (
                                <div
                                    id="datepicker-container"
                                    className="shadow-datepicker absolute mt-2 rounded-xl border border-stroke bg-white pt-5 z-50 "
                                >
                                    <div className="flex items-center justify-between px-5">
                                        <button
                                            id="prevMonth"
                                            className="rounded-md px-2 py-2 text-slate-700 hover:bg-gray-2 "
                                            onClick={() =>
                                                setCurrentDate(
                                                    new Date(
                                                        currentDate.setMonth(
                                                            currentDate.getMonth() -
                                                                1
                                                        )
                                                    )
                                                )
                                            }
                                        >
                                            <svg
                                                className="fill-current"
                                                width="20"
                                                height="20"
                                                viewBox="0 0 20 20"
                                                fill="none"
                                                xmlns="http://www.w3.org/2000/svg"
                                            >
                                                <path
                                                    d="M13.5312 17.9062C13.3437 17.9062 13.1562 17.8438 13.0312 17.6875L5.96875 10.5C5.6875 10.2187 5.6875 9.78125 5.96875 9.5L13.0312 2.3125C13.3125 2.03125 13.75 2.03125 14.0312 2.3125C14.3125 2.59375 14.3125 3.03125 14.0312 3.3125L7.46875 10L14.0625 16.6875C14.3438 16.9688 14.3438 17.4062 14.0625 17.6875C13.875 17.8125 13.7187 17.9062 13.5312 17.9062Z"
                                                    fill=""
                                                />
                                            </svg>
                                        </button>

                                        <div
                                            id="currentMonth"
                                            className="text-lg font-medium text-slate-500 "
                                        >
                                            {currentDate.toLocaleDateString(
                                                "ja",
                                                {
                                                    month: "long",
                                                    year: "numeric",
                                                }
                                            )}
                                        </div>

                                        <button
                                            id="nextMonth"
                                            className="rounded-md px-2 py-2 text-slate-700 hover:bg-gray-2 "
                                            onClick={() =>
                                                setCurrentDate(
                                                    new Date(
                                                        currentDate.setMonth(
                                                            currentDate.getMonth() +
                                                                1
                                                        )
                                                    )
                                                )
                                            }
                                        >
                                            <svg
                                                className="fill-current"
                                                width="20"
                                                height="20"
                                                viewBox="0 0 20 20"
                                                fill="none"
                                                xmlns="http://www.w3.org/2000/svg"
                                            >
                                                <path
                                                    d="M6.46875 17.9063C6.28125 17.9063 6.125 17.8438 5.96875 17.7188C5.6875 17.4375 5.6875 17 5.96875 16.7188L12.5312 10L5.96875 3.3125C5.6875 3.03125 5.6875 2.59375 5.96875 2.3125C6.25 2.03125 6.6875 2.03125 6.96875 2.3125L14.0313 9.5C14.3125 9.78125 14.3125 10.2187 14.0313 10.5L6.96875 17.6875C6.84375 17.8125 6.65625 17.9063 6.46875 17.9063Z"
                                                    fill=""
                                                />
                                            </svg>
                                        </button>
                                    </div>

                                    <div className="mb-4 mt-6 grid grid-cols-7 gap-2 px-5">
                                        {[
                                            "日曜",
                                            "月曜",
                                            "火曜",
                                            "水曜",
                                            "木曜",
                                            "金曜",
                                            "土曜",
                                        ].map((day) => (
                                            <div
                                                key={day}
                                                className="text-center text-sm font-medium text-secondary-color"
                                            >
                                                {day}
                                            </div>
                                        ))}
                                    </div>

                                    <div
                                        id="days-container"
                                        className="mt-2 grid grid-cols-7 gap-y-0.5 px-5"
                                    >
                                        {renderCalendar()}
                                    </div>

                                    <div className="mt-5 flex justify-end space-x-2.5 border-t border-stroke p-5 ">
                                        <button
                                            id="cancelButton"
                                            className="rounded-lg border border-primary px-5 py-2.5 text-base font-medium text-primary hover:bg-blue-light-5"
                                            onClick={handleCancel}
                                        >
                                            キャンセル
                                        </button>
                                        <button
                                            id="applyButton"
                                            className="rounded-lg bg-primary px-5 py-2.5 text-base font-medium text-white hover:bg-[#1B44C8]"
                                            onClick={handleApply}
                                        >
                                            選択
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
