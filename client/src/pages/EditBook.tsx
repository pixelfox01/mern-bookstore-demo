import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Loading from "../components/Loading";
import { z } from "zod";
import { FieldValues, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import BackButton from "../components/BackButton";

const EditBook = () => {
  const API_URL = import.meta.env.VITE_API_URL;

  const { id } = useParams();
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const editBookSchema = z.object({
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

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<EditBookFormValues>({
    resolver: zodResolver(editBookSchema),
  });

  useEffect(() => {
    setIsLoading(true);

    axios
      .get(`${API_URL}/books/${id}`)
      .then((response) => {
        console.log(response);
        setValue("title", response.data.title);
        setValue("author", response.data.author);
        setValue("publishYear", response.data.publishYear);
        setIsLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setIsLoading(false);
      });
  }, [id, setValue]);

  type EditBookFormValues = z.infer<typeof editBookSchema>;

  const onSubmit = (data: FieldValues) => {
    axios
      .put(`${API_URL}/books/${id}`, data)
      .then((response) => {
        console.log(response);
        navigate("/");
      })
      .catch((error) => {
        console.log(error);
        alert("Failed to edit book! Check console for details.");
      });
  };

  return (
    <div>
      <BackButton />
      {isLoading ? (
        <div className="flex justify-center">
          <Loading />
        </div>
      ) : (
        <div className="flex justify-center">
          <form onSubmit={handleSubmit(onSubmit)} className="w-1/4">
            <div className="flex flex-col">
              <label htmlFor="title">Title</label>
              <input
                type="text"
                id="title"
                className="border border-slate-600 rounded-md py-1 px-2"
                {...register("title")}
              />
              {errors.title && (
                <p className="text-red-500">{errors.title.message}</p>
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
                <p className="text-red-500">{errors.author.message}</p>
              )}
            </div>
            <div className="flex flex-col">
              <label htmlFor="publishYear">Publish Year</label>
              <input
                type="number"
                id="publishYear"
                className="border border-slate-600 rounded-md py-1 px-2"
                {...register("publishYear")}
              />
              {errors.publishYear && (
                <p className="text-red-500">{errors.publishYear.message}</p>
              )}
            </div>
            <button
              type="submit"
              disabled={isSubmitting}
              className="bg-slate-600 text-white py-2 px-4 rounded-md mt-4"
            >
              {isSubmitting ? "Submitting..." : "Submit"}
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default EditBook;
