export function classNames(..._params: any): string {
  const classes: (string | number)[] = [];

  for (let i = 0; i < arguments.length; i++) {
    const arg = arguments[i];

    // Skip null and undefined arguments
    if (arg == null) {
      continue;
    }

    if (typeof arg == "string" || typeof arg == "number") {
      classes.push(arg);
    } else if (Array.isArray(arg) && arg.length > 0) {
      classes.push(classNames.apply(null, arg));
    } else if (typeof arg == "object") {
      for (const [key, value] of Object.entries(arg) as [string, boolean][]) {
        if (value) {
          classes.push(key);
        }
      }
    }
  }

  return classes.join(" ");
}
