import { PropsWithChildren } from "react";

export default ({ children }: PropsWithChildren) => {
  return (
    <div className="bg-[#f4f4f4] min-h-[92vh]">
      <main className="bg-primary max-h-[60vh] ">
        <div className="bg-white md:w-2/3 md:translate-y-20 lg:w-1/2 p-5 xl:w-1/4 w-full mx-auto min-h-[100vh]  md:min-h-[60vh] rounded">
          {children}
        </div>
      </main>
    </div>
  );
};
