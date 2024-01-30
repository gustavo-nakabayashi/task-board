"use client";

import Image from "next/image";
import clsx from "clsx";
import { useRouter } from "next/navigation";

const icons = [128187, 128172, 9749, 127947, 128218, 9200];

const iconsDivs = icons.map((icon) => {
  return (
    <span key={icon} className={clsx("p-2 border-black border")}>
      <label htmlFor="teste">{String.fromCodePoint(icon)}</label>
      <input
        className="border border-black hidden"
        type="radio"
        name="teste"
        defaultValue="oi"
      />
    </span>
  );
});

type DialogProps = {
  open: boolean;
  setOpen: () => void;
};

const Dialog = () => {
  const router = useRouter();

  return (
    <dialog
      className="p-4 bg-black bg-opacity-70 absolute h-screen w-screen top-0 right-0 "
      open
    >
      <div className="p-4 rounded-xl bg-white shadow max-w-[500px]">
        <div className="flex text-xl justify-between mb-6">
          Task details
          <button
            className="border border-gray-200 rounded-md cursor-pointer h-8 w-8 flex justify-center items-center"
            onClick={() => {
              router.back();
            }}
          >
            <Image
              src="/close_ring.svg"
              alt="close icon"
              className=""
              width={18}
              height={18}
            />
          </button>
        </div>
        <form action="" className="flex flex-col gap-8">
          <div className="flex flex-col">
            <label className="text-xs mb-1 text-[#97A3B6]" htmlFor="Name">
              Task name
            </label>
            <input
              className="border border-black px-4 py-1 rounded-md"
              type="text"
              name="Name"
              defaultValue="Lorem ipsum"
            />
          </div>
          <div className="flex flex-col">
            <label
              htmlFor="Description"
              className="text-xs mb-1 text-[#97A3B6]"
            >
              Description
            </label>

            <input
              className="border border-black px-4 py-1 rounded-md"
              type="text"
              name="Description"
              defaultValue="Lorem impsum"
              placeholder="Enter a short description"
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="Icon" className="text-xs mb-1 text-[#97A3B6]">
              Icon
            </label>
            <div className="flex gap-2">{iconsDivs}</div>
          </div>
          <input
            className="border border-black"
            type="text"
            name="Description"
            defaultValue="Lorem impsum"
          />
          <label htmlFor="Description">Description</label>
        </form>
      </div>
    </dialog>
  );
};

export default Dialog;
