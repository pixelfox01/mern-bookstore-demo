import axios from "axios";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Loading from "../components/Loading";
import BackButton from "../components/BackButton";

interface Book {
  title: string;
  author: string;
  publishYear: string;
}

const DeleteBook = () => {
  const API_URL = import.meta.env.VITE_API_URL;

  const [book, setBook] = useState<Book | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { id } = useParams<{ id: string }>();

  const navigate = useNavigate();

  useEffect(() => {
    setIsLoading(true);
    axios
      .get(`${API_URL}/books/${id}`)
      .then((response) => {
        setBook(response.data);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setIsLoading(false);
      });
  }, [id]);

  const handleDelete = () => {
    setIsLoading(true);
    axios
      .delete(`${API_URL}/books/${id}`)
      .then((response) => {
        console.log(response);
        setIsLoading(false);
        navigate("/");
      })
      .catch((err) => {
        console.log(err);
        setIsLoading(false);
      });
  };

  return (
    <>
      <BackButton />
      {isLoading ? (
        <div className="flex justify-center">
          <Loading />
        </div>
      ) : (
        <div className="flex flex-col items-center gap-4 mt-10">
          <h1 className="font-bold text-2xl uppercase tracking-wide">
            Are you sure you want to delete this book?
          </h1>
          <div className="flex justify-center w-full">
            <div className="border border-slate-600 rounded-md py-8 max-w-[50%] min-w-[30%] flex flex-col items-center">
              <h1 className="font-semibold text-lg tracking-wide uppercase mb-4">
                Book Details
              </h1>
              <dl className="flex flex-col gap-2 w-full">
                <div className="flex gap-3">
                  <dt className="font-semibold min-w-[40%] flex items-center justify-end">
                    Title
                  </dt>
                  <dd className="w-full">{book?.title}</dd>
                </div>

                <div className="flex gap-3">
                  <dt className="font-semibold min-w-[40%] flex items-center justify-end">
                    Author
                  </dt>
                  <dd className="w-full">{book?.author}</dd>
                </div>

                <div className="flex gap-3">
                  <dt className="font-semibold min-w-[40%] flex items-center justify-end">
                    Publish Year
                  </dt>
                  <dd className="w-full">{book?.publishYear}</dd>
                </div>
              </dl>
            </div>
          </div>
          <button
            onClick={handleDelete}
            className="bg-red-600 hover:bg-red-800 text-white py-2 px-4 rounded-md"
          >
            Delete
          </button>
        </div>
      )}
    </>
  );
};

export default DeleteBook;
