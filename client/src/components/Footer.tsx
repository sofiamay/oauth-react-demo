import { SITE_YEAR } from "../constants";
function Footer() {
  const year = SITE_YEAR;
  return (
    <footer className="bg-light-color rounded-lg shadow dark:bg-gray-800">
      <div className="w-full mx-auto max-w-screen-xl p-4 md:flex md:items-center md:justify-between">
        <span className="text-sm text-gray-500 sm:text-center dark:text-gray-400">©{year} Website by <a href="https://github.com/sofiamay/" className="hover:underline">Sofia May</a>
        </span>
      </div>
    </footer>
  );
}

export default Footer;