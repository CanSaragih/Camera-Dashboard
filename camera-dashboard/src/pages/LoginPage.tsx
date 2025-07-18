import LoginForm from "../components/Auth/LoginForm";
import ilustrasi from "../assets/ilustrasi.svg";
import Footer from "../components/Footer/FooterPage";

export default function LoginPage() {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      {/* Main Content */}
      <main className="flex-grow flex items-center justify-center py-4 sm:py-8 lg:py-12">
        <div className="w-full px-4 sm:px-6 lg:px-8 xl:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-12 xl:gap-16 max-w-7xl mx-auto items-center">
            {/* Left Login Form */}
            <section className="flex items-center justify-center order-2 lg:order-1">
              <div className="w-full flex justify-center lg:justify-start">
                <LoginForm />
              </div>
            </section>

            {/* Right Illustration */}
            <section className="flex items-center justify-center order-1 lg:order-2">
              <div className="w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl flex items-center justify-center">
                <img
                  src={ilustrasi}
                  alt="Login Illustration"
                  className="w-full h-auto max-h-[40vh] sm:max-h-[50vh] md:max-h-[60vh] lg:max-h-[70vh] xl:max-h-[80vh] object-contain drop-shadow-xl sm:drop-shadow-xl md:drop-shadow-2xl lg:drop-shadow-2xl xl:drop-shadow-2xl"
                />
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
