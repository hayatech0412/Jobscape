import TrashCanIcon from "../Icons/TrashCanIcon";

export default function ProductSchedule(props) {
    const handleInputChange = (e) => {
        props.onChangeInput(e);
    };

    const handleClickBtn = (name, id) => {
        props.onClickBtn(name, id);
    };

    return (
        props.schedule !== undefined && (
            <div className="flex-1 flex md:flex-row flex-col items-center justify-start gap-2 md:max-w-[1000px] w-full">
                <input
                    type="text"
                    name="schedule_title"
                    id={`schedule_title_${props.index}`}
                    className="md:flex-1 w-full border border-gray-300 rounded"
                    value={props.schedule.title ?? ""}
                    onChange={handleInputChange}
                />

                <div className="flex md:flex-1 w-full items-center justify-start gap-x-2">
                    <input
                        type="text"
                        name="schedule_start_amount"
                        id={`schedule_start_amount_${props.index}`}
                        className="appearance-none w-[50px] p-2 border border-gray-300 rounded text-center"
                        min={0}
                        value={props.schedule.start_amount ?? ""}
                        onChange={handleInputChange}
                    />
                    <select
                        type="text"
                        name="schedule_start_unit"
                        id={`schedule_start_unit_${props.index}`}
                        className="w-[80px] p-2 pl-4 border border-gray-300 rounded"
                        value={props.schedule.start_unit ?? ""}
                        onChange={handleInputChange}
                    >
                        {props.periodUnits &&
                            props.periodUnits.map((unit, index) => {
                                return (
                                    <option key={index} value={unit}>
                                        {unit}
                                    </option>
                                );
                            })}
                    </select>
                    <span>〜</span>
                    <input
                        type="text"
                        name="schedule_end_amount"
                        id={`schedule_end_amount_${props.index}`}
                        className="appearance-none w-[50px] p-2 border border-gray-300 rounded text-center"
                        min={0}
                        value={props.schedule.end_amount ?? ""}
                        onChange={handleInputChange}
                    />
                    <select
                        type="text"
                        name="schedule_end_unit"
                        id={`schedule_end_unit_${props.index}`}
                        className="w-[80px] p-2 pl-4 border border-gray-300 rounded"
                        value={props.schedule.end_unit ?? ""}
                        onChange={handleInputChange}
                    >
                        {props.periodUnits &&
                            props.periodUnits.map((unit, index) => {
                                return (
                                    <option key={index} value={unit}>
                                        {unit}
                                    </option>
                                );
                            })}
                    </select>
                    <button
                        type="button"
                        className="md:flex hidden items-center justify-center w-[14px] hover:opacity-50"
                        id={props.index}
                        name="schedule_delete"
                        onClick={(e) =>
                            handleClickBtn("schedule_delete", props.index)
                        }
                    >
                        <TrashCanIcon className="w-full" />
                    </button>
                </div>
            </div>
        )
    );
}
