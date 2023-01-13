import { Combobox, Transition } from "@headlessui/react";
import { Fragment, useState } from "react";
import { CheckIcon, ChevronUpDownIcon } from "@heroicons/react/20/solid";
import { useFetcher } from "@remix-run/react";

import Loading from "~/components/Loading";

type AutocompleteProps = {
  inputId?: string;
  inputName?: string;
};

const Autocomplete = ({ inputId, inputName }: AutocompleteProps) => {
  const [selected, setSelected] = useState({ id: null, name: "" });
  const [query, setQuery] = useState("");
  const fetcher = useFetcher();
  const isLoading = fetcher.state === "loading";

  return (
    <div className="w-72">
      <Combobox value={selected} onChange={setSelected}>
        <div className="relative">
          <div className="relative w-full cursor-default">
            <Combobox.Input
              className="input-bordered input w-full py-2 pl-3 pr-10"
              displayValue={(region: any) => region.name}
              id={inputId}
              name={inputName}
              autoComplete="off"
              onChange={(event) => {
                setQuery(event.target.value);
                fetcher.load(`/api/regions?q=${event.target.value}`);
              }}
            />
            <input
              type="hidden"
              id={`${inputId}-data`}
              name={`${inputName}-data`}
              value={JSON.stringify(selected)}
            />
            <Combobox.Button className="absolute inset-y-0 right-0 flex items-center pr-2">
              {isLoading && (
                <div className="flex h-5 w-5">
                  <Loading />
                </div>
              )}
              <ChevronUpDownIcon
                className="h-5 w-5 text-gray-400"
                aria-hidden="true"
              />
            </Combobox.Button>
          </div>
          <Transition
            as={Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
            afterLeave={() => setQuery("")}
          >
            <Combobox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
              {query.length > 0 && (
                <Combobox.Option
                  className={({ active }) =>
                    `relative cursor-default select-none py-2 pl-10 pr-4 ${
                      active ? "bg-primary text-white" : "text-gray-900"
                    }`
                  }
                  value={{ id: null, name: query }}
                >
                  Add as "{query}"
                </Combobox.Option>
              )}
              {fetcher.data &&
                fetcher.data.map((person: any) => (
                  <Combobox.Option
                    key={person.id}
                    className={({ active }) =>
                      `relative cursor-default select-none py-2 pl-10 pr-4 ${
                        active ? "bg-primary text-white" : "text-gray-900"
                      }`
                    }
                    value={person}
                  >
                    {({ selected, active }) => (
                      <>
                        <span
                          className={`block truncate ${
                            selected ? "font-medium" : "font-normal"
                          }`}
                        >
                          {person.name}
                        </span>
                        {selected ? (
                          <span
                            className={`absolute inset-y-0 left-0 flex items-center pl-3 ${
                              active ? "text-white" : "text-primary"
                            }`}
                          >
                            <CheckIcon className="h-5 w-5" aria-hidden="true" />
                          </span>
                        ) : null}
                      </>
                    )}
                  </Combobox.Option>
                ))}
            </Combobox.Options>
          </Transition>
        </div>
      </Combobox>
    </div>
  );
};

export default Autocomplete;
