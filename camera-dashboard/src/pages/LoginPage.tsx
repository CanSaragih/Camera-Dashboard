import LoginForm from "../components/Auth/LoginForm";
import ilustrasi from "../assets/ilustrasi.png";
import Footer from "../components/Layouts/FooterPage";

export default function LoginPage() {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      {/* Main Content */}
      <main className="w-full flex-grow flex items-center justify-center py-4 sm:py-6 md:py-8 lg:py-12">
        <div className="w-full px-4 sm:px-6 md:px-8 lg:px-12 xl:px-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-10 md:gap-12 lg:gap-16 xl:gap-24 items-center max-w-7xl mx-auto">
            {/* Left Login Form */}
            <section className="flex items-center justify-center order-2 lg:order-1 w-full">
              <div className="w-full max-w-sm sm:max-w-md md:max-w-lg lg:max-w-md xl:max-w-lg flex justify-center lg:justify-end lg:pr-8 xl:pr-12">
                <LoginForm />
              </div>
            </section>

            {/* Right Illustration */}
            <section className="flex items-center justify-center order-1 lg:order-2 w-full">
              <div className="relative w-full flex items-center justify-center lg:justify-start lg:pl-8 xl:pl-12">
                {/* Mobile and Tablet Layout */}
                <div className="block lg:hidden">
                  <div className="bg-[#f7f7f7] w-[200px] h-[250px] sm:w-[280px] sm:h-[350px] md:w-[350px] md:h-[400px] rounded-xl sm:rounded-2xl relative shadow-xl">
                    <img
                      src={ilustrasi}
                      alt="Login Illustration"
                      className="absolute bottom-0 left-[-30px] sm:left-[-40px] md:left-[-50px] w-[230px] sm:w-[320px] md:w-[400px] h-auto object-contain z-10"
                    />
                  </div>
                </div>

                {/* Desktop Layout */}
                <div className="hidden lg:block">
                  <div className="bg-[#f7f7f7] w-[600px] xl:w-[700px] h-[700px] xl:h-[800px] rounded-2xl relative shadow-2xl">
                    <img
                      src={ilustrasi}
                      alt="Login Illustration"
                      className="absolute bottom-0 left-[-70px] w-[600px] xl:w-[700px] h-auto object-contain z-10"
                    />
                  </div>
                </div>
              </div>
            </section>
          </div>
        </div>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
