const ErrorPage = () => {
  return (
    <div className="relative flex flex-col items-center justify-center min-h-screen p-6 overflow-hidden z-1">
      {/* Background Grid Top */}
      <div className="absolute right-0 top-0 -z-1 w-full max-w-[250px] xl:max-w-[450px]">
        <img alt="grid" src="/assets/images/grid-01.svg" />
      </div>

      {/* Background Grid Bottom */}
      <div className="absolute bottom-0 left-0 -z-1 w-full max-w-[250px] rotate-180 xl:max-w-[450px]">
        <img alt="grid" src="/assets/images/grid-01.svg" />
      </div>

      {/* Main Content */}
      <div className="mx-auto w-full max-w-[242px] text-center sm:max-w-[472px]">
        <h1 className="mb-8 font-bold text-gray-800 text-6xl dark:text-gray-200 sm:text-7xl">
          ERROR
        </h1>

        {/* 404 Image - Light Mode */}
        <img alt="404" className="dark:hidden" src="/assets/images/404.svg" />

        {/* 404 Image - Dark Mode */}
        <img
          alt="404"
          className="hidden dark:block"
          src="/assets/images/404.svg"
        />

        <p className="mt-10 mb-6 text-base text-gray-700 dark:text-gray-400 sm:text-lg">
          We can't seem to find the page you are looking for!
        </p>

        <a
          className="inline-flex items-center justify-center rounded-lg border border-gray-300 bg-white px-5 py-3.5 text-sm font-medium text-gray-700 shadow-theme-xs hover:bg-gray-50 hover:text-gray-800 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-white/[0.03] dark:hover:text-gray-200"
          href="/"
          data-discover="true"
        >
          Back to Home Page
        </a>
      </div>

      {/* Footer */}
      <p className="absolute text-sm text-center text-gray-500 -translate-x-1/2 bottom-6 left-1/2 dark:text-gray-400">
        © {new Date().getFullYear()} - Boilerplate
      </p>
    </div>
  );
};

export default ErrorPage;
