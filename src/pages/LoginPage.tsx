function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-sm border border-gray-200">
        <h1 className="text-2xl font-bold text-gray-900 text-center mb-2">
          Welcome Back
        </h1>

        <p className="text-sm text-gray-500 text-center mb-8">
          Login to manage your finances
        </p>

        <form action="" className="space-y-5">
          <label htmlFor="email" className="block">
            <span className="block text-sm font-medium text-gray-700 mb-2">
              Email
            </span>

            <input
              type="email"
              id="email"
              placeholder="Email"
              className="w-full rounded-lg bg-[#F1F5F9] px-4 py-3 text-gray-900 placeholder-gray-400 outline-none border border-transparent focus:bg-[#E8F0FE] focus:border-[#00C951] transition"
            />
          </label>

          <label htmlFor="password" className="block">
            <span className="block text-sm font-medium text-gray-700 mb-2">
              Password
            </span>

            <input
              type="password"
              id="password"
              placeholder="Password"
              className="w-full rounded-lg bg-[#F1F5F9] px-4 py-3 text-gray-900 placeholder-gray-400 outline-none border border-transparent focus:bg-[#E8F0FE] focus:border-[#00C951] transition"
            />
          </label>

          <button
            type="submit"
            className="w-full rounded-lg bg-[#00C951] py-3 font-semibold text-white hover:bg-[#D6EFDF] hover:text-[#16A24A] transition"
          >
            Login
          </button>
        </form>

        <div className="mt-6 text-center">
          <span className="text-sm text-gray-500">Don't have an account? </span>

          <button className="text-sm font-semibold text-[#16A24A] hover:underline">
            Sign Up
          </button>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
