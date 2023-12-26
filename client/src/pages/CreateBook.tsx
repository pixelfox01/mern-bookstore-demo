import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { useForm, type FieldValues } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { z } from "zod";
import BackButton from "../components/BackButton";

const createBookSchema = z.object({
  title: z
    .string({
      required_error: "Required",
      invalid_type_error: "Invalid title",
    })
    .min(1, "Must be at least 1 character")
    .max(100, "Cannot exceed 100 characters"),
  author: z
    .string({
      required_error: "Required",
      invalid_type_error: "Invalid author",
    })
    .min(1, "Must be at least 1 character")
    .max(100, "Cannot exceed 100 characters"),
  publishYear: z.coerce
    .number({
      required_error: "Required",
      invalid_type_error: "Invalid date",
    })
    .min(1000, "Must be after 1000")
    .max(new Date().getFullYear(), "Must be before current year"),
});

type CreateBookFormValues = z.infer<typeof createBookSchema>;

const CreateBook = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<CreateBookFormValues>({
    resolver: zodResolver(createBookSchema),
  });

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
    <>
      <BackButton />
      <div className="flex justify-center">
        <form onSubmit={handleSubmit(onSubmit)} className="w-1/3 mt-12">
          <div className="flex flex-col">
            <label htmlFor="title">Title</label>
            <input
              type="text"
              id="title"
              className="border border-slate-600 rounded-md py-1 px-2"
              {...register("title")}
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
              className="border border-slate-600 rounded-md py-1 px-2"
              {...register("author")}
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
              className="border border-slate-600 rounded-md py-1 px-2 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
              {...register("publishYear")}
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
    </>
  );
};

export default CreateBook;
