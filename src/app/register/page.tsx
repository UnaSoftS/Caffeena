'use client '
import Formreg from "./Formreg";

export default function Register() {
  return (
    <section className="fix-heigh container mx-auto px-7 flex items-center justify-center min-h-[60vh]">
      <div className="bg-white rounded-lg p-6 w-full md:w-2/3">
        <h1 className="text-2xl font-semibold mb-6">Register</h1>
        <Formreg/>
      </div>
    </section>
  );
}
