import React, { useState, useEffect, useRef } from "react";

export default function DateSimplePicker(props) {
    const [currentDate, setCurrentDate] = useState(
        props.value ? new Date(props.value) : new Date()
    );
    const [selectedDate, setSelectedDate] = useState(
        props.value
            ? `${new Date(props.value).getFullYear()}/${
                  new Date(props.value).getMonth() + 1
              }/${new Date(props.value).getDate()}`
            : null
    );
    const [isCalendarOpen, setIsCalendarOpen] = useState(false);
    const daysContainerRef = useRef(null);
    const datepickerContainerRef = useRef(null);

    useEffect(() => {
        if (daysContainerRef.current) {
            renderCalendar();
        }
    }, [currentDate, isCalendarOpen]);

    const renderCalendar = () => {
        const year = currentDate.getFullYear();
        const month = currentDate.getMonth();
        const firstDayOfMonth = new Date(year, month, 1).getDay();
        const daysInMonth = new Date(year, month + 1, 0).getDate();

        const daysContainer = daysContainerRef.current;
        daysContainer.innerHTML = "";

        for (let i = 0; i < firstDayOfMonth; i++) {
            const emptyDiv = document.createElement("div");
            daysContainer.appendChild(emptyDiv);
        }

        for (let i = 1; i <= daysInMonth; i++) {
            const dayDiv = document.createElement("div");
            dayDiv.className =
                "flex h-[38px] w-[38px] items-center justify-center rounded-[7px] border-[.5px] border-transparent text-slate-700 hover:border-stroke hover:bg-gray-300 sm:h-[32px] sm:w-[33px] mb-2 hover:cursor-pointer";
            dayDiv.textContent = i;
            dayDiv.addEventListener("click", () => {
                const selectedDateValue = `${year}/${month + 1}/${i}`;
                setSelectedDate(selectedDateValue);
                daysContainer
                    .querySelectorAll("div")
                    .forEach((d) =>
                        d.classList.remove("bg-primary", "text-white")
                    );
                dayDiv.classList.add("bg-primary", "text-white");
                console.log(selectedDateValue);
                props.onSelectedDate(props.name, selectedDateValue);
            });
            daysContainer.appendChild(dayDiv);
        }
    };

    const handlePrevMonth = () => {
        setCurrentDate(
            (prevDate) => new Date(prevDate.setMonth(prevDate.getMonth() - 1))
        );
    };

    const handleNextMonth = () => {
        setCurrentDate(
            (prevDate) => new Date(prevDate.setMonth(prevDate.getMonth() + 1))
        );
    };

    const handleApply = () => {
        if (selectedDate) {
            console.log(selectedDate);
            props.onSelectedDate(props.name, selectedDate);
            setIsCalendarOpen(false);
        }
    };

    const handleCancel = () => {
        props.onSelectedDate(props.name, "");
        setSelectedDate(null);
        setIsCalendarOpen(false);
    };

    const handleToggleCalendar = () => {
        setIsCalendarOpen(!isCalendarOpen);
    };

    const handleClickOutside = (event) => {
        if (
            datepickerContainerRef.current &&
            !datepickerContainerRef.current.contains(event.target) &&
            event.target.id !== "datepicker" &&
            event.target.id !== "toggleDatepicker"
        ) {
            setIsCalendarOpen(false);
        }
    };

    useEffect(() => {
        document.addEventListener("click", handleClickOutside);
        return () => {
            document.removeEventListener("click", handleClickOutside);
        };
    }, []);

    return (
        <section className="w-full bg-white">
            <div className="mx-auto w-full relative">
                <div className="relative">
                    <input
                        id="datepicker"
                        type="text"
                        name={props.name}
                        // placeholder={props.label + "を選択してください"}
                        className={`h-12 w-full appearance-none rounded border bg-white pl-4 pr-4 text-slate-700 outline-none text-[14px] ${
                            props.isDisabled
                                ? "disabled:cursor-not-allowed disabled:text-gray-300 disabled:border-gray-200"
                                : "border-gray-300 "
                        }`}
                        value={selectedDate || ""}
                        readOnly
                        disabled={props.isDisabled}
                        onClick={handleToggleCalendar}
                    />
                </div>

                {isCalendarOpen && !props.isDisabled && (
                    <div
                        ref={datepickerContainerRef}
                        id="datepicker-container"
                        className="z-50 absolute top-13 left-0 flex max-w-[360px] flex-col rounded-xl bg-white p-2 shadow-lg sm:p-[10px]"
                    >
                        <div className="flex items-center justify-between pb-4">
                            <button
                                type="button"
                                id="prevMonth"
                                className="flex h-[38px] w-[38px] cursor-pointer items-center justify-center text-slate-700 sm:h-[36px] sm:w-[36px]"
                                onClick={handlePrevMonth}
                            >
                                <svg
                                    width="18"
                                    height="18"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="fill-current"
                                >
                                    <path d="M16.2375 21.4875C16.0125 21.4875 15.7875 21.4125 15.6375 21.225L7.16249 12.6C6.82499 12.2625 6.82499 11.7375 7.16249 11.4L15.6375 2.77498C15.975 2.43748 16.5 2.43748 16.8375 2.77498C17.175 3.11248 17.175 3.63748 16.8375 3.97498L8.96249 12L16.875 20.025C17.2125 20.3625 17.2125 20.8875 16.875 21.225C16.65 21.375 16.4625 21.4875 16.2375 21.4875Z" />
                                </svg>
                            </button>

                            <span
                                id="currentMonth"
                                className="text-xl font-medium capitalize text-slate-700"
                            >
                                {currentDate.toLocaleDateString("ja", {
                                    month: "long",
                                    year: "numeric",
                                })}
                            </span>

                            <button
                                type="button"
                                id="nextMonth"
                                className="flex h-[38px] w-[38px] cursor-pointer items-center justify-center text-slate-700 hover:border-primary sm:h-[36px] sm:w-[36px]"
                                onClick={handleNextMonth}
                            >
                                <svg
                                    width="18"
                                    height="18"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="fill-current"
                                >
                                    <path d="M7.7625 21.4875C7.5375 21.4875 7.35 21.4125 7.1625 21.2625C6.825 20.925 6.825 20.4 7.1625 20.0625L15.0375 12L7.1625 3.97498C6.825 3.63748 6.825 3.11248 7.1625 2.77498C7.5 2.43748 8.025 2.43748 8.3625 2.77498L16.8375 11.4C17.175 11.7375 17.175 12.2625 16.8375 12.6L8.3625 21.225C8.2125 21.375 7.9875 21.4875 7.7625 21.4875Z" />
                                </svg>
                            </button>
                        </div>
                        <div className="grid grid-cols-7 justify-between text-center py-2 font-medium capitalize text-body-color sm:text-lg">
                            <span className="flex h-[38px] w-[38px] items-center justify-center sm:h-[36px] sm:w-[37px] text-[14px]">
                                月
                            </span>

                            <span className="flex h-[38px] w-[38px] items-center justify-center sm:h-[36px] sm:w-[37px] text-[14px]">
                                火
                            </span>

                            <span className="flex h-[38px] w-[38px] items-center justify-center sm:h-[36px] sm:w-[37px] text-[14px]">
                                水
                            </span>

                            <span className="flex h-[38px] w-[38px] items-center justify-center sm:h-[36px] sm:w-[37px] text-[14px]">
                                木
                            </span>

                            <span className="flex h-[38px] w-[38px] items-center justify-center sm:h-[36px] sm:w-[37px] text-[14px]">
                                金
                            </span>

                            <span className="flex h-[38px] w-[38px] items-center justify-center sm:h-[36px] sm:w-[37px] text-[14px]">
                                土
                            </span>

                            <span className="flex h-[38px] w-[38px] items-center justify-center sm:h-[36px] sm:w-[37px] text-[14px]">
                                日
                            </span>
                        </div>

                        <div
                            ref={daysContainerRef}
                            id="days-container"
                            className="grid grid-cols-7 text-center text-sm font-medium sm:text-lg"
                        >
                            {/* Days will be rendered here */}
                        </div>

                        <div className="flex items-center justify-end gap-2">
                            <button
                                type="button"
                                id="cancelBtn"
                                className="flex h-[46px] px-4 items-center justify-center rounded-md border border-primary text-primary font-medium hover:bg-blue-300 hover:text-white hover:border-blue-300"
                                onClick={handleCancel}
                            >
                                リセット
                            </button>
                            <button
                                type="button"
                                id="cancelBtn"
                                className="flex h-[46px] px-4 items-center justify-center rounded-md bg-primary text-base font-medium text-white hover:bg-blue-300"
                                onClick={handleApply}
                            >
                                選択
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </section>
    );
}
