import { forwardRef } from 'react';

function InputBox(
  { type = 'text', name = null, id = null, ...restProps },
  ref
) {
  return (
    <>
      <input
        className="border-[1px] rounded-[15px] py-[11px] px-[20px] min-w-full font-nanum text-[13px] -text--fridge-black placeholder:-text--fridge-input-gray placeholder:font-normal -border--fridge-gray  mb-1"
        type={type}
        name={name}
        id={id}
        ref={ref}
        {...restProps}
      />
    </>
  );
}

export default forwardRef(InputBox);
