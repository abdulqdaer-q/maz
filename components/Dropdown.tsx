"use client";

import { Fragment } from "react";
import { Menu, Transition } from "@headlessui/react";
import {
  ChevronDownIcon,
  DocumentMagnifyingGlassIcon,
  Cog6ToothIcon,
} from "@heroicons/react/20/solid";

type Props = { title: string; start: string };
function Dropdown({ title, start }: Props) {
  return (
    <Menu as="div" className="relative inline-block text-left">
      {({ open }) => (
        <>
          <div>
            <Menu.Button className="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm text-gray-600  hover:bg-gray-50">
              {title}
              {open && (
                <ChevronDownIcon
                  className="-mr-1 h-5 w-5 text-gray-400"
                  aria-hidden="true"
                />
              )}
            </Menu.Button>
          </div>

          <Transition
            as={Fragment}
            enter="transition ease-out duration-100"
            enterFrom="transform opacity-0 scale-95"
            enterTo="transform opacity-100 scale-100"
            leave="transition ease-in duration-75"
            leaveFrom="transform opacity-100 scale-100"
            leaveTo="transform opacity-0 scale-95"
          >
            <Menu.Items className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
              <div className="py-1">
                <Menu.Item>
                  {({ active }) => (
                    <a
                      href="#"
                      className={`${
                        active
                          ? "bg-blue-400 text-gray-900  px-4 py-2 text-sm flex items-center space-x-4 rounded-md m-1"
                          : "text-gray-700  px-4 py-2 text-sm flex items-center space-x-4 rounded-md m-1"
                      }`}
                    >
                      <DocumentMagnifyingGlassIcon className="w-16 h-16" />
                      <div className="flex flex-col items-start space-y-2 justify-center">
                        <p className="text-s font-bold">
                          {start} Job Opportunity
                        </p>
                        <p className="text-xs">
                          Find Professionals from around the world and across
                          all skils
                        </p>
                      </div>
                    </a>
                  )}
                </Menu.Item>
                <Menu.Item>
                  {({ active }) => (
                    <a
                      href="#"
                      className={`${
                        active
                          ? "bg-blue-400 text-gray-900  px-4 py-2 text-sm flex items-center space-x-4 rounded-md m-1"
                          : "text-gray-700  px-4 py-2 text-sm flex items-center space-x-4 rounded-md m-1"
                      }`}
                    >
                      <Cog6ToothIcon className="w-16 h-16" />
                      <div className="flex flex-col items-start space-y-2 justify-center">
                        <p className="text-s font-bold">{start} Service</p>
                        <p className="text-xs">
                          Find Professionals from around the world and across
                          all skils
                        </p>
                      </div>
                    </a>
                  )}
                </Menu.Item>
              </div>
            </Menu.Items>
          </Transition>
        </>
      )}
    </Menu>
  );
}

export default Dropdown;
