
import { themes } from "@/lib";
import { useTheme } from "@/lib/useTheme";
import {
  Menubar,
  MenubarMenu,
  MenubarTrigger,
  MenubarContent,
  MenubarItem,
} from "@radix-ui/react-menubar";
import { useCallback } from "react";

const Theme = () => {
  const { mode, setMode } = useTheme();

  const updateMode = useCallback(
    (value) => (event) => {
      event.preventDefault();
      setMode(value);
      if (value !== "system") {
        localStorage.setItem("theme", value);
      } else {
        localStorage.removeItem("theme");
      }
    },
    [setMode]
  );

  return (
    <Menubar className="relative border-none bg-transparent shadow-none z-50">
      <MenubarMenu>
        <MenubarTrigger className="focus:bg-light-900 data-[state=open]:bg-light-900 dark:focus:bg-dark-200 dark:data-[state=open]:bg-dark-200 ">
          {mode === "light" ? (
            <img
              src="/assets/icons/sun.svg"
              alt="sun"
              width={20}
              height={20}
              className="active-theme"
            />
          ) : (
            <img
              src="/assets/icons/moon.svg"
              alt="moon"
              width={20}
              height={20}
              className="active-theme"
            />
          )}
        </MenubarTrigger>
        <MenubarContent className="absolute right-[-3rem] mt-3 min-w-[120px] rounded border py-2 dark:border-dark-400 dark:bg-dark-300 bg-light-900">
          {themes.map((item) => (
            <MenubarItem
              key={item.value}
              onClick={updateMode(item.value)}
              className="flex cursor-pointer items-center gap-4 px-2.5 py-2 dark:focus:bg-dark-400">
              <img
                src={item.icon}
                alt={item.value}
                width={16}
                height={16}
                className={`${mode === item.value ? "active-theme" : ""}`}
              />
              <p
                className={`body-semibold text-light-500 ${
                  mode === item.value
                    ? "text-orange-500"
                    : "text-dark100_light900"
                }`}>
                {item.label}
              </p>
            </MenubarItem>
          ))}
        </MenubarContent>
      </MenubarMenu>
    </Menubar>
  );
};

export default Theme;
