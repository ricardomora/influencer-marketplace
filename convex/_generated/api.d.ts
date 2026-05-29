/* eslint-disable */
/**
 * Generated `api` utility.
 *
 * THIS CODE IS AUTOMATICALLY GENERATED.
 *
 * To regenerate, run `npx convex dev`.
 * @module
 */

import type * as admin from "../admin.js";
import type * as brands from "../brands.js";
import type * as campaigns from "../campaigns.js";
import type * as entitlements from "../entitlements.js";
import type * as influencers from "../influencers.js";
import type * as lib from "../lib.js";
import type * as proposals from "../proposals.js";
import type * as search from "../search.js";
import type * as seed from "../seed.js";
import type * as socialAccounts from "../socialAccounts.js";
import type * as socialProviders_mock from "../socialProviders/mock.js";
import type * as users from "../users.js";

import type {
  ApiFromModules,
  FilterApi,
  FunctionReference,
} from "convex/server";

declare const fullApi: ApiFromModules<{
  admin: typeof admin;
  brands: typeof brands;
  campaigns: typeof campaigns;
  entitlements: typeof entitlements;
  influencers: typeof influencers;
  lib: typeof lib;
  proposals: typeof proposals;
  search: typeof search;
  seed: typeof seed;
  socialAccounts: typeof socialAccounts;
  "socialProviders/mock": typeof socialProviders_mock;
  users: typeof users;
}>;

/**
 * A utility for referencing Convex functions in your app's public API.
 *
 * Usage:
 * ```js
 * const myFunctionReference = api.myModule.myFunction;
 * ```
 */
export declare const api: FilterApi<
  typeof fullApi,
  FunctionReference<any, "public">
>;

/**
 * A utility for referencing Convex functions in your app's internal API.
 *
 * Usage:
 * ```js
 * const myFunctionReference = internal.myModule.myFunction;
 * ```
 */
export declare const internal: FilterApi<
  typeof fullApi,
  FunctionReference<any, "internal">
>;

export declare const components: {};
