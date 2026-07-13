const Info = ({ title, value }) => (
  <div className="bg-gray-100 rounded-xl p-3">
    <p className="text-xs text-gray-500">{title}</p>

    <p className="mt-1 font-semibold break-all whitespace-normal">
      {value || "-"}
    </p>
  </div>
);

export default Info;
