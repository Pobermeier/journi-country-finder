import Link from "next/link";
import NotFoundImage from "components/NotFoundImage";

const NotFoundPage = () => {
  return (
    <div className="h-full flex flex-col justify-center">
      <div className="w-full">
        <NotFoundImage className="w-full mx-auto max-w-2xl" />
      </div>
      <div className="sm:border-l sm:border-gray-200 sm:pl-6 text-center">
        <p className="mt-10 text-base text-gray-500">Sorry, looks like this page does not exist.</p>
      </div>
      <div className="mt-10 flex space-x-3 sm:border-l sm:border-transparent sm:pl-6 justify-center">
        <Link
          href="/"
          className="inline-flex items-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
        >
          Click here to return to home.
        </Link>
      </div>
    </div>
  );
};

export default NotFoundPage;
