import { formItems } from "@/config/var";
import ButtonElement from "../button";

const FormElement = ({
  formData,
  isEdit,
  handleChange,
  handleSubmit,
  handleToggleForm,
}) => {
  return (
    <div className=" mb-5 text-md flex justify-center">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-5 p-5 m-5 border-2 shadow-2xl rounded-md"
      >
        {formItems.map((item, index) => (
          <div key={index} className="flex flex-col md:flex-row justify-between max-w-[600px] border-b border-black ">

            <label className="font-bold" htmlFor={item.field}>
              {item.label}:
            </label>
            <input
              className="border border-gray-600 rounded-t-sm  focus:outline-none focus:border-blue-500 focus:shadow-lg "
              type="text"
              id={item.field}
              name={item.field}
              value={formData[item.field]}
              onChange={handleChange}
            />
          </div>
        ))}
        <div className="flex gap-3 justify-center">
          <ButtonElement
            text={isEdit ? "Edit" : "Submit"}
            onclick={handleSubmit}
          />
          <ButtonElement text="Atšaukti" onclick={handleToggleForm} />
        </div>
      </form>
    </div>
  );
};
export default FormElement;
