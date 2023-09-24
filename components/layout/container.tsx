import { PropsWithChildren } from "@/types/PropsWithChildren";

const Container = ({ children }: PropsWithChildren) => (
  <div className="w-1/2 pt-5 mx-auto">{children}</div>
);

export default Container;
