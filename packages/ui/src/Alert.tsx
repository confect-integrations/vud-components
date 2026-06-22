import { InformativeIcon, type InformativeIconName } from "./InformativeIcon";

type AlertProps = {
  type?: "info" | "warning" | "error";
  message: string;
};

export const Alert = ({ type, message }: AlertProps) => {
  const getStyle = () => {
    switch (type) {
      case "info":
        return "bg-blue-100 border-blue-500 text-blue-800";
      case "warning":
        return "bg-orange-100 border-orange-500 text-orange-800";
      case "error":
        return "bg-red-100 border-red-500 text-red-800";
      default:
        return "bg-gray-100 border-gray-400 text-gray-800";
    }
  };

  const getIcon = (): InformativeIconName => {
    switch (type) {
      case "info":
        return "info";
      case "warning":
        return "warning";
      case "error":
        return "error";
      default:
        return "help";
    }
  };

  return (
    <div
      className={`p-4 ${getStyle()} rounded-lg border shadow-lg mb-3 flex items-center gap-2`}
    >
      <InformativeIcon name={getIcon()} size={16} />
      <p className="text-sm">{message}</p>
    </div>
  );
};
