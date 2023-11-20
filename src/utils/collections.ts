import { v4 as uuidv4 } from "uuid";

/**
 * Flattens a nested structure into a flat array.
 *
 * @param {T | T[]} nested - The nested structure to flatten.
 * @param {string} childrenAccessor - The property name to access the children of an object.
 * @param {string} [idAccessor] - The property name to access the id of an object. If not provided, a UUID will be generated.
 * @returns {Array<{ parentId: string | undefined } & T>} The flattened array.
 */
export function flattenNested<T extends Record<string, any>>(
  nested: T | T[],
  childrenAccessor: string,
  idAccessor?: string
) {
  // Initialize the flattened array
  const flattened: Array<{ parentId: string | undefined } & T> = [];

  /**
   * Recursive function to flatten an object.
   *
   * @param {T} obj - The object to flatten.
   * @param {string} [parentId] - The id of the parent object.
   */
  function flatten(obj: T, parentId?: string): void {
    // Generate an id for the object if no idAccessor is provided
    const id = idAccessor ? obj[idAccessor] : uuidv4();

    // Add the object to the flattened array
    flattened.push({ [idAccessor ?? "id"]: id, parentId, ...obj });

    // If the object has children, flatten each child
    if (obj[childrenAccessor] && Array.isArray(obj[childrenAccessor])) {
      obj[childrenAccessor]?.forEach((o: T) => flatten(o, id));
    }
  }

  // If the nested structure is an array, flatten each object in the array
  if (Array.isArray(nested)) {
    nested.forEach((obj: T) => flatten(obj));
  } else {
    // If the nested structure is a single object, flatten the object
    flatten(nested);
  }

  // Return the flattened array
  return flattened;
}
