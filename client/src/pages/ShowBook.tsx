import { useState, useEffect } from "react";
import BackButton from "../components/BackButton";
import axios from "axios";
import { useParams } from "react-router-dom";
import Loading from "../components/Loading";

interface Book {
  title: string;
  author: string;
  publishYear: string;
}

const ShowBook = () => {
  const [book, setBook] = useState<Book | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { id } = useParams<{ id: string }>();

  useEffect(() => {
    setIsLoading(true);
    axios
      .get(`http://localhost:5000/books/${id}`)
      .then((response) => {
        setBook(response.data);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setIsLoading(false);
      });
  }, [id]);

  return (
    <div>
      <BackButton />
      {isLoading ? (
        <div className="flex justify-center">
          <Loading />
        </div>
      ) : (
        <div className="flex justify-center">
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
      )}
    </div>
  );
};

export default ShowBook;
