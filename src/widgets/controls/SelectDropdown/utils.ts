import { OptionT, PathT } from "./SelectDropdown.interfaces";
import { v4 as uuidv4 } from "uuid";
import _ from "lodash";

export const flattenOptions = (
  options: OptionT[],
  parentId?: uuidv4 | null,
  depth?: number = 0
) => {
  const flattenedOptions = [];

  options?.forEach((o: any) => {
    const uuid = String(uuidv4());
    flattenedOptions.push(
      {
        __id: uuid,
        parentId,
        depth,
        hasChildren: !!o.options,
        ..._.omit(o, "options"),
      },
      ...flattenOptions(o.options, uuid, depth + 1)
    );
  });

  return flattenedOptions;
};

// export const flattenOptions = (options: OptionT[], currentPath: PathT = []) => {
//   const flattenedOptions: Array<
//     { id: uuidv4; path: PathT; displayPath: string } & OptionT
//   > = [];

//   options.forEach((option: OptionT, idx: number) => {
//     const { label, value, options } = option;
//     const uuid = uuidv4();
//     const path = [...currentPath, value];
//     const displayPath = path
//       .filter((_p: string | number, i: number) => i % 2 == 0)
//       .join(" > ");

//     if (options) {
//       flattenedOptions.push(
//         { id: uuid, path, displayPath, ...option },
//         ...flattenOptions(options, [...path, idx])
//       );
//     } else {
//       flattenedOptions.push({ id: uuid, path, displayPath, ...option });
//     }
//   });

//   return flattenedOptions;
// };
