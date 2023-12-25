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
          <dl className="border border-sky-600 rounded-md py-12 w-1/2 flex flex-col gap-2">
            <div className="flex gap-3">
              <dt className="font-semibold min-w-[40%] flex items-center justify-end">
                Title
              </dt>
              <dd>{book?.title}</dd>
            </div>

            <div className="flex gap-3">
              <dt className="font-semibold min-w-[40%] flex items-center justify-end">
                Author
              </dt>
              <dd>{book?.author}</dd>
            </div>

            <div className="flex gap-3">
              <dt className="font-semibold min-w-[40%] flex items-center justify-end">
                Publish Year
              </dt>
              <dd>{book?.publishYear}</dd>
            </div>
          </dl>
        </div>
      )}
    </div>
  );
};

export default ShowBook;
