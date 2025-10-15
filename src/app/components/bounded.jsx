// src/app/components/bounded.jsx
import { forwardRef } from "react";
import clsx from "clsx";

const Bounded = forwardRef(function Bounded(
  { as: Comp = "section", className, children, ...restProps },
  ref
) {
  return (
    <Comp
      ref={ref}
      className={clsx(
        "px-6 [.header+&]:pt-44 [.header+&]:md:pt-32",
        className
      )}
      {...restProps}
    >
      <div className="mx-auto w-full max-w-full p-5">{children}</div>
    </Comp>
  );
});

Bounded.displayName = "Bounded";

export default Bounded;
