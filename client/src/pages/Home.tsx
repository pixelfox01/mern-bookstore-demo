import { Link } from "react-router-dom";
import { MdOutlineAddBox, MdOutlineInfo } from "react-icons/md";
import { RiDeleteBin6Line } from "react-icons/ri";
import { FiEdit } from "react-icons/fi";
import { useEffect, useState } from "react";
import axios from "axios";
import Loading from "../components/Loading";

interface Book {
  _id: string;
  title: string;
  author: string;
  publishYear: string;
}

const Home = () => {
  const [books, setBooks] = useState([] as Book[]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    axios
      .get("http://localhost:5000/books")
      .then((response) => {
        setBooks(response.data.data);
        console.log(response.data.data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setIsLoading(false);
      });
  }, []);

  return (
    <div className="p-4">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl">Books List</h1>
        <Link to="/books/create" className="flex flex-col items-center">
          <MdOutlineAddBox className="text-3xl" />
          <p className="uppercase font-semibold text-xs">Create new</p>
        </Link>
      </div>
      {isLoading ? (
        <div className="flex justify-center">
          <Loading />
        </div>
      ) : (
        <table className="w-full border-separate border-spacing-2">
          <thead>
            <tr>
              <th className="border border-slate-600 rounded-md">No</th>
              <th className="border border-slate-600 rounded-md">Title</th>
              <th className="border border-slate-600 rounded-md max-md:hidden">
                Author
              </th>
              <th className="border border-slate-600 rounded-md max-md:hidden">
                Publish Year
              </th>
              <th className="border border-slate-600 rounded-md">Actions</th>
            </tr>
          </thead>
          <tbody>
            {books.map((book, index) => (
              <tr key={book._id}>
                <td className="border border-slate-600 rounded-md text-center">
                  {index + 1}
                </td>
                <td className="border border-slate-600 rounded-md text-center">
                  {book.title}
                </td>
                <td className="border border-slate-600 rounded-md text-center max-md:hidden">
                  {book.author}
                </td>
                <td className="border border-slate-600 rounded-md text-center max-md:hidden">
                  {book.publishYear}
                </td>
                <td className="border border-slate-600 rounded-md text-center flex justify-between px-8">
                  <Link
                    to={`/books/details/${book._id}`}
                    className="flex flex-col items-center"
                  >
                    <MdOutlineInfo className="text-2xl" />
                    <p className="uppercase font-semibold text-xs">Details</p>
                  </Link>
                  <Link
                    to={`/books/edit/${book._id}`}
                    className="flex flex-col items-center"
                  >
                    <FiEdit className="text-2xl" />
                    <p className="uppercase font-semibold text-xs">Edit</p>
                  </Link>
                  <Link
                    to={`/books/delete/${book._id}`}
                    className="flex flex-col items-center"
                  >
                    <RiDeleteBin6Line className="text-2xl" />
                    <p className="uppercase font-semibold text-xs">Delete</p>
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default Home;
