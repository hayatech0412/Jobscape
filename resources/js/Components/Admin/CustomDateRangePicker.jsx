import React, { useState, useRef, useEffect } from "react";
import { DateRange } from "react-date-range";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import { format } from "date-fns";
import ja from "date-fns/locale/ja";

const CustomDateRangePicker = ({ start, end, onChange }) => {
  const [state, setState] = useState([
    {
      startDate: start ? new Date(start) : new Date(),
      endDate: end? new Date(end) : new Date(),
      key: "selection",
    },
  ]);
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef(null);

  // カレンダー外をクリックしたら閉じる
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (ref.current && !ref.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleSelect = (ranges) => {
    setState([ranges.selection]);
    onChange(ranges.selection);
  };

  return (
    <div className="relative" ref={ref}>
      {/* 選択した日付を表示するボタン */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="border px-4 py-2 rounded bg-white shadow"
      >
        {format(state[0].startDate, "yyyy/MM/dd")} 〜 {format(state[0].endDate, "yyyy/MM/dd")}
      </button>

      {/* ドロップダウンのカレンダー */}
      {isOpen && (
        <div className="absolute mt-2 z-50 bg-white shadow-lg p-2 rounded">
          <DateRange
            ranges={state}
            onChange={handleSelect}
            moveRangeOnFirstSelection={false}
            showSelectionPreview={true}
            editableDateInputs={true}
            locale={ja} // 日本語ロケール
          />
        </div>
      )}
    </div>
  );
};

export default CustomDateRangePicker;
