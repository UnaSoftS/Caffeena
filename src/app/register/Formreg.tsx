
'use client'
export default function Formreg()
{
    return(
      <  form className="flex flex-col gap-4" onSubmit={(e) => e.preventDefault()}>
          <label className="flex flex-col gap-1">
            <span className="text-sm font-medium">Email</span>
            <input
              className="border rounded p-2 text-lg"
              type="email"
              name="email"
              placeholder="Enter your email"
              autoComplete="email"
              required
            />
          </label>

          <label className="flex flex-col gap-1">
            <span className="text-sm font-medium">Password</span>
            <input
              className="border rounded p-2 text-lg"
              type="password"
              name="password"
              placeholder="Enter your password"
              autoComplete="new-password"
              required
            />
          </label>

          <button type="submit" className="mt-2 bg-black text-white py-2 px-4 text-lg rounded-lg hover:opacity-90">
            Register
          </button>
        </form>
    );
}