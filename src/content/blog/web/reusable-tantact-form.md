---
title: Building a Reusable TanStack Form
description: How to build reusable form components with TanStack Form so you don’t repeat the same boilerplate for every input.
date: 2026-01-16
status: PUBLISH
tags:
  - reactjs
  - web development
  - tanstack
---

TanStack Form is genuinely good. I already use TanStack Query, so adopting it felt natural.  
The problem is not capability. The problem is _verbosity_.

Every time I built a form, I ended up writing the same wiring code again and again just to make inputs behave correctly. It worked, but it didn’t scale well, and it definitely wasn’t pleasant.

So I went looking for a cleaner, reusable approach. After digging through GitHub discussions, I found a pattern that made a lot of sense: **centralize form logic and expose reusable field components**.

This post walks through how to do exactly that.

## The Idea

Instead of rebuilding form logic every time, we:

1. Create a base `form.ts` file that knows about TanStack Form.
2. Build input components that rely on form context instead of props.
3. Register those components once.
4. Reuse them everywhere with minimal boilerplate.

## Project Structure

We’ll isolate all form-related logic in a single folder:

```bash
form/
| form.ts
| input/
| | f-input.tsx
| | f-input-area.tsx
| action/
| | submit.tsx
```

**Note:**  
You can name these files however you want. I prefer `kebab-case` because it’s easier to scan than `camelCase`, especially in large projects.

## 1. Create the Base Form

The purpose of `form.ts` is to act as a registry for all reusable form components. This is where TanStack Form is initialized and shared.

Open `form.ts`

```ts
import { createFormHook, createFormHookContexts } from "@tanstack/react-form";

export const { fieldContext, useFieldContext, formContext, useFormContext } =
  createFormHookContexts();

export const { useAppForm } = createFormHook({
  fieldComponents: {},
  formComponents: {},
  fieldContext,
  formContext,
});
```

At this stage:

- fieldComponents will hold inputs like text fields or text areas.
- formComponents will hold actions like submit or reset buttons.
- Contexts allow child components to access form state without prop drilling.

## 2. Create a Reusable Input Component

Now we define an input that automatically connects to the form using context.

Open `f-input.tsx`

```tsx
import { useStore } from "@tanstack/react-form";
import { useFieldContext } from "..";

export default function FInput({ label, ...props }: InputProps) {
  const field = useFieldContext<string>();
  const errors = useStore(field.store, (state) => state.meta.errors);

  return (
    <div className="input-wrapper">
      {label && <label htmlFor={field.name}>{label}</label>}

      <input
        {...props}
        name={field.name}
        value={field.state.value ?? ""}
        onChange={(e) => field.setValue(e.target.value)}
        onBlur={field.handleBlur}
      />

      {errors?.length > 0 &&
        errors.map((it) => (
          <p key={it} className="input-error">
            {it.message}
          </p>
        ))}
    </div>
  );
}
```

What this does:

- Automatically binds the input to the form field.
- Reads validation errors from TanStack’s store.
- Removes the need to manually pass value, onChange, and error state every time.

## 3. Create a Submit Button Component

This keeps form actions consistent and reusable.
Open `submit.tsx`

```tsx
import { Button } from "../button";

export default function SubmitBtn() {
  return <Button type="submit">Submit</Button>;
}
```

## 5. Register Components in the Base Form

Now we register everything inside form.ts so it becomes available everywhere.

Updated form.ts

```tsx
import { createFormHook, createFormHookContexts } from "@tanstack/react-form";
import FInput from "./input/f-input";
import Submit from "./action/submit";

export const { fieldContext, useFieldContext, formContext, useFormContext } =
  createFormHookContexts();

export const { useAppForm } = createFormHook({
  fieldComponents: {
    FInput,
    // You can register more inputs here:
    // FInputPassword,
    // FSelect,
    // FTextarea
  },
  formComponents: {
    Submit,
  },
  fieldContext,
  formContext,
});
```

## 6. Using the Reusable Form

Here’s how a form looks after all this setup.

```tsx
import { useAppForm } from "@/components/form/form";

export default function DemoForm() {
  const form = useAppForm({
    defaultValues: {
      name: "john doe",
    },
    onSubmit: ({ value }: { value: IBody }) => {
      console.log(value);
    },
  });

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        e.stopPropagation();
        form.handleSubmit();
      }}
    >
      <form.AppField
        name="name"
        children={(f) => <f.FInput label="Name" placeholder="Input name" />}
      />

      <form.Submit />
    </form>
  );
}
```

## Final Thoughts

This pattern shines when your app grows and you start adding many forms. You write the wiring once, then focus only on validation rules and UI.

You can extend this setup with:

- Custom input types
- Shared validation logic
- Form layouts
- Field-level styling

Reference discussion that inspired this approach:
[GitHub – TanStack Form Discussion](https://github.com/TanStack/form/discussions/1200)
