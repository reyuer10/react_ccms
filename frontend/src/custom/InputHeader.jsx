import { searchIcons } from "../assets/data/svg";

function InputHeader({ onChange, value, placeholderLabel, name }) {
  return (
    <div className=" flex items-center space-x-2 border-none border-[2px]  text-[14px] font-bold text-text-input bg-main-background rounded-lg p-2 w-[250px]">
      <span>{searchIcons}</span>
      <input
        className="outline-none border-none bg-main-background text-text-input"
        value={value}
        type="text"
        placeholder={`Search by ${placeholderLabel}`}
        onChange={onChange}
        name={name}
        autoComplete="off"
      />
    </div>
  );
}

export default InputHeader;
