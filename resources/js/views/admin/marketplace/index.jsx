import Banner from "./components/Banner";
import ExampleProductIMG from "@/assets/images/products/product1.png";
import ExampleAvatar from "@/assets/images/avatars/avatar.png";

import tableDataTopCreators from "@/views/admin/marketplace/variables/tableDataTopCreators.json";
import { tableColumnsTopCreators } from "@/views/admin/marketplace/variables/tableColumnsTopCreators";
import HistoryCard from "./components/HistoryCard";
import ProductCard from "@/components/admin/card/ProductCard";

const Marketplace = () => {
  return (
    <div className="mt-3 grid h-full grid-cols-1 gap-5 xl:grid-cols-2 2xl:grid-cols-3">
      <div className="col-span-1 h-fit w-full xl:col-span-1 2xl:col-span-2">
        <div className="mb-4 mt-5 flex flex-col justify-between px-4 md:flex-row md:items-center">
          <h4 className="ml-1 text-2xl font-bold text-navy-700 dark:text-white">
            En çok satanlar
          </h4>
          <ul className="mt-4 flex items-center justify-between md:mt-0 md:justify-center md:!gap-5 2xl:!gap-12">
            <li>
              <a className="text-base font-medium text-brand-500 hover:text-brand-500 dark:text-white"
                href=" ">Category</a>
            </li>
            <li>
              <a className="text-base font-medium text-brand-500 hover:text-brand-500 dark:text-white"
                href=" ">Category2</a>
            </li>
            <li>
              <a className="text-base font-medium text-brand-500 hover:text-brand-500 dark:text-white"
                 href=" ">Category3</a>
            </li>
            <li>
              <a className="text-base font-medium text-brand-500 hover:text-brand-500 dark:text-white"
                href=" ">Category4</a>
            </li>
          </ul>
        </div>

        {/* NFTs trending card */}
        <div className="z-20 grid grid-cols-1 gap-5 md:grid-cols-4">
          <ProductCard
            bidders={[ExampleAvatar, ExampleAvatar, ExampleAvatar]}
            title="Abstract Colors"
            author="a"
            price="21"
            image={ExampleProductIMG}
          />
          <ProductCard
            bidders={[ExampleAvatar, ExampleAvatar, ExampleAvatar]}
            title=" AI Brain"
            author="a"
            price="45"
            image={ExampleProductIMG}
          />
          <ProductCard
            bidders={[ExampleAvatar, ExampleAvatar, ExampleAvatar]}
            title="Mesh Gradients"
            author="a"
            price="300"
            image={ExampleProductIMG}
          />
            <ProductCard
            bidders={[ExampleAvatar, ExampleAvatar, ExampleAvatar]}
            title="Mesh Gradients"
            author="a"
            price="500"
            image={ExampleProductIMG}
          />
        </div>

        {/* Recenlty Added setion */}
        <div className="mb-5 mt-5 flex items-center justify-between px-[26px]">
          <h4 className="text-2xl font-bold text-navy-700 dark:text-white">
            Son Eklenenler
          </h4>
        </div>

        {/* Recently Add NFTs */}
        <div className="grid grid-cols-1 gap-5 md:grid-cols-4">
          <ProductCard
            bidders={[ExampleAvatar, ExampleAvatar, ExampleAvatar]}
            title=" Colors"
            author="b"
            price="800"
            image={ExampleProductIMG}
          />
          <ProductCard
            bidders={[ExampleAvatar, ExampleAvatar, ExampleAvatar]}
            title=" AI Brain"
            author="b"
            price="12"
            image={ExampleProductIMG}
          />
          <ProductCard
            bidders={[ExampleAvatar, ExampleAvatar, ExampleAvatar]}
            title="Mesh Gradients"
            author="a"
            price="233"
            image={ExampleProductIMG}
          />
            <ProductCard
            bidders={[ExampleAvatar, ExampleAvatar, ExampleAvatar]}
            title="Mesh Gradients"
            author="c"
            price="433"
            image={ExampleProductIMG}
          />
        </div>
      </div>

      {/* right side section */}

      <div className="col-span-1 h-full w-full rounded-xl 2xl:col-span-1">
        <HistoryCard />
      </div>
    </div>
  );
};

export default Marketplace;
