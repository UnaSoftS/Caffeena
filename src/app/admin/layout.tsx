
interface AdminLayoutProps{children: React.ReactNode;}
export const metadata = {
  title: 'Bincastle Dashboard',
  description: '',
};
// export default function AdminLayout({children}:AdminLayoutProps ) {

//     return (
// <div  className="flex min-h-screen bg-gray-100 text-gray-800">
//      <main className="flex-1 p-4 overflow-y-auto">
//              <div><AdminSidebar/></div>
//             {children}
//           </main>
// </div>

//     );
// }
// app/admin/layout.tsx
import { AdminSidebar } from './components/AdminSidebar';
import RightRail from './components/rightRail';
import AdminNavbar from './components/adminNavbar';

export default function AdminLayout({ children }: AdminLayoutProps) {
  return (
     <div className="bg-gradient-to-b from-[#f8f7f5] to-[#efeae3] text-gray-900 min-h-screen py-6 ">
      {/* Container padding fixed: removed p-4= and made responsive */}
      {/* <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-6"> */}
        {/* Increased gap on large screens for better breathing room */}
        <div className="grid grid-cols-12 gap-4 lg:gap-6">
          
          {/* Sidebar */}
          <aside className="col-span-12 md:col-span-3 lg:col-span-2 ">
            {/* Added inner padding to the card */}
            <div className="rounded-2xl bg-white shadow-sm ring-1 ring-black/5 h-full p-4 md:p-6">
              <AdminSidebar />
            </div>
          </aside>

          {/* Main content */}
          <main className="col-span-12 md:col-span-9 lg:col-span-7">
            {/* Increased padding for main card */}
            <div className="rounded-2xl bg-white shadow-sm ring-1 ring-black/5 p-6 lg:p-8">
              <AdminNavbar />
              {/* Slightly larger top margin on larger screens */}
              <div className="mt-4 sm:mt-6 lg:mt-8">{children}</div>
            </div>
          </main>

          {/* Right rail */}
          <aside className="col-span-12 lg:col-span-3">
            {/* Match main card padding */}
            <div className="rounded-2xl bg-white shadow-sm ring-1 ring-black/5 p-6 lg:p-8">
              <RightRail />
            </div>
          </aside>
        </div>
      </div>
  );
}
