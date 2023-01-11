import type { ActionFunction } from "@remix-run/node";
import { json } from "@remix-run/node";
import { useActionData, useSearchParams } from "@remix-run/react";
import { db } from "~/utils/db.server";
import { createUserSession, login, register } from "~/utils/session.server";

function validateUsername(username: unknown) {
  if (typeof username !== "string" || username.length < 3) {
    return `Usernames must be at least 3 characters long`;
  }
}

function validatePassword(password: unknown) {
  if (typeof password !== "string" || password.length < 6) {
    return `Passwords must be at least 6 characters long`;
  }
}

function validateUrl(url: any) {
  console.log(url);
  let urls = ["/dashboard", "/", "https://remix.run"];
  if (urls.includes(url)) {
    return url;
  }
  return "/dashboard";
}

type ActionData = {
  formError?: string;
  fieldErrors?: {
    username: string | undefined;
    password: string | undefined;
  };
  fields?: {
    loginType: string;
    username: string;
    password: string;
  };
};

const badRequest = (data: ActionData) => json(data, { status: 400 });

export const action: ActionFunction = async ({ request }) => {
  const form = await request.formData();
  const loginType = form.get("loginType");
  const username = form.get("username");
  const password = form.get("password");
  const redirectTo = validateUrl(form.get("redirectTo") || "/dashboard");
  if (
    typeof loginType !== "string" ||
    typeof username !== "string" ||
    typeof password !== "string" ||
    typeof redirectTo !== "string"
  ) {
    return badRequest({
      formError: `Form not submitted correctly.`,
    });
  }

  const fields = { loginType, username, password };
  const fieldErrors = {
    username: validateUsername(username),
    password: validatePassword(password),
  };
  if (Object.values(fieldErrors).some(Boolean))
    return badRequest({ fieldErrors, fields });

  switch (loginType) {
    case "login": {
      // login to get the user
      const user = await login({ username, password });
      if (!user) {
        return badRequest({
          fields,
          formError: `Username/Password combination is incorrect`,
        });
      }
      // if there's no user, return the fields and a formError
      // if there is a user, create their session and redirect to /jokes
      return createUserSession(user.id, redirectTo);
    }
    case "register": {
      const userExists = await db.user.findFirst({
        where: { username },
      });
      if (userExists) {
        return badRequest({
          fields,
          formError: `User with username ${username} already exists`,
        });
      }
      // create the user
      const user = await register({ username, password });
      if (!user) {
        return badRequest({
          fields,
          formError: `Something went wrong trying to create a new user.`,
        });
      }
      return createUserSession(user.id, redirectTo);
    }
    default: {
      return badRequest({
        fields,
        formError: `Login type invalid`,
      });
    }
  }
};

export default function Login() {
  const actionData = useActionData<typeof action>();
  const [searchParams] = useSearchParams();
  return (
    <div className="container mx-auto">
      <div className="prose">
        <h2 className="mt-4">Login</h2>
        <form method="post">
          <input
            type="hidden"
            name="redirectTo"
            value={searchParams.get("redirectTo") ?? undefined}
          />
          <fieldset className="form-control">
            <legend className="sr-only">Login or Register?</legend>
            <label className="label cursor-pointer justify-start">
              <input
                type="radio"
                name="loginType"
                value="login"
                defaultChecked={
                  !actionData?.fields?.loginType ||
                  actionData?.fields?.loginType === "login"
                }
                className="radio"
              />
              <span className="pl-2">Login</span>
            </label>
            <label className="label cursor-pointer justify-start">
              <input
                type="radio"
                name="loginType"
                value="register"
                defaultChecked={actionData?.fields?.loginType === "register"}
                className="radio"
              />
              <span className="pl-2">Register</span>
            </label>
          </fieldset>
          <div>
            <label htmlFor="username-input" className="label">
              <span className="label-text">Username</span>
            </label>
            <input
              type="text"
              id="username-input"
              name="username"
              className="input input-bordered"
              defaultValue={actionData?.fields?.username}
              aria-invalid={Boolean(actionData?.fieldErrors?.username)}
              aria-errormessage={
                actionData?.fieldErrors?.username ? "username-error" : undefined
              }
            />
            {actionData?.fieldErrors?.username ? (
              <div className="my-2" role="alert" id="username-error">
                {actionData.fieldErrors.username}
              </div>
            ) : null}
          </div>
          <div>
            <label htmlFor="password-input" className="label">
              <span className="label-text">Password</span>
            </label>
            <input
              id="password-input"
              name="password"
              type="password"
              className="input input-bordered"
              defaultValue={actionData?.fields?.password}
              aria-invalid={Boolean(actionData?.fieldErrors?.password)}
              aria-errormessage={
                actionData?.fieldErrors?.password ? "password-error" : undefined
              }
            />
            {actionData?.fieldErrors?.password ? (
              <div className="my-2" role="alert" id="password-error">
                {actionData.fieldErrors.password}
              </div>
            ) : null}
          </div>
          <div id="form-error-message">
            {actionData?.formError ? (
              <div className="my-2" role="alert">
                {actionData.formError}
              </div>
            ) : null}
          </div>
          <button type="submit" className="btn btn-primary my-4">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}
