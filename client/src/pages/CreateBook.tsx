import axios from "axios";
import { useForm, type FieldValues } from "react-hook-form";
import { useNavigate } from "react-router-dom";

const CreateBook = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();

  const navigate = useNavigate();

  const onSubmit = (data: FieldValues) => {
    axios
      .post("http://localhost:5000/books", data)
      .then((response) => {
        console.log(response);
        navigate("/");
      })
      .catch((error) => {
        console.log(error);
        alert("Failed to create book! Check console for details.");
      });
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-col">
          <label htmlFor="title">Title</label>
          <input
            type="text"
            id="title"
            className="border border-slate-600 rounded-md"
            {...register("title", { required: "Title is required!" })}
          />
          {errors.title && (
            <span className="text-red-500">{`${errors.title.message}`}</span>
          )}
        </div>
        <div className="flex flex-col">
          <label htmlFor="author">Author</label>
          <input
            type="text"
            id="author"
            className="border border-slate-600 rounded-md"
            {...register("author", { required: "Author name is required" })}
          />
          {errors.author && (
            <span className="text-red-500">{`${errors.author.message}`}</span>
          )}
        </div>
        <div className="flex flex-col">
          <label htmlFor="publishYear">Publish Year</label>
          <input
            type="number"
            id="publishYear"
            className="border border-slate-600 rounded-md"
            {...register("publishYear", {
              required: "Publish Year is required",
            })}
          />
          {errors.publishYear && (
            <span className="text-red-500">
              {`${errors.publishYear.message}`}
            </span>
          )}
        </div>
        <div className="flex justify-end mt-4">
          <button
            type="submit"
            className="bg-green-500 text-white px-4 py-2 rounded-md"
            disabled={isSubmitting}
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateBook;
