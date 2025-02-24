interface InputProps {
  label: string;
  placeholder: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  type?: string;
}

const InputWithLabel = ({
  label,
  placeholder,
  onChange,
  type = "text",
}: InputProps) => {
  return (
    <div>
      <div className="mb-6">
        <label
          htmlFor="default-input"
          className="block mb-2 text-sm font-medium "
        >
          {label}
        </label>
        <input
          onChange={onChange}
          type={type}
          placeholder={placeholder}
          id="default-input"
          className="w-full p-2.5 text-sm rounded-lg border-2 border-gray-300 bg-gray-50 focus:border-blue-500 focus:outline-none"
        />
      </div>
    </div>
  );
};

export default InputWithLabel;
