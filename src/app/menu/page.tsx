import Pagination from "@/components/menu/Pagination";
import { menuItems } from "@/lib/mockData";
import MenuItems from "@/components/menu/MenuItems";

    export default function Menu()
    {
      return(
        <div>
          <MenuItems/>
      <div>
          <Pagination className='position-fixed
    bottom-4 left-1/2 transform-translate-x-1/2 right-1/2
        transform-translate-y-1/2  mb-4'
        totalItems={0} pageSize={0} currentPage={0}    searchParams={{}}
      />
    </div>
        </div>

      );

    }