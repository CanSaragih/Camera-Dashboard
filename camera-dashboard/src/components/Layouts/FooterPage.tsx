type FooterProps = {
  alignLeft?: boolean;
};

export default function Footer({ alignLeft = false }: FooterProps) {
  return (
    <footer className="bg-white border-t border-gray-100">
      <div className="max-w-full mx-auto px-4 sm:px-6 lg:px-8 py-3 sm:py-4 lg:py-6">
        <div
          className={
            alignLeft
              ? "text-left"
              : "text-center sm:text-center md:text-center lg:text-center xl:text-center"
          }
        >
          <p
            className={`${
              alignLeft
                ? "text-xs sm:text-sm md:text-sm lg:text-sm xl:text-sm text-gray-500"
                : "text-xs sm:text-sm md:text-base lg:text-base xl:text-base text-gray-500 sm:text-gray-600"
            }`}
          >
            Copyright © 2025{" "}
            <span
              className={`font-semibold ${
                alignLeft ? "text-gray-600" : "text-gray-700 sm:text-gray-800"
              }`}
            >
              Nusapala Berkah Autonomous
            </span>
          </p>
        </div>
      </div>
    </footer>
  );
}
