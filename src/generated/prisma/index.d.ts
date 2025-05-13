
/**
 * Client
**/

import * as runtime from './runtime/library.js';
import $Types = runtime.Types // general types
import $Public = runtime.Types.Public
import $Utils = runtime.Types.Utils
import $Extensions = runtime.Types.Extensions
import $Result = runtime.Types.Result

export type PrismaPromise<T> = $Public.PrismaPromise<T>


/**
 * Model User
 * 
 */
export type User = $Result.DefaultSelection<Prisma.$UserPayload>
/**
 * Model TradingHistory
 * 
 */
export type TradingHistory = $Result.DefaultSelection<Prisma.$TradingHistoryPayload>
/**
 * Model CurrentAllocation
 * 
 */
export type CurrentAllocation = $Result.DefaultSelection<Prisma.$CurrentAllocationPayload>
/**
 * Model CurrentAsset
 * 
 */
export type CurrentAsset = $Result.DefaultSelection<Prisma.$CurrentAssetPayload>
/**
 * Model Strategy
 * 
 */
export type Strategy = $Result.DefaultSelection<Prisma.$StrategyPayload>
/**
 * Model UserStrategyAllocation
 * 
 */
export type UserStrategyAllocation = $Result.DefaultSelection<Prisma.$UserStrategyAllocationPayload>

/**
 * Enums
 */
export namespace $Enums {
  export const UserRole: {
  USER: 'USER',
  ADMIN: 'ADMIN'
};

export type UserRole = (typeof UserRole)[keyof typeof UserRole]

}

export type UserRole = $Enums.UserRole

export const UserRole: typeof $Enums.UserRole

/**
 * ##  Prisma Client ʲˢ
 *
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more Users
 * const users = await prisma.user.findMany()
 * ```
 *
 *
 * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
 */
export class PrismaClient<
  ClientOptions extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
  U = 'log' extends keyof ClientOptions ? ClientOptions['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<ClientOptions['log']> : never : never,
  ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
> {
  [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['other'] }

    /**
   * ##  Prisma Client ʲˢ
   *
   * Type-safe database client for TypeScript & Node.js
   * @example
   * ```
   * const prisma = new PrismaClient()
   * // Fetch zero or more Users
   * const users = await prisma.user.findMany()
   * ```
   *
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
   */

  constructor(optionsArg ?: Prisma.Subset<ClientOptions, Prisma.PrismaClientOptions>);
  $on<V extends U>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : Prisma.LogEvent) => void): PrismaClient;

  /**
   * Connect with the database
   */
  $connect(): $Utils.JsPromise<void>;

  /**
   * Disconnect from the database
   */
  $disconnect(): $Utils.JsPromise<void>;

  /**
   * Add a middleware
   * @deprecated since 4.16.0. For new code, prefer client extensions instead.
   * @see https://pris.ly/d/extensions
   */
  $use(cb: Prisma.Middleware): void

/**
   * Executes a prepared raw query and returns the number of affected rows.
   * @example
   * ```
   * const result = await prisma.$executeRaw`UPDATE User SET cool = ${true} WHERE email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Executes a raw query and returns the number of affected rows.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$executeRawUnsafe('UPDATE User SET cool = $1 WHERE email = $2 ;', true, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Performs a prepared raw query and returns the `SELECT` data.
   * @example
   * ```
   * const result = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<T>;

  /**
   * Performs a raw query and returns the `SELECT` data.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$queryRawUnsafe('SELECT * FROM User WHERE id = $1 OR email = $2;', 1, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<T>;


  /**
   * Allows the running of a sequence of read/write operations that are guaranteed to either succeed or fail as a whole.
   * @example
   * ```
   * const [george, bob, alice] = await prisma.$transaction([
   *   prisma.user.create({ data: { name: 'George' } }),
   *   prisma.user.create({ data: { name: 'Bob' } }),
   *   prisma.user.create({ data: { name: 'Alice' } }),
   * ])
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/concepts/components/prisma-client/transactions).
   */
  $transaction<P extends Prisma.PrismaPromise<any>[]>(arg: [...P], options?: { isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<runtime.Types.Utils.UnwrapTuple<P>>

  $transaction<R>(fn: (prisma: Omit<PrismaClient, runtime.ITXClientDenyList>) => $Utils.JsPromise<R>, options?: { maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<R>


  $extends: $Extensions.ExtendsHook<"extends", Prisma.TypeMapCb<ClientOptions>, ExtArgs, $Utils.Call<Prisma.TypeMapCb<ClientOptions>, {
    extArgs: ExtArgs
  }>>

      /**
   * `prisma.user`: Exposes CRUD operations for the **User** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Users
    * const users = await prisma.user.findMany()
    * ```
    */
  get user(): Prisma.UserDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.tradingHistory`: Exposes CRUD operations for the **TradingHistory** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more TradingHistories
    * const tradingHistories = await prisma.tradingHistory.findMany()
    * ```
    */
  get tradingHistory(): Prisma.TradingHistoryDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.currentAllocation`: Exposes CRUD operations for the **CurrentAllocation** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more CurrentAllocations
    * const currentAllocations = await prisma.currentAllocation.findMany()
    * ```
    */
  get currentAllocation(): Prisma.CurrentAllocationDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.currentAsset`: Exposes CRUD operations for the **CurrentAsset** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more CurrentAssets
    * const currentAssets = await prisma.currentAsset.findMany()
    * ```
    */
  get currentAsset(): Prisma.CurrentAssetDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.strategy`: Exposes CRUD operations for the **Strategy** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Strategies
    * const strategies = await prisma.strategy.findMany()
    * ```
    */
  get strategy(): Prisma.StrategyDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.userStrategyAllocation`: Exposes CRUD operations for the **UserStrategyAllocation** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more UserStrategyAllocations
    * const userStrategyAllocations = await prisma.userStrategyAllocation.findMany()
    * ```
    */
  get userStrategyAllocation(): Prisma.UserStrategyAllocationDelegate<ExtArgs, ClientOptions>;
}

export namespace Prisma {
  export import DMMF = runtime.DMMF

  export type PrismaPromise<T> = $Public.PrismaPromise<T>

  /**
   * Validator
   */
  export import validator = runtime.Public.validator

  /**
   * Prisma Errors
   */
  export import PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError
  export import PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError
  export import PrismaClientRustPanicError = runtime.PrismaClientRustPanicError
  export import PrismaClientInitializationError = runtime.PrismaClientInitializationError
  export import PrismaClientValidationError = runtime.PrismaClientValidationError

  /**
   * Re-export of sql-template-tag
   */
  export import sql = runtime.sqltag
  export import empty = runtime.empty
  export import join = runtime.join
  export import raw = runtime.raw
  export import Sql = runtime.Sql



  /**
   * Decimal.js
   */
  export import Decimal = runtime.Decimal

  export type DecimalJsLike = runtime.DecimalJsLike

  /**
   * Metrics
   */
  export type Metrics = runtime.Metrics
  export type Metric<T> = runtime.Metric<T>
  export type MetricHistogram = runtime.MetricHistogram
  export type MetricHistogramBucket = runtime.MetricHistogramBucket

  /**
  * Extensions
  */
  export import Extension = $Extensions.UserArgs
  export import getExtensionContext = runtime.Extensions.getExtensionContext
  export import Args = $Public.Args
  export import Payload = $Public.Payload
  export import Result = $Public.Result
  export import Exact = $Public.Exact

  /**
   * Prisma Client JS version: 6.7.0
   * Query Engine version: 3cff47a7f5d65c3ea74883f1d736e41d68ce91ed
   */
  export type PrismaVersion = {
    client: string
  }

  export const prismaVersion: PrismaVersion

  /**
   * Utility Types
   */


  export import JsonObject = runtime.JsonObject
  export import JsonArray = runtime.JsonArray
  export import JsonValue = runtime.JsonValue
  export import InputJsonObject = runtime.InputJsonObject
  export import InputJsonArray = runtime.InputJsonArray
  export import InputJsonValue = runtime.InputJsonValue

  /**
   * Types of the values used to represent different kinds of `null` values when working with JSON fields.
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  namespace NullTypes {
    /**
    * Type of `Prisma.DbNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.DbNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class DbNull {
      private DbNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.JsonNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.JsonNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class JsonNull {
      private JsonNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.AnyNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.AnyNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class AnyNull {
      private AnyNull: never
      private constructor()
    }
  }

  /**
   * Helper for filtering JSON entries that have `null` on the database (empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const DbNull: NullTypes.DbNull

  /**
   * Helper for filtering JSON entries that have JSON `null` values (not empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const JsonNull: NullTypes.JsonNull

  /**
   * Helper for filtering JSON entries that are `Prisma.DbNull` or `Prisma.JsonNull`
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const AnyNull: NullTypes.AnyNull

  type SelectAndInclude = {
    select: any
    include: any
  }

  type SelectAndOmit = {
    select: any
    omit: any
  }

  /**
   * Get the type of the value, that the Promise holds.
   */
  export type PromiseType<T extends PromiseLike<any>> = T extends PromiseLike<infer U> ? U : T;

  /**
   * Get the return type of a function which returns a Promise.
   */
  export type PromiseReturnType<T extends (...args: any) => $Utils.JsPromise<any>> = PromiseType<ReturnType<T>>

  /**
   * From T, pick a set of properties whose keys are in the union K
   */
  type Prisma__Pick<T, K extends keyof T> = {
      [P in K]: T[P];
  };


  export type Enumerable<T> = T | Array<T>;

  export type RequiredKeys<T> = {
    [K in keyof T]-?: {} extends Prisma__Pick<T, K> ? never : K
  }[keyof T]

  export type TruthyKeys<T> = keyof {
    [K in keyof T as T[K] extends false | undefined | null ? never : K]: K
  }

  export type TrueKeys<T> = TruthyKeys<Prisma__Pick<T, RequiredKeys<T>>>

  /**
   * Subset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection
   */
  export type Subset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
  };

  /**
   * SelectSubset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection.
   * Additionally, it validates, if both select and include are present. If the case, it errors.
   */
  export type SelectSubset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    (T extends SelectAndInclude
      ? 'Please either choose `select` or `include`.'
      : T extends SelectAndOmit
        ? 'Please either choose `select` or `omit`.'
        : {})

  /**
   * Subset + Intersection
   * @desc From `T` pick properties that exist in `U` and intersect `K`
   */
  export type SubsetIntersection<T, U, K> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    K

  type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };

  /**
   * XOR is needed to have a real mutually exclusive union type
   * https://stackoverflow.com/questions/42123407/does-typescript-support-mutually-exclusive-types
   */
  type XOR<T, U> =
    T extends object ?
    U extends object ?
      (Without<T, U> & U) | (Without<U, T> & T)
    : U : T


  /**
   * Is T a Record?
   */
  type IsObject<T extends any> = T extends Array<any>
  ? False
  : T extends Date
  ? False
  : T extends Uint8Array
  ? False
  : T extends BigInt
  ? False
  : T extends object
  ? True
  : False


  /**
   * If it's T[], return T
   */
  export type UnEnumerate<T extends unknown> = T extends Array<infer U> ? U : T

  /**
   * From ts-toolbelt
   */

  type __Either<O extends object, K extends Key> = Omit<O, K> &
    {
      // Merge all but K
      [P in K]: Prisma__Pick<O, P & keyof O> // With K possibilities
    }[K]

  type EitherStrict<O extends object, K extends Key> = Strict<__Either<O, K>>

  type EitherLoose<O extends object, K extends Key> = ComputeRaw<__Either<O, K>>

  type _Either<
    O extends object,
    K extends Key,
    strict extends Boolean
  > = {
    1: EitherStrict<O, K>
    0: EitherLoose<O, K>
  }[strict]

  type Either<
    O extends object,
    K extends Key,
    strict extends Boolean = 1
  > = O extends unknown ? _Either<O, K, strict> : never

  export type Union = any

  type PatchUndefined<O extends object, O1 extends object> = {
    [K in keyof O]: O[K] extends undefined ? At<O1, K> : O[K]
  } & {}

  /** Helper Types for "Merge" **/
  export type IntersectOf<U extends Union> = (
    U extends unknown ? (k: U) => void : never
  ) extends (k: infer I) => void
    ? I
    : never

  export type Overwrite<O extends object, O1 extends object> = {
      [K in keyof O]: K extends keyof O1 ? O1[K] : O[K];
  } & {};

  type _Merge<U extends object> = IntersectOf<Overwrite<U, {
      [K in keyof U]-?: At<U, K>;
  }>>;

  type Key = string | number | symbol;
  type AtBasic<O extends object, K extends Key> = K extends keyof O ? O[K] : never;
  type AtStrict<O extends object, K extends Key> = O[K & keyof O];
  type AtLoose<O extends object, K extends Key> = O extends unknown ? AtStrict<O, K> : never;
  export type At<O extends object, K extends Key, strict extends Boolean = 1> = {
      1: AtStrict<O, K>;
      0: AtLoose<O, K>;
  }[strict];

  export type ComputeRaw<A extends any> = A extends Function ? A : {
    [K in keyof A]: A[K];
  } & {};

  export type OptionalFlat<O> = {
    [K in keyof O]?: O[K];
  } & {};

  type _Record<K extends keyof any, T> = {
    [P in K]: T;
  };

  // cause typescript not to expand types and preserve names
  type NoExpand<T> = T extends unknown ? T : never;

  // this type assumes the passed object is entirely optional
  type AtLeast<O extends object, K extends string> = NoExpand<
    O extends unknown
    ? | (K extends keyof O ? { [P in K]: O[P] } & O : O)
      | {[P in keyof O as P extends K ? P : never]-?: O[P]} & O
    : never>;

  type _Strict<U, _U = U> = U extends unknown ? U & OptionalFlat<_Record<Exclude<Keys<_U>, keyof U>, never>> : never;

  export type Strict<U extends object> = ComputeRaw<_Strict<U>>;
  /** End Helper Types for "Merge" **/

  export type Merge<U extends object> = ComputeRaw<_Merge<Strict<U>>>;

  /**
  A [[Boolean]]
  */
  export type Boolean = True | False

  // /**
  // 1
  // */
  export type True = 1

  /**
  0
  */
  export type False = 0

  export type Not<B extends Boolean> = {
    0: 1
    1: 0
  }[B]

  export type Extends<A1 extends any, A2 extends any> = [A1] extends [never]
    ? 0 // anything `never` is false
    : A1 extends A2
    ? 1
    : 0

  export type Has<U extends Union, U1 extends Union> = Not<
    Extends<Exclude<U1, U>, U1>
  >

  export type Or<B1 extends Boolean, B2 extends Boolean> = {
    0: {
      0: 0
      1: 1
    }
    1: {
      0: 1
      1: 1
    }
  }[B1][B2]

  export type Keys<U extends Union> = U extends unknown ? keyof U : never

  type Cast<A, B> = A extends B ? A : B;

  export const type: unique symbol;



  /**
   * Used by group by
   */

  export type GetScalarType<T, O> = O extends object ? {
    [P in keyof T]: P extends keyof O
      ? O[P]
      : never
  } : never

  type FieldPaths<
    T,
    U = Omit<T, '_avg' | '_sum' | '_count' | '_min' | '_max'>
  > = IsObject<T> extends True ? U : T

  type GetHavingFields<T> = {
    [K in keyof T]: Or<
      Or<Extends<'OR', K>, Extends<'AND', K>>,
      Extends<'NOT', K>
    > extends True
      ? // infer is only needed to not hit TS limit
        // based on the brilliant idea of Pierre-Antoine Mills
        // https://github.com/microsoft/TypeScript/issues/30188#issuecomment-478938437
        T[K] extends infer TK
        ? GetHavingFields<UnEnumerate<TK> extends object ? Merge<UnEnumerate<TK>> : never>
        : never
      : {} extends FieldPaths<T[K]>
      ? never
      : K
  }[keyof T]

  /**
   * Convert tuple to union
   */
  type _TupleToUnion<T> = T extends (infer E)[] ? E : never
  type TupleToUnion<K extends readonly any[]> = _TupleToUnion<K>
  type MaybeTupleToUnion<T> = T extends any[] ? TupleToUnion<T> : T

  /**
   * Like `Pick`, but additionally can also accept an array of keys
   */
  type PickEnumerable<T, K extends Enumerable<keyof T> | keyof T> = Prisma__Pick<T, MaybeTupleToUnion<K>>

  /**
   * Exclude all keys with underscores
   */
  type ExcludeUnderscoreKeys<T extends string> = T extends `_${string}` ? never : T


  export type FieldRef<Model, FieldType> = runtime.FieldRef<Model, FieldType>

  type FieldRefInputType<Model, FieldType> = Model extends never ? never : FieldRef<Model, FieldType>


  export const ModelName: {
    User: 'User',
    TradingHistory: 'TradingHistory',
    CurrentAllocation: 'CurrentAllocation',
    CurrentAsset: 'CurrentAsset',
    Strategy: 'Strategy',
    UserStrategyAllocation: 'UserStrategyAllocation'
  };

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]


  export type Datasources = {
    db?: Datasource
  }

  interface TypeMapCb<ClientOptions = {}> extends $Utils.Fn<{extArgs: $Extensions.InternalArgs }, $Utils.Record<string, any>> {
    returns: Prisma.TypeMap<this['params']['extArgs'], ClientOptions extends { omit: infer OmitOptions } ? OmitOptions : {}>
  }

  export type TypeMap<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> = {
    globalOmitOptions: {
      omit: GlobalOmitOptions
    }
    meta: {
      modelProps: "user" | "tradingHistory" | "currentAllocation" | "currentAsset" | "strategy" | "userStrategyAllocation"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
      User: {
        payload: Prisma.$UserPayload<ExtArgs>
        fields: Prisma.UserFieldRefs
        operations: {
          findUnique: {
            args: Prisma.UserFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.UserFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          findFirst: {
            args: Prisma.UserFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.UserFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          findMany: {
            args: Prisma.UserFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          create: {
            args: Prisma.UserCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          createMany: {
            args: Prisma.UserCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.UserCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          delete: {
            args: Prisma.UserDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          update: {
            args: Prisma.UserUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          deleteMany: {
            args: Prisma.UserDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.UserUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.UserUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          upsert: {
            args: Prisma.UserUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          aggregate: {
            args: Prisma.UserAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateUser>
          }
          groupBy: {
            args: Prisma.UserGroupByArgs<ExtArgs>
            result: $Utils.Optional<UserGroupByOutputType>[]
          }
          count: {
            args: Prisma.UserCountArgs<ExtArgs>
            result: $Utils.Optional<UserCountAggregateOutputType> | number
          }
        }
      }
      TradingHistory: {
        payload: Prisma.$TradingHistoryPayload<ExtArgs>
        fields: Prisma.TradingHistoryFieldRefs
        operations: {
          findUnique: {
            args: Prisma.TradingHistoryFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TradingHistoryPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.TradingHistoryFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TradingHistoryPayload>
          }
          findFirst: {
            args: Prisma.TradingHistoryFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TradingHistoryPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.TradingHistoryFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TradingHistoryPayload>
          }
          findMany: {
            args: Prisma.TradingHistoryFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TradingHistoryPayload>[]
          }
          create: {
            args: Prisma.TradingHistoryCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TradingHistoryPayload>
          }
          createMany: {
            args: Prisma.TradingHistoryCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.TradingHistoryCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TradingHistoryPayload>[]
          }
          delete: {
            args: Prisma.TradingHistoryDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TradingHistoryPayload>
          }
          update: {
            args: Prisma.TradingHistoryUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TradingHistoryPayload>
          }
          deleteMany: {
            args: Prisma.TradingHistoryDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.TradingHistoryUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.TradingHistoryUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TradingHistoryPayload>[]
          }
          upsert: {
            args: Prisma.TradingHistoryUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TradingHistoryPayload>
          }
          aggregate: {
            args: Prisma.TradingHistoryAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateTradingHistory>
          }
          groupBy: {
            args: Prisma.TradingHistoryGroupByArgs<ExtArgs>
            result: $Utils.Optional<TradingHistoryGroupByOutputType>[]
          }
          count: {
            args: Prisma.TradingHistoryCountArgs<ExtArgs>
            result: $Utils.Optional<TradingHistoryCountAggregateOutputType> | number
          }
        }
      }
      CurrentAllocation: {
        payload: Prisma.$CurrentAllocationPayload<ExtArgs>
        fields: Prisma.CurrentAllocationFieldRefs
        operations: {
          findUnique: {
            args: Prisma.CurrentAllocationFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CurrentAllocationPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.CurrentAllocationFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CurrentAllocationPayload>
          }
          findFirst: {
            args: Prisma.CurrentAllocationFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CurrentAllocationPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.CurrentAllocationFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CurrentAllocationPayload>
          }
          findMany: {
            args: Prisma.CurrentAllocationFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CurrentAllocationPayload>[]
          }
          create: {
            args: Prisma.CurrentAllocationCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CurrentAllocationPayload>
          }
          createMany: {
            args: Prisma.CurrentAllocationCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.CurrentAllocationCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CurrentAllocationPayload>[]
          }
          delete: {
            args: Prisma.CurrentAllocationDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CurrentAllocationPayload>
          }
          update: {
            args: Prisma.CurrentAllocationUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CurrentAllocationPayload>
          }
          deleteMany: {
            args: Prisma.CurrentAllocationDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.CurrentAllocationUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.CurrentAllocationUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CurrentAllocationPayload>[]
          }
          upsert: {
            args: Prisma.CurrentAllocationUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CurrentAllocationPayload>
          }
          aggregate: {
            args: Prisma.CurrentAllocationAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateCurrentAllocation>
          }
          groupBy: {
            args: Prisma.CurrentAllocationGroupByArgs<ExtArgs>
            result: $Utils.Optional<CurrentAllocationGroupByOutputType>[]
          }
          count: {
            args: Prisma.CurrentAllocationCountArgs<ExtArgs>
            result: $Utils.Optional<CurrentAllocationCountAggregateOutputType> | number
          }
        }
      }
      CurrentAsset: {
        payload: Prisma.$CurrentAssetPayload<ExtArgs>
        fields: Prisma.CurrentAssetFieldRefs
        operations: {
          findUnique: {
            args: Prisma.CurrentAssetFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CurrentAssetPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.CurrentAssetFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CurrentAssetPayload>
          }
          findFirst: {
            args: Prisma.CurrentAssetFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CurrentAssetPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.CurrentAssetFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CurrentAssetPayload>
          }
          findMany: {
            args: Prisma.CurrentAssetFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CurrentAssetPayload>[]
          }
          create: {
            args: Prisma.CurrentAssetCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CurrentAssetPayload>
          }
          createMany: {
            args: Prisma.CurrentAssetCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.CurrentAssetCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CurrentAssetPayload>[]
          }
          delete: {
            args: Prisma.CurrentAssetDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CurrentAssetPayload>
          }
          update: {
            args: Prisma.CurrentAssetUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CurrentAssetPayload>
          }
          deleteMany: {
            args: Prisma.CurrentAssetDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.CurrentAssetUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.CurrentAssetUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CurrentAssetPayload>[]
          }
          upsert: {
            args: Prisma.CurrentAssetUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CurrentAssetPayload>
          }
          aggregate: {
            args: Prisma.CurrentAssetAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateCurrentAsset>
          }
          groupBy: {
            args: Prisma.CurrentAssetGroupByArgs<ExtArgs>
            result: $Utils.Optional<CurrentAssetGroupByOutputType>[]
          }
          count: {
            args: Prisma.CurrentAssetCountArgs<ExtArgs>
            result: $Utils.Optional<CurrentAssetCountAggregateOutputType> | number
          }
        }
      }
      Strategy: {
        payload: Prisma.$StrategyPayload<ExtArgs>
        fields: Prisma.StrategyFieldRefs
        operations: {
          findUnique: {
            args: Prisma.StrategyFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StrategyPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.StrategyFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StrategyPayload>
          }
          findFirst: {
            args: Prisma.StrategyFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StrategyPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.StrategyFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StrategyPayload>
          }
          findMany: {
            args: Prisma.StrategyFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StrategyPayload>[]
          }
          create: {
            args: Prisma.StrategyCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StrategyPayload>
          }
          createMany: {
            args: Prisma.StrategyCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.StrategyCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StrategyPayload>[]
          }
          delete: {
            args: Prisma.StrategyDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StrategyPayload>
          }
          update: {
            args: Prisma.StrategyUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StrategyPayload>
          }
          deleteMany: {
            args: Prisma.StrategyDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.StrategyUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.StrategyUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StrategyPayload>[]
          }
          upsert: {
            args: Prisma.StrategyUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StrategyPayload>
          }
          aggregate: {
            args: Prisma.StrategyAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateStrategy>
          }
          groupBy: {
            args: Prisma.StrategyGroupByArgs<ExtArgs>
            result: $Utils.Optional<StrategyGroupByOutputType>[]
          }
          count: {
            args: Prisma.StrategyCountArgs<ExtArgs>
            result: $Utils.Optional<StrategyCountAggregateOutputType> | number
          }
        }
      }
      UserStrategyAllocation: {
        payload: Prisma.$UserStrategyAllocationPayload<ExtArgs>
        fields: Prisma.UserStrategyAllocationFieldRefs
        operations: {
          findUnique: {
            args: Prisma.UserStrategyAllocationFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserStrategyAllocationPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.UserStrategyAllocationFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserStrategyAllocationPayload>
          }
          findFirst: {
            args: Prisma.UserStrategyAllocationFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserStrategyAllocationPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.UserStrategyAllocationFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserStrategyAllocationPayload>
          }
          findMany: {
            args: Prisma.UserStrategyAllocationFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserStrategyAllocationPayload>[]
          }
          create: {
            args: Prisma.UserStrategyAllocationCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserStrategyAllocationPayload>
          }
          createMany: {
            args: Prisma.UserStrategyAllocationCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.UserStrategyAllocationCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserStrategyAllocationPayload>[]
          }
          delete: {
            args: Prisma.UserStrategyAllocationDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserStrategyAllocationPayload>
          }
          update: {
            args: Prisma.UserStrategyAllocationUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserStrategyAllocationPayload>
          }
          deleteMany: {
            args: Prisma.UserStrategyAllocationDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.UserStrategyAllocationUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.UserStrategyAllocationUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserStrategyAllocationPayload>[]
          }
          upsert: {
            args: Prisma.UserStrategyAllocationUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserStrategyAllocationPayload>
          }
          aggregate: {
            args: Prisma.UserStrategyAllocationAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateUserStrategyAllocation>
          }
          groupBy: {
            args: Prisma.UserStrategyAllocationGroupByArgs<ExtArgs>
            result: $Utils.Optional<UserStrategyAllocationGroupByOutputType>[]
          }
          count: {
            args: Prisma.UserStrategyAllocationCountArgs<ExtArgs>
            result: $Utils.Optional<UserStrategyAllocationCountAggregateOutputType> | number
          }
        }
      }
    }
  } & {
    other: {
      payload: any
      operations: {
        $executeRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $executeRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
        $queryRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $queryRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
      }
    }
  }
  export const defineExtension: $Extensions.ExtendsHook<"define", Prisma.TypeMapCb, $Extensions.DefaultArgs>
  export type DefaultPrismaClient = PrismaClient
  export type ErrorFormat = 'pretty' | 'colorless' | 'minimal'
  export interface PrismaClientOptions {
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasources?: Datasources
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasourceUrl?: string
    /**
     * @default "colorless"
     */
    errorFormat?: ErrorFormat
    /**
     * @example
     * ```
     * // Defaults to stdout
     * log: ['query', 'info', 'warn', 'error']
     * 
     * // Emit as events
     * log: [
     *   { emit: 'stdout', level: 'query' },
     *   { emit: 'stdout', level: 'info' },
     *   { emit: 'stdout', level: 'warn' }
     *   { emit: 'stdout', level: 'error' }
     * ]
     * ```
     * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/logging#the-log-option).
     */
    log?: (LogLevel | LogDefinition)[]
    /**
     * The default values for transactionOptions
     * maxWait ?= 2000
     * timeout ?= 5000
     */
    transactionOptions?: {
      maxWait?: number
      timeout?: number
      isolationLevel?: Prisma.TransactionIsolationLevel
    }
    /**
     * Global configuration for omitting model fields by default.
     * 
     * @example
     * ```
     * const prisma = new PrismaClient({
     *   omit: {
     *     user: {
     *       password: true
     *     }
     *   }
     * })
     * ```
     */
    omit?: Prisma.GlobalOmitConfig
  }
  export type GlobalOmitConfig = {
    user?: UserOmit
    tradingHistory?: TradingHistoryOmit
    currentAllocation?: CurrentAllocationOmit
    currentAsset?: CurrentAssetOmit
    strategy?: StrategyOmit
    userStrategyAllocation?: UserStrategyAllocationOmit
  }

  /* Types for Logging */
  export type LogLevel = 'info' | 'query' | 'warn' | 'error'
  export type LogDefinition = {
    level: LogLevel
    emit: 'stdout' | 'event'
  }

  export type GetLogType<T extends LogLevel | LogDefinition> = T extends LogDefinition ? T['emit'] extends 'event' ? T['level'] : never : never
  export type GetEvents<T extends any> = T extends Array<LogLevel | LogDefinition> ?
    GetLogType<T[0]> | GetLogType<T[1]> | GetLogType<T[2]> | GetLogType<T[3]>
    : never

  export type QueryEvent = {
    timestamp: Date
    query: string
    params: string
    duration: number
    target: string
  }

  export type LogEvent = {
    timestamp: Date
    message: string
    target: string
  }
  /* End Types for Logging */


  export type PrismaAction =
    | 'findUnique'
    | 'findUniqueOrThrow'
    | 'findMany'
    | 'findFirst'
    | 'findFirstOrThrow'
    | 'create'
    | 'createMany'
    | 'createManyAndReturn'
    | 'update'
    | 'updateMany'
    | 'updateManyAndReturn'
    | 'upsert'
    | 'delete'
    | 'deleteMany'
    | 'executeRaw'
    | 'queryRaw'
    | 'aggregate'
    | 'count'
    | 'runCommandRaw'
    | 'findRaw'
    | 'groupBy'

  /**
   * These options are being passed into the middleware as "params"
   */
  export type MiddlewareParams = {
    model?: ModelName
    action: PrismaAction
    args: any
    dataPath: string[]
    runInTransaction: boolean
  }

  /**
   * The `T` type makes sure, that the `return proceed` is not forgotten in the middleware implementation
   */
  export type Middleware<T = any> = (
    params: MiddlewareParams,
    next: (params: MiddlewareParams) => $Utils.JsPromise<T>,
  ) => $Utils.JsPromise<T>

  // tested in getLogLevel.test.ts
  export function getLogLevel(log: Array<LogLevel | LogDefinition>): LogLevel | undefined;

  /**
   * `PrismaClient` proxy available in interactive transactions.
   */
  export type TransactionClient = Omit<Prisma.DefaultPrismaClient, runtime.ITXClientDenyList>

  export type Datasource = {
    url?: string
  }

  /**
   * Count Types
   */


  /**
   * Count Type UserCountOutputType
   */

  export type UserCountOutputType = {
    tradingHistory: number
    currentAllocations: number
    currentAssets: number
    userStrategyAllocations: number
  }

  export type UserCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    tradingHistory?: boolean | UserCountOutputTypeCountTradingHistoryArgs
    currentAllocations?: boolean | UserCountOutputTypeCountCurrentAllocationsArgs
    currentAssets?: boolean | UserCountOutputTypeCountCurrentAssetsArgs
    userStrategyAllocations?: boolean | UserCountOutputTypeCountUserStrategyAllocationsArgs
  }

  // Custom InputTypes
  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserCountOutputType
     */
    select?: UserCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountTradingHistoryArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: TradingHistoryWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountCurrentAllocationsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: CurrentAllocationWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountCurrentAssetsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: CurrentAssetWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountUserStrategyAllocationsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: UserStrategyAllocationWhereInput
  }


  /**
   * Count Type StrategyCountOutputType
   */

  export type StrategyCountOutputType = {
    userAllocations: number
    tradingEvents: number
  }

  export type StrategyCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    userAllocations?: boolean | StrategyCountOutputTypeCountUserAllocationsArgs
    tradingEvents?: boolean | StrategyCountOutputTypeCountTradingEventsArgs
  }

  // Custom InputTypes
  /**
   * StrategyCountOutputType without action
   */
  export type StrategyCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the StrategyCountOutputType
     */
    select?: StrategyCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * StrategyCountOutputType without action
   */
  export type StrategyCountOutputTypeCountUserAllocationsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: UserStrategyAllocationWhereInput
  }

  /**
   * StrategyCountOutputType without action
   */
  export type StrategyCountOutputTypeCountTradingEventsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: TradingHistoryWhereInput
  }


  /**
   * Models
   */

  /**
   * Model User
   */

  export type AggregateUser = {
    _count: UserCountAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  export type UserMinAggregateOutputType = {
    id: string | null
    walletAddress: string | null
    role: $Enums.UserRole | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type UserMaxAggregateOutputType = {
    id: string | null
    walletAddress: string | null
    role: $Enums.UserRole | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type UserCountAggregateOutputType = {
    id: number
    walletAddress: number
    role: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type UserMinAggregateInputType = {
    id?: true
    walletAddress?: true
    role?: true
    createdAt?: true
    updatedAt?: true
  }

  export type UserMaxAggregateInputType = {
    id?: true
    walletAddress?: true
    role?: true
    createdAt?: true
    updatedAt?: true
  }

  export type UserCountAggregateInputType = {
    id?: true
    walletAddress?: true
    role?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type UserAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which User to aggregate.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Users
    **/
    _count?: true | UserCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: UserMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: UserMaxAggregateInputType
  }

  export type GetUserAggregateType<T extends UserAggregateArgs> = {
        [P in keyof T & keyof AggregateUser]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateUser[P]>
      : GetScalarType<T[P], AggregateUser[P]>
  }




  export type UserGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: UserWhereInput
    orderBy?: UserOrderByWithAggregationInput | UserOrderByWithAggregationInput[]
    by: UserScalarFieldEnum[] | UserScalarFieldEnum
    having?: UserScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: UserCountAggregateInputType | true
    _min?: UserMinAggregateInputType
    _max?: UserMaxAggregateInputType
  }

  export type UserGroupByOutputType = {
    id: string
    walletAddress: string
    role: $Enums.UserRole
    createdAt: Date
    updatedAt: Date
    _count: UserCountAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  type GetUserGroupByPayload<T extends UserGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<UserGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof UserGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], UserGroupByOutputType[P]>
            : GetScalarType<T[P], UserGroupByOutputType[P]>
        }
      >
    >


  export type UserSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    walletAddress?: boolean
    role?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    tradingHistory?: boolean | User$tradingHistoryArgs<ExtArgs>
    currentAllocations?: boolean | User$currentAllocationsArgs<ExtArgs>
    currentAssets?: boolean | User$currentAssetsArgs<ExtArgs>
    userStrategyAllocations?: boolean | User$userStrategyAllocationsArgs<ExtArgs>
    _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["user"]>

  export type UserSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    walletAddress?: boolean
    role?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["user"]>

  export type UserSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    walletAddress?: boolean
    role?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["user"]>

  export type UserSelectScalar = {
    id?: boolean
    walletAddress?: boolean
    role?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type UserOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "walletAddress" | "role" | "createdAt" | "updatedAt", ExtArgs["result"]["user"]>
  export type UserInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    tradingHistory?: boolean | User$tradingHistoryArgs<ExtArgs>
    currentAllocations?: boolean | User$currentAllocationsArgs<ExtArgs>
    currentAssets?: boolean | User$currentAssetsArgs<ExtArgs>
    userStrategyAllocations?: boolean | User$userStrategyAllocationsArgs<ExtArgs>
    _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type UserIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type UserIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $UserPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "User"
    objects: {
      tradingHistory: Prisma.$TradingHistoryPayload<ExtArgs>[]
      currentAllocations: Prisma.$CurrentAllocationPayload<ExtArgs>[]
      currentAssets: Prisma.$CurrentAssetPayload<ExtArgs>[]
      userStrategyAllocations: Prisma.$UserStrategyAllocationPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      walletAddress: string
      role: $Enums.UserRole
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["user"]>
    composites: {}
  }

  type UserGetPayload<S extends boolean | null | undefined | UserDefaultArgs> = $Result.GetResult<Prisma.$UserPayload, S>

  type UserCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<UserFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: UserCountAggregateInputType | true
    }

  export interface UserDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['User'], meta: { name: 'User' } }
    /**
     * Find zero or one User that matches the filter.
     * @param {UserFindUniqueArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends UserFindUniqueArgs>(args: SelectSubset<T, UserFindUniqueArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one User that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {UserFindUniqueOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends UserFindUniqueOrThrowArgs>(args: SelectSubset<T, UserFindUniqueOrThrowArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first User that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends UserFindFirstArgs>(args?: SelectSubset<T, UserFindFirstArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first User that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends UserFindFirstOrThrowArgs>(args?: SelectSubset<T, UserFindFirstOrThrowArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Users that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Users
     * const users = await prisma.user.findMany()
     * 
     * // Get first 10 Users
     * const users = await prisma.user.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const userWithIdOnly = await prisma.user.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends UserFindManyArgs>(args?: SelectSubset<T, UserFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a User.
     * @param {UserCreateArgs} args - Arguments to create a User.
     * @example
     * // Create one User
     * const User = await prisma.user.create({
     *   data: {
     *     // ... data to create a User
     *   }
     * })
     * 
     */
    create<T extends UserCreateArgs>(args: SelectSubset<T, UserCreateArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Users.
     * @param {UserCreateManyArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const user = await prisma.user.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends UserCreateManyArgs>(args?: SelectSubset<T, UserCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Users and returns the data saved in the database.
     * @param {UserCreateManyAndReturnArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const user = await prisma.user.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Users and only return the `id`
     * const userWithIdOnly = await prisma.user.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends UserCreateManyAndReturnArgs>(args?: SelectSubset<T, UserCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a User.
     * @param {UserDeleteArgs} args - Arguments to delete one User.
     * @example
     * // Delete one User
     * const User = await prisma.user.delete({
     *   where: {
     *     // ... filter to delete one User
     *   }
     * })
     * 
     */
    delete<T extends UserDeleteArgs>(args: SelectSubset<T, UserDeleteArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one User.
     * @param {UserUpdateArgs} args - Arguments to update one User.
     * @example
     * // Update one User
     * const user = await prisma.user.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends UserUpdateArgs>(args: SelectSubset<T, UserUpdateArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Users.
     * @param {UserDeleteManyArgs} args - Arguments to filter Users to delete.
     * @example
     * // Delete a few Users
     * const { count } = await prisma.user.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends UserDeleteManyArgs>(args?: SelectSubset<T, UserDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Users
     * const user = await prisma.user.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends UserUpdateManyArgs>(args: SelectSubset<T, UserUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Users and returns the data updated in the database.
     * @param {UserUpdateManyAndReturnArgs} args - Arguments to update many Users.
     * @example
     * // Update many Users
     * const user = await prisma.user.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Users and only return the `id`
     * const userWithIdOnly = await prisma.user.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends UserUpdateManyAndReturnArgs>(args: SelectSubset<T, UserUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one User.
     * @param {UserUpsertArgs} args - Arguments to update or create a User.
     * @example
     * // Update or create a User
     * const user = await prisma.user.upsert({
     *   create: {
     *     // ... data to create a User
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the User we want to update
     *   }
     * })
     */
    upsert<T extends UserUpsertArgs>(args: SelectSubset<T, UserUpsertArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserCountArgs} args - Arguments to filter Users to count.
     * @example
     * // Count the number of Users
     * const count = await prisma.user.count({
     *   where: {
     *     // ... the filter for the Users we want to count
     *   }
     * })
    **/
    count<T extends UserCountArgs>(
      args?: Subset<T, UserCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], UserCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends UserAggregateArgs>(args: Subset<T, UserAggregateArgs>): Prisma.PrismaPromise<GetUserAggregateType<T>>

    /**
     * Group by User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends UserGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: UserGroupByArgs['orderBy'] }
        : { orderBy?: UserGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, UserGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetUserGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the User model
   */
  readonly fields: UserFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for User.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__UserClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    tradingHistory<T extends User$tradingHistoryArgs<ExtArgs> = {}>(args?: Subset<T, User$tradingHistoryArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TradingHistoryPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    currentAllocations<T extends User$currentAllocationsArgs<ExtArgs> = {}>(args?: Subset<T, User$currentAllocationsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CurrentAllocationPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    currentAssets<T extends User$currentAssetsArgs<ExtArgs> = {}>(args?: Subset<T, User$currentAssetsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CurrentAssetPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    userStrategyAllocations<T extends User$userStrategyAllocationsArgs<ExtArgs> = {}>(args?: Subset<T, User$userStrategyAllocationsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserStrategyAllocationPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the User model
   */
  interface UserFieldRefs {
    readonly id: FieldRef<"User", 'String'>
    readonly walletAddress: FieldRef<"User", 'String'>
    readonly role: FieldRef<"User", 'UserRole'>
    readonly createdAt: FieldRef<"User", 'DateTime'>
    readonly updatedAt: FieldRef<"User", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * User findUnique
   */
  export type UserFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User findUniqueOrThrow
   */
  export type UserFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User findFirst
   */
  export type UserFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User findFirstOrThrow
   */
  export type UserFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User findMany
   */
  export type UserFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which Users to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User create
   */
  export type UserCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The data needed to create a User.
     */
    data: XOR<UserCreateInput, UserUncheckedCreateInput>
  }

  /**
   * User createMany
   */
  export type UserCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Users.
     */
    data: UserCreateManyInput | UserCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * User createManyAndReturn
   */
  export type UserCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * The data used to create many Users.
     */
    data: UserCreateManyInput | UserCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * User update
   */
  export type UserUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The data needed to update a User.
     */
    data: XOR<UserUpdateInput, UserUncheckedUpdateInput>
    /**
     * Choose, which User to update.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User updateMany
   */
  export type UserUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Users.
     */
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyInput>
    /**
     * Filter which Users to update
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to update.
     */
    limit?: number
  }

  /**
   * User updateManyAndReturn
   */
  export type UserUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * The data used to update Users.
     */
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyInput>
    /**
     * Filter which Users to update
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to update.
     */
    limit?: number
  }

  /**
   * User upsert
   */
  export type UserUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The filter to search for the User to update in case it exists.
     */
    where: UserWhereUniqueInput
    /**
     * In case the User found by the `where` argument doesn't exist, create a new User with this data.
     */
    create: XOR<UserCreateInput, UserUncheckedCreateInput>
    /**
     * In case the User was found with the provided `where` argument, update it with this data.
     */
    update: XOR<UserUpdateInput, UserUncheckedUpdateInput>
  }

  /**
   * User delete
   */
  export type UserDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter which User to delete.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User deleteMany
   */
  export type UserDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Users to delete
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to delete.
     */
    limit?: number
  }

  /**
   * User.tradingHistory
   */
  export type User$tradingHistoryArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TradingHistory
     */
    select?: TradingHistorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the TradingHistory
     */
    omit?: TradingHistoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TradingHistoryInclude<ExtArgs> | null
    where?: TradingHistoryWhereInput
    orderBy?: TradingHistoryOrderByWithRelationInput | TradingHistoryOrderByWithRelationInput[]
    cursor?: TradingHistoryWhereUniqueInput
    take?: number
    skip?: number
    distinct?: TradingHistoryScalarFieldEnum | TradingHistoryScalarFieldEnum[]
  }

  /**
   * User.currentAllocations
   */
  export type User$currentAllocationsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CurrentAllocation
     */
    select?: CurrentAllocationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CurrentAllocation
     */
    omit?: CurrentAllocationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CurrentAllocationInclude<ExtArgs> | null
    where?: CurrentAllocationWhereInput
    orderBy?: CurrentAllocationOrderByWithRelationInput | CurrentAllocationOrderByWithRelationInput[]
    cursor?: CurrentAllocationWhereUniqueInput
    take?: number
    skip?: number
    distinct?: CurrentAllocationScalarFieldEnum | CurrentAllocationScalarFieldEnum[]
  }

  /**
   * User.currentAssets
   */
  export type User$currentAssetsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CurrentAsset
     */
    select?: CurrentAssetSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CurrentAsset
     */
    omit?: CurrentAssetOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CurrentAssetInclude<ExtArgs> | null
    where?: CurrentAssetWhereInput
    orderBy?: CurrentAssetOrderByWithRelationInput | CurrentAssetOrderByWithRelationInput[]
    cursor?: CurrentAssetWhereUniqueInput
    take?: number
    skip?: number
    distinct?: CurrentAssetScalarFieldEnum | CurrentAssetScalarFieldEnum[]
  }

  /**
   * User.userStrategyAllocations
   */
  export type User$userStrategyAllocationsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserStrategyAllocation
     */
    select?: UserStrategyAllocationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserStrategyAllocation
     */
    omit?: UserStrategyAllocationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserStrategyAllocationInclude<ExtArgs> | null
    where?: UserStrategyAllocationWhereInput
    orderBy?: UserStrategyAllocationOrderByWithRelationInput | UserStrategyAllocationOrderByWithRelationInput[]
    cursor?: UserStrategyAllocationWhereUniqueInput
    take?: number
    skip?: number
    distinct?: UserStrategyAllocationScalarFieldEnum | UserStrategyAllocationScalarFieldEnum[]
  }

  /**
   * User without action
   */
  export type UserDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
  }


  /**
   * Model TradingHistory
   */

  export type AggregateTradingHistory = {
    _count: TradingHistoryCountAggregateOutputType | null
    _avg: TradingHistoryAvgAggregateOutputType | null
    _sum: TradingHistorySumAggregateOutputType | null
    _min: TradingHistoryMinAggregateOutputType | null
    _max: TradingHistoryMaxAggregateOutputType | null
  }

  export type TradingHistoryAvgAggregateOutputType = {
    amount: number | null
    price: number | null
  }

  export type TradingHistorySumAggregateOutputType = {
    amount: number | null
    price: number | null
  }

  export type TradingHistoryMinAggregateOutputType = {
    id: string | null
    userId: string | null
    action: string | null
    asset: string | null
    amount: number | null
    price: number | null
    strategyId: string | null
    timestamp: Date | null
  }

  export type TradingHistoryMaxAggregateOutputType = {
    id: string | null
    userId: string | null
    action: string | null
    asset: string | null
    amount: number | null
    price: number | null
    strategyId: string | null
    timestamp: Date | null
  }

  export type TradingHistoryCountAggregateOutputType = {
    id: number
    userId: number
    action: number
    asset: number
    amount: number
    price: number
    strategyId: number
    timestamp: number
    _all: number
  }


  export type TradingHistoryAvgAggregateInputType = {
    amount?: true
    price?: true
  }

  export type TradingHistorySumAggregateInputType = {
    amount?: true
    price?: true
  }

  export type TradingHistoryMinAggregateInputType = {
    id?: true
    userId?: true
    action?: true
    asset?: true
    amount?: true
    price?: true
    strategyId?: true
    timestamp?: true
  }

  export type TradingHistoryMaxAggregateInputType = {
    id?: true
    userId?: true
    action?: true
    asset?: true
    amount?: true
    price?: true
    strategyId?: true
    timestamp?: true
  }

  export type TradingHistoryCountAggregateInputType = {
    id?: true
    userId?: true
    action?: true
    asset?: true
    amount?: true
    price?: true
    strategyId?: true
    timestamp?: true
    _all?: true
  }

  export type TradingHistoryAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which TradingHistory to aggregate.
     */
    where?: TradingHistoryWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of TradingHistories to fetch.
     */
    orderBy?: TradingHistoryOrderByWithRelationInput | TradingHistoryOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: TradingHistoryWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` TradingHistories from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` TradingHistories.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned TradingHistories
    **/
    _count?: true | TradingHistoryCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: TradingHistoryAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: TradingHistorySumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: TradingHistoryMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: TradingHistoryMaxAggregateInputType
  }

  export type GetTradingHistoryAggregateType<T extends TradingHistoryAggregateArgs> = {
        [P in keyof T & keyof AggregateTradingHistory]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateTradingHistory[P]>
      : GetScalarType<T[P], AggregateTradingHistory[P]>
  }




  export type TradingHistoryGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: TradingHistoryWhereInput
    orderBy?: TradingHistoryOrderByWithAggregationInput | TradingHistoryOrderByWithAggregationInput[]
    by: TradingHistoryScalarFieldEnum[] | TradingHistoryScalarFieldEnum
    having?: TradingHistoryScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: TradingHistoryCountAggregateInputType | true
    _avg?: TradingHistoryAvgAggregateInputType
    _sum?: TradingHistorySumAggregateInputType
    _min?: TradingHistoryMinAggregateInputType
    _max?: TradingHistoryMaxAggregateInputType
  }

  export type TradingHistoryGroupByOutputType = {
    id: string
    userId: string
    action: string
    asset: string
    amount: number
    price: number | null
    strategyId: string | null
    timestamp: Date
    _count: TradingHistoryCountAggregateOutputType | null
    _avg: TradingHistoryAvgAggregateOutputType | null
    _sum: TradingHistorySumAggregateOutputType | null
    _min: TradingHistoryMinAggregateOutputType | null
    _max: TradingHistoryMaxAggregateOutputType | null
  }

  type GetTradingHistoryGroupByPayload<T extends TradingHistoryGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<TradingHistoryGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof TradingHistoryGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], TradingHistoryGroupByOutputType[P]>
            : GetScalarType<T[P], TradingHistoryGroupByOutputType[P]>
        }
      >
    >


  export type TradingHistorySelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    action?: boolean
    asset?: boolean
    amount?: boolean
    price?: boolean
    strategyId?: boolean
    timestamp?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
    strategy?: boolean | TradingHistory$strategyArgs<ExtArgs>
  }, ExtArgs["result"]["tradingHistory"]>

  export type TradingHistorySelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    action?: boolean
    asset?: boolean
    amount?: boolean
    price?: boolean
    strategyId?: boolean
    timestamp?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
    strategy?: boolean | TradingHistory$strategyArgs<ExtArgs>
  }, ExtArgs["result"]["tradingHistory"]>

  export type TradingHistorySelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    action?: boolean
    asset?: boolean
    amount?: boolean
    price?: boolean
    strategyId?: boolean
    timestamp?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
    strategy?: boolean | TradingHistory$strategyArgs<ExtArgs>
  }, ExtArgs["result"]["tradingHistory"]>

  export type TradingHistorySelectScalar = {
    id?: boolean
    userId?: boolean
    action?: boolean
    asset?: boolean
    amount?: boolean
    price?: boolean
    strategyId?: boolean
    timestamp?: boolean
  }

  export type TradingHistoryOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "userId" | "action" | "asset" | "amount" | "price" | "strategyId" | "timestamp", ExtArgs["result"]["tradingHistory"]>
  export type TradingHistoryInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
    strategy?: boolean | TradingHistory$strategyArgs<ExtArgs>
  }
  export type TradingHistoryIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
    strategy?: boolean | TradingHistory$strategyArgs<ExtArgs>
  }
  export type TradingHistoryIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
    strategy?: boolean | TradingHistory$strategyArgs<ExtArgs>
  }

  export type $TradingHistoryPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "TradingHistory"
    objects: {
      user: Prisma.$UserPayload<ExtArgs>
      strategy: Prisma.$StrategyPayload<ExtArgs> | null
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      userId: string
      action: string
      asset: string
      amount: number
      price: number | null
      strategyId: string | null
      timestamp: Date
    }, ExtArgs["result"]["tradingHistory"]>
    composites: {}
  }

  type TradingHistoryGetPayload<S extends boolean | null | undefined | TradingHistoryDefaultArgs> = $Result.GetResult<Prisma.$TradingHistoryPayload, S>

  type TradingHistoryCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<TradingHistoryFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: TradingHistoryCountAggregateInputType | true
    }

  export interface TradingHistoryDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['TradingHistory'], meta: { name: 'TradingHistory' } }
    /**
     * Find zero or one TradingHistory that matches the filter.
     * @param {TradingHistoryFindUniqueArgs} args - Arguments to find a TradingHistory
     * @example
     * // Get one TradingHistory
     * const tradingHistory = await prisma.tradingHistory.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends TradingHistoryFindUniqueArgs>(args: SelectSubset<T, TradingHistoryFindUniqueArgs<ExtArgs>>): Prisma__TradingHistoryClient<$Result.GetResult<Prisma.$TradingHistoryPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one TradingHistory that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {TradingHistoryFindUniqueOrThrowArgs} args - Arguments to find a TradingHistory
     * @example
     * // Get one TradingHistory
     * const tradingHistory = await prisma.tradingHistory.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends TradingHistoryFindUniqueOrThrowArgs>(args: SelectSubset<T, TradingHistoryFindUniqueOrThrowArgs<ExtArgs>>): Prisma__TradingHistoryClient<$Result.GetResult<Prisma.$TradingHistoryPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first TradingHistory that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TradingHistoryFindFirstArgs} args - Arguments to find a TradingHistory
     * @example
     * // Get one TradingHistory
     * const tradingHistory = await prisma.tradingHistory.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends TradingHistoryFindFirstArgs>(args?: SelectSubset<T, TradingHistoryFindFirstArgs<ExtArgs>>): Prisma__TradingHistoryClient<$Result.GetResult<Prisma.$TradingHistoryPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first TradingHistory that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TradingHistoryFindFirstOrThrowArgs} args - Arguments to find a TradingHistory
     * @example
     * // Get one TradingHistory
     * const tradingHistory = await prisma.tradingHistory.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends TradingHistoryFindFirstOrThrowArgs>(args?: SelectSubset<T, TradingHistoryFindFirstOrThrowArgs<ExtArgs>>): Prisma__TradingHistoryClient<$Result.GetResult<Prisma.$TradingHistoryPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more TradingHistories that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TradingHistoryFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all TradingHistories
     * const tradingHistories = await prisma.tradingHistory.findMany()
     * 
     * // Get first 10 TradingHistories
     * const tradingHistories = await prisma.tradingHistory.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const tradingHistoryWithIdOnly = await prisma.tradingHistory.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends TradingHistoryFindManyArgs>(args?: SelectSubset<T, TradingHistoryFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TradingHistoryPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a TradingHistory.
     * @param {TradingHistoryCreateArgs} args - Arguments to create a TradingHistory.
     * @example
     * // Create one TradingHistory
     * const TradingHistory = await prisma.tradingHistory.create({
     *   data: {
     *     // ... data to create a TradingHistory
     *   }
     * })
     * 
     */
    create<T extends TradingHistoryCreateArgs>(args: SelectSubset<T, TradingHistoryCreateArgs<ExtArgs>>): Prisma__TradingHistoryClient<$Result.GetResult<Prisma.$TradingHistoryPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many TradingHistories.
     * @param {TradingHistoryCreateManyArgs} args - Arguments to create many TradingHistories.
     * @example
     * // Create many TradingHistories
     * const tradingHistory = await prisma.tradingHistory.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends TradingHistoryCreateManyArgs>(args?: SelectSubset<T, TradingHistoryCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many TradingHistories and returns the data saved in the database.
     * @param {TradingHistoryCreateManyAndReturnArgs} args - Arguments to create many TradingHistories.
     * @example
     * // Create many TradingHistories
     * const tradingHistory = await prisma.tradingHistory.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many TradingHistories and only return the `id`
     * const tradingHistoryWithIdOnly = await prisma.tradingHistory.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends TradingHistoryCreateManyAndReturnArgs>(args?: SelectSubset<T, TradingHistoryCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TradingHistoryPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a TradingHistory.
     * @param {TradingHistoryDeleteArgs} args - Arguments to delete one TradingHistory.
     * @example
     * // Delete one TradingHistory
     * const TradingHistory = await prisma.tradingHistory.delete({
     *   where: {
     *     // ... filter to delete one TradingHistory
     *   }
     * })
     * 
     */
    delete<T extends TradingHistoryDeleteArgs>(args: SelectSubset<T, TradingHistoryDeleteArgs<ExtArgs>>): Prisma__TradingHistoryClient<$Result.GetResult<Prisma.$TradingHistoryPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one TradingHistory.
     * @param {TradingHistoryUpdateArgs} args - Arguments to update one TradingHistory.
     * @example
     * // Update one TradingHistory
     * const tradingHistory = await prisma.tradingHistory.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends TradingHistoryUpdateArgs>(args: SelectSubset<T, TradingHistoryUpdateArgs<ExtArgs>>): Prisma__TradingHistoryClient<$Result.GetResult<Prisma.$TradingHistoryPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more TradingHistories.
     * @param {TradingHistoryDeleteManyArgs} args - Arguments to filter TradingHistories to delete.
     * @example
     * // Delete a few TradingHistories
     * const { count } = await prisma.tradingHistory.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends TradingHistoryDeleteManyArgs>(args?: SelectSubset<T, TradingHistoryDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more TradingHistories.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TradingHistoryUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many TradingHistories
     * const tradingHistory = await prisma.tradingHistory.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends TradingHistoryUpdateManyArgs>(args: SelectSubset<T, TradingHistoryUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more TradingHistories and returns the data updated in the database.
     * @param {TradingHistoryUpdateManyAndReturnArgs} args - Arguments to update many TradingHistories.
     * @example
     * // Update many TradingHistories
     * const tradingHistory = await prisma.tradingHistory.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more TradingHistories and only return the `id`
     * const tradingHistoryWithIdOnly = await prisma.tradingHistory.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends TradingHistoryUpdateManyAndReturnArgs>(args: SelectSubset<T, TradingHistoryUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TradingHistoryPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one TradingHistory.
     * @param {TradingHistoryUpsertArgs} args - Arguments to update or create a TradingHistory.
     * @example
     * // Update or create a TradingHistory
     * const tradingHistory = await prisma.tradingHistory.upsert({
     *   create: {
     *     // ... data to create a TradingHistory
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the TradingHistory we want to update
     *   }
     * })
     */
    upsert<T extends TradingHistoryUpsertArgs>(args: SelectSubset<T, TradingHistoryUpsertArgs<ExtArgs>>): Prisma__TradingHistoryClient<$Result.GetResult<Prisma.$TradingHistoryPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of TradingHistories.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TradingHistoryCountArgs} args - Arguments to filter TradingHistories to count.
     * @example
     * // Count the number of TradingHistories
     * const count = await prisma.tradingHistory.count({
     *   where: {
     *     // ... the filter for the TradingHistories we want to count
     *   }
     * })
    **/
    count<T extends TradingHistoryCountArgs>(
      args?: Subset<T, TradingHistoryCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], TradingHistoryCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a TradingHistory.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TradingHistoryAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends TradingHistoryAggregateArgs>(args: Subset<T, TradingHistoryAggregateArgs>): Prisma.PrismaPromise<GetTradingHistoryAggregateType<T>>

    /**
     * Group by TradingHistory.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TradingHistoryGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends TradingHistoryGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: TradingHistoryGroupByArgs['orderBy'] }
        : { orderBy?: TradingHistoryGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, TradingHistoryGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetTradingHistoryGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the TradingHistory model
   */
  readonly fields: TradingHistoryFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for TradingHistory.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__TradingHistoryClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    strategy<T extends TradingHistory$strategyArgs<ExtArgs> = {}>(args?: Subset<T, TradingHistory$strategyArgs<ExtArgs>>): Prisma__StrategyClient<$Result.GetResult<Prisma.$StrategyPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the TradingHistory model
   */
  interface TradingHistoryFieldRefs {
    readonly id: FieldRef<"TradingHistory", 'String'>
    readonly userId: FieldRef<"TradingHistory", 'String'>
    readonly action: FieldRef<"TradingHistory", 'String'>
    readonly asset: FieldRef<"TradingHistory", 'String'>
    readonly amount: FieldRef<"TradingHistory", 'Float'>
    readonly price: FieldRef<"TradingHistory", 'Float'>
    readonly strategyId: FieldRef<"TradingHistory", 'String'>
    readonly timestamp: FieldRef<"TradingHistory", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * TradingHistory findUnique
   */
  export type TradingHistoryFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TradingHistory
     */
    select?: TradingHistorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the TradingHistory
     */
    omit?: TradingHistoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TradingHistoryInclude<ExtArgs> | null
    /**
     * Filter, which TradingHistory to fetch.
     */
    where: TradingHistoryWhereUniqueInput
  }

  /**
   * TradingHistory findUniqueOrThrow
   */
  export type TradingHistoryFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TradingHistory
     */
    select?: TradingHistorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the TradingHistory
     */
    omit?: TradingHistoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TradingHistoryInclude<ExtArgs> | null
    /**
     * Filter, which TradingHistory to fetch.
     */
    where: TradingHistoryWhereUniqueInput
  }

  /**
   * TradingHistory findFirst
   */
  export type TradingHistoryFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TradingHistory
     */
    select?: TradingHistorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the TradingHistory
     */
    omit?: TradingHistoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TradingHistoryInclude<ExtArgs> | null
    /**
     * Filter, which TradingHistory to fetch.
     */
    where?: TradingHistoryWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of TradingHistories to fetch.
     */
    orderBy?: TradingHistoryOrderByWithRelationInput | TradingHistoryOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for TradingHistories.
     */
    cursor?: TradingHistoryWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` TradingHistories from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` TradingHistories.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of TradingHistories.
     */
    distinct?: TradingHistoryScalarFieldEnum | TradingHistoryScalarFieldEnum[]
  }

  /**
   * TradingHistory findFirstOrThrow
   */
  export type TradingHistoryFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TradingHistory
     */
    select?: TradingHistorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the TradingHistory
     */
    omit?: TradingHistoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TradingHistoryInclude<ExtArgs> | null
    /**
     * Filter, which TradingHistory to fetch.
     */
    where?: TradingHistoryWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of TradingHistories to fetch.
     */
    orderBy?: TradingHistoryOrderByWithRelationInput | TradingHistoryOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for TradingHistories.
     */
    cursor?: TradingHistoryWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` TradingHistories from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` TradingHistories.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of TradingHistories.
     */
    distinct?: TradingHistoryScalarFieldEnum | TradingHistoryScalarFieldEnum[]
  }

  /**
   * TradingHistory findMany
   */
  export type TradingHistoryFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TradingHistory
     */
    select?: TradingHistorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the TradingHistory
     */
    omit?: TradingHistoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TradingHistoryInclude<ExtArgs> | null
    /**
     * Filter, which TradingHistories to fetch.
     */
    where?: TradingHistoryWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of TradingHistories to fetch.
     */
    orderBy?: TradingHistoryOrderByWithRelationInput | TradingHistoryOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing TradingHistories.
     */
    cursor?: TradingHistoryWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` TradingHistories from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` TradingHistories.
     */
    skip?: number
    distinct?: TradingHistoryScalarFieldEnum | TradingHistoryScalarFieldEnum[]
  }

  /**
   * TradingHistory create
   */
  export type TradingHistoryCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TradingHistory
     */
    select?: TradingHistorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the TradingHistory
     */
    omit?: TradingHistoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TradingHistoryInclude<ExtArgs> | null
    /**
     * The data needed to create a TradingHistory.
     */
    data: XOR<TradingHistoryCreateInput, TradingHistoryUncheckedCreateInput>
  }

  /**
   * TradingHistory createMany
   */
  export type TradingHistoryCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many TradingHistories.
     */
    data: TradingHistoryCreateManyInput | TradingHistoryCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * TradingHistory createManyAndReturn
   */
  export type TradingHistoryCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TradingHistory
     */
    select?: TradingHistorySelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the TradingHistory
     */
    omit?: TradingHistoryOmit<ExtArgs> | null
    /**
     * The data used to create many TradingHistories.
     */
    data: TradingHistoryCreateManyInput | TradingHistoryCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TradingHistoryIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * TradingHistory update
   */
  export type TradingHistoryUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TradingHistory
     */
    select?: TradingHistorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the TradingHistory
     */
    omit?: TradingHistoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TradingHistoryInclude<ExtArgs> | null
    /**
     * The data needed to update a TradingHistory.
     */
    data: XOR<TradingHistoryUpdateInput, TradingHistoryUncheckedUpdateInput>
    /**
     * Choose, which TradingHistory to update.
     */
    where: TradingHistoryWhereUniqueInput
  }

  /**
   * TradingHistory updateMany
   */
  export type TradingHistoryUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update TradingHistories.
     */
    data: XOR<TradingHistoryUpdateManyMutationInput, TradingHistoryUncheckedUpdateManyInput>
    /**
     * Filter which TradingHistories to update
     */
    where?: TradingHistoryWhereInput
    /**
     * Limit how many TradingHistories to update.
     */
    limit?: number
  }

  /**
   * TradingHistory updateManyAndReturn
   */
  export type TradingHistoryUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TradingHistory
     */
    select?: TradingHistorySelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the TradingHistory
     */
    omit?: TradingHistoryOmit<ExtArgs> | null
    /**
     * The data used to update TradingHistories.
     */
    data: XOR<TradingHistoryUpdateManyMutationInput, TradingHistoryUncheckedUpdateManyInput>
    /**
     * Filter which TradingHistories to update
     */
    where?: TradingHistoryWhereInput
    /**
     * Limit how many TradingHistories to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TradingHistoryIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * TradingHistory upsert
   */
  export type TradingHistoryUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TradingHistory
     */
    select?: TradingHistorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the TradingHistory
     */
    omit?: TradingHistoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TradingHistoryInclude<ExtArgs> | null
    /**
     * The filter to search for the TradingHistory to update in case it exists.
     */
    where: TradingHistoryWhereUniqueInput
    /**
     * In case the TradingHistory found by the `where` argument doesn't exist, create a new TradingHistory with this data.
     */
    create: XOR<TradingHistoryCreateInput, TradingHistoryUncheckedCreateInput>
    /**
     * In case the TradingHistory was found with the provided `where` argument, update it with this data.
     */
    update: XOR<TradingHistoryUpdateInput, TradingHistoryUncheckedUpdateInput>
  }

  /**
   * TradingHistory delete
   */
  export type TradingHistoryDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TradingHistory
     */
    select?: TradingHistorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the TradingHistory
     */
    omit?: TradingHistoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TradingHistoryInclude<ExtArgs> | null
    /**
     * Filter which TradingHistory to delete.
     */
    where: TradingHistoryWhereUniqueInput
  }

  /**
   * TradingHistory deleteMany
   */
  export type TradingHistoryDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which TradingHistories to delete
     */
    where?: TradingHistoryWhereInput
    /**
     * Limit how many TradingHistories to delete.
     */
    limit?: number
  }

  /**
   * TradingHistory.strategy
   */
  export type TradingHistory$strategyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Strategy
     */
    select?: StrategySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Strategy
     */
    omit?: StrategyOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StrategyInclude<ExtArgs> | null
    where?: StrategyWhereInput
  }

  /**
   * TradingHistory without action
   */
  export type TradingHistoryDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TradingHistory
     */
    select?: TradingHistorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the TradingHistory
     */
    omit?: TradingHistoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TradingHistoryInclude<ExtArgs> | null
  }


  /**
   * Model CurrentAllocation
   */

  export type AggregateCurrentAllocation = {
    _count: CurrentAllocationCountAggregateOutputType | null
    _avg: CurrentAllocationAvgAggregateOutputType | null
    _sum: CurrentAllocationSumAggregateOutputType | null
    _min: CurrentAllocationMinAggregateOutputType | null
    _max: CurrentAllocationMaxAggregateOutputType | null
  }

  export type CurrentAllocationAvgAggregateOutputType = {
    percentage: number | null
  }

  export type CurrentAllocationSumAggregateOutputType = {
    percentage: number | null
  }

  export type CurrentAllocationMinAggregateOutputType = {
    id: string | null
    userId: string | null
    asset: string | null
    percentage: number | null
    updatedAt: Date | null
  }

  export type CurrentAllocationMaxAggregateOutputType = {
    id: string | null
    userId: string | null
    asset: string | null
    percentage: number | null
    updatedAt: Date | null
  }

  export type CurrentAllocationCountAggregateOutputType = {
    id: number
    userId: number
    asset: number
    percentage: number
    updatedAt: number
    _all: number
  }


  export type CurrentAllocationAvgAggregateInputType = {
    percentage?: true
  }

  export type CurrentAllocationSumAggregateInputType = {
    percentage?: true
  }

  export type CurrentAllocationMinAggregateInputType = {
    id?: true
    userId?: true
    asset?: true
    percentage?: true
    updatedAt?: true
  }

  export type CurrentAllocationMaxAggregateInputType = {
    id?: true
    userId?: true
    asset?: true
    percentage?: true
    updatedAt?: true
  }

  export type CurrentAllocationCountAggregateInputType = {
    id?: true
    userId?: true
    asset?: true
    percentage?: true
    updatedAt?: true
    _all?: true
  }

  export type CurrentAllocationAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which CurrentAllocation to aggregate.
     */
    where?: CurrentAllocationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of CurrentAllocations to fetch.
     */
    orderBy?: CurrentAllocationOrderByWithRelationInput | CurrentAllocationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: CurrentAllocationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` CurrentAllocations from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` CurrentAllocations.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned CurrentAllocations
    **/
    _count?: true | CurrentAllocationCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: CurrentAllocationAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: CurrentAllocationSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: CurrentAllocationMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: CurrentAllocationMaxAggregateInputType
  }

  export type GetCurrentAllocationAggregateType<T extends CurrentAllocationAggregateArgs> = {
        [P in keyof T & keyof AggregateCurrentAllocation]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateCurrentAllocation[P]>
      : GetScalarType<T[P], AggregateCurrentAllocation[P]>
  }




  export type CurrentAllocationGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: CurrentAllocationWhereInput
    orderBy?: CurrentAllocationOrderByWithAggregationInput | CurrentAllocationOrderByWithAggregationInput[]
    by: CurrentAllocationScalarFieldEnum[] | CurrentAllocationScalarFieldEnum
    having?: CurrentAllocationScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: CurrentAllocationCountAggregateInputType | true
    _avg?: CurrentAllocationAvgAggregateInputType
    _sum?: CurrentAllocationSumAggregateInputType
    _min?: CurrentAllocationMinAggregateInputType
    _max?: CurrentAllocationMaxAggregateInputType
  }

  export type CurrentAllocationGroupByOutputType = {
    id: string
    userId: string
    asset: string
    percentage: number
    updatedAt: Date
    _count: CurrentAllocationCountAggregateOutputType | null
    _avg: CurrentAllocationAvgAggregateOutputType | null
    _sum: CurrentAllocationSumAggregateOutputType | null
    _min: CurrentAllocationMinAggregateOutputType | null
    _max: CurrentAllocationMaxAggregateOutputType | null
  }

  type GetCurrentAllocationGroupByPayload<T extends CurrentAllocationGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<CurrentAllocationGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof CurrentAllocationGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], CurrentAllocationGroupByOutputType[P]>
            : GetScalarType<T[P], CurrentAllocationGroupByOutputType[P]>
        }
      >
    >


  export type CurrentAllocationSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    asset?: boolean
    percentage?: boolean
    updatedAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["currentAllocation"]>

  export type CurrentAllocationSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    asset?: boolean
    percentage?: boolean
    updatedAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["currentAllocation"]>

  export type CurrentAllocationSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    asset?: boolean
    percentage?: boolean
    updatedAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["currentAllocation"]>

  export type CurrentAllocationSelectScalar = {
    id?: boolean
    userId?: boolean
    asset?: boolean
    percentage?: boolean
    updatedAt?: boolean
  }

  export type CurrentAllocationOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "userId" | "asset" | "percentage" | "updatedAt", ExtArgs["result"]["currentAllocation"]>
  export type CurrentAllocationInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type CurrentAllocationIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type CurrentAllocationIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $CurrentAllocationPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "CurrentAllocation"
    objects: {
      user: Prisma.$UserPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      userId: string
      asset: string
      percentage: number
      updatedAt: Date
    }, ExtArgs["result"]["currentAllocation"]>
    composites: {}
  }

  type CurrentAllocationGetPayload<S extends boolean | null | undefined | CurrentAllocationDefaultArgs> = $Result.GetResult<Prisma.$CurrentAllocationPayload, S>

  type CurrentAllocationCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<CurrentAllocationFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: CurrentAllocationCountAggregateInputType | true
    }

  export interface CurrentAllocationDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['CurrentAllocation'], meta: { name: 'CurrentAllocation' } }
    /**
     * Find zero or one CurrentAllocation that matches the filter.
     * @param {CurrentAllocationFindUniqueArgs} args - Arguments to find a CurrentAllocation
     * @example
     * // Get one CurrentAllocation
     * const currentAllocation = await prisma.currentAllocation.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends CurrentAllocationFindUniqueArgs>(args: SelectSubset<T, CurrentAllocationFindUniqueArgs<ExtArgs>>): Prisma__CurrentAllocationClient<$Result.GetResult<Prisma.$CurrentAllocationPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one CurrentAllocation that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {CurrentAllocationFindUniqueOrThrowArgs} args - Arguments to find a CurrentAllocation
     * @example
     * // Get one CurrentAllocation
     * const currentAllocation = await prisma.currentAllocation.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends CurrentAllocationFindUniqueOrThrowArgs>(args: SelectSubset<T, CurrentAllocationFindUniqueOrThrowArgs<ExtArgs>>): Prisma__CurrentAllocationClient<$Result.GetResult<Prisma.$CurrentAllocationPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first CurrentAllocation that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CurrentAllocationFindFirstArgs} args - Arguments to find a CurrentAllocation
     * @example
     * // Get one CurrentAllocation
     * const currentAllocation = await prisma.currentAllocation.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends CurrentAllocationFindFirstArgs>(args?: SelectSubset<T, CurrentAllocationFindFirstArgs<ExtArgs>>): Prisma__CurrentAllocationClient<$Result.GetResult<Prisma.$CurrentAllocationPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first CurrentAllocation that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CurrentAllocationFindFirstOrThrowArgs} args - Arguments to find a CurrentAllocation
     * @example
     * // Get one CurrentAllocation
     * const currentAllocation = await prisma.currentAllocation.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends CurrentAllocationFindFirstOrThrowArgs>(args?: SelectSubset<T, CurrentAllocationFindFirstOrThrowArgs<ExtArgs>>): Prisma__CurrentAllocationClient<$Result.GetResult<Prisma.$CurrentAllocationPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more CurrentAllocations that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CurrentAllocationFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all CurrentAllocations
     * const currentAllocations = await prisma.currentAllocation.findMany()
     * 
     * // Get first 10 CurrentAllocations
     * const currentAllocations = await prisma.currentAllocation.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const currentAllocationWithIdOnly = await prisma.currentAllocation.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends CurrentAllocationFindManyArgs>(args?: SelectSubset<T, CurrentAllocationFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CurrentAllocationPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a CurrentAllocation.
     * @param {CurrentAllocationCreateArgs} args - Arguments to create a CurrentAllocation.
     * @example
     * // Create one CurrentAllocation
     * const CurrentAllocation = await prisma.currentAllocation.create({
     *   data: {
     *     // ... data to create a CurrentAllocation
     *   }
     * })
     * 
     */
    create<T extends CurrentAllocationCreateArgs>(args: SelectSubset<T, CurrentAllocationCreateArgs<ExtArgs>>): Prisma__CurrentAllocationClient<$Result.GetResult<Prisma.$CurrentAllocationPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many CurrentAllocations.
     * @param {CurrentAllocationCreateManyArgs} args - Arguments to create many CurrentAllocations.
     * @example
     * // Create many CurrentAllocations
     * const currentAllocation = await prisma.currentAllocation.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends CurrentAllocationCreateManyArgs>(args?: SelectSubset<T, CurrentAllocationCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many CurrentAllocations and returns the data saved in the database.
     * @param {CurrentAllocationCreateManyAndReturnArgs} args - Arguments to create many CurrentAllocations.
     * @example
     * // Create many CurrentAllocations
     * const currentAllocation = await prisma.currentAllocation.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many CurrentAllocations and only return the `id`
     * const currentAllocationWithIdOnly = await prisma.currentAllocation.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends CurrentAllocationCreateManyAndReturnArgs>(args?: SelectSubset<T, CurrentAllocationCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CurrentAllocationPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a CurrentAllocation.
     * @param {CurrentAllocationDeleteArgs} args - Arguments to delete one CurrentAllocation.
     * @example
     * // Delete one CurrentAllocation
     * const CurrentAllocation = await prisma.currentAllocation.delete({
     *   where: {
     *     // ... filter to delete one CurrentAllocation
     *   }
     * })
     * 
     */
    delete<T extends CurrentAllocationDeleteArgs>(args: SelectSubset<T, CurrentAllocationDeleteArgs<ExtArgs>>): Prisma__CurrentAllocationClient<$Result.GetResult<Prisma.$CurrentAllocationPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one CurrentAllocation.
     * @param {CurrentAllocationUpdateArgs} args - Arguments to update one CurrentAllocation.
     * @example
     * // Update one CurrentAllocation
     * const currentAllocation = await prisma.currentAllocation.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends CurrentAllocationUpdateArgs>(args: SelectSubset<T, CurrentAllocationUpdateArgs<ExtArgs>>): Prisma__CurrentAllocationClient<$Result.GetResult<Prisma.$CurrentAllocationPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more CurrentAllocations.
     * @param {CurrentAllocationDeleteManyArgs} args - Arguments to filter CurrentAllocations to delete.
     * @example
     * // Delete a few CurrentAllocations
     * const { count } = await prisma.currentAllocation.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends CurrentAllocationDeleteManyArgs>(args?: SelectSubset<T, CurrentAllocationDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more CurrentAllocations.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CurrentAllocationUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many CurrentAllocations
     * const currentAllocation = await prisma.currentAllocation.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends CurrentAllocationUpdateManyArgs>(args: SelectSubset<T, CurrentAllocationUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more CurrentAllocations and returns the data updated in the database.
     * @param {CurrentAllocationUpdateManyAndReturnArgs} args - Arguments to update many CurrentAllocations.
     * @example
     * // Update many CurrentAllocations
     * const currentAllocation = await prisma.currentAllocation.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more CurrentAllocations and only return the `id`
     * const currentAllocationWithIdOnly = await prisma.currentAllocation.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends CurrentAllocationUpdateManyAndReturnArgs>(args: SelectSubset<T, CurrentAllocationUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CurrentAllocationPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one CurrentAllocation.
     * @param {CurrentAllocationUpsertArgs} args - Arguments to update or create a CurrentAllocation.
     * @example
     * // Update or create a CurrentAllocation
     * const currentAllocation = await prisma.currentAllocation.upsert({
     *   create: {
     *     // ... data to create a CurrentAllocation
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the CurrentAllocation we want to update
     *   }
     * })
     */
    upsert<T extends CurrentAllocationUpsertArgs>(args: SelectSubset<T, CurrentAllocationUpsertArgs<ExtArgs>>): Prisma__CurrentAllocationClient<$Result.GetResult<Prisma.$CurrentAllocationPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of CurrentAllocations.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CurrentAllocationCountArgs} args - Arguments to filter CurrentAllocations to count.
     * @example
     * // Count the number of CurrentAllocations
     * const count = await prisma.currentAllocation.count({
     *   where: {
     *     // ... the filter for the CurrentAllocations we want to count
     *   }
     * })
    **/
    count<T extends CurrentAllocationCountArgs>(
      args?: Subset<T, CurrentAllocationCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], CurrentAllocationCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a CurrentAllocation.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CurrentAllocationAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends CurrentAllocationAggregateArgs>(args: Subset<T, CurrentAllocationAggregateArgs>): Prisma.PrismaPromise<GetCurrentAllocationAggregateType<T>>

    /**
     * Group by CurrentAllocation.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CurrentAllocationGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends CurrentAllocationGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: CurrentAllocationGroupByArgs['orderBy'] }
        : { orderBy?: CurrentAllocationGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, CurrentAllocationGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetCurrentAllocationGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the CurrentAllocation model
   */
  readonly fields: CurrentAllocationFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for CurrentAllocation.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__CurrentAllocationClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the CurrentAllocation model
   */
  interface CurrentAllocationFieldRefs {
    readonly id: FieldRef<"CurrentAllocation", 'String'>
    readonly userId: FieldRef<"CurrentAllocation", 'String'>
    readonly asset: FieldRef<"CurrentAllocation", 'String'>
    readonly percentage: FieldRef<"CurrentAllocation", 'Float'>
    readonly updatedAt: FieldRef<"CurrentAllocation", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * CurrentAllocation findUnique
   */
  export type CurrentAllocationFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CurrentAllocation
     */
    select?: CurrentAllocationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CurrentAllocation
     */
    omit?: CurrentAllocationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CurrentAllocationInclude<ExtArgs> | null
    /**
     * Filter, which CurrentAllocation to fetch.
     */
    where: CurrentAllocationWhereUniqueInput
  }

  /**
   * CurrentAllocation findUniqueOrThrow
   */
  export type CurrentAllocationFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CurrentAllocation
     */
    select?: CurrentAllocationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CurrentAllocation
     */
    omit?: CurrentAllocationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CurrentAllocationInclude<ExtArgs> | null
    /**
     * Filter, which CurrentAllocation to fetch.
     */
    where: CurrentAllocationWhereUniqueInput
  }

  /**
   * CurrentAllocation findFirst
   */
  export type CurrentAllocationFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CurrentAllocation
     */
    select?: CurrentAllocationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CurrentAllocation
     */
    omit?: CurrentAllocationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CurrentAllocationInclude<ExtArgs> | null
    /**
     * Filter, which CurrentAllocation to fetch.
     */
    where?: CurrentAllocationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of CurrentAllocations to fetch.
     */
    orderBy?: CurrentAllocationOrderByWithRelationInput | CurrentAllocationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for CurrentAllocations.
     */
    cursor?: CurrentAllocationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` CurrentAllocations from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` CurrentAllocations.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of CurrentAllocations.
     */
    distinct?: CurrentAllocationScalarFieldEnum | CurrentAllocationScalarFieldEnum[]
  }

  /**
   * CurrentAllocation findFirstOrThrow
   */
  export type CurrentAllocationFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CurrentAllocation
     */
    select?: CurrentAllocationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CurrentAllocation
     */
    omit?: CurrentAllocationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CurrentAllocationInclude<ExtArgs> | null
    /**
     * Filter, which CurrentAllocation to fetch.
     */
    where?: CurrentAllocationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of CurrentAllocations to fetch.
     */
    orderBy?: CurrentAllocationOrderByWithRelationInput | CurrentAllocationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for CurrentAllocations.
     */
    cursor?: CurrentAllocationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` CurrentAllocations from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` CurrentAllocations.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of CurrentAllocations.
     */
    distinct?: CurrentAllocationScalarFieldEnum | CurrentAllocationScalarFieldEnum[]
  }

  /**
   * CurrentAllocation findMany
   */
  export type CurrentAllocationFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CurrentAllocation
     */
    select?: CurrentAllocationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CurrentAllocation
     */
    omit?: CurrentAllocationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CurrentAllocationInclude<ExtArgs> | null
    /**
     * Filter, which CurrentAllocations to fetch.
     */
    where?: CurrentAllocationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of CurrentAllocations to fetch.
     */
    orderBy?: CurrentAllocationOrderByWithRelationInput | CurrentAllocationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing CurrentAllocations.
     */
    cursor?: CurrentAllocationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` CurrentAllocations from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` CurrentAllocations.
     */
    skip?: number
    distinct?: CurrentAllocationScalarFieldEnum | CurrentAllocationScalarFieldEnum[]
  }

  /**
   * CurrentAllocation create
   */
  export type CurrentAllocationCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CurrentAllocation
     */
    select?: CurrentAllocationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CurrentAllocation
     */
    omit?: CurrentAllocationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CurrentAllocationInclude<ExtArgs> | null
    /**
     * The data needed to create a CurrentAllocation.
     */
    data: XOR<CurrentAllocationCreateInput, CurrentAllocationUncheckedCreateInput>
  }

  /**
   * CurrentAllocation createMany
   */
  export type CurrentAllocationCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many CurrentAllocations.
     */
    data: CurrentAllocationCreateManyInput | CurrentAllocationCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * CurrentAllocation createManyAndReturn
   */
  export type CurrentAllocationCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CurrentAllocation
     */
    select?: CurrentAllocationSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the CurrentAllocation
     */
    omit?: CurrentAllocationOmit<ExtArgs> | null
    /**
     * The data used to create many CurrentAllocations.
     */
    data: CurrentAllocationCreateManyInput | CurrentAllocationCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CurrentAllocationIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * CurrentAllocation update
   */
  export type CurrentAllocationUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CurrentAllocation
     */
    select?: CurrentAllocationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CurrentAllocation
     */
    omit?: CurrentAllocationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CurrentAllocationInclude<ExtArgs> | null
    /**
     * The data needed to update a CurrentAllocation.
     */
    data: XOR<CurrentAllocationUpdateInput, CurrentAllocationUncheckedUpdateInput>
    /**
     * Choose, which CurrentAllocation to update.
     */
    where: CurrentAllocationWhereUniqueInput
  }

  /**
   * CurrentAllocation updateMany
   */
  export type CurrentAllocationUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update CurrentAllocations.
     */
    data: XOR<CurrentAllocationUpdateManyMutationInput, CurrentAllocationUncheckedUpdateManyInput>
    /**
     * Filter which CurrentAllocations to update
     */
    where?: CurrentAllocationWhereInput
    /**
     * Limit how many CurrentAllocations to update.
     */
    limit?: number
  }

  /**
   * CurrentAllocation updateManyAndReturn
   */
  export type CurrentAllocationUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CurrentAllocation
     */
    select?: CurrentAllocationSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the CurrentAllocation
     */
    omit?: CurrentAllocationOmit<ExtArgs> | null
    /**
     * The data used to update CurrentAllocations.
     */
    data: XOR<CurrentAllocationUpdateManyMutationInput, CurrentAllocationUncheckedUpdateManyInput>
    /**
     * Filter which CurrentAllocations to update
     */
    where?: CurrentAllocationWhereInput
    /**
     * Limit how many CurrentAllocations to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CurrentAllocationIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * CurrentAllocation upsert
   */
  export type CurrentAllocationUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CurrentAllocation
     */
    select?: CurrentAllocationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CurrentAllocation
     */
    omit?: CurrentAllocationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CurrentAllocationInclude<ExtArgs> | null
    /**
     * The filter to search for the CurrentAllocation to update in case it exists.
     */
    where: CurrentAllocationWhereUniqueInput
    /**
     * In case the CurrentAllocation found by the `where` argument doesn't exist, create a new CurrentAllocation with this data.
     */
    create: XOR<CurrentAllocationCreateInput, CurrentAllocationUncheckedCreateInput>
    /**
     * In case the CurrentAllocation was found with the provided `where` argument, update it with this data.
     */
    update: XOR<CurrentAllocationUpdateInput, CurrentAllocationUncheckedUpdateInput>
  }

  /**
   * CurrentAllocation delete
   */
  export type CurrentAllocationDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CurrentAllocation
     */
    select?: CurrentAllocationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CurrentAllocation
     */
    omit?: CurrentAllocationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CurrentAllocationInclude<ExtArgs> | null
    /**
     * Filter which CurrentAllocation to delete.
     */
    where: CurrentAllocationWhereUniqueInput
  }

  /**
   * CurrentAllocation deleteMany
   */
  export type CurrentAllocationDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which CurrentAllocations to delete
     */
    where?: CurrentAllocationWhereInput
    /**
     * Limit how many CurrentAllocations to delete.
     */
    limit?: number
  }

  /**
   * CurrentAllocation without action
   */
  export type CurrentAllocationDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CurrentAllocation
     */
    select?: CurrentAllocationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CurrentAllocation
     */
    omit?: CurrentAllocationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CurrentAllocationInclude<ExtArgs> | null
  }


  /**
   * Model CurrentAsset
   */

  export type AggregateCurrentAsset = {
    _count: CurrentAssetCountAggregateOutputType | null
    _avg: CurrentAssetAvgAggregateOutputType | null
    _sum: CurrentAssetSumAggregateOutputType | null
    _min: CurrentAssetMinAggregateOutputType | null
    _max: CurrentAssetMaxAggregateOutputType | null
  }

  export type CurrentAssetAvgAggregateOutputType = {
    balance: number | null
    valueUSD: number | null
  }

  export type CurrentAssetSumAggregateOutputType = {
    balance: number | null
    valueUSD: number | null
  }

  export type CurrentAssetMinAggregateOutputType = {
    id: string | null
    userId: string | null
    assetName: string | null
    assetTicker: string | null
    balance: number | null
    valueUSD: number | null
    updatedAt: Date | null
  }

  export type CurrentAssetMaxAggregateOutputType = {
    id: string | null
    userId: string | null
    assetName: string | null
    assetTicker: string | null
    balance: number | null
    valueUSD: number | null
    updatedAt: Date | null
  }

  export type CurrentAssetCountAggregateOutputType = {
    id: number
    userId: number
    assetName: number
    assetTicker: number
    balance: number
    valueUSD: number
    updatedAt: number
    _all: number
  }


  export type CurrentAssetAvgAggregateInputType = {
    balance?: true
    valueUSD?: true
  }

  export type CurrentAssetSumAggregateInputType = {
    balance?: true
    valueUSD?: true
  }

  export type CurrentAssetMinAggregateInputType = {
    id?: true
    userId?: true
    assetName?: true
    assetTicker?: true
    balance?: true
    valueUSD?: true
    updatedAt?: true
  }

  export type CurrentAssetMaxAggregateInputType = {
    id?: true
    userId?: true
    assetName?: true
    assetTicker?: true
    balance?: true
    valueUSD?: true
    updatedAt?: true
  }

  export type CurrentAssetCountAggregateInputType = {
    id?: true
    userId?: true
    assetName?: true
    assetTicker?: true
    balance?: true
    valueUSD?: true
    updatedAt?: true
    _all?: true
  }

  export type CurrentAssetAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which CurrentAsset to aggregate.
     */
    where?: CurrentAssetWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of CurrentAssets to fetch.
     */
    orderBy?: CurrentAssetOrderByWithRelationInput | CurrentAssetOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: CurrentAssetWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` CurrentAssets from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` CurrentAssets.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned CurrentAssets
    **/
    _count?: true | CurrentAssetCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: CurrentAssetAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: CurrentAssetSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: CurrentAssetMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: CurrentAssetMaxAggregateInputType
  }

  export type GetCurrentAssetAggregateType<T extends CurrentAssetAggregateArgs> = {
        [P in keyof T & keyof AggregateCurrentAsset]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateCurrentAsset[P]>
      : GetScalarType<T[P], AggregateCurrentAsset[P]>
  }




  export type CurrentAssetGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: CurrentAssetWhereInput
    orderBy?: CurrentAssetOrderByWithAggregationInput | CurrentAssetOrderByWithAggregationInput[]
    by: CurrentAssetScalarFieldEnum[] | CurrentAssetScalarFieldEnum
    having?: CurrentAssetScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: CurrentAssetCountAggregateInputType | true
    _avg?: CurrentAssetAvgAggregateInputType
    _sum?: CurrentAssetSumAggregateInputType
    _min?: CurrentAssetMinAggregateInputType
    _max?: CurrentAssetMaxAggregateInputType
  }

  export type CurrentAssetGroupByOutputType = {
    id: string
    userId: string
    assetName: string
    assetTicker: string
    balance: number
    valueUSD: number | null
    updatedAt: Date
    _count: CurrentAssetCountAggregateOutputType | null
    _avg: CurrentAssetAvgAggregateOutputType | null
    _sum: CurrentAssetSumAggregateOutputType | null
    _min: CurrentAssetMinAggregateOutputType | null
    _max: CurrentAssetMaxAggregateOutputType | null
  }

  type GetCurrentAssetGroupByPayload<T extends CurrentAssetGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<CurrentAssetGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof CurrentAssetGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], CurrentAssetGroupByOutputType[P]>
            : GetScalarType<T[P], CurrentAssetGroupByOutputType[P]>
        }
      >
    >


  export type CurrentAssetSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    assetName?: boolean
    assetTicker?: boolean
    balance?: boolean
    valueUSD?: boolean
    updatedAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["currentAsset"]>

  export type CurrentAssetSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    assetName?: boolean
    assetTicker?: boolean
    balance?: boolean
    valueUSD?: boolean
    updatedAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["currentAsset"]>

  export type CurrentAssetSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    assetName?: boolean
    assetTicker?: boolean
    balance?: boolean
    valueUSD?: boolean
    updatedAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["currentAsset"]>

  export type CurrentAssetSelectScalar = {
    id?: boolean
    userId?: boolean
    assetName?: boolean
    assetTicker?: boolean
    balance?: boolean
    valueUSD?: boolean
    updatedAt?: boolean
  }

  export type CurrentAssetOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "userId" | "assetName" | "assetTicker" | "balance" | "valueUSD" | "updatedAt", ExtArgs["result"]["currentAsset"]>
  export type CurrentAssetInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type CurrentAssetIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type CurrentAssetIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $CurrentAssetPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "CurrentAsset"
    objects: {
      user: Prisma.$UserPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      userId: string
      assetName: string
      assetTicker: string
      balance: number
      valueUSD: number | null
      updatedAt: Date
    }, ExtArgs["result"]["currentAsset"]>
    composites: {}
  }

  type CurrentAssetGetPayload<S extends boolean | null | undefined | CurrentAssetDefaultArgs> = $Result.GetResult<Prisma.$CurrentAssetPayload, S>

  type CurrentAssetCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<CurrentAssetFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: CurrentAssetCountAggregateInputType | true
    }

  export interface CurrentAssetDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['CurrentAsset'], meta: { name: 'CurrentAsset' } }
    /**
     * Find zero or one CurrentAsset that matches the filter.
     * @param {CurrentAssetFindUniqueArgs} args - Arguments to find a CurrentAsset
     * @example
     * // Get one CurrentAsset
     * const currentAsset = await prisma.currentAsset.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends CurrentAssetFindUniqueArgs>(args: SelectSubset<T, CurrentAssetFindUniqueArgs<ExtArgs>>): Prisma__CurrentAssetClient<$Result.GetResult<Prisma.$CurrentAssetPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one CurrentAsset that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {CurrentAssetFindUniqueOrThrowArgs} args - Arguments to find a CurrentAsset
     * @example
     * // Get one CurrentAsset
     * const currentAsset = await prisma.currentAsset.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends CurrentAssetFindUniqueOrThrowArgs>(args: SelectSubset<T, CurrentAssetFindUniqueOrThrowArgs<ExtArgs>>): Prisma__CurrentAssetClient<$Result.GetResult<Prisma.$CurrentAssetPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first CurrentAsset that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CurrentAssetFindFirstArgs} args - Arguments to find a CurrentAsset
     * @example
     * // Get one CurrentAsset
     * const currentAsset = await prisma.currentAsset.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends CurrentAssetFindFirstArgs>(args?: SelectSubset<T, CurrentAssetFindFirstArgs<ExtArgs>>): Prisma__CurrentAssetClient<$Result.GetResult<Prisma.$CurrentAssetPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first CurrentAsset that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CurrentAssetFindFirstOrThrowArgs} args - Arguments to find a CurrentAsset
     * @example
     * // Get one CurrentAsset
     * const currentAsset = await prisma.currentAsset.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends CurrentAssetFindFirstOrThrowArgs>(args?: SelectSubset<T, CurrentAssetFindFirstOrThrowArgs<ExtArgs>>): Prisma__CurrentAssetClient<$Result.GetResult<Prisma.$CurrentAssetPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more CurrentAssets that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CurrentAssetFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all CurrentAssets
     * const currentAssets = await prisma.currentAsset.findMany()
     * 
     * // Get first 10 CurrentAssets
     * const currentAssets = await prisma.currentAsset.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const currentAssetWithIdOnly = await prisma.currentAsset.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends CurrentAssetFindManyArgs>(args?: SelectSubset<T, CurrentAssetFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CurrentAssetPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a CurrentAsset.
     * @param {CurrentAssetCreateArgs} args - Arguments to create a CurrentAsset.
     * @example
     * // Create one CurrentAsset
     * const CurrentAsset = await prisma.currentAsset.create({
     *   data: {
     *     // ... data to create a CurrentAsset
     *   }
     * })
     * 
     */
    create<T extends CurrentAssetCreateArgs>(args: SelectSubset<T, CurrentAssetCreateArgs<ExtArgs>>): Prisma__CurrentAssetClient<$Result.GetResult<Prisma.$CurrentAssetPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many CurrentAssets.
     * @param {CurrentAssetCreateManyArgs} args - Arguments to create many CurrentAssets.
     * @example
     * // Create many CurrentAssets
     * const currentAsset = await prisma.currentAsset.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends CurrentAssetCreateManyArgs>(args?: SelectSubset<T, CurrentAssetCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many CurrentAssets and returns the data saved in the database.
     * @param {CurrentAssetCreateManyAndReturnArgs} args - Arguments to create many CurrentAssets.
     * @example
     * // Create many CurrentAssets
     * const currentAsset = await prisma.currentAsset.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many CurrentAssets and only return the `id`
     * const currentAssetWithIdOnly = await prisma.currentAsset.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends CurrentAssetCreateManyAndReturnArgs>(args?: SelectSubset<T, CurrentAssetCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CurrentAssetPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a CurrentAsset.
     * @param {CurrentAssetDeleteArgs} args - Arguments to delete one CurrentAsset.
     * @example
     * // Delete one CurrentAsset
     * const CurrentAsset = await prisma.currentAsset.delete({
     *   where: {
     *     // ... filter to delete one CurrentAsset
     *   }
     * })
     * 
     */
    delete<T extends CurrentAssetDeleteArgs>(args: SelectSubset<T, CurrentAssetDeleteArgs<ExtArgs>>): Prisma__CurrentAssetClient<$Result.GetResult<Prisma.$CurrentAssetPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one CurrentAsset.
     * @param {CurrentAssetUpdateArgs} args - Arguments to update one CurrentAsset.
     * @example
     * // Update one CurrentAsset
     * const currentAsset = await prisma.currentAsset.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends CurrentAssetUpdateArgs>(args: SelectSubset<T, CurrentAssetUpdateArgs<ExtArgs>>): Prisma__CurrentAssetClient<$Result.GetResult<Prisma.$CurrentAssetPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more CurrentAssets.
     * @param {CurrentAssetDeleteManyArgs} args - Arguments to filter CurrentAssets to delete.
     * @example
     * // Delete a few CurrentAssets
     * const { count } = await prisma.currentAsset.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends CurrentAssetDeleteManyArgs>(args?: SelectSubset<T, CurrentAssetDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more CurrentAssets.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CurrentAssetUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many CurrentAssets
     * const currentAsset = await prisma.currentAsset.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends CurrentAssetUpdateManyArgs>(args: SelectSubset<T, CurrentAssetUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more CurrentAssets and returns the data updated in the database.
     * @param {CurrentAssetUpdateManyAndReturnArgs} args - Arguments to update many CurrentAssets.
     * @example
     * // Update many CurrentAssets
     * const currentAsset = await prisma.currentAsset.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more CurrentAssets and only return the `id`
     * const currentAssetWithIdOnly = await prisma.currentAsset.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends CurrentAssetUpdateManyAndReturnArgs>(args: SelectSubset<T, CurrentAssetUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CurrentAssetPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one CurrentAsset.
     * @param {CurrentAssetUpsertArgs} args - Arguments to update or create a CurrentAsset.
     * @example
     * // Update or create a CurrentAsset
     * const currentAsset = await prisma.currentAsset.upsert({
     *   create: {
     *     // ... data to create a CurrentAsset
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the CurrentAsset we want to update
     *   }
     * })
     */
    upsert<T extends CurrentAssetUpsertArgs>(args: SelectSubset<T, CurrentAssetUpsertArgs<ExtArgs>>): Prisma__CurrentAssetClient<$Result.GetResult<Prisma.$CurrentAssetPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of CurrentAssets.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CurrentAssetCountArgs} args - Arguments to filter CurrentAssets to count.
     * @example
     * // Count the number of CurrentAssets
     * const count = await prisma.currentAsset.count({
     *   where: {
     *     // ... the filter for the CurrentAssets we want to count
     *   }
     * })
    **/
    count<T extends CurrentAssetCountArgs>(
      args?: Subset<T, CurrentAssetCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], CurrentAssetCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a CurrentAsset.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CurrentAssetAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends CurrentAssetAggregateArgs>(args: Subset<T, CurrentAssetAggregateArgs>): Prisma.PrismaPromise<GetCurrentAssetAggregateType<T>>

    /**
     * Group by CurrentAsset.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CurrentAssetGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends CurrentAssetGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: CurrentAssetGroupByArgs['orderBy'] }
        : { orderBy?: CurrentAssetGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, CurrentAssetGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetCurrentAssetGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the CurrentAsset model
   */
  readonly fields: CurrentAssetFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for CurrentAsset.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__CurrentAssetClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the CurrentAsset model
   */
  interface CurrentAssetFieldRefs {
    readonly id: FieldRef<"CurrentAsset", 'String'>
    readonly userId: FieldRef<"CurrentAsset", 'String'>
    readonly assetName: FieldRef<"CurrentAsset", 'String'>
    readonly assetTicker: FieldRef<"CurrentAsset", 'String'>
    readonly balance: FieldRef<"CurrentAsset", 'Float'>
    readonly valueUSD: FieldRef<"CurrentAsset", 'Float'>
    readonly updatedAt: FieldRef<"CurrentAsset", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * CurrentAsset findUnique
   */
  export type CurrentAssetFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CurrentAsset
     */
    select?: CurrentAssetSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CurrentAsset
     */
    omit?: CurrentAssetOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CurrentAssetInclude<ExtArgs> | null
    /**
     * Filter, which CurrentAsset to fetch.
     */
    where: CurrentAssetWhereUniqueInput
  }

  /**
   * CurrentAsset findUniqueOrThrow
   */
  export type CurrentAssetFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CurrentAsset
     */
    select?: CurrentAssetSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CurrentAsset
     */
    omit?: CurrentAssetOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CurrentAssetInclude<ExtArgs> | null
    /**
     * Filter, which CurrentAsset to fetch.
     */
    where: CurrentAssetWhereUniqueInput
  }

  /**
   * CurrentAsset findFirst
   */
  export type CurrentAssetFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CurrentAsset
     */
    select?: CurrentAssetSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CurrentAsset
     */
    omit?: CurrentAssetOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CurrentAssetInclude<ExtArgs> | null
    /**
     * Filter, which CurrentAsset to fetch.
     */
    where?: CurrentAssetWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of CurrentAssets to fetch.
     */
    orderBy?: CurrentAssetOrderByWithRelationInput | CurrentAssetOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for CurrentAssets.
     */
    cursor?: CurrentAssetWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` CurrentAssets from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` CurrentAssets.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of CurrentAssets.
     */
    distinct?: CurrentAssetScalarFieldEnum | CurrentAssetScalarFieldEnum[]
  }

  /**
   * CurrentAsset findFirstOrThrow
   */
  export type CurrentAssetFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CurrentAsset
     */
    select?: CurrentAssetSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CurrentAsset
     */
    omit?: CurrentAssetOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CurrentAssetInclude<ExtArgs> | null
    /**
     * Filter, which CurrentAsset to fetch.
     */
    where?: CurrentAssetWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of CurrentAssets to fetch.
     */
    orderBy?: CurrentAssetOrderByWithRelationInput | CurrentAssetOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for CurrentAssets.
     */
    cursor?: CurrentAssetWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` CurrentAssets from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` CurrentAssets.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of CurrentAssets.
     */
    distinct?: CurrentAssetScalarFieldEnum | CurrentAssetScalarFieldEnum[]
  }

  /**
   * CurrentAsset findMany
   */
  export type CurrentAssetFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CurrentAsset
     */
    select?: CurrentAssetSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CurrentAsset
     */
    omit?: CurrentAssetOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CurrentAssetInclude<ExtArgs> | null
    /**
     * Filter, which CurrentAssets to fetch.
     */
    where?: CurrentAssetWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of CurrentAssets to fetch.
     */
    orderBy?: CurrentAssetOrderByWithRelationInput | CurrentAssetOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing CurrentAssets.
     */
    cursor?: CurrentAssetWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` CurrentAssets from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` CurrentAssets.
     */
    skip?: number
    distinct?: CurrentAssetScalarFieldEnum | CurrentAssetScalarFieldEnum[]
  }

  /**
   * CurrentAsset create
   */
  export type CurrentAssetCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CurrentAsset
     */
    select?: CurrentAssetSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CurrentAsset
     */
    omit?: CurrentAssetOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CurrentAssetInclude<ExtArgs> | null
    /**
     * The data needed to create a CurrentAsset.
     */
    data: XOR<CurrentAssetCreateInput, CurrentAssetUncheckedCreateInput>
  }

  /**
   * CurrentAsset createMany
   */
  export type CurrentAssetCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many CurrentAssets.
     */
    data: CurrentAssetCreateManyInput | CurrentAssetCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * CurrentAsset createManyAndReturn
   */
  export type CurrentAssetCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CurrentAsset
     */
    select?: CurrentAssetSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the CurrentAsset
     */
    omit?: CurrentAssetOmit<ExtArgs> | null
    /**
     * The data used to create many CurrentAssets.
     */
    data: CurrentAssetCreateManyInput | CurrentAssetCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CurrentAssetIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * CurrentAsset update
   */
  export type CurrentAssetUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CurrentAsset
     */
    select?: CurrentAssetSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CurrentAsset
     */
    omit?: CurrentAssetOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CurrentAssetInclude<ExtArgs> | null
    /**
     * The data needed to update a CurrentAsset.
     */
    data: XOR<CurrentAssetUpdateInput, CurrentAssetUncheckedUpdateInput>
    /**
     * Choose, which CurrentAsset to update.
     */
    where: CurrentAssetWhereUniqueInput
  }

  /**
   * CurrentAsset updateMany
   */
  export type CurrentAssetUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update CurrentAssets.
     */
    data: XOR<CurrentAssetUpdateManyMutationInput, CurrentAssetUncheckedUpdateManyInput>
    /**
     * Filter which CurrentAssets to update
     */
    where?: CurrentAssetWhereInput
    /**
     * Limit how many CurrentAssets to update.
     */
    limit?: number
  }

  /**
   * CurrentAsset updateManyAndReturn
   */
  export type CurrentAssetUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CurrentAsset
     */
    select?: CurrentAssetSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the CurrentAsset
     */
    omit?: CurrentAssetOmit<ExtArgs> | null
    /**
     * The data used to update CurrentAssets.
     */
    data: XOR<CurrentAssetUpdateManyMutationInput, CurrentAssetUncheckedUpdateManyInput>
    /**
     * Filter which CurrentAssets to update
     */
    where?: CurrentAssetWhereInput
    /**
     * Limit how many CurrentAssets to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CurrentAssetIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * CurrentAsset upsert
   */
  export type CurrentAssetUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CurrentAsset
     */
    select?: CurrentAssetSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CurrentAsset
     */
    omit?: CurrentAssetOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CurrentAssetInclude<ExtArgs> | null
    /**
     * The filter to search for the CurrentAsset to update in case it exists.
     */
    where: CurrentAssetWhereUniqueInput
    /**
     * In case the CurrentAsset found by the `where` argument doesn't exist, create a new CurrentAsset with this data.
     */
    create: XOR<CurrentAssetCreateInput, CurrentAssetUncheckedCreateInput>
    /**
     * In case the CurrentAsset was found with the provided `where` argument, update it with this data.
     */
    update: XOR<CurrentAssetUpdateInput, CurrentAssetUncheckedUpdateInput>
  }

  /**
   * CurrentAsset delete
   */
  export type CurrentAssetDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CurrentAsset
     */
    select?: CurrentAssetSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CurrentAsset
     */
    omit?: CurrentAssetOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CurrentAssetInclude<ExtArgs> | null
    /**
     * Filter which CurrentAsset to delete.
     */
    where: CurrentAssetWhereUniqueInput
  }

  /**
   * CurrentAsset deleteMany
   */
  export type CurrentAssetDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which CurrentAssets to delete
     */
    where?: CurrentAssetWhereInput
    /**
     * Limit how many CurrentAssets to delete.
     */
    limit?: number
  }

  /**
   * CurrentAsset without action
   */
  export type CurrentAssetDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CurrentAsset
     */
    select?: CurrentAssetSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CurrentAsset
     */
    omit?: CurrentAssetOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CurrentAssetInclude<ExtArgs> | null
  }


  /**
   * Model Strategy
   */

  export type AggregateStrategy = {
    _count: StrategyCountAggregateOutputType | null
    _avg: StrategyAvgAggregateOutputType | null
    _sum: StrategySumAggregateOutputType | null
    _min: StrategyMinAggregateOutputType | null
    _max: StrategyMaxAggregateOutputType | null
  }

  export type StrategyAvgAggregateOutputType = {
    apy: number | null
  }

  export type StrategySumAggregateOutputType = {
    apy: number | null
  }

  export type StrategyMinAggregateOutputType = {
    id: string | null
    name: string | null
    description: string | null
    assetTicker: string | null
    apy: number | null
    riskLevel: string | null
    platform: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type StrategyMaxAggregateOutputType = {
    id: string | null
    name: string | null
    description: string | null
    assetTicker: string | null
    apy: number | null
    riskLevel: string | null
    platform: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type StrategyCountAggregateOutputType = {
    id: number
    name: number
    description: number
    assetTicker: number
    apy: number
    riskLevel: number
    platform: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type StrategyAvgAggregateInputType = {
    apy?: true
  }

  export type StrategySumAggregateInputType = {
    apy?: true
  }

  export type StrategyMinAggregateInputType = {
    id?: true
    name?: true
    description?: true
    assetTicker?: true
    apy?: true
    riskLevel?: true
    platform?: true
    createdAt?: true
    updatedAt?: true
  }

  export type StrategyMaxAggregateInputType = {
    id?: true
    name?: true
    description?: true
    assetTicker?: true
    apy?: true
    riskLevel?: true
    platform?: true
    createdAt?: true
    updatedAt?: true
  }

  export type StrategyCountAggregateInputType = {
    id?: true
    name?: true
    description?: true
    assetTicker?: true
    apy?: true
    riskLevel?: true
    platform?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type StrategyAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Strategy to aggregate.
     */
    where?: StrategyWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Strategies to fetch.
     */
    orderBy?: StrategyOrderByWithRelationInput | StrategyOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: StrategyWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Strategies from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Strategies.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Strategies
    **/
    _count?: true | StrategyCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: StrategyAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: StrategySumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: StrategyMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: StrategyMaxAggregateInputType
  }

  export type GetStrategyAggregateType<T extends StrategyAggregateArgs> = {
        [P in keyof T & keyof AggregateStrategy]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateStrategy[P]>
      : GetScalarType<T[P], AggregateStrategy[P]>
  }




  export type StrategyGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: StrategyWhereInput
    orderBy?: StrategyOrderByWithAggregationInput | StrategyOrderByWithAggregationInput[]
    by: StrategyScalarFieldEnum[] | StrategyScalarFieldEnum
    having?: StrategyScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: StrategyCountAggregateInputType | true
    _avg?: StrategyAvgAggregateInputType
    _sum?: StrategySumAggregateInputType
    _min?: StrategyMinAggregateInputType
    _max?: StrategyMaxAggregateInputType
  }

  export type StrategyGroupByOutputType = {
    id: string
    name: string
    description: string | null
    assetTicker: string
    apy: number
    riskLevel: string
    platform: string | null
    createdAt: Date
    updatedAt: Date
    _count: StrategyCountAggregateOutputType | null
    _avg: StrategyAvgAggregateOutputType | null
    _sum: StrategySumAggregateOutputType | null
    _min: StrategyMinAggregateOutputType | null
    _max: StrategyMaxAggregateOutputType | null
  }

  type GetStrategyGroupByPayload<T extends StrategyGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<StrategyGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof StrategyGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], StrategyGroupByOutputType[P]>
            : GetScalarType<T[P], StrategyGroupByOutputType[P]>
        }
      >
    >


  export type StrategySelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    description?: boolean
    assetTicker?: boolean
    apy?: boolean
    riskLevel?: boolean
    platform?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    userAllocations?: boolean | Strategy$userAllocationsArgs<ExtArgs>
    tradingEvents?: boolean | Strategy$tradingEventsArgs<ExtArgs>
    _count?: boolean | StrategyCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["strategy"]>

  export type StrategySelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    description?: boolean
    assetTicker?: boolean
    apy?: boolean
    riskLevel?: boolean
    platform?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["strategy"]>

  export type StrategySelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    description?: boolean
    assetTicker?: boolean
    apy?: boolean
    riskLevel?: boolean
    platform?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["strategy"]>

  export type StrategySelectScalar = {
    id?: boolean
    name?: boolean
    description?: boolean
    assetTicker?: boolean
    apy?: boolean
    riskLevel?: boolean
    platform?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type StrategyOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "name" | "description" | "assetTicker" | "apy" | "riskLevel" | "platform" | "createdAt" | "updatedAt", ExtArgs["result"]["strategy"]>
  export type StrategyInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    userAllocations?: boolean | Strategy$userAllocationsArgs<ExtArgs>
    tradingEvents?: boolean | Strategy$tradingEventsArgs<ExtArgs>
    _count?: boolean | StrategyCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type StrategyIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type StrategyIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $StrategyPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Strategy"
    objects: {
      userAllocations: Prisma.$UserStrategyAllocationPayload<ExtArgs>[]
      tradingEvents: Prisma.$TradingHistoryPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      name: string
      description: string | null
      assetTicker: string
      apy: number
      riskLevel: string
      platform: string | null
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["strategy"]>
    composites: {}
  }

  type StrategyGetPayload<S extends boolean | null | undefined | StrategyDefaultArgs> = $Result.GetResult<Prisma.$StrategyPayload, S>

  type StrategyCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<StrategyFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: StrategyCountAggregateInputType | true
    }

  export interface StrategyDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Strategy'], meta: { name: 'Strategy' } }
    /**
     * Find zero or one Strategy that matches the filter.
     * @param {StrategyFindUniqueArgs} args - Arguments to find a Strategy
     * @example
     * // Get one Strategy
     * const strategy = await prisma.strategy.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends StrategyFindUniqueArgs>(args: SelectSubset<T, StrategyFindUniqueArgs<ExtArgs>>): Prisma__StrategyClient<$Result.GetResult<Prisma.$StrategyPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Strategy that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {StrategyFindUniqueOrThrowArgs} args - Arguments to find a Strategy
     * @example
     * // Get one Strategy
     * const strategy = await prisma.strategy.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends StrategyFindUniqueOrThrowArgs>(args: SelectSubset<T, StrategyFindUniqueOrThrowArgs<ExtArgs>>): Prisma__StrategyClient<$Result.GetResult<Prisma.$StrategyPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Strategy that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {StrategyFindFirstArgs} args - Arguments to find a Strategy
     * @example
     * // Get one Strategy
     * const strategy = await prisma.strategy.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends StrategyFindFirstArgs>(args?: SelectSubset<T, StrategyFindFirstArgs<ExtArgs>>): Prisma__StrategyClient<$Result.GetResult<Prisma.$StrategyPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Strategy that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {StrategyFindFirstOrThrowArgs} args - Arguments to find a Strategy
     * @example
     * // Get one Strategy
     * const strategy = await prisma.strategy.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends StrategyFindFirstOrThrowArgs>(args?: SelectSubset<T, StrategyFindFirstOrThrowArgs<ExtArgs>>): Prisma__StrategyClient<$Result.GetResult<Prisma.$StrategyPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Strategies that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {StrategyFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Strategies
     * const strategies = await prisma.strategy.findMany()
     * 
     * // Get first 10 Strategies
     * const strategies = await prisma.strategy.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const strategyWithIdOnly = await prisma.strategy.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends StrategyFindManyArgs>(args?: SelectSubset<T, StrategyFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$StrategyPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Strategy.
     * @param {StrategyCreateArgs} args - Arguments to create a Strategy.
     * @example
     * // Create one Strategy
     * const Strategy = await prisma.strategy.create({
     *   data: {
     *     // ... data to create a Strategy
     *   }
     * })
     * 
     */
    create<T extends StrategyCreateArgs>(args: SelectSubset<T, StrategyCreateArgs<ExtArgs>>): Prisma__StrategyClient<$Result.GetResult<Prisma.$StrategyPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Strategies.
     * @param {StrategyCreateManyArgs} args - Arguments to create many Strategies.
     * @example
     * // Create many Strategies
     * const strategy = await prisma.strategy.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends StrategyCreateManyArgs>(args?: SelectSubset<T, StrategyCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Strategies and returns the data saved in the database.
     * @param {StrategyCreateManyAndReturnArgs} args - Arguments to create many Strategies.
     * @example
     * // Create many Strategies
     * const strategy = await prisma.strategy.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Strategies and only return the `id`
     * const strategyWithIdOnly = await prisma.strategy.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends StrategyCreateManyAndReturnArgs>(args?: SelectSubset<T, StrategyCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$StrategyPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Strategy.
     * @param {StrategyDeleteArgs} args - Arguments to delete one Strategy.
     * @example
     * // Delete one Strategy
     * const Strategy = await prisma.strategy.delete({
     *   where: {
     *     // ... filter to delete one Strategy
     *   }
     * })
     * 
     */
    delete<T extends StrategyDeleteArgs>(args: SelectSubset<T, StrategyDeleteArgs<ExtArgs>>): Prisma__StrategyClient<$Result.GetResult<Prisma.$StrategyPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Strategy.
     * @param {StrategyUpdateArgs} args - Arguments to update one Strategy.
     * @example
     * // Update one Strategy
     * const strategy = await prisma.strategy.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends StrategyUpdateArgs>(args: SelectSubset<T, StrategyUpdateArgs<ExtArgs>>): Prisma__StrategyClient<$Result.GetResult<Prisma.$StrategyPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Strategies.
     * @param {StrategyDeleteManyArgs} args - Arguments to filter Strategies to delete.
     * @example
     * // Delete a few Strategies
     * const { count } = await prisma.strategy.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends StrategyDeleteManyArgs>(args?: SelectSubset<T, StrategyDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Strategies.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {StrategyUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Strategies
     * const strategy = await prisma.strategy.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends StrategyUpdateManyArgs>(args: SelectSubset<T, StrategyUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Strategies and returns the data updated in the database.
     * @param {StrategyUpdateManyAndReturnArgs} args - Arguments to update many Strategies.
     * @example
     * // Update many Strategies
     * const strategy = await prisma.strategy.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Strategies and only return the `id`
     * const strategyWithIdOnly = await prisma.strategy.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends StrategyUpdateManyAndReturnArgs>(args: SelectSubset<T, StrategyUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$StrategyPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Strategy.
     * @param {StrategyUpsertArgs} args - Arguments to update or create a Strategy.
     * @example
     * // Update or create a Strategy
     * const strategy = await prisma.strategy.upsert({
     *   create: {
     *     // ... data to create a Strategy
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Strategy we want to update
     *   }
     * })
     */
    upsert<T extends StrategyUpsertArgs>(args: SelectSubset<T, StrategyUpsertArgs<ExtArgs>>): Prisma__StrategyClient<$Result.GetResult<Prisma.$StrategyPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Strategies.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {StrategyCountArgs} args - Arguments to filter Strategies to count.
     * @example
     * // Count the number of Strategies
     * const count = await prisma.strategy.count({
     *   where: {
     *     // ... the filter for the Strategies we want to count
     *   }
     * })
    **/
    count<T extends StrategyCountArgs>(
      args?: Subset<T, StrategyCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], StrategyCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Strategy.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {StrategyAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends StrategyAggregateArgs>(args: Subset<T, StrategyAggregateArgs>): Prisma.PrismaPromise<GetStrategyAggregateType<T>>

    /**
     * Group by Strategy.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {StrategyGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends StrategyGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: StrategyGroupByArgs['orderBy'] }
        : { orderBy?: StrategyGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, StrategyGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetStrategyGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Strategy model
   */
  readonly fields: StrategyFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Strategy.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__StrategyClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    userAllocations<T extends Strategy$userAllocationsArgs<ExtArgs> = {}>(args?: Subset<T, Strategy$userAllocationsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserStrategyAllocationPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    tradingEvents<T extends Strategy$tradingEventsArgs<ExtArgs> = {}>(args?: Subset<T, Strategy$tradingEventsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TradingHistoryPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Strategy model
   */
  interface StrategyFieldRefs {
    readonly id: FieldRef<"Strategy", 'String'>
    readonly name: FieldRef<"Strategy", 'String'>
    readonly description: FieldRef<"Strategy", 'String'>
    readonly assetTicker: FieldRef<"Strategy", 'String'>
    readonly apy: FieldRef<"Strategy", 'Float'>
    readonly riskLevel: FieldRef<"Strategy", 'String'>
    readonly platform: FieldRef<"Strategy", 'String'>
    readonly createdAt: FieldRef<"Strategy", 'DateTime'>
    readonly updatedAt: FieldRef<"Strategy", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Strategy findUnique
   */
  export type StrategyFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Strategy
     */
    select?: StrategySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Strategy
     */
    omit?: StrategyOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StrategyInclude<ExtArgs> | null
    /**
     * Filter, which Strategy to fetch.
     */
    where: StrategyWhereUniqueInput
  }

  /**
   * Strategy findUniqueOrThrow
   */
  export type StrategyFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Strategy
     */
    select?: StrategySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Strategy
     */
    omit?: StrategyOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StrategyInclude<ExtArgs> | null
    /**
     * Filter, which Strategy to fetch.
     */
    where: StrategyWhereUniqueInput
  }

  /**
   * Strategy findFirst
   */
  export type StrategyFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Strategy
     */
    select?: StrategySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Strategy
     */
    omit?: StrategyOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StrategyInclude<ExtArgs> | null
    /**
     * Filter, which Strategy to fetch.
     */
    where?: StrategyWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Strategies to fetch.
     */
    orderBy?: StrategyOrderByWithRelationInput | StrategyOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Strategies.
     */
    cursor?: StrategyWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Strategies from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Strategies.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Strategies.
     */
    distinct?: StrategyScalarFieldEnum | StrategyScalarFieldEnum[]
  }

  /**
   * Strategy findFirstOrThrow
   */
  export type StrategyFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Strategy
     */
    select?: StrategySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Strategy
     */
    omit?: StrategyOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StrategyInclude<ExtArgs> | null
    /**
     * Filter, which Strategy to fetch.
     */
    where?: StrategyWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Strategies to fetch.
     */
    orderBy?: StrategyOrderByWithRelationInput | StrategyOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Strategies.
     */
    cursor?: StrategyWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Strategies from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Strategies.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Strategies.
     */
    distinct?: StrategyScalarFieldEnum | StrategyScalarFieldEnum[]
  }

  /**
   * Strategy findMany
   */
  export type StrategyFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Strategy
     */
    select?: StrategySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Strategy
     */
    omit?: StrategyOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StrategyInclude<ExtArgs> | null
    /**
     * Filter, which Strategies to fetch.
     */
    where?: StrategyWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Strategies to fetch.
     */
    orderBy?: StrategyOrderByWithRelationInput | StrategyOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Strategies.
     */
    cursor?: StrategyWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Strategies from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Strategies.
     */
    skip?: number
    distinct?: StrategyScalarFieldEnum | StrategyScalarFieldEnum[]
  }

  /**
   * Strategy create
   */
  export type StrategyCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Strategy
     */
    select?: StrategySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Strategy
     */
    omit?: StrategyOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StrategyInclude<ExtArgs> | null
    /**
     * The data needed to create a Strategy.
     */
    data: XOR<StrategyCreateInput, StrategyUncheckedCreateInput>
  }

  /**
   * Strategy createMany
   */
  export type StrategyCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Strategies.
     */
    data: StrategyCreateManyInput | StrategyCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Strategy createManyAndReturn
   */
  export type StrategyCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Strategy
     */
    select?: StrategySelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Strategy
     */
    omit?: StrategyOmit<ExtArgs> | null
    /**
     * The data used to create many Strategies.
     */
    data: StrategyCreateManyInput | StrategyCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Strategy update
   */
  export type StrategyUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Strategy
     */
    select?: StrategySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Strategy
     */
    omit?: StrategyOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StrategyInclude<ExtArgs> | null
    /**
     * The data needed to update a Strategy.
     */
    data: XOR<StrategyUpdateInput, StrategyUncheckedUpdateInput>
    /**
     * Choose, which Strategy to update.
     */
    where: StrategyWhereUniqueInput
  }

  /**
   * Strategy updateMany
   */
  export type StrategyUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Strategies.
     */
    data: XOR<StrategyUpdateManyMutationInput, StrategyUncheckedUpdateManyInput>
    /**
     * Filter which Strategies to update
     */
    where?: StrategyWhereInput
    /**
     * Limit how many Strategies to update.
     */
    limit?: number
  }

  /**
   * Strategy updateManyAndReturn
   */
  export type StrategyUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Strategy
     */
    select?: StrategySelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Strategy
     */
    omit?: StrategyOmit<ExtArgs> | null
    /**
     * The data used to update Strategies.
     */
    data: XOR<StrategyUpdateManyMutationInput, StrategyUncheckedUpdateManyInput>
    /**
     * Filter which Strategies to update
     */
    where?: StrategyWhereInput
    /**
     * Limit how many Strategies to update.
     */
    limit?: number
  }

  /**
   * Strategy upsert
   */
  export type StrategyUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Strategy
     */
    select?: StrategySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Strategy
     */
    omit?: StrategyOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StrategyInclude<ExtArgs> | null
    /**
     * The filter to search for the Strategy to update in case it exists.
     */
    where: StrategyWhereUniqueInput
    /**
     * In case the Strategy found by the `where` argument doesn't exist, create a new Strategy with this data.
     */
    create: XOR<StrategyCreateInput, StrategyUncheckedCreateInput>
    /**
     * In case the Strategy was found with the provided `where` argument, update it with this data.
     */
    update: XOR<StrategyUpdateInput, StrategyUncheckedUpdateInput>
  }

  /**
   * Strategy delete
   */
  export type StrategyDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Strategy
     */
    select?: StrategySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Strategy
     */
    omit?: StrategyOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StrategyInclude<ExtArgs> | null
    /**
     * Filter which Strategy to delete.
     */
    where: StrategyWhereUniqueInput
  }

  /**
   * Strategy deleteMany
   */
  export type StrategyDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Strategies to delete
     */
    where?: StrategyWhereInput
    /**
     * Limit how many Strategies to delete.
     */
    limit?: number
  }

  /**
   * Strategy.userAllocations
   */
  export type Strategy$userAllocationsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserStrategyAllocation
     */
    select?: UserStrategyAllocationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserStrategyAllocation
     */
    omit?: UserStrategyAllocationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserStrategyAllocationInclude<ExtArgs> | null
    where?: UserStrategyAllocationWhereInput
    orderBy?: UserStrategyAllocationOrderByWithRelationInput | UserStrategyAllocationOrderByWithRelationInput[]
    cursor?: UserStrategyAllocationWhereUniqueInput
    take?: number
    skip?: number
    distinct?: UserStrategyAllocationScalarFieldEnum | UserStrategyAllocationScalarFieldEnum[]
  }

  /**
   * Strategy.tradingEvents
   */
  export type Strategy$tradingEventsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TradingHistory
     */
    select?: TradingHistorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the TradingHistory
     */
    omit?: TradingHistoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TradingHistoryInclude<ExtArgs> | null
    where?: TradingHistoryWhereInput
    orderBy?: TradingHistoryOrderByWithRelationInput | TradingHistoryOrderByWithRelationInput[]
    cursor?: TradingHistoryWhereUniqueInput
    take?: number
    skip?: number
    distinct?: TradingHistoryScalarFieldEnum | TradingHistoryScalarFieldEnum[]
  }

  /**
   * Strategy without action
   */
  export type StrategyDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Strategy
     */
    select?: StrategySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Strategy
     */
    omit?: StrategyOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StrategyInclude<ExtArgs> | null
  }


  /**
   * Model UserStrategyAllocation
   */

  export type AggregateUserStrategyAllocation = {
    _count: UserStrategyAllocationCountAggregateOutputType | null
    _avg: UserStrategyAllocationAvgAggregateOutputType | null
    _sum: UserStrategyAllocationSumAggregateOutputType | null
    _min: UserStrategyAllocationMinAggregateOutputType | null
    _max: UserStrategyAllocationMaxAggregateOutputType | null
  }

  export type UserStrategyAllocationAvgAggregateOutputType = {
    allocatedAmount: number | null
    cumulativeYieldEarned: number | null
  }

  export type UserStrategyAllocationSumAggregateOutputType = {
    allocatedAmount: number | null
    cumulativeYieldEarned: number | null
  }

  export type UserStrategyAllocationMinAggregateOutputType = {
    id: string | null
    userId: string | null
    strategyId: string | null
    assetTicker: string | null
    allocatedAmount: number | null
    entryTimestamp: Date | null
    cumulativeYieldEarned: number | null
    lastYieldClaimTimestamp: Date | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type UserStrategyAllocationMaxAggregateOutputType = {
    id: string | null
    userId: string | null
    strategyId: string | null
    assetTicker: string | null
    allocatedAmount: number | null
    entryTimestamp: Date | null
    cumulativeYieldEarned: number | null
    lastYieldClaimTimestamp: Date | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type UserStrategyAllocationCountAggregateOutputType = {
    id: number
    userId: number
    strategyId: number
    assetTicker: number
    allocatedAmount: number
    entryTimestamp: number
    cumulativeYieldEarned: number
    lastYieldClaimTimestamp: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type UserStrategyAllocationAvgAggregateInputType = {
    allocatedAmount?: true
    cumulativeYieldEarned?: true
  }

  export type UserStrategyAllocationSumAggregateInputType = {
    allocatedAmount?: true
    cumulativeYieldEarned?: true
  }

  export type UserStrategyAllocationMinAggregateInputType = {
    id?: true
    userId?: true
    strategyId?: true
    assetTicker?: true
    allocatedAmount?: true
    entryTimestamp?: true
    cumulativeYieldEarned?: true
    lastYieldClaimTimestamp?: true
    createdAt?: true
    updatedAt?: true
  }

  export type UserStrategyAllocationMaxAggregateInputType = {
    id?: true
    userId?: true
    strategyId?: true
    assetTicker?: true
    allocatedAmount?: true
    entryTimestamp?: true
    cumulativeYieldEarned?: true
    lastYieldClaimTimestamp?: true
    createdAt?: true
    updatedAt?: true
  }

  export type UserStrategyAllocationCountAggregateInputType = {
    id?: true
    userId?: true
    strategyId?: true
    assetTicker?: true
    allocatedAmount?: true
    entryTimestamp?: true
    cumulativeYieldEarned?: true
    lastYieldClaimTimestamp?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type UserStrategyAllocationAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which UserStrategyAllocation to aggregate.
     */
    where?: UserStrategyAllocationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of UserStrategyAllocations to fetch.
     */
    orderBy?: UserStrategyAllocationOrderByWithRelationInput | UserStrategyAllocationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: UserStrategyAllocationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` UserStrategyAllocations from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` UserStrategyAllocations.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned UserStrategyAllocations
    **/
    _count?: true | UserStrategyAllocationCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: UserStrategyAllocationAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: UserStrategyAllocationSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: UserStrategyAllocationMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: UserStrategyAllocationMaxAggregateInputType
  }

  export type GetUserStrategyAllocationAggregateType<T extends UserStrategyAllocationAggregateArgs> = {
        [P in keyof T & keyof AggregateUserStrategyAllocation]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateUserStrategyAllocation[P]>
      : GetScalarType<T[P], AggregateUserStrategyAllocation[P]>
  }




  export type UserStrategyAllocationGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: UserStrategyAllocationWhereInput
    orderBy?: UserStrategyAllocationOrderByWithAggregationInput | UserStrategyAllocationOrderByWithAggregationInput[]
    by: UserStrategyAllocationScalarFieldEnum[] | UserStrategyAllocationScalarFieldEnum
    having?: UserStrategyAllocationScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: UserStrategyAllocationCountAggregateInputType | true
    _avg?: UserStrategyAllocationAvgAggregateInputType
    _sum?: UserStrategyAllocationSumAggregateInputType
    _min?: UserStrategyAllocationMinAggregateInputType
    _max?: UserStrategyAllocationMaxAggregateInputType
  }

  export type UserStrategyAllocationGroupByOutputType = {
    id: string
    userId: string
    strategyId: string
    assetTicker: string
    allocatedAmount: number
    entryTimestamp: Date
    cumulativeYieldEarned: number
    lastYieldClaimTimestamp: Date | null
    createdAt: Date
    updatedAt: Date
    _count: UserStrategyAllocationCountAggregateOutputType | null
    _avg: UserStrategyAllocationAvgAggregateOutputType | null
    _sum: UserStrategyAllocationSumAggregateOutputType | null
    _min: UserStrategyAllocationMinAggregateOutputType | null
    _max: UserStrategyAllocationMaxAggregateOutputType | null
  }

  type GetUserStrategyAllocationGroupByPayload<T extends UserStrategyAllocationGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<UserStrategyAllocationGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof UserStrategyAllocationGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], UserStrategyAllocationGroupByOutputType[P]>
            : GetScalarType<T[P], UserStrategyAllocationGroupByOutputType[P]>
        }
      >
    >


  export type UserStrategyAllocationSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    strategyId?: boolean
    assetTicker?: boolean
    allocatedAmount?: boolean
    entryTimestamp?: boolean
    cumulativeYieldEarned?: boolean
    lastYieldClaimTimestamp?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
    strategy?: boolean | StrategyDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["userStrategyAllocation"]>

  export type UserStrategyAllocationSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    strategyId?: boolean
    assetTicker?: boolean
    allocatedAmount?: boolean
    entryTimestamp?: boolean
    cumulativeYieldEarned?: boolean
    lastYieldClaimTimestamp?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
    strategy?: boolean | StrategyDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["userStrategyAllocation"]>

  export type UserStrategyAllocationSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    strategyId?: boolean
    assetTicker?: boolean
    allocatedAmount?: boolean
    entryTimestamp?: boolean
    cumulativeYieldEarned?: boolean
    lastYieldClaimTimestamp?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
    strategy?: boolean | StrategyDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["userStrategyAllocation"]>

  export type UserStrategyAllocationSelectScalar = {
    id?: boolean
    userId?: boolean
    strategyId?: boolean
    assetTicker?: boolean
    allocatedAmount?: boolean
    entryTimestamp?: boolean
    cumulativeYieldEarned?: boolean
    lastYieldClaimTimestamp?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type UserStrategyAllocationOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "userId" | "strategyId" | "assetTicker" | "allocatedAmount" | "entryTimestamp" | "cumulativeYieldEarned" | "lastYieldClaimTimestamp" | "createdAt" | "updatedAt", ExtArgs["result"]["userStrategyAllocation"]>
  export type UserStrategyAllocationInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
    strategy?: boolean | StrategyDefaultArgs<ExtArgs>
  }
  export type UserStrategyAllocationIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
    strategy?: boolean | StrategyDefaultArgs<ExtArgs>
  }
  export type UserStrategyAllocationIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
    strategy?: boolean | StrategyDefaultArgs<ExtArgs>
  }

  export type $UserStrategyAllocationPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "UserStrategyAllocation"
    objects: {
      user: Prisma.$UserPayload<ExtArgs>
      strategy: Prisma.$StrategyPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      userId: string
      strategyId: string
      assetTicker: string
      allocatedAmount: number
      entryTimestamp: Date
      cumulativeYieldEarned: number
      lastYieldClaimTimestamp: Date | null
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["userStrategyAllocation"]>
    composites: {}
  }

  type UserStrategyAllocationGetPayload<S extends boolean | null | undefined | UserStrategyAllocationDefaultArgs> = $Result.GetResult<Prisma.$UserStrategyAllocationPayload, S>

  type UserStrategyAllocationCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<UserStrategyAllocationFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: UserStrategyAllocationCountAggregateInputType | true
    }

  export interface UserStrategyAllocationDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['UserStrategyAllocation'], meta: { name: 'UserStrategyAllocation' } }
    /**
     * Find zero or one UserStrategyAllocation that matches the filter.
     * @param {UserStrategyAllocationFindUniqueArgs} args - Arguments to find a UserStrategyAllocation
     * @example
     * // Get one UserStrategyAllocation
     * const userStrategyAllocation = await prisma.userStrategyAllocation.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends UserStrategyAllocationFindUniqueArgs>(args: SelectSubset<T, UserStrategyAllocationFindUniqueArgs<ExtArgs>>): Prisma__UserStrategyAllocationClient<$Result.GetResult<Prisma.$UserStrategyAllocationPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one UserStrategyAllocation that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {UserStrategyAllocationFindUniqueOrThrowArgs} args - Arguments to find a UserStrategyAllocation
     * @example
     * // Get one UserStrategyAllocation
     * const userStrategyAllocation = await prisma.userStrategyAllocation.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends UserStrategyAllocationFindUniqueOrThrowArgs>(args: SelectSubset<T, UserStrategyAllocationFindUniqueOrThrowArgs<ExtArgs>>): Prisma__UserStrategyAllocationClient<$Result.GetResult<Prisma.$UserStrategyAllocationPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first UserStrategyAllocation that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserStrategyAllocationFindFirstArgs} args - Arguments to find a UserStrategyAllocation
     * @example
     * // Get one UserStrategyAllocation
     * const userStrategyAllocation = await prisma.userStrategyAllocation.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends UserStrategyAllocationFindFirstArgs>(args?: SelectSubset<T, UserStrategyAllocationFindFirstArgs<ExtArgs>>): Prisma__UserStrategyAllocationClient<$Result.GetResult<Prisma.$UserStrategyAllocationPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first UserStrategyAllocation that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserStrategyAllocationFindFirstOrThrowArgs} args - Arguments to find a UserStrategyAllocation
     * @example
     * // Get one UserStrategyAllocation
     * const userStrategyAllocation = await prisma.userStrategyAllocation.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends UserStrategyAllocationFindFirstOrThrowArgs>(args?: SelectSubset<T, UserStrategyAllocationFindFirstOrThrowArgs<ExtArgs>>): Prisma__UserStrategyAllocationClient<$Result.GetResult<Prisma.$UserStrategyAllocationPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more UserStrategyAllocations that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserStrategyAllocationFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all UserStrategyAllocations
     * const userStrategyAllocations = await prisma.userStrategyAllocation.findMany()
     * 
     * // Get first 10 UserStrategyAllocations
     * const userStrategyAllocations = await prisma.userStrategyAllocation.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const userStrategyAllocationWithIdOnly = await prisma.userStrategyAllocation.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends UserStrategyAllocationFindManyArgs>(args?: SelectSubset<T, UserStrategyAllocationFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserStrategyAllocationPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a UserStrategyAllocation.
     * @param {UserStrategyAllocationCreateArgs} args - Arguments to create a UserStrategyAllocation.
     * @example
     * // Create one UserStrategyAllocation
     * const UserStrategyAllocation = await prisma.userStrategyAllocation.create({
     *   data: {
     *     // ... data to create a UserStrategyAllocation
     *   }
     * })
     * 
     */
    create<T extends UserStrategyAllocationCreateArgs>(args: SelectSubset<T, UserStrategyAllocationCreateArgs<ExtArgs>>): Prisma__UserStrategyAllocationClient<$Result.GetResult<Prisma.$UserStrategyAllocationPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many UserStrategyAllocations.
     * @param {UserStrategyAllocationCreateManyArgs} args - Arguments to create many UserStrategyAllocations.
     * @example
     * // Create many UserStrategyAllocations
     * const userStrategyAllocation = await prisma.userStrategyAllocation.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends UserStrategyAllocationCreateManyArgs>(args?: SelectSubset<T, UserStrategyAllocationCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many UserStrategyAllocations and returns the data saved in the database.
     * @param {UserStrategyAllocationCreateManyAndReturnArgs} args - Arguments to create many UserStrategyAllocations.
     * @example
     * // Create many UserStrategyAllocations
     * const userStrategyAllocation = await prisma.userStrategyAllocation.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many UserStrategyAllocations and only return the `id`
     * const userStrategyAllocationWithIdOnly = await prisma.userStrategyAllocation.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends UserStrategyAllocationCreateManyAndReturnArgs>(args?: SelectSubset<T, UserStrategyAllocationCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserStrategyAllocationPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a UserStrategyAllocation.
     * @param {UserStrategyAllocationDeleteArgs} args - Arguments to delete one UserStrategyAllocation.
     * @example
     * // Delete one UserStrategyAllocation
     * const UserStrategyAllocation = await prisma.userStrategyAllocation.delete({
     *   where: {
     *     // ... filter to delete one UserStrategyAllocation
     *   }
     * })
     * 
     */
    delete<T extends UserStrategyAllocationDeleteArgs>(args: SelectSubset<T, UserStrategyAllocationDeleteArgs<ExtArgs>>): Prisma__UserStrategyAllocationClient<$Result.GetResult<Prisma.$UserStrategyAllocationPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one UserStrategyAllocation.
     * @param {UserStrategyAllocationUpdateArgs} args - Arguments to update one UserStrategyAllocation.
     * @example
     * // Update one UserStrategyAllocation
     * const userStrategyAllocation = await prisma.userStrategyAllocation.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends UserStrategyAllocationUpdateArgs>(args: SelectSubset<T, UserStrategyAllocationUpdateArgs<ExtArgs>>): Prisma__UserStrategyAllocationClient<$Result.GetResult<Prisma.$UserStrategyAllocationPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more UserStrategyAllocations.
     * @param {UserStrategyAllocationDeleteManyArgs} args - Arguments to filter UserStrategyAllocations to delete.
     * @example
     * // Delete a few UserStrategyAllocations
     * const { count } = await prisma.userStrategyAllocation.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends UserStrategyAllocationDeleteManyArgs>(args?: SelectSubset<T, UserStrategyAllocationDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more UserStrategyAllocations.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserStrategyAllocationUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many UserStrategyAllocations
     * const userStrategyAllocation = await prisma.userStrategyAllocation.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends UserStrategyAllocationUpdateManyArgs>(args: SelectSubset<T, UserStrategyAllocationUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more UserStrategyAllocations and returns the data updated in the database.
     * @param {UserStrategyAllocationUpdateManyAndReturnArgs} args - Arguments to update many UserStrategyAllocations.
     * @example
     * // Update many UserStrategyAllocations
     * const userStrategyAllocation = await prisma.userStrategyAllocation.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more UserStrategyAllocations and only return the `id`
     * const userStrategyAllocationWithIdOnly = await prisma.userStrategyAllocation.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends UserStrategyAllocationUpdateManyAndReturnArgs>(args: SelectSubset<T, UserStrategyAllocationUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserStrategyAllocationPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one UserStrategyAllocation.
     * @param {UserStrategyAllocationUpsertArgs} args - Arguments to update or create a UserStrategyAllocation.
     * @example
     * // Update or create a UserStrategyAllocation
     * const userStrategyAllocation = await prisma.userStrategyAllocation.upsert({
     *   create: {
     *     // ... data to create a UserStrategyAllocation
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the UserStrategyAllocation we want to update
     *   }
     * })
     */
    upsert<T extends UserStrategyAllocationUpsertArgs>(args: SelectSubset<T, UserStrategyAllocationUpsertArgs<ExtArgs>>): Prisma__UserStrategyAllocationClient<$Result.GetResult<Prisma.$UserStrategyAllocationPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of UserStrategyAllocations.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserStrategyAllocationCountArgs} args - Arguments to filter UserStrategyAllocations to count.
     * @example
     * // Count the number of UserStrategyAllocations
     * const count = await prisma.userStrategyAllocation.count({
     *   where: {
     *     // ... the filter for the UserStrategyAllocations we want to count
     *   }
     * })
    **/
    count<T extends UserStrategyAllocationCountArgs>(
      args?: Subset<T, UserStrategyAllocationCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], UserStrategyAllocationCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a UserStrategyAllocation.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserStrategyAllocationAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends UserStrategyAllocationAggregateArgs>(args: Subset<T, UserStrategyAllocationAggregateArgs>): Prisma.PrismaPromise<GetUserStrategyAllocationAggregateType<T>>

    /**
     * Group by UserStrategyAllocation.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserStrategyAllocationGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends UserStrategyAllocationGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: UserStrategyAllocationGroupByArgs['orderBy'] }
        : { orderBy?: UserStrategyAllocationGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, UserStrategyAllocationGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetUserStrategyAllocationGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the UserStrategyAllocation model
   */
  readonly fields: UserStrategyAllocationFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for UserStrategyAllocation.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__UserStrategyAllocationClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    strategy<T extends StrategyDefaultArgs<ExtArgs> = {}>(args?: Subset<T, StrategyDefaultArgs<ExtArgs>>): Prisma__StrategyClient<$Result.GetResult<Prisma.$StrategyPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the UserStrategyAllocation model
   */
  interface UserStrategyAllocationFieldRefs {
    readonly id: FieldRef<"UserStrategyAllocation", 'String'>
    readonly userId: FieldRef<"UserStrategyAllocation", 'String'>
    readonly strategyId: FieldRef<"UserStrategyAllocation", 'String'>
    readonly assetTicker: FieldRef<"UserStrategyAllocation", 'String'>
    readonly allocatedAmount: FieldRef<"UserStrategyAllocation", 'Float'>
    readonly entryTimestamp: FieldRef<"UserStrategyAllocation", 'DateTime'>
    readonly cumulativeYieldEarned: FieldRef<"UserStrategyAllocation", 'Float'>
    readonly lastYieldClaimTimestamp: FieldRef<"UserStrategyAllocation", 'DateTime'>
    readonly createdAt: FieldRef<"UserStrategyAllocation", 'DateTime'>
    readonly updatedAt: FieldRef<"UserStrategyAllocation", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * UserStrategyAllocation findUnique
   */
  export type UserStrategyAllocationFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserStrategyAllocation
     */
    select?: UserStrategyAllocationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserStrategyAllocation
     */
    omit?: UserStrategyAllocationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserStrategyAllocationInclude<ExtArgs> | null
    /**
     * Filter, which UserStrategyAllocation to fetch.
     */
    where: UserStrategyAllocationWhereUniqueInput
  }

  /**
   * UserStrategyAllocation findUniqueOrThrow
   */
  export type UserStrategyAllocationFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserStrategyAllocation
     */
    select?: UserStrategyAllocationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserStrategyAllocation
     */
    omit?: UserStrategyAllocationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserStrategyAllocationInclude<ExtArgs> | null
    /**
     * Filter, which UserStrategyAllocation to fetch.
     */
    where: UserStrategyAllocationWhereUniqueInput
  }

  /**
   * UserStrategyAllocation findFirst
   */
  export type UserStrategyAllocationFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserStrategyAllocation
     */
    select?: UserStrategyAllocationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserStrategyAllocation
     */
    omit?: UserStrategyAllocationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserStrategyAllocationInclude<ExtArgs> | null
    /**
     * Filter, which UserStrategyAllocation to fetch.
     */
    where?: UserStrategyAllocationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of UserStrategyAllocations to fetch.
     */
    orderBy?: UserStrategyAllocationOrderByWithRelationInput | UserStrategyAllocationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for UserStrategyAllocations.
     */
    cursor?: UserStrategyAllocationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` UserStrategyAllocations from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` UserStrategyAllocations.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of UserStrategyAllocations.
     */
    distinct?: UserStrategyAllocationScalarFieldEnum | UserStrategyAllocationScalarFieldEnum[]
  }

  /**
   * UserStrategyAllocation findFirstOrThrow
   */
  export type UserStrategyAllocationFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserStrategyAllocation
     */
    select?: UserStrategyAllocationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserStrategyAllocation
     */
    omit?: UserStrategyAllocationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserStrategyAllocationInclude<ExtArgs> | null
    /**
     * Filter, which UserStrategyAllocation to fetch.
     */
    where?: UserStrategyAllocationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of UserStrategyAllocations to fetch.
     */
    orderBy?: UserStrategyAllocationOrderByWithRelationInput | UserStrategyAllocationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for UserStrategyAllocations.
     */
    cursor?: UserStrategyAllocationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` UserStrategyAllocations from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` UserStrategyAllocations.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of UserStrategyAllocations.
     */
    distinct?: UserStrategyAllocationScalarFieldEnum | UserStrategyAllocationScalarFieldEnum[]
  }

  /**
   * UserStrategyAllocation findMany
   */
  export type UserStrategyAllocationFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserStrategyAllocation
     */
    select?: UserStrategyAllocationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserStrategyAllocation
     */
    omit?: UserStrategyAllocationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserStrategyAllocationInclude<ExtArgs> | null
    /**
     * Filter, which UserStrategyAllocations to fetch.
     */
    where?: UserStrategyAllocationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of UserStrategyAllocations to fetch.
     */
    orderBy?: UserStrategyAllocationOrderByWithRelationInput | UserStrategyAllocationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing UserStrategyAllocations.
     */
    cursor?: UserStrategyAllocationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` UserStrategyAllocations from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` UserStrategyAllocations.
     */
    skip?: number
    distinct?: UserStrategyAllocationScalarFieldEnum | UserStrategyAllocationScalarFieldEnum[]
  }

  /**
   * UserStrategyAllocation create
   */
  export type UserStrategyAllocationCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserStrategyAllocation
     */
    select?: UserStrategyAllocationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserStrategyAllocation
     */
    omit?: UserStrategyAllocationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserStrategyAllocationInclude<ExtArgs> | null
    /**
     * The data needed to create a UserStrategyAllocation.
     */
    data: XOR<UserStrategyAllocationCreateInput, UserStrategyAllocationUncheckedCreateInput>
  }

  /**
   * UserStrategyAllocation createMany
   */
  export type UserStrategyAllocationCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many UserStrategyAllocations.
     */
    data: UserStrategyAllocationCreateManyInput | UserStrategyAllocationCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * UserStrategyAllocation createManyAndReturn
   */
  export type UserStrategyAllocationCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserStrategyAllocation
     */
    select?: UserStrategyAllocationSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the UserStrategyAllocation
     */
    omit?: UserStrategyAllocationOmit<ExtArgs> | null
    /**
     * The data used to create many UserStrategyAllocations.
     */
    data: UserStrategyAllocationCreateManyInput | UserStrategyAllocationCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserStrategyAllocationIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * UserStrategyAllocation update
   */
  export type UserStrategyAllocationUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserStrategyAllocation
     */
    select?: UserStrategyAllocationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserStrategyAllocation
     */
    omit?: UserStrategyAllocationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserStrategyAllocationInclude<ExtArgs> | null
    /**
     * The data needed to update a UserStrategyAllocation.
     */
    data: XOR<UserStrategyAllocationUpdateInput, UserStrategyAllocationUncheckedUpdateInput>
    /**
     * Choose, which UserStrategyAllocation to update.
     */
    where: UserStrategyAllocationWhereUniqueInput
  }

  /**
   * UserStrategyAllocation updateMany
   */
  export type UserStrategyAllocationUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update UserStrategyAllocations.
     */
    data: XOR<UserStrategyAllocationUpdateManyMutationInput, UserStrategyAllocationUncheckedUpdateManyInput>
    /**
     * Filter which UserStrategyAllocations to update
     */
    where?: UserStrategyAllocationWhereInput
    /**
     * Limit how many UserStrategyAllocations to update.
     */
    limit?: number
  }

  /**
   * UserStrategyAllocation updateManyAndReturn
   */
  export type UserStrategyAllocationUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserStrategyAllocation
     */
    select?: UserStrategyAllocationSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the UserStrategyAllocation
     */
    omit?: UserStrategyAllocationOmit<ExtArgs> | null
    /**
     * The data used to update UserStrategyAllocations.
     */
    data: XOR<UserStrategyAllocationUpdateManyMutationInput, UserStrategyAllocationUncheckedUpdateManyInput>
    /**
     * Filter which UserStrategyAllocations to update
     */
    where?: UserStrategyAllocationWhereInput
    /**
     * Limit how many UserStrategyAllocations to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserStrategyAllocationIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * UserStrategyAllocation upsert
   */
  export type UserStrategyAllocationUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserStrategyAllocation
     */
    select?: UserStrategyAllocationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserStrategyAllocation
     */
    omit?: UserStrategyAllocationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserStrategyAllocationInclude<ExtArgs> | null
    /**
     * The filter to search for the UserStrategyAllocation to update in case it exists.
     */
    where: UserStrategyAllocationWhereUniqueInput
    /**
     * In case the UserStrategyAllocation found by the `where` argument doesn't exist, create a new UserStrategyAllocation with this data.
     */
    create: XOR<UserStrategyAllocationCreateInput, UserStrategyAllocationUncheckedCreateInput>
    /**
     * In case the UserStrategyAllocation was found with the provided `where` argument, update it with this data.
     */
    update: XOR<UserStrategyAllocationUpdateInput, UserStrategyAllocationUncheckedUpdateInput>
  }

  /**
   * UserStrategyAllocation delete
   */
  export type UserStrategyAllocationDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserStrategyAllocation
     */
    select?: UserStrategyAllocationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserStrategyAllocation
     */
    omit?: UserStrategyAllocationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserStrategyAllocationInclude<ExtArgs> | null
    /**
     * Filter which UserStrategyAllocation to delete.
     */
    where: UserStrategyAllocationWhereUniqueInput
  }

  /**
   * UserStrategyAllocation deleteMany
   */
  export type UserStrategyAllocationDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which UserStrategyAllocations to delete
     */
    where?: UserStrategyAllocationWhereInput
    /**
     * Limit how many UserStrategyAllocations to delete.
     */
    limit?: number
  }

  /**
   * UserStrategyAllocation without action
   */
  export type UserStrategyAllocationDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserStrategyAllocation
     */
    select?: UserStrategyAllocationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserStrategyAllocation
     */
    omit?: UserStrategyAllocationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserStrategyAllocationInclude<ExtArgs> | null
  }


  /**
   * Enums
   */

  export const TransactionIsolationLevel: {
    ReadUncommitted: 'ReadUncommitted',
    ReadCommitted: 'ReadCommitted',
    RepeatableRead: 'RepeatableRead',
    Serializable: 'Serializable'
  };

  export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel]


  export const UserScalarFieldEnum: {
    id: 'id',
    walletAddress: 'walletAddress',
    role: 'role',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type UserScalarFieldEnum = (typeof UserScalarFieldEnum)[keyof typeof UserScalarFieldEnum]


  export const TradingHistoryScalarFieldEnum: {
    id: 'id',
    userId: 'userId',
    action: 'action',
    asset: 'asset',
    amount: 'amount',
    price: 'price',
    strategyId: 'strategyId',
    timestamp: 'timestamp'
  };

  export type TradingHistoryScalarFieldEnum = (typeof TradingHistoryScalarFieldEnum)[keyof typeof TradingHistoryScalarFieldEnum]


  export const CurrentAllocationScalarFieldEnum: {
    id: 'id',
    userId: 'userId',
    asset: 'asset',
    percentage: 'percentage',
    updatedAt: 'updatedAt'
  };

  export type CurrentAllocationScalarFieldEnum = (typeof CurrentAllocationScalarFieldEnum)[keyof typeof CurrentAllocationScalarFieldEnum]


  export const CurrentAssetScalarFieldEnum: {
    id: 'id',
    userId: 'userId',
    assetName: 'assetName',
    assetTicker: 'assetTicker',
    balance: 'balance',
    valueUSD: 'valueUSD',
    updatedAt: 'updatedAt'
  };

  export type CurrentAssetScalarFieldEnum = (typeof CurrentAssetScalarFieldEnum)[keyof typeof CurrentAssetScalarFieldEnum]


  export const StrategyScalarFieldEnum: {
    id: 'id',
    name: 'name',
    description: 'description',
    assetTicker: 'assetTicker',
    apy: 'apy',
    riskLevel: 'riskLevel',
    platform: 'platform',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type StrategyScalarFieldEnum = (typeof StrategyScalarFieldEnum)[keyof typeof StrategyScalarFieldEnum]


  export const UserStrategyAllocationScalarFieldEnum: {
    id: 'id',
    userId: 'userId',
    strategyId: 'strategyId',
    assetTicker: 'assetTicker',
    allocatedAmount: 'allocatedAmount',
    entryTimestamp: 'entryTimestamp',
    cumulativeYieldEarned: 'cumulativeYieldEarned',
    lastYieldClaimTimestamp: 'lastYieldClaimTimestamp',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type UserStrategyAllocationScalarFieldEnum = (typeof UserStrategyAllocationScalarFieldEnum)[keyof typeof UserStrategyAllocationScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  export const QueryMode: {
    default: 'default',
    insensitive: 'insensitive'
  };

  export type QueryMode = (typeof QueryMode)[keyof typeof QueryMode]


  export const NullsOrder: {
    first: 'first',
    last: 'last'
  };

  export type NullsOrder = (typeof NullsOrder)[keyof typeof NullsOrder]


  /**
   * Field references
   */


  /**
   * Reference to a field of type 'String'
   */
  export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String'>
    


  /**
   * Reference to a field of type 'String[]'
   */
  export type ListStringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String[]'>
    


  /**
   * Reference to a field of type 'UserRole'
   */
  export type EnumUserRoleFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'UserRole'>
    


  /**
   * Reference to a field of type 'UserRole[]'
   */
  export type ListEnumUserRoleFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'UserRole[]'>
    


  /**
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>
    


  /**
   * Reference to a field of type 'DateTime[]'
   */
  export type ListDateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime[]'>
    


  /**
   * Reference to a field of type 'Float'
   */
  export type FloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float'>
    


  /**
   * Reference to a field of type 'Float[]'
   */
  export type ListFloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float[]'>
    


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'Int[]'
   */
  export type ListIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int[]'>
    
  /**
   * Deep Input Types
   */


  export type UserWhereInput = {
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    id?: StringFilter<"User"> | string
    walletAddress?: StringFilter<"User"> | string
    role?: EnumUserRoleFilter<"User"> | $Enums.UserRole
    createdAt?: DateTimeFilter<"User"> | Date | string
    updatedAt?: DateTimeFilter<"User"> | Date | string
    tradingHistory?: TradingHistoryListRelationFilter
    currentAllocations?: CurrentAllocationListRelationFilter
    currentAssets?: CurrentAssetListRelationFilter
    userStrategyAllocations?: UserStrategyAllocationListRelationFilter
  }

  export type UserOrderByWithRelationInput = {
    id?: SortOrder
    walletAddress?: SortOrder
    role?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    tradingHistory?: TradingHistoryOrderByRelationAggregateInput
    currentAllocations?: CurrentAllocationOrderByRelationAggregateInput
    currentAssets?: CurrentAssetOrderByRelationAggregateInput
    userStrategyAllocations?: UserStrategyAllocationOrderByRelationAggregateInput
  }

  export type UserWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    walletAddress?: string
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    role?: EnumUserRoleFilter<"User"> | $Enums.UserRole
    createdAt?: DateTimeFilter<"User"> | Date | string
    updatedAt?: DateTimeFilter<"User"> | Date | string
    tradingHistory?: TradingHistoryListRelationFilter
    currentAllocations?: CurrentAllocationListRelationFilter
    currentAssets?: CurrentAssetListRelationFilter
    userStrategyAllocations?: UserStrategyAllocationListRelationFilter
  }, "id" | "walletAddress">

  export type UserOrderByWithAggregationInput = {
    id?: SortOrder
    walletAddress?: SortOrder
    role?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: UserCountOrderByAggregateInput
    _max?: UserMaxOrderByAggregateInput
    _min?: UserMinOrderByAggregateInput
  }

  export type UserScalarWhereWithAggregatesInput = {
    AND?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    OR?: UserScalarWhereWithAggregatesInput[]
    NOT?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"User"> | string
    walletAddress?: StringWithAggregatesFilter<"User"> | string
    role?: EnumUserRoleWithAggregatesFilter<"User"> | $Enums.UserRole
    createdAt?: DateTimeWithAggregatesFilter<"User"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"User"> | Date | string
  }

  export type TradingHistoryWhereInput = {
    AND?: TradingHistoryWhereInput | TradingHistoryWhereInput[]
    OR?: TradingHistoryWhereInput[]
    NOT?: TradingHistoryWhereInput | TradingHistoryWhereInput[]
    id?: StringFilter<"TradingHistory"> | string
    userId?: StringFilter<"TradingHistory"> | string
    action?: StringFilter<"TradingHistory"> | string
    asset?: StringFilter<"TradingHistory"> | string
    amount?: FloatFilter<"TradingHistory"> | number
    price?: FloatNullableFilter<"TradingHistory"> | number | null
    strategyId?: StringNullableFilter<"TradingHistory"> | string | null
    timestamp?: DateTimeFilter<"TradingHistory"> | Date | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
    strategy?: XOR<StrategyNullableScalarRelationFilter, StrategyWhereInput> | null
  }

  export type TradingHistoryOrderByWithRelationInput = {
    id?: SortOrder
    userId?: SortOrder
    action?: SortOrder
    asset?: SortOrder
    amount?: SortOrder
    price?: SortOrderInput | SortOrder
    strategyId?: SortOrderInput | SortOrder
    timestamp?: SortOrder
    user?: UserOrderByWithRelationInput
    strategy?: StrategyOrderByWithRelationInput
  }

  export type TradingHistoryWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: TradingHistoryWhereInput | TradingHistoryWhereInput[]
    OR?: TradingHistoryWhereInput[]
    NOT?: TradingHistoryWhereInput | TradingHistoryWhereInput[]
    userId?: StringFilter<"TradingHistory"> | string
    action?: StringFilter<"TradingHistory"> | string
    asset?: StringFilter<"TradingHistory"> | string
    amount?: FloatFilter<"TradingHistory"> | number
    price?: FloatNullableFilter<"TradingHistory"> | number | null
    strategyId?: StringNullableFilter<"TradingHistory"> | string | null
    timestamp?: DateTimeFilter<"TradingHistory"> | Date | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
    strategy?: XOR<StrategyNullableScalarRelationFilter, StrategyWhereInput> | null
  }, "id">

  export type TradingHistoryOrderByWithAggregationInput = {
    id?: SortOrder
    userId?: SortOrder
    action?: SortOrder
    asset?: SortOrder
    amount?: SortOrder
    price?: SortOrderInput | SortOrder
    strategyId?: SortOrderInput | SortOrder
    timestamp?: SortOrder
    _count?: TradingHistoryCountOrderByAggregateInput
    _avg?: TradingHistoryAvgOrderByAggregateInput
    _max?: TradingHistoryMaxOrderByAggregateInput
    _min?: TradingHistoryMinOrderByAggregateInput
    _sum?: TradingHistorySumOrderByAggregateInput
  }

  export type TradingHistoryScalarWhereWithAggregatesInput = {
    AND?: TradingHistoryScalarWhereWithAggregatesInput | TradingHistoryScalarWhereWithAggregatesInput[]
    OR?: TradingHistoryScalarWhereWithAggregatesInput[]
    NOT?: TradingHistoryScalarWhereWithAggregatesInput | TradingHistoryScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"TradingHistory"> | string
    userId?: StringWithAggregatesFilter<"TradingHistory"> | string
    action?: StringWithAggregatesFilter<"TradingHistory"> | string
    asset?: StringWithAggregatesFilter<"TradingHistory"> | string
    amount?: FloatWithAggregatesFilter<"TradingHistory"> | number
    price?: FloatNullableWithAggregatesFilter<"TradingHistory"> | number | null
    strategyId?: StringNullableWithAggregatesFilter<"TradingHistory"> | string | null
    timestamp?: DateTimeWithAggregatesFilter<"TradingHistory"> | Date | string
  }

  export type CurrentAllocationWhereInput = {
    AND?: CurrentAllocationWhereInput | CurrentAllocationWhereInput[]
    OR?: CurrentAllocationWhereInput[]
    NOT?: CurrentAllocationWhereInput | CurrentAllocationWhereInput[]
    id?: StringFilter<"CurrentAllocation"> | string
    userId?: StringFilter<"CurrentAllocation"> | string
    asset?: StringFilter<"CurrentAllocation"> | string
    percentage?: FloatFilter<"CurrentAllocation"> | number
    updatedAt?: DateTimeFilter<"CurrentAllocation"> | Date | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }

  export type CurrentAllocationOrderByWithRelationInput = {
    id?: SortOrder
    userId?: SortOrder
    asset?: SortOrder
    percentage?: SortOrder
    updatedAt?: SortOrder
    user?: UserOrderByWithRelationInput
  }

  export type CurrentAllocationWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    userId_asset?: CurrentAllocationUserIdAssetCompoundUniqueInput
    AND?: CurrentAllocationWhereInput | CurrentAllocationWhereInput[]
    OR?: CurrentAllocationWhereInput[]
    NOT?: CurrentAllocationWhereInput | CurrentAllocationWhereInput[]
    userId?: StringFilter<"CurrentAllocation"> | string
    asset?: StringFilter<"CurrentAllocation"> | string
    percentage?: FloatFilter<"CurrentAllocation"> | number
    updatedAt?: DateTimeFilter<"CurrentAllocation"> | Date | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }, "id" | "userId_asset">

  export type CurrentAllocationOrderByWithAggregationInput = {
    id?: SortOrder
    userId?: SortOrder
    asset?: SortOrder
    percentage?: SortOrder
    updatedAt?: SortOrder
    _count?: CurrentAllocationCountOrderByAggregateInput
    _avg?: CurrentAllocationAvgOrderByAggregateInput
    _max?: CurrentAllocationMaxOrderByAggregateInput
    _min?: CurrentAllocationMinOrderByAggregateInput
    _sum?: CurrentAllocationSumOrderByAggregateInput
  }

  export type CurrentAllocationScalarWhereWithAggregatesInput = {
    AND?: CurrentAllocationScalarWhereWithAggregatesInput | CurrentAllocationScalarWhereWithAggregatesInput[]
    OR?: CurrentAllocationScalarWhereWithAggregatesInput[]
    NOT?: CurrentAllocationScalarWhereWithAggregatesInput | CurrentAllocationScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"CurrentAllocation"> | string
    userId?: StringWithAggregatesFilter<"CurrentAllocation"> | string
    asset?: StringWithAggregatesFilter<"CurrentAllocation"> | string
    percentage?: FloatWithAggregatesFilter<"CurrentAllocation"> | number
    updatedAt?: DateTimeWithAggregatesFilter<"CurrentAllocation"> | Date | string
  }

  export type CurrentAssetWhereInput = {
    AND?: CurrentAssetWhereInput | CurrentAssetWhereInput[]
    OR?: CurrentAssetWhereInput[]
    NOT?: CurrentAssetWhereInput | CurrentAssetWhereInput[]
    id?: StringFilter<"CurrentAsset"> | string
    userId?: StringFilter<"CurrentAsset"> | string
    assetName?: StringFilter<"CurrentAsset"> | string
    assetTicker?: StringFilter<"CurrentAsset"> | string
    balance?: FloatFilter<"CurrentAsset"> | number
    valueUSD?: FloatNullableFilter<"CurrentAsset"> | number | null
    updatedAt?: DateTimeFilter<"CurrentAsset"> | Date | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }

  export type CurrentAssetOrderByWithRelationInput = {
    id?: SortOrder
    userId?: SortOrder
    assetName?: SortOrder
    assetTicker?: SortOrder
    balance?: SortOrder
    valueUSD?: SortOrderInput | SortOrder
    updatedAt?: SortOrder
    user?: UserOrderByWithRelationInput
  }

  export type CurrentAssetWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    userId_assetTicker?: CurrentAssetUserIdAssetTickerCompoundUniqueInput
    AND?: CurrentAssetWhereInput | CurrentAssetWhereInput[]
    OR?: CurrentAssetWhereInput[]
    NOT?: CurrentAssetWhereInput | CurrentAssetWhereInput[]
    userId?: StringFilter<"CurrentAsset"> | string
    assetName?: StringFilter<"CurrentAsset"> | string
    assetTicker?: StringFilter<"CurrentAsset"> | string
    balance?: FloatFilter<"CurrentAsset"> | number
    valueUSD?: FloatNullableFilter<"CurrentAsset"> | number | null
    updatedAt?: DateTimeFilter<"CurrentAsset"> | Date | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }, "id" | "userId_assetTicker">

  export type CurrentAssetOrderByWithAggregationInput = {
    id?: SortOrder
    userId?: SortOrder
    assetName?: SortOrder
    assetTicker?: SortOrder
    balance?: SortOrder
    valueUSD?: SortOrderInput | SortOrder
    updatedAt?: SortOrder
    _count?: CurrentAssetCountOrderByAggregateInput
    _avg?: CurrentAssetAvgOrderByAggregateInput
    _max?: CurrentAssetMaxOrderByAggregateInput
    _min?: CurrentAssetMinOrderByAggregateInput
    _sum?: CurrentAssetSumOrderByAggregateInput
  }

  export type CurrentAssetScalarWhereWithAggregatesInput = {
    AND?: CurrentAssetScalarWhereWithAggregatesInput | CurrentAssetScalarWhereWithAggregatesInput[]
    OR?: CurrentAssetScalarWhereWithAggregatesInput[]
    NOT?: CurrentAssetScalarWhereWithAggregatesInput | CurrentAssetScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"CurrentAsset"> | string
    userId?: StringWithAggregatesFilter<"CurrentAsset"> | string
    assetName?: StringWithAggregatesFilter<"CurrentAsset"> | string
    assetTicker?: StringWithAggregatesFilter<"CurrentAsset"> | string
    balance?: FloatWithAggregatesFilter<"CurrentAsset"> | number
    valueUSD?: FloatNullableWithAggregatesFilter<"CurrentAsset"> | number | null
    updatedAt?: DateTimeWithAggregatesFilter<"CurrentAsset"> | Date | string
  }

  export type StrategyWhereInput = {
    AND?: StrategyWhereInput | StrategyWhereInput[]
    OR?: StrategyWhereInput[]
    NOT?: StrategyWhereInput | StrategyWhereInput[]
    id?: StringFilter<"Strategy"> | string
    name?: StringFilter<"Strategy"> | string
    description?: StringNullableFilter<"Strategy"> | string | null
    assetTicker?: StringFilter<"Strategy"> | string
    apy?: FloatFilter<"Strategy"> | number
    riskLevel?: StringFilter<"Strategy"> | string
    platform?: StringNullableFilter<"Strategy"> | string | null
    createdAt?: DateTimeFilter<"Strategy"> | Date | string
    updatedAt?: DateTimeFilter<"Strategy"> | Date | string
    userAllocations?: UserStrategyAllocationListRelationFilter
    tradingEvents?: TradingHistoryListRelationFilter
  }

  export type StrategyOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
    description?: SortOrderInput | SortOrder
    assetTicker?: SortOrder
    apy?: SortOrder
    riskLevel?: SortOrder
    platform?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    userAllocations?: UserStrategyAllocationOrderByRelationAggregateInput
    tradingEvents?: TradingHistoryOrderByRelationAggregateInput
  }

  export type StrategyWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    name?: string
    AND?: StrategyWhereInput | StrategyWhereInput[]
    OR?: StrategyWhereInput[]
    NOT?: StrategyWhereInput | StrategyWhereInput[]
    description?: StringNullableFilter<"Strategy"> | string | null
    assetTicker?: StringFilter<"Strategy"> | string
    apy?: FloatFilter<"Strategy"> | number
    riskLevel?: StringFilter<"Strategy"> | string
    platform?: StringNullableFilter<"Strategy"> | string | null
    createdAt?: DateTimeFilter<"Strategy"> | Date | string
    updatedAt?: DateTimeFilter<"Strategy"> | Date | string
    userAllocations?: UserStrategyAllocationListRelationFilter
    tradingEvents?: TradingHistoryListRelationFilter
  }, "id" | "name">

  export type StrategyOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrder
    description?: SortOrderInput | SortOrder
    assetTicker?: SortOrder
    apy?: SortOrder
    riskLevel?: SortOrder
    platform?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: StrategyCountOrderByAggregateInput
    _avg?: StrategyAvgOrderByAggregateInput
    _max?: StrategyMaxOrderByAggregateInput
    _min?: StrategyMinOrderByAggregateInput
    _sum?: StrategySumOrderByAggregateInput
  }

  export type StrategyScalarWhereWithAggregatesInput = {
    AND?: StrategyScalarWhereWithAggregatesInput | StrategyScalarWhereWithAggregatesInput[]
    OR?: StrategyScalarWhereWithAggregatesInput[]
    NOT?: StrategyScalarWhereWithAggregatesInput | StrategyScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Strategy"> | string
    name?: StringWithAggregatesFilter<"Strategy"> | string
    description?: StringNullableWithAggregatesFilter<"Strategy"> | string | null
    assetTicker?: StringWithAggregatesFilter<"Strategy"> | string
    apy?: FloatWithAggregatesFilter<"Strategy"> | number
    riskLevel?: StringWithAggregatesFilter<"Strategy"> | string
    platform?: StringNullableWithAggregatesFilter<"Strategy"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"Strategy"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Strategy"> | Date | string
  }

  export type UserStrategyAllocationWhereInput = {
    AND?: UserStrategyAllocationWhereInput | UserStrategyAllocationWhereInput[]
    OR?: UserStrategyAllocationWhereInput[]
    NOT?: UserStrategyAllocationWhereInput | UserStrategyAllocationWhereInput[]
    id?: StringFilter<"UserStrategyAllocation"> | string
    userId?: StringFilter<"UserStrategyAllocation"> | string
    strategyId?: StringFilter<"UserStrategyAllocation"> | string
    assetTicker?: StringFilter<"UserStrategyAllocation"> | string
    allocatedAmount?: FloatFilter<"UserStrategyAllocation"> | number
    entryTimestamp?: DateTimeFilter<"UserStrategyAllocation"> | Date | string
    cumulativeYieldEarned?: FloatFilter<"UserStrategyAllocation"> | number
    lastYieldClaimTimestamp?: DateTimeNullableFilter<"UserStrategyAllocation"> | Date | string | null
    createdAt?: DateTimeFilter<"UserStrategyAllocation"> | Date | string
    updatedAt?: DateTimeFilter<"UserStrategyAllocation"> | Date | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
    strategy?: XOR<StrategyScalarRelationFilter, StrategyWhereInput>
  }

  export type UserStrategyAllocationOrderByWithRelationInput = {
    id?: SortOrder
    userId?: SortOrder
    strategyId?: SortOrder
    assetTicker?: SortOrder
    allocatedAmount?: SortOrder
    entryTimestamp?: SortOrder
    cumulativeYieldEarned?: SortOrder
    lastYieldClaimTimestamp?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    user?: UserOrderByWithRelationInput
    strategy?: StrategyOrderByWithRelationInput
  }

  export type UserStrategyAllocationWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    userId_strategyId_assetTicker?: UserStrategyAllocationUserIdStrategyIdAssetTickerCompoundUniqueInput
    AND?: UserStrategyAllocationWhereInput | UserStrategyAllocationWhereInput[]
    OR?: UserStrategyAllocationWhereInput[]
    NOT?: UserStrategyAllocationWhereInput | UserStrategyAllocationWhereInput[]
    userId?: StringFilter<"UserStrategyAllocation"> | string
    strategyId?: StringFilter<"UserStrategyAllocation"> | string
    assetTicker?: StringFilter<"UserStrategyAllocation"> | string
    allocatedAmount?: FloatFilter<"UserStrategyAllocation"> | number
    entryTimestamp?: DateTimeFilter<"UserStrategyAllocation"> | Date | string
    cumulativeYieldEarned?: FloatFilter<"UserStrategyAllocation"> | number
    lastYieldClaimTimestamp?: DateTimeNullableFilter<"UserStrategyAllocation"> | Date | string | null
    createdAt?: DateTimeFilter<"UserStrategyAllocation"> | Date | string
    updatedAt?: DateTimeFilter<"UserStrategyAllocation"> | Date | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
    strategy?: XOR<StrategyScalarRelationFilter, StrategyWhereInput>
  }, "id" | "userId_strategyId_assetTicker">

  export type UserStrategyAllocationOrderByWithAggregationInput = {
    id?: SortOrder
    userId?: SortOrder
    strategyId?: SortOrder
    assetTicker?: SortOrder
    allocatedAmount?: SortOrder
    entryTimestamp?: SortOrder
    cumulativeYieldEarned?: SortOrder
    lastYieldClaimTimestamp?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: UserStrategyAllocationCountOrderByAggregateInput
    _avg?: UserStrategyAllocationAvgOrderByAggregateInput
    _max?: UserStrategyAllocationMaxOrderByAggregateInput
    _min?: UserStrategyAllocationMinOrderByAggregateInput
    _sum?: UserStrategyAllocationSumOrderByAggregateInput
  }

  export type UserStrategyAllocationScalarWhereWithAggregatesInput = {
    AND?: UserStrategyAllocationScalarWhereWithAggregatesInput | UserStrategyAllocationScalarWhereWithAggregatesInput[]
    OR?: UserStrategyAllocationScalarWhereWithAggregatesInput[]
    NOT?: UserStrategyAllocationScalarWhereWithAggregatesInput | UserStrategyAllocationScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"UserStrategyAllocation"> | string
    userId?: StringWithAggregatesFilter<"UserStrategyAllocation"> | string
    strategyId?: StringWithAggregatesFilter<"UserStrategyAllocation"> | string
    assetTicker?: StringWithAggregatesFilter<"UserStrategyAllocation"> | string
    allocatedAmount?: FloatWithAggregatesFilter<"UserStrategyAllocation"> | number
    entryTimestamp?: DateTimeWithAggregatesFilter<"UserStrategyAllocation"> | Date | string
    cumulativeYieldEarned?: FloatWithAggregatesFilter<"UserStrategyAllocation"> | number
    lastYieldClaimTimestamp?: DateTimeNullableWithAggregatesFilter<"UserStrategyAllocation"> | Date | string | null
    createdAt?: DateTimeWithAggregatesFilter<"UserStrategyAllocation"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"UserStrategyAllocation"> | Date | string
  }

  export type UserCreateInput = {
    id?: string
    walletAddress: string
    role?: $Enums.UserRole
    createdAt?: Date | string
    updatedAt?: Date | string
    tradingHistory?: TradingHistoryCreateNestedManyWithoutUserInput
    currentAllocations?: CurrentAllocationCreateNestedManyWithoutUserInput
    currentAssets?: CurrentAssetCreateNestedManyWithoutUserInput
    userStrategyAllocations?: UserStrategyAllocationCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateInput = {
    id?: string
    walletAddress: string
    role?: $Enums.UserRole
    createdAt?: Date | string
    updatedAt?: Date | string
    tradingHistory?: TradingHistoryUncheckedCreateNestedManyWithoutUserInput
    currentAllocations?: CurrentAllocationUncheckedCreateNestedManyWithoutUserInput
    currentAssets?: CurrentAssetUncheckedCreateNestedManyWithoutUserInput
    userStrategyAllocations?: UserStrategyAllocationUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    walletAddress?: StringFieldUpdateOperationsInput | string
    role?: EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    tradingHistory?: TradingHistoryUpdateManyWithoutUserNestedInput
    currentAllocations?: CurrentAllocationUpdateManyWithoutUserNestedInput
    currentAssets?: CurrentAssetUpdateManyWithoutUserNestedInput
    userStrategyAllocations?: UserStrategyAllocationUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    walletAddress?: StringFieldUpdateOperationsInput | string
    role?: EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    tradingHistory?: TradingHistoryUncheckedUpdateManyWithoutUserNestedInput
    currentAllocations?: CurrentAllocationUncheckedUpdateManyWithoutUserNestedInput
    currentAssets?: CurrentAssetUncheckedUpdateManyWithoutUserNestedInput
    userStrategyAllocations?: UserStrategyAllocationUncheckedUpdateManyWithoutUserNestedInput
  }

  export type UserCreateManyInput = {
    id?: string
    walletAddress: string
    role?: $Enums.UserRole
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type UserUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    walletAddress?: StringFieldUpdateOperationsInput | string
    role?: EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    walletAddress?: StringFieldUpdateOperationsInput | string
    role?: EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TradingHistoryCreateInput = {
    id?: string
    action: string
    asset: string
    amount: number
    price?: number | null
    timestamp?: Date | string
    user: UserCreateNestedOneWithoutTradingHistoryInput
    strategy?: StrategyCreateNestedOneWithoutTradingEventsInput
  }

  export type TradingHistoryUncheckedCreateInput = {
    id?: string
    userId: string
    action: string
    asset: string
    amount: number
    price?: number | null
    strategyId?: string | null
    timestamp?: Date | string
  }

  export type TradingHistoryUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    action?: StringFieldUpdateOperationsInput | string
    asset?: StringFieldUpdateOperationsInput | string
    amount?: FloatFieldUpdateOperationsInput | number
    price?: NullableFloatFieldUpdateOperationsInput | number | null
    timestamp?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutTradingHistoryNestedInput
    strategy?: StrategyUpdateOneWithoutTradingEventsNestedInput
  }

  export type TradingHistoryUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    action?: StringFieldUpdateOperationsInput | string
    asset?: StringFieldUpdateOperationsInput | string
    amount?: FloatFieldUpdateOperationsInput | number
    price?: NullableFloatFieldUpdateOperationsInput | number | null
    strategyId?: NullableStringFieldUpdateOperationsInput | string | null
    timestamp?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TradingHistoryCreateManyInput = {
    id?: string
    userId: string
    action: string
    asset: string
    amount: number
    price?: number | null
    strategyId?: string | null
    timestamp?: Date | string
  }

  export type TradingHistoryUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    action?: StringFieldUpdateOperationsInput | string
    asset?: StringFieldUpdateOperationsInput | string
    amount?: FloatFieldUpdateOperationsInput | number
    price?: NullableFloatFieldUpdateOperationsInput | number | null
    timestamp?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TradingHistoryUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    action?: StringFieldUpdateOperationsInput | string
    asset?: StringFieldUpdateOperationsInput | string
    amount?: FloatFieldUpdateOperationsInput | number
    price?: NullableFloatFieldUpdateOperationsInput | number | null
    strategyId?: NullableStringFieldUpdateOperationsInput | string | null
    timestamp?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CurrentAllocationCreateInput = {
    id?: string
    asset: string
    percentage: number
    updatedAt?: Date | string
    user: UserCreateNestedOneWithoutCurrentAllocationsInput
  }

  export type CurrentAllocationUncheckedCreateInput = {
    id?: string
    userId: string
    asset: string
    percentage: number
    updatedAt?: Date | string
  }

  export type CurrentAllocationUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    asset?: StringFieldUpdateOperationsInput | string
    percentage?: FloatFieldUpdateOperationsInput | number
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutCurrentAllocationsNestedInput
  }

  export type CurrentAllocationUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    asset?: StringFieldUpdateOperationsInput | string
    percentage?: FloatFieldUpdateOperationsInput | number
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CurrentAllocationCreateManyInput = {
    id?: string
    userId: string
    asset: string
    percentage: number
    updatedAt?: Date | string
  }

  export type CurrentAllocationUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    asset?: StringFieldUpdateOperationsInput | string
    percentage?: FloatFieldUpdateOperationsInput | number
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CurrentAllocationUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    asset?: StringFieldUpdateOperationsInput | string
    percentage?: FloatFieldUpdateOperationsInput | number
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CurrentAssetCreateInput = {
    id?: string
    assetName: string
    assetTicker: string
    balance: number
    valueUSD?: number | null
    updatedAt?: Date | string
    user: UserCreateNestedOneWithoutCurrentAssetsInput
  }

  export type CurrentAssetUncheckedCreateInput = {
    id?: string
    userId: string
    assetName: string
    assetTicker: string
    balance: number
    valueUSD?: number | null
    updatedAt?: Date | string
  }

  export type CurrentAssetUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    assetName?: StringFieldUpdateOperationsInput | string
    assetTicker?: StringFieldUpdateOperationsInput | string
    balance?: FloatFieldUpdateOperationsInput | number
    valueUSD?: NullableFloatFieldUpdateOperationsInput | number | null
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutCurrentAssetsNestedInput
  }

  export type CurrentAssetUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    assetName?: StringFieldUpdateOperationsInput | string
    assetTicker?: StringFieldUpdateOperationsInput | string
    balance?: FloatFieldUpdateOperationsInput | number
    valueUSD?: NullableFloatFieldUpdateOperationsInput | number | null
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CurrentAssetCreateManyInput = {
    id?: string
    userId: string
    assetName: string
    assetTicker: string
    balance: number
    valueUSD?: number | null
    updatedAt?: Date | string
  }

  export type CurrentAssetUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    assetName?: StringFieldUpdateOperationsInput | string
    assetTicker?: StringFieldUpdateOperationsInput | string
    balance?: FloatFieldUpdateOperationsInput | number
    valueUSD?: NullableFloatFieldUpdateOperationsInput | number | null
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CurrentAssetUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    assetName?: StringFieldUpdateOperationsInput | string
    assetTicker?: StringFieldUpdateOperationsInput | string
    balance?: FloatFieldUpdateOperationsInput | number
    valueUSD?: NullableFloatFieldUpdateOperationsInput | number | null
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type StrategyCreateInput = {
    id?: string
    name: string
    description?: string | null
    assetTicker: string
    apy: number
    riskLevel: string
    platform?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    userAllocations?: UserStrategyAllocationCreateNestedManyWithoutStrategyInput
    tradingEvents?: TradingHistoryCreateNestedManyWithoutStrategyInput
  }

  export type StrategyUncheckedCreateInput = {
    id?: string
    name: string
    description?: string | null
    assetTicker: string
    apy: number
    riskLevel: string
    platform?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    userAllocations?: UserStrategyAllocationUncheckedCreateNestedManyWithoutStrategyInput
    tradingEvents?: TradingHistoryUncheckedCreateNestedManyWithoutStrategyInput
  }

  export type StrategyUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    assetTicker?: StringFieldUpdateOperationsInput | string
    apy?: FloatFieldUpdateOperationsInput | number
    riskLevel?: StringFieldUpdateOperationsInput | string
    platform?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    userAllocations?: UserStrategyAllocationUpdateManyWithoutStrategyNestedInput
    tradingEvents?: TradingHistoryUpdateManyWithoutStrategyNestedInput
  }

  export type StrategyUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    assetTicker?: StringFieldUpdateOperationsInput | string
    apy?: FloatFieldUpdateOperationsInput | number
    riskLevel?: StringFieldUpdateOperationsInput | string
    platform?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    userAllocations?: UserStrategyAllocationUncheckedUpdateManyWithoutStrategyNestedInput
    tradingEvents?: TradingHistoryUncheckedUpdateManyWithoutStrategyNestedInput
  }

  export type StrategyCreateManyInput = {
    id?: string
    name: string
    description?: string | null
    assetTicker: string
    apy: number
    riskLevel: string
    platform?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type StrategyUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    assetTicker?: StringFieldUpdateOperationsInput | string
    apy?: FloatFieldUpdateOperationsInput | number
    riskLevel?: StringFieldUpdateOperationsInput | string
    platform?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type StrategyUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    assetTicker?: StringFieldUpdateOperationsInput | string
    apy?: FloatFieldUpdateOperationsInput | number
    riskLevel?: StringFieldUpdateOperationsInput | string
    platform?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserStrategyAllocationCreateInput = {
    id?: string
    assetTicker: string
    allocatedAmount: number
    entryTimestamp?: Date | string
    cumulativeYieldEarned?: number
    lastYieldClaimTimestamp?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    user: UserCreateNestedOneWithoutUserStrategyAllocationsInput
    strategy: StrategyCreateNestedOneWithoutUserAllocationsInput
  }

  export type UserStrategyAllocationUncheckedCreateInput = {
    id?: string
    userId: string
    strategyId: string
    assetTicker: string
    allocatedAmount: number
    entryTimestamp?: Date | string
    cumulativeYieldEarned?: number
    lastYieldClaimTimestamp?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type UserStrategyAllocationUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    assetTicker?: StringFieldUpdateOperationsInput | string
    allocatedAmount?: FloatFieldUpdateOperationsInput | number
    entryTimestamp?: DateTimeFieldUpdateOperationsInput | Date | string
    cumulativeYieldEarned?: FloatFieldUpdateOperationsInput | number
    lastYieldClaimTimestamp?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutUserStrategyAllocationsNestedInput
    strategy?: StrategyUpdateOneRequiredWithoutUserAllocationsNestedInput
  }

  export type UserStrategyAllocationUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    strategyId?: StringFieldUpdateOperationsInput | string
    assetTicker?: StringFieldUpdateOperationsInput | string
    allocatedAmount?: FloatFieldUpdateOperationsInput | number
    entryTimestamp?: DateTimeFieldUpdateOperationsInput | Date | string
    cumulativeYieldEarned?: FloatFieldUpdateOperationsInput | number
    lastYieldClaimTimestamp?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserStrategyAllocationCreateManyInput = {
    id?: string
    userId: string
    strategyId: string
    assetTicker: string
    allocatedAmount: number
    entryTimestamp?: Date | string
    cumulativeYieldEarned?: number
    lastYieldClaimTimestamp?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type UserStrategyAllocationUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    assetTicker?: StringFieldUpdateOperationsInput | string
    allocatedAmount?: FloatFieldUpdateOperationsInput | number
    entryTimestamp?: DateTimeFieldUpdateOperationsInput | Date | string
    cumulativeYieldEarned?: FloatFieldUpdateOperationsInput | number
    lastYieldClaimTimestamp?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserStrategyAllocationUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    strategyId?: StringFieldUpdateOperationsInput | string
    assetTicker?: StringFieldUpdateOperationsInput | string
    allocatedAmount?: FloatFieldUpdateOperationsInput | number
    entryTimestamp?: DateTimeFieldUpdateOperationsInput | Date | string
    cumulativeYieldEarned?: FloatFieldUpdateOperationsInput | number
    lastYieldClaimTimestamp?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type StringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type EnumUserRoleFilter<$PrismaModel = never> = {
    equals?: $Enums.UserRole | EnumUserRoleFieldRefInput<$PrismaModel>
    in?: $Enums.UserRole[] | ListEnumUserRoleFieldRefInput<$PrismaModel>
    notIn?: $Enums.UserRole[] | ListEnumUserRoleFieldRefInput<$PrismaModel>
    not?: NestedEnumUserRoleFilter<$PrismaModel> | $Enums.UserRole
  }

  export type DateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type TradingHistoryListRelationFilter = {
    every?: TradingHistoryWhereInput
    some?: TradingHistoryWhereInput
    none?: TradingHistoryWhereInput
  }

  export type CurrentAllocationListRelationFilter = {
    every?: CurrentAllocationWhereInput
    some?: CurrentAllocationWhereInput
    none?: CurrentAllocationWhereInput
  }

  export type CurrentAssetListRelationFilter = {
    every?: CurrentAssetWhereInput
    some?: CurrentAssetWhereInput
    none?: CurrentAssetWhereInput
  }

  export type UserStrategyAllocationListRelationFilter = {
    every?: UserStrategyAllocationWhereInput
    some?: UserStrategyAllocationWhereInput
    none?: UserStrategyAllocationWhereInput
  }

  export type TradingHistoryOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type CurrentAllocationOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type CurrentAssetOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type UserStrategyAllocationOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type UserCountOrderByAggregateInput = {
    id?: SortOrder
    walletAddress?: SortOrder
    role?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type UserMaxOrderByAggregateInput = {
    id?: SortOrder
    walletAddress?: SortOrder
    role?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type UserMinOrderByAggregateInput = {
    id?: SortOrder
    walletAddress?: SortOrder
    role?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type StringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type EnumUserRoleWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.UserRole | EnumUserRoleFieldRefInput<$PrismaModel>
    in?: $Enums.UserRole[] | ListEnumUserRoleFieldRefInput<$PrismaModel>
    notIn?: $Enums.UserRole[] | ListEnumUserRoleFieldRefInput<$PrismaModel>
    not?: NestedEnumUserRoleWithAggregatesFilter<$PrismaModel> | $Enums.UserRole
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumUserRoleFilter<$PrismaModel>
    _max?: NestedEnumUserRoleFilter<$PrismaModel>
  }

  export type DateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type FloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type FloatNullableFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableFilter<$PrismaModel> | number | null
  }

  export type StringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type UserScalarRelationFilter = {
    is?: UserWhereInput
    isNot?: UserWhereInput
  }

  export type StrategyNullableScalarRelationFilter = {
    is?: StrategyWhereInput | null
    isNot?: StrategyWhereInput | null
  }

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type TradingHistoryCountOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    action?: SortOrder
    asset?: SortOrder
    amount?: SortOrder
    price?: SortOrder
    strategyId?: SortOrder
    timestamp?: SortOrder
  }

  export type TradingHistoryAvgOrderByAggregateInput = {
    amount?: SortOrder
    price?: SortOrder
  }

  export type TradingHistoryMaxOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    action?: SortOrder
    asset?: SortOrder
    amount?: SortOrder
    price?: SortOrder
    strategyId?: SortOrder
    timestamp?: SortOrder
  }

  export type TradingHistoryMinOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    action?: SortOrder
    asset?: SortOrder
    amount?: SortOrder
    price?: SortOrder
    strategyId?: SortOrder
    timestamp?: SortOrder
  }

  export type TradingHistorySumOrderByAggregateInput = {
    amount?: SortOrder
    price?: SortOrder
  }

  export type FloatWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedFloatFilter<$PrismaModel>
    _min?: NestedFloatFilter<$PrismaModel>
    _max?: NestedFloatFilter<$PrismaModel>
  }

  export type FloatNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedFloatNullableFilter<$PrismaModel>
    _min?: NestedFloatNullableFilter<$PrismaModel>
    _max?: NestedFloatNullableFilter<$PrismaModel>
  }

  export type StringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type CurrentAllocationUserIdAssetCompoundUniqueInput = {
    userId: string
    asset: string
  }

  export type CurrentAllocationCountOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    asset?: SortOrder
    percentage?: SortOrder
    updatedAt?: SortOrder
  }

  export type CurrentAllocationAvgOrderByAggregateInput = {
    percentage?: SortOrder
  }

  export type CurrentAllocationMaxOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    asset?: SortOrder
    percentage?: SortOrder
    updatedAt?: SortOrder
  }

  export type CurrentAllocationMinOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    asset?: SortOrder
    percentage?: SortOrder
    updatedAt?: SortOrder
  }

  export type CurrentAllocationSumOrderByAggregateInput = {
    percentage?: SortOrder
  }

  export type CurrentAssetUserIdAssetTickerCompoundUniqueInput = {
    userId: string
    assetTicker: string
  }

  export type CurrentAssetCountOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    assetName?: SortOrder
    assetTicker?: SortOrder
    balance?: SortOrder
    valueUSD?: SortOrder
    updatedAt?: SortOrder
  }

  export type CurrentAssetAvgOrderByAggregateInput = {
    balance?: SortOrder
    valueUSD?: SortOrder
  }

  export type CurrentAssetMaxOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    assetName?: SortOrder
    assetTicker?: SortOrder
    balance?: SortOrder
    valueUSD?: SortOrder
    updatedAt?: SortOrder
  }

  export type CurrentAssetMinOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    assetName?: SortOrder
    assetTicker?: SortOrder
    balance?: SortOrder
    valueUSD?: SortOrder
    updatedAt?: SortOrder
  }

  export type CurrentAssetSumOrderByAggregateInput = {
    balance?: SortOrder
    valueUSD?: SortOrder
  }

  export type StrategyCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    description?: SortOrder
    assetTicker?: SortOrder
    apy?: SortOrder
    riskLevel?: SortOrder
    platform?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type StrategyAvgOrderByAggregateInput = {
    apy?: SortOrder
  }

  export type StrategyMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    description?: SortOrder
    assetTicker?: SortOrder
    apy?: SortOrder
    riskLevel?: SortOrder
    platform?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type StrategyMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    description?: SortOrder
    assetTicker?: SortOrder
    apy?: SortOrder
    riskLevel?: SortOrder
    platform?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type StrategySumOrderByAggregateInput = {
    apy?: SortOrder
  }

  export type DateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type StrategyScalarRelationFilter = {
    is?: StrategyWhereInput
    isNot?: StrategyWhereInput
  }

  export type UserStrategyAllocationUserIdStrategyIdAssetTickerCompoundUniqueInput = {
    userId: string
    strategyId: string
    assetTicker: string
  }

  export type UserStrategyAllocationCountOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    strategyId?: SortOrder
    assetTicker?: SortOrder
    allocatedAmount?: SortOrder
    entryTimestamp?: SortOrder
    cumulativeYieldEarned?: SortOrder
    lastYieldClaimTimestamp?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type UserStrategyAllocationAvgOrderByAggregateInput = {
    allocatedAmount?: SortOrder
    cumulativeYieldEarned?: SortOrder
  }

  export type UserStrategyAllocationMaxOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    strategyId?: SortOrder
    assetTicker?: SortOrder
    allocatedAmount?: SortOrder
    entryTimestamp?: SortOrder
    cumulativeYieldEarned?: SortOrder
    lastYieldClaimTimestamp?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type UserStrategyAllocationMinOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    strategyId?: SortOrder
    assetTicker?: SortOrder
    allocatedAmount?: SortOrder
    entryTimestamp?: SortOrder
    cumulativeYieldEarned?: SortOrder
    lastYieldClaimTimestamp?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type UserStrategyAllocationSumOrderByAggregateInput = {
    allocatedAmount?: SortOrder
    cumulativeYieldEarned?: SortOrder
  }

  export type DateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type TradingHistoryCreateNestedManyWithoutUserInput = {
    create?: XOR<TradingHistoryCreateWithoutUserInput, TradingHistoryUncheckedCreateWithoutUserInput> | TradingHistoryCreateWithoutUserInput[] | TradingHistoryUncheckedCreateWithoutUserInput[]
    connectOrCreate?: TradingHistoryCreateOrConnectWithoutUserInput | TradingHistoryCreateOrConnectWithoutUserInput[]
    createMany?: TradingHistoryCreateManyUserInputEnvelope
    connect?: TradingHistoryWhereUniqueInput | TradingHistoryWhereUniqueInput[]
  }

  export type CurrentAllocationCreateNestedManyWithoutUserInput = {
    create?: XOR<CurrentAllocationCreateWithoutUserInput, CurrentAllocationUncheckedCreateWithoutUserInput> | CurrentAllocationCreateWithoutUserInput[] | CurrentAllocationUncheckedCreateWithoutUserInput[]
    connectOrCreate?: CurrentAllocationCreateOrConnectWithoutUserInput | CurrentAllocationCreateOrConnectWithoutUserInput[]
    createMany?: CurrentAllocationCreateManyUserInputEnvelope
    connect?: CurrentAllocationWhereUniqueInput | CurrentAllocationWhereUniqueInput[]
  }

  export type CurrentAssetCreateNestedManyWithoutUserInput = {
    create?: XOR<CurrentAssetCreateWithoutUserInput, CurrentAssetUncheckedCreateWithoutUserInput> | CurrentAssetCreateWithoutUserInput[] | CurrentAssetUncheckedCreateWithoutUserInput[]
    connectOrCreate?: CurrentAssetCreateOrConnectWithoutUserInput | CurrentAssetCreateOrConnectWithoutUserInput[]
    createMany?: CurrentAssetCreateManyUserInputEnvelope
    connect?: CurrentAssetWhereUniqueInput | CurrentAssetWhereUniqueInput[]
  }

  export type UserStrategyAllocationCreateNestedManyWithoutUserInput = {
    create?: XOR<UserStrategyAllocationCreateWithoutUserInput, UserStrategyAllocationUncheckedCreateWithoutUserInput> | UserStrategyAllocationCreateWithoutUserInput[] | UserStrategyAllocationUncheckedCreateWithoutUserInput[]
    connectOrCreate?: UserStrategyAllocationCreateOrConnectWithoutUserInput | UserStrategyAllocationCreateOrConnectWithoutUserInput[]
    createMany?: UserStrategyAllocationCreateManyUserInputEnvelope
    connect?: UserStrategyAllocationWhereUniqueInput | UserStrategyAllocationWhereUniqueInput[]
  }

  export type TradingHistoryUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<TradingHistoryCreateWithoutUserInput, TradingHistoryUncheckedCreateWithoutUserInput> | TradingHistoryCreateWithoutUserInput[] | TradingHistoryUncheckedCreateWithoutUserInput[]
    connectOrCreate?: TradingHistoryCreateOrConnectWithoutUserInput | TradingHistoryCreateOrConnectWithoutUserInput[]
    createMany?: TradingHistoryCreateManyUserInputEnvelope
    connect?: TradingHistoryWhereUniqueInput | TradingHistoryWhereUniqueInput[]
  }

  export type CurrentAllocationUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<CurrentAllocationCreateWithoutUserInput, CurrentAllocationUncheckedCreateWithoutUserInput> | CurrentAllocationCreateWithoutUserInput[] | CurrentAllocationUncheckedCreateWithoutUserInput[]
    connectOrCreate?: CurrentAllocationCreateOrConnectWithoutUserInput | CurrentAllocationCreateOrConnectWithoutUserInput[]
    createMany?: CurrentAllocationCreateManyUserInputEnvelope
    connect?: CurrentAllocationWhereUniqueInput | CurrentAllocationWhereUniqueInput[]
  }

  export type CurrentAssetUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<CurrentAssetCreateWithoutUserInput, CurrentAssetUncheckedCreateWithoutUserInput> | CurrentAssetCreateWithoutUserInput[] | CurrentAssetUncheckedCreateWithoutUserInput[]
    connectOrCreate?: CurrentAssetCreateOrConnectWithoutUserInput | CurrentAssetCreateOrConnectWithoutUserInput[]
    createMany?: CurrentAssetCreateManyUserInputEnvelope
    connect?: CurrentAssetWhereUniqueInput | CurrentAssetWhereUniqueInput[]
  }

  export type UserStrategyAllocationUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<UserStrategyAllocationCreateWithoutUserInput, UserStrategyAllocationUncheckedCreateWithoutUserInput> | UserStrategyAllocationCreateWithoutUserInput[] | UserStrategyAllocationUncheckedCreateWithoutUserInput[]
    connectOrCreate?: UserStrategyAllocationCreateOrConnectWithoutUserInput | UserStrategyAllocationCreateOrConnectWithoutUserInput[]
    createMany?: UserStrategyAllocationCreateManyUserInputEnvelope
    connect?: UserStrategyAllocationWhereUniqueInput | UserStrategyAllocationWhereUniqueInput[]
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type EnumUserRoleFieldUpdateOperationsInput = {
    set?: $Enums.UserRole
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type TradingHistoryUpdateManyWithoutUserNestedInput = {
    create?: XOR<TradingHistoryCreateWithoutUserInput, TradingHistoryUncheckedCreateWithoutUserInput> | TradingHistoryCreateWithoutUserInput[] | TradingHistoryUncheckedCreateWithoutUserInput[]
    connectOrCreate?: TradingHistoryCreateOrConnectWithoutUserInput | TradingHistoryCreateOrConnectWithoutUserInput[]
    upsert?: TradingHistoryUpsertWithWhereUniqueWithoutUserInput | TradingHistoryUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: TradingHistoryCreateManyUserInputEnvelope
    set?: TradingHistoryWhereUniqueInput | TradingHistoryWhereUniqueInput[]
    disconnect?: TradingHistoryWhereUniqueInput | TradingHistoryWhereUniqueInput[]
    delete?: TradingHistoryWhereUniqueInput | TradingHistoryWhereUniqueInput[]
    connect?: TradingHistoryWhereUniqueInput | TradingHistoryWhereUniqueInput[]
    update?: TradingHistoryUpdateWithWhereUniqueWithoutUserInput | TradingHistoryUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: TradingHistoryUpdateManyWithWhereWithoutUserInput | TradingHistoryUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: TradingHistoryScalarWhereInput | TradingHistoryScalarWhereInput[]
  }

  export type CurrentAllocationUpdateManyWithoutUserNestedInput = {
    create?: XOR<CurrentAllocationCreateWithoutUserInput, CurrentAllocationUncheckedCreateWithoutUserInput> | CurrentAllocationCreateWithoutUserInput[] | CurrentAllocationUncheckedCreateWithoutUserInput[]
    connectOrCreate?: CurrentAllocationCreateOrConnectWithoutUserInput | CurrentAllocationCreateOrConnectWithoutUserInput[]
    upsert?: CurrentAllocationUpsertWithWhereUniqueWithoutUserInput | CurrentAllocationUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: CurrentAllocationCreateManyUserInputEnvelope
    set?: CurrentAllocationWhereUniqueInput | CurrentAllocationWhereUniqueInput[]
    disconnect?: CurrentAllocationWhereUniqueInput | CurrentAllocationWhereUniqueInput[]
    delete?: CurrentAllocationWhereUniqueInput | CurrentAllocationWhereUniqueInput[]
    connect?: CurrentAllocationWhereUniqueInput | CurrentAllocationWhereUniqueInput[]
    update?: CurrentAllocationUpdateWithWhereUniqueWithoutUserInput | CurrentAllocationUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: CurrentAllocationUpdateManyWithWhereWithoutUserInput | CurrentAllocationUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: CurrentAllocationScalarWhereInput | CurrentAllocationScalarWhereInput[]
  }

  export type CurrentAssetUpdateManyWithoutUserNestedInput = {
    create?: XOR<CurrentAssetCreateWithoutUserInput, CurrentAssetUncheckedCreateWithoutUserInput> | CurrentAssetCreateWithoutUserInput[] | CurrentAssetUncheckedCreateWithoutUserInput[]
    connectOrCreate?: CurrentAssetCreateOrConnectWithoutUserInput | CurrentAssetCreateOrConnectWithoutUserInput[]
    upsert?: CurrentAssetUpsertWithWhereUniqueWithoutUserInput | CurrentAssetUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: CurrentAssetCreateManyUserInputEnvelope
    set?: CurrentAssetWhereUniqueInput | CurrentAssetWhereUniqueInput[]
    disconnect?: CurrentAssetWhereUniqueInput | CurrentAssetWhereUniqueInput[]
    delete?: CurrentAssetWhereUniqueInput | CurrentAssetWhereUniqueInput[]
    connect?: CurrentAssetWhereUniqueInput | CurrentAssetWhereUniqueInput[]
    update?: CurrentAssetUpdateWithWhereUniqueWithoutUserInput | CurrentAssetUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: CurrentAssetUpdateManyWithWhereWithoutUserInput | CurrentAssetUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: CurrentAssetScalarWhereInput | CurrentAssetScalarWhereInput[]
  }

  export type UserStrategyAllocationUpdateManyWithoutUserNestedInput = {
    create?: XOR<UserStrategyAllocationCreateWithoutUserInput, UserStrategyAllocationUncheckedCreateWithoutUserInput> | UserStrategyAllocationCreateWithoutUserInput[] | UserStrategyAllocationUncheckedCreateWithoutUserInput[]
    connectOrCreate?: UserStrategyAllocationCreateOrConnectWithoutUserInput | UserStrategyAllocationCreateOrConnectWithoutUserInput[]
    upsert?: UserStrategyAllocationUpsertWithWhereUniqueWithoutUserInput | UserStrategyAllocationUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: UserStrategyAllocationCreateManyUserInputEnvelope
    set?: UserStrategyAllocationWhereUniqueInput | UserStrategyAllocationWhereUniqueInput[]
    disconnect?: UserStrategyAllocationWhereUniqueInput | UserStrategyAllocationWhereUniqueInput[]
    delete?: UserStrategyAllocationWhereUniqueInput | UserStrategyAllocationWhereUniqueInput[]
    connect?: UserStrategyAllocationWhereUniqueInput | UserStrategyAllocationWhereUniqueInput[]
    update?: UserStrategyAllocationUpdateWithWhereUniqueWithoutUserInput | UserStrategyAllocationUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: UserStrategyAllocationUpdateManyWithWhereWithoutUserInput | UserStrategyAllocationUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: UserStrategyAllocationScalarWhereInput | UserStrategyAllocationScalarWhereInput[]
  }

  export type TradingHistoryUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<TradingHistoryCreateWithoutUserInput, TradingHistoryUncheckedCreateWithoutUserInput> | TradingHistoryCreateWithoutUserInput[] | TradingHistoryUncheckedCreateWithoutUserInput[]
    connectOrCreate?: TradingHistoryCreateOrConnectWithoutUserInput | TradingHistoryCreateOrConnectWithoutUserInput[]
    upsert?: TradingHistoryUpsertWithWhereUniqueWithoutUserInput | TradingHistoryUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: TradingHistoryCreateManyUserInputEnvelope
    set?: TradingHistoryWhereUniqueInput | TradingHistoryWhereUniqueInput[]
    disconnect?: TradingHistoryWhereUniqueInput | TradingHistoryWhereUniqueInput[]
    delete?: TradingHistoryWhereUniqueInput | TradingHistoryWhereUniqueInput[]
    connect?: TradingHistoryWhereUniqueInput | TradingHistoryWhereUniqueInput[]
    update?: TradingHistoryUpdateWithWhereUniqueWithoutUserInput | TradingHistoryUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: TradingHistoryUpdateManyWithWhereWithoutUserInput | TradingHistoryUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: TradingHistoryScalarWhereInput | TradingHistoryScalarWhereInput[]
  }

  export type CurrentAllocationUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<CurrentAllocationCreateWithoutUserInput, CurrentAllocationUncheckedCreateWithoutUserInput> | CurrentAllocationCreateWithoutUserInput[] | CurrentAllocationUncheckedCreateWithoutUserInput[]
    connectOrCreate?: CurrentAllocationCreateOrConnectWithoutUserInput | CurrentAllocationCreateOrConnectWithoutUserInput[]
    upsert?: CurrentAllocationUpsertWithWhereUniqueWithoutUserInput | CurrentAllocationUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: CurrentAllocationCreateManyUserInputEnvelope
    set?: CurrentAllocationWhereUniqueInput | CurrentAllocationWhereUniqueInput[]
    disconnect?: CurrentAllocationWhereUniqueInput | CurrentAllocationWhereUniqueInput[]
    delete?: CurrentAllocationWhereUniqueInput | CurrentAllocationWhereUniqueInput[]
    connect?: CurrentAllocationWhereUniqueInput | CurrentAllocationWhereUniqueInput[]
    update?: CurrentAllocationUpdateWithWhereUniqueWithoutUserInput | CurrentAllocationUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: CurrentAllocationUpdateManyWithWhereWithoutUserInput | CurrentAllocationUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: CurrentAllocationScalarWhereInput | CurrentAllocationScalarWhereInput[]
  }

  export type CurrentAssetUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<CurrentAssetCreateWithoutUserInput, CurrentAssetUncheckedCreateWithoutUserInput> | CurrentAssetCreateWithoutUserInput[] | CurrentAssetUncheckedCreateWithoutUserInput[]
    connectOrCreate?: CurrentAssetCreateOrConnectWithoutUserInput | CurrentAssetCreateOrConnectWithoutUserInput[]
    upsert?: CurrentAssetUpsertWithWhereUniqueWithoutUserInput | CurrentAssetUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: CurrentAssetCreateManyUserInputEnvelope
    set?: CurrentAssetWhereUniqueInput | CurrentAssetWhereUniqueInput[]
    disconnect?: CurrentAssetWhereUniqueInput | CurrentAssetWhereUniqueInput[]
    delete?: CurrentAssetWhereUniqueInput | CurrentAssetWhereUniqueInput[]
    connect?: CurrentAssetWhereUniqueInput | CurrentAssetWhereUniqueInput[]
    update?: CurrentAssetUpdateWithWhereUniqueWithoutUserInput | CurrentAssetUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: CurrentAssetUpdateManyWithWhereWithoutUserInput | CurrentAssetUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: CurrentAssetScalarWhereInput | CurrentAssetScalarWhereInput[]
  }

  export type UserStrategyAllocationUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<UserStrategyAllocationCreateWithoutUserInput, UserStrategyAllocationUncheckedCreateWithoutUserInput> | UserStrategyAllocationCreateWithoutUserInput[] | UserStrategyAllocationUncheckedCreateWithoutUserInput[]
    connectOrCreate?: UserStrategyAllocationCreateOrConnectWithoutUserInput | UserStrategyAllocationCreateOrConnectWithoutUserInput[]
    upsert?: UserStrategyAllocationUpsertWithWhereUniqueWithoutUserInput | UserStrategyAllocationUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: UserStrategyAllocationCreateManyUserInputEnvelope
    set?: UserStrategyAllocationWhereUniqueInput | UserStrategyAllocationWhereUniqueInput[]
    disconnect?: UserStrategyAllocationWhereUniqueInput | UserStrategyAllocationWhereUniqueInput[]
    delete?: UserStrategyAllocationWhereUniqueInput | UserStrategyAllocationWhereUniqueInput[]
    connect?: UserStrategyAllocationWhereUniqueInput | UserStrategyAllocationWhereUniqueInput[]
    update?: UserStrategyAllocationUpdateWithWhereUniqueWithoutUserInput | UserStrategyAllocationUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: UserStrategyAllocationUpdateManyWithWhereWithoutUserInput | UserStrategyAllocationUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: UserStrategyAllocationScalarWhereInput | UserStrategyAllocationScalarWhereInput[]
  }

  export type UserCreateNestedOneWithoutTradingHistoryInput = {
    create?: XOR<UserCreateWithoutTradingHistoryInput, UserUncheckedCreateWithoutTradingHistoryInput>
    connectOrCreate?: UserCreateOrConnectWithoutTradingHistoryInput
    connect?: UserWhereUniqueInput
  }

  export type StrategyCreateNestedOneWithoutTradingEventsInput = {
    create?: XOR<StrategyCreateWithoutTradingEventsInput, StrategyUncheckedCreateWithoutTradingEventsInput>
    connectOrCreate?: StrategyCreateOrConnectWithoutTradingEventsInput
    connect?: StrategyWhereUniqueInput
  }

  export type FloatFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type NullableFloatFieldUpdateOperationsInput = {
    set?: number | null
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type UserUpdateOneRequiredWithoutTradingHistoryNestedInput = {
    create?: XOR<UserCreateWithoutTradingHistoryInput, UserUncheckedCreateWithoutTradingHistoryInput>
    connectOrCreate?: UserCreateOrConnectWithoutTradingHistoryInput
    upsert?: UserUpsertWithoutTradingHistoryInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutTradingHistoryInput, UserUpdateWithoutTradingHistoryInput>, UserUncheckedUpdateWithoutTradingHistoryInput>
  }

  export type StrategyUpdateOneWithoutTradingEventsNestedInput = {
    create?: XOR<StrategyCreateWithoutTradingEventsInput, StrategyUncheckedCreateWithoutTradingEventsInput>
    connectOrCreate?: StrategyCreateOrConnectWithoutTradingEventsInput
    upsert?: StrategyUpsertWithoutTradingEventsInput
    disconnect?: StrategyWhereInput | boolean
    delete?: StrategyWhereInput | boolean
    connect?: StrategyWhereUniqueInput
    update?: XOR<XOR<StrategyUpdateToOneWithWhereWithoutTradingEventsInput, StrategyUpdateWithoutTradingEventsInput>, StrategyUncheckedUpdateWithoutTradingEventsInput>
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type UserCreateNestedOneWithoutCurrentAllocationsInput = {
    create?: XOR<UserCreateWithoutCurrentAllocationsInput, UserUncheckedCreateWithoutCurrentAllocationsInput>
    connectOrCreate?: UserCreateOrConnectWithoutCurrentAllocationsInput
    connect?: UserWhereUniqueInput
  }

  export type UserUpdateOneRequiredWithoutCurrentAllocationsNestedInput = {
    create?: XOR<UserCreateWithoutCurrentAllocationsInput, UserUncheckedCreateWithoutCurrentAllocationsInput>
    connectOrCreate?: UserCreateOrConnectWithoutCurrentAllocationsInput
    upsert?: UserUpsertWithoutCurrentAllocationsInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutCurrentAllocationsInput, UserUpdateWithoutCurrentAllocationsInput>, UserUncheckedUpdateWithoutCurrentAllocationsInput>
  }

  export type UserCreateNestedOneWithoutCurrentAssetsInput = {
    create?: XOR<UserCreateWithoutCurrentAssetsInput, UserUncheckedCreateWithoutCurrentAssetsInput>
    connectOrCreate?: UserCreateOrConnectWithoutCurrentAssetsInput
    connect?: UserWhereUniqueInput
  }

  export type UserUpdateOneRequiredWithoutCurrentAssetsNestedInput = {
    create?: XOR<UserCreateWithoutCurrentAssetsInput, UserUncheckedCreateWithoutCurrentAssetsInput>
    connectOrCreate?: UserCreateOrConnectWithoutCurrentAssetsInput
    upsert?: UserUpsertWithoutCurrentAssetsInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutCurrentAssetsInput, UserUpdateWithoutCurrentAssetsInput>, UserUncheckedUpdateWithoutCurrentAssetsInput>
  }

  export type UserStrategyAllocationCreateNestedManyWithoutStrategyInput = {
    create?: XOR<UserStrategyAllocationCreateWithoutStrategyInput, UserStrategyAllocationUncheckedCreateWithoutStrategyInput> | UserStrategyAllocationCreateWithoutStrategyInput[] | UserStrategyAllocationUncheckedCreateWithoutStrategyInput[]
    connectOrCreate?: UserStrategyAllocationCreateOrConnectWithoutStrategyInput | UserStrategyAllocationCreateOrConnectWithoutStrategyInput[]
    createMany?: UserStrategyAllocationCreateManyStrategyInputEnvelope
    connect?: UserStrategyAllocationWhereUniqueInput | UserStrategyAllocationWhereUniqueInput[]
  }

  export type TradingHistoryCreateNestedManyWithoutStrategyInput = {
    create?: XOR<TradingHistoryCreateWithoutStrategyInput, TradingHistoryUncheckedCreateWithoutStrategyInput> | TradingHistoryCreateWithoutStrategyInput[] | TradingHistoryUncheckedCreateWithoutStrategyInput[]
    connectOrCreate?: TradingHistoryCreateOrConnectWithoutStrategyInput | TradingHistoryCreateOrConnectWithoutStrategyInput[]
    createMany?: TradingHistoryCreateManyStrategyInputEnvelope
    connect?: TradingHistoryWhereUniqueInput | TradingHistoryWhereUniqueInput[]
  }

  export type UserStrategyAllocationUncheckedCreateNestedManyWithoutStrategyInput = {
    create?: XOR<UserStrategyAllocationCreateWithoutStrategyInput, UserStrategyAllocationUncheckedCreateWithoutStrategyInput> | UserStrategyAllocationCreateWithoutStrategyInput[] | UserStrategyAllocationUncheckedCreateWithoutStrategyInput[]
    connectOrCreate?: UserStrategyAllocationCreateOrConnectWithoutStrategyInput | UserStrategyAllocationCreateOrConnectWithoutStrategyInput[]
    createMany?: UserStrategyAllocationCreateManyStrategyInputEnvelope
    connect?: UserStrategyAllocationWhereUniqueInput | UserStrategyAllocationWhereUniqueInput[]
  }

  export type TradingHistoryUncheckedCreateNestedManyWithoutStrategyInput = {
    create?: XOR<TradingHistoryCreateWithoutStrategyInput, TradingHistoryUncheckedCreateWithoutStrategyInput> | TradingHistoryCreateWithoutStrategyInput[] | TradingHistoryUncheckedCreateWithoutStrategyInput[]
    connectOrCreate?: TradingHistoryCreateOrConnectWithoutStrategyInput | TradingHistoryCreateOrConnectWithoutStrategyInput[]
    createMany?: TradingHistoryCreateManyStrategyInputEnvelope
    connect?: TradingHistoryWhereUniqueInput | TradingHistoryWhereUniqueInput[]
  }

  export type UserStrategyAllocationUpdateManyWithoutStrategyNestedInput = {
    create?: XOR<UserStrategyAllocationCreateWithoutStrategyInput, UserStrategyAllocationUncheckedCreateWithoutStrategyInput> | UserStrategyAllocationCreateWithoutStrategyInput[] | UserStrategyAllocationUncheckedCreateWithoutStrategyInput[]
    connectOrCreate?: UserStrategyAllocationCreateOrConnectWithoutStrategyInput | UserStrategyAllocationCreateOrConnectWithoutStrategyInput[]
    upsert?: UserStrategyAllocationUpsertWithWhereUniqueWithoutStrategyInput | UserStrategyAllocationUpsertWithWhereUniqueWithoutStrategyInput[]
    createMany?: UserStrategyAllocationCreateManyStrategyInputEnvelope
    set?: UserStrategyAllocationWhereUniqueInput | UserStrategyAllocationWhereUniqueInput[]
    disconnect?: UserStrategyAllocationWhereUniqueInput | UserStrategyAllocationWhereUniqueInput[]
    delete?: UserStrategyAllocationWhereUniqueInput | UserStrategyAllocationWhereUniqueInput[]
    connect?: UserStrategyAllocationWhereUniqueInput | UserStrategyAllocationWhereUniqueInput[]
    update?: UserStrategyAllocationUpdateWithWhereUniqueWithoutStrategyInput | UserStrategyAllocationUpdateWithWhereUniqueWithoutStrategyInput[]
    updateMany?: UserStrategyAllocationUpdateManyWithWhereWithoutStrategyInput | UserStrategyAllocationUpdateManyWithWhereWithoutStrategyInput[]
    deleteMany?: UserStrategyAllocationScalarWhereInput | UserStrategyAllocationScalarWhereInput[]
  }

  export type TradingHistoryUpdateManyWithoutStrategyNestedInput = {
    create?: XOR<TradingHistoryCreateWithoutStrategyInput, TradingHistoryUncheckedCreateWithoutStrategyInput> | TradingHistoryCreateWithoutStrategyInput[] | TradingHistoryUncheckedCreateWithoutStrategyInput[]
    connectOrCreate?: TradingHistoryCreateOrConnectWithoutStrategyInput | TradingHistoryCreateOrConnectWithoutStrategyInput[]
    upsert?: TradingHistoryUpsertWithWhereUniqueWithoutStrategyInput | TradingHistoryUpsertWithWhereUniqueWithoutStrategyInput[]
    createMany?: TradingHistoryCreateManyStrategyInputEnvelope
    set?: TradingHistoryWhereUniqueInput | TradingHistoryWhereUniqueInput[]
    disconnect?: TradingHistoryWhereUniqueInput | TradingHistoryWhereUniqueInput[]
    delete?: TradingHistoryWhereUniqueInput | TradingHistoryWhereUniqueInput[]
    connect?: TradingHistoryWhereUniqueInput | TradingHistoryWhereUniqueInput[]
    update?: TradingHistoryUpdateWithWhereUniqueWithoutStrategyInput | TradingHistoryUpdateWithWhereUniqueWithoutStrategyInput[]
    updateMany?: TradingHistoryUpdateManyWithWhereWithoutStrategyInput | TradingHistoryUpdateManyWithWhereWithoutStrategyInput[]
    deleteMany?: TradingHistoryScalarWhereInput | TradingHistoryScalarWhereInput[]
  }

  export type UserStrategyAllocationUncheckedUpdateManyWithoutStrategyNestedInput = {
    create?: XOR<UserStrategyAllocationCreateWithoutStrategyInput, UserStrategyAllocationUncheckedCreateWithoutStrategyInput> | UserStrategyAllocationCreateWithoutStrategyInput[] | UserStrategyAllocationUncheckedCreateWithoutStrategyInput[]
    connectOrCreate?: UserStrategyAllocationCreateOrConnectWithoutStrategyInput | UserStrategyAllocationCreateOrConnectWithoutStrategyInput[]
    upsert?: UserStrategyAllocationUpsertWithWhereUniqueWithoutStrategyInput | UserStrategyAllocationUpsertWithWhereUniqueWithoutStrategyInput[]
    createMany?: UserStrategyAllocationCreateManyStrategyInputEnvelope
    set?: UserStrategyAllocationWhereUniqueInput | UserStrategyAllocationWhereUniqueInput[]
    disconnect?: UserStrategyAllocationWhereUniqueInput | UserStrategyAllocationWhereUniqueInput[]
    delete?: UserStrategyAllocationWhereUniqueInput | UserStrategyAllocationWhereUniqueInput[]
    connect?: UserStrategyAllocationWhereUniqueInput | UserStrategyAllocationWhereUniqueInput[]
    update?: UserStrategyAllocationUpdateWithWhereUniqueWithoutStrategyInput | UserStrategyAllocationUpdateWithWhereUniqueWithoutStrategyInput[]
    updateMany?: UserStrategyAllocationUpdateManyWithWhereWithoutStrategyInput | UserStrategyAllocationUpdateManyWithWhereWithoutStrategyInput[]
    deleteMany?: UserStrategyAllocationScalarWhereInput | UserStrategyAllocationScalarWhereInput[]
  }

  export type TradingHistoryUncheckedUpdateManyWithoutStrategyNestedInput = {
    create?: XOR<TradingHistoryCreateWithoutStrategyInput, TradingHistoryUncheckedCreateWithoutStrategyInput> | TradingHistoryCreateWithoutStrategyInput[] | TradingHistoryUncheckedCreateWithoutStrategyInput[]
    connectOrCreate?: TradingHistoryCreateOrConnectWithoutStrategyInput | TradingHistoryCreateOrConnectWithoutStrategyInput[]
    upsert?: TradingHistoryUpsertWithWhereUniqueWithoutStrategyInput | TradingHistoryUpsertWithWhereUniqueWithoutStrategyInput[]
    createMany?: TradingHistoryCreateManyStrategyInputEnvelope
    set?: TradingHistoryWhereUniqueInput | TradingHistoryWhereUniqueInput[]
    disconnect?: TradingHistoryWhereUniqueInput | TradingHistoryWhereUniqueInput[]
    delete?: TradingHistoryWhereUniqueInput | TradingHistoryWhereUniqueInput[]
    connect?: TradingHistoryWhereUniqueInput | TradingHistoryWhereUniqueInput[]
    update?: TradingHistoryUpdateWithWhereUniqueWithoutStrategyInput | TradingHistoryUpdateWithWhereUniqueWithoutStrategyInput[]
    updateMany?: TradingHistoryUpdateManyWithWhereWithoutStrategyInput | TradingHistoryUpdateManyWithWhereWithoutStrategyInput[]
    deleteMany?: TradingHistoryScalarWhereInput | TradingHistoryScalarWhereInput[]
  }

  export type UserCreateNestedOneWithoutUserStrategyAllocationsInput = {
    create?: XOR<UserCreateWithoutUserStrategyAllocationsInput, UserUncheckedCreateWithoutUserStrategyAllocationsInput>
    connectOrCreate?: UserCreateOrConnectWithoutUserStrategyAllocationsInput
    connect?: UserWhereUniqueInput
  }

  export type StrategyCreateNestedOneWithoutUserAllocationsInput = {
    create?: XOR<StrategyCreateWithoutUserAllocationsInput, StrategyUncheckedCreateWithoutUserAllocationsInput>
    connectOrCreate?: StrategyCreateOrConnectWithoutUserAllocationsInput
    connect?: StrategyWhereUniqueInput
  }

  export type NullableDateTimeFieldUpdateOperationsInput = {
    set?: Date | string | null
  }

  export type UserUpdateOneRequiredWithoutUserStrategyAllocationsNestedInput = {
    create?: XOR<UserCreateWithoutUserStrategyAllocationsInput, UserUncheckedCreateWithoutUserStrategyAllocationsInput>
    connectOrCreate?: UserCreateOrConnectWithoutUserStrategyAllocationsInput
    upsert?: UserUpsertWithoutUserStrategyAllocationsInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutUserStrategyAllocationsInput, UserUpdateWithoutUserStrategyAllocationsInput>, UserUncheckedUpdateWithoutUserStrategyAllocationsInput>
  }

  export type StrategyUpdateOneRequiredWithoutUserAllocationsNestedInput = {
    create?: XOR<StrategyCreateWithoutUserAllocationsInput, StrategyUncheckedCreateWithoutUserAllocationsInput>
    connectOrCreate?: StrategyCreateOrConnectWithoutUserAllocationsInput
    upsert?: StrategyUpsertWithoutUserAllocationsInput
    connect?: StrategyWhereUniqueInput
    update?: XOR<XOR<StrategyUpdateToOneWithWhereWithoutUserAllocationsInput, StrategyUpdateWithoutUserAllocationsInput>, StrategyUncheckedUpdateWithoutUserAllocationsInput>
  }

  export type NestedStringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type NestedEnumUserRoleFilter<$PrismaModel = never> = {
    equals?: $Enums.UserRole | EnumUserRoleFieldRefInput<$PrismaModel>
    in?: $Enums.UserRole[] | ListEnumUserRoleFieldRefInput<$PrismaModel>
    notIn?: $Enums.UserRole[] | ListEnumUserRoleFieldRefInput<$PrismaModel>
    not?: NestedEnumUserRoleFilter<$PrismaModel> | $Enums.UserRole
  }

  export type NestedDateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type NestedStringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type NestedIntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type NestedEnumUserRoleWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.UserRole | EnumUserRoleFieldRefInput<$PrismaModel>
    in?: $Enums.UserRole[] | ListEnumUserRoleFieldRefInput<$PrismaModel>
    notIn?: $Enums.UserRole[] | ListEnumUserRoleFieldRefInput<$PrismaModel>
    not?: NestedEnumUserRoleWithAggregatesFilter<$PrismaModel> | $Enums.UserRole
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumUserRoleFilter<$PrismaModel>
    _max?: NestedEnumUserRoleFilter<$PrismaModel>
  }

  export type NestedDateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type NestedFloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type NestedFloatNullableFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableFilter<$PrismaModel> | number | null
  }

  export type NestedStringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type NestedFloatWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedFloatFilter<$PrismaModel>
    _min?: NestedFloatFilter<$PrismaModel>
    _max?: NestedFloatFilter<$PrismaModel>
  }

  export type NestedFloatNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedFloatNullableFilter<$PrismaModel>
    _min?: NestedFloatNullableFilter<$PrismaModel>
    _max?: NestedFloatNullableFilter<$PrismaModel>
  }

  export type NestedIntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type NestedStringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type NestedDateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type NestedDateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type TradingHistoryCreateWithoutUserInput = {
    id?: string
    action: string
    asset: string
    amount: number
    price?: number | null
    timestamp?: Date | string
    strategy?: StrategyCreateNestedOneWithoutTradingEventsInput
  }

  export type TradingHistoryUncheckedCreateWithoutUserInput = {
    id?: string
    action: string
    asset: string
    amount: number
    price?: number | null
    strategyId?: string | null
    timestamp?: Date | string
  }

  export type TradingHistoryCreateOrConnectWithoutUserInput = {
    where: TradingHistoryWhereUniqueInput
    create: XOR<TradingHistoryCreateWithoutUserInput, TradingHistoryUncheckedCreateWithoutUserInput>
  }

  export type TradingHistoryCreateManyUserInputEnvelope = {
    data: TradingHistoryCreateManyUserInput | TradingHistoryCreateManyUserInput[]
    skipDuplicates?: boolean
  }

  export type CurrentAllocationCreateWithoutUserInput = {
    id?: string
    asset: string
    percentage: number
    updatedAt?: Date | string
  }

  export type CurrentAllocationUncheckedCreateWithoutUserInput = {
    id?: string
    asset: string
    percentage: number
    updatedAt?: Date | string
  }

  export type CurrentAllocationCreateOrConnectWithoutUserInput = {
    where: CurrentAllocationWhereUniqueInput
    create: XOR<CurrentAllocationCreateWithoutUserInput, CurrentAllocationUncheckedCreateWithoutUserInput>
  }

  export type CurrentAllocationCreateManyUserInputEnvelope = {
    data: CurrentAllocationCreateManyUserInput | CurrentAllocationCreateManyUserInput[]
    skipDuplicates?: boolean
  }

  export type CurrentAssetCreateWithoutUserInput = {
    id?: string
    assetName: string
    assetTicker: string
    balance: number
    valueUSD?: number | null
    updatedAt?: Date | string
  }

  export type CurrentAssetUncheckedCreateWithoutUserInput = {
    id?: string
    assetName: string
    assetTicker: string
    balance: number
    valueUSD?: number | null
    updatedAt?: Date | string
  }

  export type CurrentAssetCreateOrConnectWithoutUserInput = {
    where: CurrentAssetWhereUniqueInput
    create: XOR<CurrentAssetCreateWithoutUserInput, CurrentAssetUncheckedCreateWithoutUserInput>
  }

  export type CurrentAssetCreateManyUserInputEnvelope = {
    data: CurrentAssetCreateManyUserInput | CurrentAssetCreateManyUserInput[]
    skipDuplicates?: boolean
  }

  export type UserStrategyAllocationCreateWithoutUserInput = {
    id?: string
    assetTicker: string
    allocatedAmount: number
    entryTimestamp?: Date | string
    cumulativeYieldEarned?: number
    lastYieldClaimTimestamp?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    strategy: StrategyCreateNestedOneWithoutUserAllocationsInput
  }

  export type UserStrategyAllocationUncheckedCreateWithoutUserInput = {
    id?: string
    strategyId: string
    assetTicker: string
    allocatedAmount: number
    entryTimestamp?: Date | string
    cumulativeYieldEarned?: number
    lastYieldClaimTimestamp?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type UserStrategyAllocationCreateOrConnectWithoutUserInput = {
    where: UserStrategyAllocationWhereUniqueInput
    create: XOR<UserStrategyAllocationCreateWithoutUserInput, UserStrategyAllocationUncheckedCreateWithoutUserInput>
  }

  export type UserStrategyAllocationCreateManyUserInputEnvelope = {
    data: UserStrategyAllocationCreateManyUserInput | UserStrategyAllocationCreateManyUserInput[]
    skipDuplicates?: boolean
  }

  export type TradingHistoryUpsertWithWhereUniqueWithoutUserInput = {
    where: TradingHistoryWhereUniqueInput
    update: XOR<TradingHistoryUpdateWithoutUserInput, TradingHistoryUncheckedUpdateWithoutUserInput>
    create: XOR<TradingHistoryCreateWithoutUserInput, TradingHistoryUncheckedCreateWithoutUserInput>
  }

  export type TradingHistoryUpdateWithWhereUniqueWithoutUserInput = {
    where: TradingHistoryWhereUniqueInput
    data: XOR<TradingHistoryUpdateWithoutUserInput, TradingHistoryUncheckedUpdateWithoutUserInput>
  }

  export type TradingHistoryUpdateManyWithWhereWithoutUserInput = {
    where: TradingHistoryScalarWhereInput
    data: XOR<TradingHistoryUpdateManyMutationInput, TradingHistoryUncheckedUpdateManyWithoutUserInput>
  }

  export type TradingHistoryScalarWhereInput = {
    AND?: TradingHistoryScalarWhereInput | TradingHistoryScalarWhereInput[]
    OR?: TradingHistoryScalarWhereInput[]
    NOT?: TradingHistoryScalarWhereInput | TradingHistoryScalarWhereInput[]
    id?: StringFilter<"TradingHistory"> | string
    userId?: StringFilter<"TradingHistory"> | string
    action?: StringFilter<"TradingHistory"> | string
    asset?: StringFilter<"TradingHistory"> | string
    amount?: FloatFilter<"TradingHistory"> | number
    price?: FloatNullableFilter<"TradingHistory"> | number | null
    strategyId?: StringNullableFilter<"TradingHistory"> | string | null
    timestamp?: DateTimeFilter<"TradingHistory"> | Date | string
  }

  export type CurrentAllocationUpsertWithWhereUniqueWithoutUserInput = {
    where: CurrentAllocationWhereUniqueInput
    update: XOR<CurrentAllocationUpdateWithoutUserInput, CurrentAllocationUncheckedUpdateWithoutUserInput>
    create: XOR<CurrentAllocationCreateWithoutUserInput, CurrentAllocationUncheckedCreateWithoutUserInput>
  }

  export type CurrentAllocationUpdateWithWhereUniqueWithoutUserInput = {
    where: CurrentAllocationWhereUniqueInput
    data: XOR<CurrentAllocationUpdateWithoutUserInput, CurrentAllocationUncheckedUpdateWithoutUserInput>
  }

  export type CurrentAllocationUpdateManyWithWhereWithoutUserInput = {
    where: CurrentAllocationScalarWhereInput
    data: XOR<CurrentAllocationUpdateManyMutationInput, CurrentAllocationUncheckedUpdateManyWithoutUserInput>
  }

  export type CurrentAllocationScalarWhereInput = {
    AND?: CurrentAllocationScalarWhereInput | CurrentAllocationScalarWhereInput[]
    OR?: CurrentAllocationScalarWhereInput[]
    NOT?: CurrentAllocationScalarWhereInput | CurrentAllocationScalarWhereInput[]
    id?: StringFilter<"CurrentAllocation"> | string
    userId?: StringFilter<"CurrentAllocation"> | string
    asset?: StringFilter<"CurrentAllocation"> | string
    percentage?: FloatFilter<"CurrentAllocation"> | number
    updatedAt?: DateTimeFilter<"CurrentAllocation"> | Date | string
  }

  export type CurrentAssetUpsertWithWhereUniqueWithoutUserInput = {
    where: CurrentAssetWhereUniqueInput
    update: XOR<CurrentAssetUpdateWithoutUserInput, CurrentAssetUncheckedUpdateWithoutUserInput>
    create: XOR<CurrentAssetCreateWithoutUserInput, CurrentAssetUncheckedCreateWithoutUserInput>
  }

  export type CurrentAssetUpdateWithWhereUniqueWithoutUserInput = {
    where: CurrentAssetWhereUniqueInput
    data: XOR<CurrentAssetUpdateWithoutUserInput, CurrentAssetUncheckedUpdateWithoutUserInput>
  }

  export type CurrentAssetUpdateManyWithWhereWithoutUserInput = {
    where: CurrentAssetScalarWhereInput
    data: XOR<CurrentAssetUpdateManyMutationInput, CurrentAssetUncheckedUpdateManyWithoutUserInput>
  }

  export type CurrentAssetScalarWhereInput = {
    AND?: CurrentAssetScalarWhereInput | CurrentAssetScalarWhereInput[]
    OR?: CurrentAssetScalarWhereInput[]
    NOT?: CurrentAssetScalarWhereInput | CurrentAssetScalarWhereInput[]
    id?: StringFilter<"CurrentAsset"> | string
    userId?: StringFilter<"CurrentAsset"> | string
    assetName?: StringFilter<"CurrentAsset"> | string
    assetTicker?: StringFilter<"CurrentAsset"> | string
    balance?: FloatFilter<"CurrentAsset"> | number
    valueUSD?: FloatNullableFilter<"CurrentAsset"> | number | null
    updatedAt?: DateTimeFilter<"CurrentAsset"> | Date | string
  }

  export type UserStrategyAllocationUpsertWithWhereUniqueWithoutUserInput = {
    where: UserStrategyAllocationWhereUniqueInput
    update: XOR<UserStrategyAllocationUpdateWithoutUserInput, UserStrategyAllocationUncheckedUpdateWithoutUserInput>
    create: XOR<UserStrategyAllocationCreateWithoutUserInput, UserStrategyAllocationUncheckedCreateWithoutUserInput>
  }

  export type UserStrategyAllocationUpdateWithWhereUniqueWithoutUserInput = {
    where: UserStrategyAllocationWhereUniqueInput
    data: XOR<UserStrategyAllocationUpdateWithoutUserInput, UserStrategyAllocationUncheckedUpdateWithoutUserInput>
  }

  export type UserStrategyAllocationUpdateManyWithWhereWithoutUserInput = {
    where: UserStrategyAllocationScalarWhereInput
    data: XOR<UserStrategyAllocationUpdateManyMutationInput, UserStrategyAllocationUncheckedUpdateManyWithoutUserInput>
  }

  export type UserStrategyAllocationScalarWhereInput = {
    AND?: UserStrategyAllocationScalarWhereInput | UserStrategyAllocationScalarWhereInput[]
    OR?: UserStrategyAllocationScalarWhereInput[]
    NOT?: UserStrategyAllocationScalarWhereInput | UserStrategyAllocationScalarWhereInput[]
    id?: StringFilter<"UserStrategyAllocation"> | string
    userId?: StringFilter<"UserStrategyAllocation"> | string
    strategyId?: StringFilter<"UserStrategyAllocation"> | string
    assetTicker?: StringFilter<"UserStrategyAllocation"> | string
    allocatedAmount?: FloatFilter<"UserStrategyAllocation"> | number
    entryTimestamp?: DateTimeFilter<"UserStrategyAllocation"> | Date | string
    cumulativeYieldEarned?: FloatFilter<"UserStrategyAllocation"> | number
    lastYieldClaimTimestamp?: DateTimeNullableFilter<"UserStrategyAllocation"> | Date | string | null
    createdAt?: DateTimeFilter<"UserStrategyAllocation"> | Date | string
    updatedAt?: DateTimeFilter<"UserStrategyAllocation"> | Date | string
  }

  export type UserCreateWithoutTradingHistoryInput = {
    id?: string
    walletAddress: string
    role?: $Enums.UserRole
    createdAt?: Date | string
    updatedAt?: Date | string
    currentAllocations?: CurrentAllocationCreateNestedManyWithoutUserInput
    currentAssets?: CurrentAssetCreateNestedManyWithoutUserInput
    userStrategyAllocations?: UserStrategyAllocationCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutTradingHistoryInput = {
    id?: string
    walletAddress: string
    role?: $Enums.UserRole
    createdAt?: Date | string
    updatedAt?: Date | string
    currentAllocations?: CurrentAllocationUncheckedCreateNestedManyWithoutUserInput
    currentAssets?: CurrentAssetUncheckedCreateNestedManyWithoutUserInput
    userStrategyAllocations?: UserStrategyAllocationUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutTradingHistoryInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutTradingHistoryInput, UserUncheckedCreateWithoutTradingHistoryInput>
  }

  export type StrategyCreateWithoutTradingEventsInput = {
    id?: string
    name: string
    description?: string | null
    assetTicker: string
    apy: number
    riskLevel: string
    platform?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    userAllocations?: UserStrategyAllocationCreateNestedManyWithoutStrategyInput
  }

  export type StrategyUncheckedCreateWithoutTradingEventsInput = {
    id?: string
    name: string
    description?: string | null
    assetTicker: string
    apy: number
    riskLevel: string
    platform?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    userAllocations?: UserStrategyAllocationUncheckedCreateNestedManyWithoutStrategyInput
  }

  export type StrategyCreateOrConnectWithoutTradingEventsInput = {
    where: StrategyWhereUniqueInput
    create: XOR<StrategyCreateWithoutTradingEventsInput, StrategyUncheckedCreateWithoutTradingEventsInput>
  }

  export type UserUpsertWithoutTradingHistoryInput = {
    update: XOR<UserUpdateWithoutTradingHistoryInput, UserUncheckedUpdateWithoutTradingHistoryInput>
    create: XOR<UserCreateWithoutTradingHistoryInput, UserUncheckedCreateWithoutTradingHistoryInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutTradingHistoryInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutTradingHistoryInput, UserUncheckedUpdateWithoutTradingHistoryInput>
  }

  export type UserUpdateWithoutTradingHistoryInput = {
    id?: StringFieldUpdateOperationsInput | string
    walletAddress?: StringFieldUpdateOperationsInput | string
    role?: EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    currentAllocations?: CurrentAllocationUpdateManyWithoutUserNestedInput
    currentAssets?: CurrentAssetUpdateManyWithoutUserNestedInput
    userStrategyAllocations?: UserStrategyAllocationUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutTradingHistoryInput = {
    id?: StringFieldUpdateOperationsInput | string
    walletAddress?: StringFieldUpdateOperationsInput | string
    role?: EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    currentAllocations?: CurrentAllocationUncheckedUpdateManyWithoutUserNestedInput
    currentAssets?: CurrentAssetUncheckedUpdateManyWithoutUserNestedInput
    userStrategyAllocations?: UserStrategyAllocationUncheckedUpdateManyWithoutUserNestedInput
  }

  export type StrategyUpsertWithoutTradingEventsInput = {
    update: XOR<StrategyUpdateWithoutTradingEventsInput, StrategyUncheckedUpdateWithoutTradingEventsInput>
    create: XOR<StrategyCreateWithoutTradingEventsInput, StrategyUncheckedCreateWithoutTradingEventsInput>
    where?: StrategyWhereInput
  }

  export type StrategyUpdateToOneWithWhereWithoutTradingEventsInput = {
    where?: StrategyWhereInput
    data: XOR<StrategyUpdateWithoutTradingEventsInput, StrategyUncheckedUpdateWithoutTradingEventsInput>
  }

  export type StrategyUpdateWithoutTradingEventsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    assetTicker?: StringFieldUpdateOperationsInput | string
    apy?: FloatFieldUpdateOperationsInput | number
    riskLevel?: StringFieldUpdateOperationsInput | string
    platform?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    userAllocations?: UserStrategyAllocationUpdateManyWithoutStrategyNestedInput
  }

  export type StrategyUncheckedUpdateWithoutTradingEventsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    assetTicker?: StringFieldUpdateOperationsInput | string
    apy?: FloatFieldUpdateOperationsInput | number
    riskLevel?: StringFieldUpdateOperationsInput | string
    platform?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    userAllocations?: UserStrategyAllocationUncheckedUpdateManyWithoutStrategyNestedInput
  }

  export type UserCreateWithoutCurrentAllocationsInput = {
    id?: string
    walletAddress: string
    role?: $Enums.UserRole
    createdAt?: Date | string
    updatedAt?: Date | string
    tradingHistory?: TradingHistoryCreateNestedManyWithoutUserInput
    currentAssets?: CurrentAssetCreateNestedManyWithoutUserInput
    userStrategyAllocations?: UserStrategyAllocationCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutCurrentAllocationsInput = {
    id?: string
    walletAddress: string
    role?: $Enums.UserRole
    createdAt?: Date | string
    updatedAt?: Date | string
    tradingHistory?: TradingHistoryUncheckedCreateNestedManyWithoutUserInput
    currentAssets?: CurrentAssetUncheckedCreateNestedManyWithoutUserInput
    userStrategyAllocations?: UserStrategyAllocationUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutCurrentAllocationsInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutCurrentAllocationsInput, UserUncheckedCreateWithoutCurrentAllocationsInput>
  }

  export type UserUpsertWithoutCurrentAllocationsInput = {
    update: XOR<UserUpdateWithoutCurrentAllocationsInput, UserUncheckedUpdateWithoutCurrentAllocationsInput>
    create: XOR<UserCreateWithoutCurrentAllocationsInput, UserUncheckedCreateWithoutCurrentAllocationsInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutCurrentAllocationsInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutCurrentAllocationsInput, UserUncheckedUpdateWithoutCurrentAllocationsInput>
  }

  export type UserUpdateWithoutCurrentAllocationsInput = {
    id?: StringFieldUpdateOperationsInput | string
    walletAddress?: StringFieldUpdateOperationsInput | string
    role?: EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    tradingHistory?: TradingHistoryUpdateManyWithoutUserNestedInput
    currentAssets?: CurrentAssetUpdateManyWithoutUserNestedInput
    userStrategyAllocations?: UserStrategyAllocationUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutCurrentAllocationsInput = {
    id?: StringFieldUpdateOperationsInput | string
    walletAddress?: StringFieldUpdateOperationsInput | string
    role?: EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    tradingHistory?: TradingHistoryUncheckedUpdateManyWithoutUserNestedInput
    currentAssets?: CurrentAssetUncheckedUpdateManyWithoutUserNestedInput
    userStrategyAllocations?: UserStrategyAllocationUncheckedUpdateManyWithoutUserNestedInput
  }

  export type UserCreateWithoutCurrentAssetsInput = {
    id?: string
    walletAddress: string
    role?: $Enums.UserRole
    createdAt?: Date | string
    updatedAt?: Date | string
    tradingHistory?: TradingHistoryCreateNestedManyWithoutUserInput
    currentAllocations?: CurrentAllocationCreateNestedManyWithoutUserInput
    userStrategyAllocations?: UserStrategyAllocationCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutCurrentAssetsInput = {
    id?: string
    walletAddress: string
    role?: $Enums.UserRole
    createdAt?: Date | string
    updatedAt?: Date | string
    tradingHistory?: TradingHistoryUncheckedCreateNestedManyWithoutUserInput
    currentAllocations?: CurrentAllocationUncheckedCreateNestedManyWithoutUserInput
    userStrategyAllocations?: UserStrategyAllocationUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutCurrentAssetsInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutCurrentAssetsInput, UserUncheckedCreateWithoutCurrentAssetsInput>
  }

  export type UserUpsertWithoutCurrentAssetsInput = {
    update: XOR<UserUpdateWithoutCurrentAssetsInput, UserUncheckedUpdateWithoutCurrentAssetsInput>
    create: XOR<UserCreateWithoutCurrentAssetsInput, UserUncheckedCreateWithoutCurrentAssetsInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutCurrentAssetsInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutCurrentAssetsInput, UserUncheckedUpdateWithoutCurrentAssetsInput>
  }

  export type UserUpdateWithoutCurrentAssetsInput = {
    id?: StringFieldUpdateOperationsInput | string
    walletAddress?: StringFieldUpdateOperationsInput | string
    role?: EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    tradingHistory?: TradingHistoryUpdateManyWithoutUserNestedInput
    currentAllocations?: CurrentAllocationUpdateManyWithoutUserNestedInput
    userStrategyAllocations?: UserStrategyAllocationUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutCurrentAssetsInput = {
    id?: StringFieldUpdateOperationsInput | string
    walletAddress?: StringFieldUpdateOperationsInput | string
    role?: EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    tradingHistory?: TradingHistoryUncheckedUpdateManyWithoutUserNestedInput
    currentAllocations?: CurrentAllocationUncheckedUpdateManyWithoutUserNestedInput
    userStrategyAllocations?: UserStrategyAllocationUncheckedUpdateManyWithoutUserNestedInput
  }

  export type UserStrategyAllocationCreateWithoutStrategyInput = {
    id?: string
    assetTicker: string
    allocatedAmount: number
    entryTimestamp?: Date | string
    cumulativeYieldEarned?: number
    lastYieldClaimTimestamp?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    user: UserCreateNestedOneWithoutUserStrategyAllocationsInput
  }

  export type UserStrategyAllocationUncheckedCreateWithoutStrategyInput = {
    id?: string
    userId: string
    assetTicker: string
    allocatedAmount: number
    entryTimestamp?: Date | string
    cumulativeYieldEarned?: number
    lastYieldClaimTimestamp?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type UserStrategyAllocationCreateOrConnectWithoutStrategyInput = {
    where: UserStrategyAllocationWhereUniqueInput
    create: XOR<UserStrategyAllocationCreateWithoutStrategyInput, UserStrategyAllocationUncheckedCreateWithoutStrategyInput>
  }

  export type UserStrategyAllocationCreateManyStrategyInputEnvelope = {
    data: UserStrategyAllocationCreateManyStrategyInput | UserStrategyAllocationCreateManyStrategyInput[]
    skipDuplicates?: boolean
  }

  export type TradingHistoryCreateWithoutStrategyInput = {
    id?: string
    action: string
    asset: string
    amount: number
    price?: number | null
    timestamp?: Date | string
    user: UserCreateNestedOneWithoutTradingHistoryInput
  }

  export type TradingHistoryUncheckedCreateWithoutStrategyInput = {
    id?: string
    userId: string
    action: string
    asset: string
    amount: number
    price?: number | null
    timestamp?: Date | string
  }

  export type TradingHistoryCreateOrConnectWithoutStrategyInput = {
    where: TradingHistoryWhereUniqueInput
    create: XOR<TradingHistoryCreateWithoutStrategyInput, TradingHistoryUncheckedCreateWithoutStrategyInput>
  }

  export type TradingHistoryCreateManyStrategyInputEnvelope = {
    data: TradingHistoryCreateManyStrategyInput | TradingHistoryCreateManyStrategyInput[]
    skipDuplicates?: boolean
  }

  export type UserStrategyAllocationUpsertWithWhereUniqueWithoutStrategyInput = {
    where: UserStrategyAllocationWhereUniqueInput
    update: XOR<UserStrategyAllocationUpdateWithoutStrategyInput, UserStrategyAllocationUncheckedUpdateWithoutStrategyInput>
    create: XOR<UserStrategyAllocationCreateWithoutStrategyInput, UserStrategyAllocationUncheckedCreateWithoutStrategyInput>
  }

  export type UserStrategyAllocationUpdateWithWhereUniqueWithoutStrategyInput = {
    where: UserStrategyAllocationWhereUniqueInput
    data: XOR<UserStrategyAllocationUpdateWithoutStrategyInput, UserStrategyAllocationUncheckedUpdateWithoutStrategyInput>
  }

  export type UserStrategyAllocationUpdateManyWithWhereWithoutStrategyInput = {
    where: UserStrategyAllocationScalarWhereInput
    data: XOR<UserStrategyAllocationUpdateManyMutationInput, UserStrategyAllocationUncheckedUpdateManyWithoutStrategyInput>
  }

  export type TradingHistoryUpsertWithWhereUniqueWithoutStrategyInput = {
    where: TradingHistoryWhereUniqueInput
    update: XOR<TradingHistoryUpdateWithoutStrategyInput, TradingHistoryUncheckedUpdateWithoutStrategyInput>
    create: XOR<TradingHistoryCreateWithoutStrategyInput, TradingHistoryUncheckedCreateWithoutStrategyInput>
  }

  export type TradingHistoryUpdateWithWhereUniqueWithoutStrategyInput = {
    where: TradingHistoryWhereUniqueInput
    data: XOR<TradingHistoryUpdateWithoutStrategyInput, TradingHistoryUncheckedUpdateWithoutStrategyInput>
  }

  export type TradingHistoryUpdateManyWithWhereWithoutStrategyInput = {
    where: TradingHistoryScalarWhereInput
    data: XOR<TradingHistoryUpdateManyMutationInput, TradingHistoryUncheckedUpdateManyWithoutStrategyInput>
  }

  export type UserCreateWithoutUserStrategyAllocationsInput = {
    id?: string
    walletAddress: string
    role?: $Enums.UserRole
    createdAt?: Date | string
    updatedAt?: Date | string
    tradingHistory?: TradingHistoryCreateNestedManyWithoutUserInput
    currentAllocations?: CurrentAllocationCreateNestedManyWithoutUserInput
    currentAssets?: CurrentAssetCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutUserStrategyAllocationsInput = {
    id?: string
    walletAddress: string
    role?: $Enums.UserRole
    createdAt?: Date | string
    updatedAt?: Date | string
    tradingHistory?: TradingHistoryUncheckedCreateNestedManyWithoutUserInput
    currentAllocations?: CurrentAllocationUncheckedCreateNestedManyWithoutUserInput
    currentAssets?: CurrentAssetUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutUserStrategyAllocationsInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutUserStrategyAllocationsInput, UserUncheckedCreateWithoutUserStrategyAllocationsInput>
  }

  export type StrategyCreateWithoutUserAllocationsInput = {
    id?: string
    name: string
    description?: string | null
    assetTicker: string
    apy: number
    riskLevel: string
    platform?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    tradingEvents?: TradingHistoryCreateNestedManyWithoutStrategyInput
  }

  export type StrategyUncheckedCreateWithoutUserAllocationsInput = {
    id?: string
    name: string
    description?: string | null
    assetTicker: string
    apy: number
    riskLevel: string
    platform?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    tradingEvents?: TradingHistoryUncheckedCreateNestedManyWithoutStrategyInput
  }

  export type StrategyCreateOrConnectWithoutUserAllocationsInput = {
    where: StrategyWhereUniqueInput
    create: XOR<StrategyCreateWithoutUserAllocationsInput, StrategyUncheckedCreateWithoutUserAllocationsInput>
  }

  export type UserUpsertWithoutUserStrategyAllocationsInput = {
    update: XOR<UserUpdateWithoutUserStrategyAllocationsInput, UserUncheckedUpdateWithoutUserStrategyAllocationsInput>
    create: XOR<UserCreateWithoutUserStrategyAllocationsInput, UserUncheckedCreateWithoutUserStrategyAllocationsInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutUserStrategyAllocationsInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutUserStrategyAllocationsInput, UserUncheckedUpdateWithoutUserStrategyAllocationsInput>
  }

  export type UserUpdateWithoutUserStrategyAllocationsInput = {
    id?: StringFieldUpdateOperationsInput | string
    walletAddress?: StringFieldUpdateOperationsInput | string
    role?: EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    tradingHistory?: TradingHistoryUpdateManyWithoutUserNestedInput
    currentAllocations?: CurrentAllocationUpdateManyWithoutUserNestedInput
    currentAssets?: CurrentAssetUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutUserStrategyAllocationsInput = {
    id?: StringFieldUpdateOperationsInput | string
    walletAddress?: StringFieldUpdateOperationsInput | string
    role?: EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    tradingHistory?: TradingHistoryUncheckedUpdateManyWithoutUserNestedInput
    currentAllocations?: CurrentAllocationUncheckedUpdateManyWithoutUserNestedInput
    currentAssets?: CurrentAssetUncheckedUpdateManyWithoutUserNestedInput
  }

  export type StrategyUpsertWithoutUserAllocationsInput = {
    update: XOR<StrategyUpdateWithoutUserAllocationsInput, StrategyUncheckedUpdateWithoutUserAllocationsInput>
    create: XOR<StrategyCreateWithoutUserAllocationsInput, StrategyUncheckedCreateWithoutUserAllocationsInput>
    where?: StrategyWhereInput
  }

  export type StrategyUpdateToOneWithWhereWithoutUserAllocationsInput = {
    where?: StrategyWhereInput
    data: XOR<StrategyUpdateWithoutUserAllocationsInput, StrategyUncheckedUpdateWithoutUserAllocationsInput>
  }

  export type StrategyUpdateWithoutUserAllocationsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    assetTicker?: StringFieldUpdateOperationsInput | string
    apy?: FloatFieldUpdateOperationsInput | number
    riskLevel?: StringFieldUpdateOperationsInput | string
    platform?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    tradingEvents?: TradingHistoryUpdateManyWithoutStrategyNestedInput
  }

  export type StrategyUncheckedUpdateWithoutUserAllocationsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    assetTicker?: StringFieldUpdateOperationsInput | string
    apy?: FloatFieldUpdateOperationsInput | number
    riskLevel?: StringFieldUpdateOperationsInput | string
    platform?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    tradingEvents?: TradingHistoryUncheckedUpdateManyWithoutStrategyNestedInput
  }

  export type TradingHistoryCreateManyUserInput = {
    id?: string
    action: string
    asset: string
    amount: number
    price?: number | null
    strategyId?: string | null
    timestamp?: Date | string
  }

  export type CurrentAllocationCreateManyUserInput = {
    id?: string
    asset: string
    percentage: number
    updatedAt?: Date | string
  }

  export type CurrentAssetCreateManyUserInput = {
    id?: string
    assetName: string
    assetTicker: string
    balance: number
    valueUSD?: number | null
    updatedAt?: Date | string
  }

  export type UserStrategyAllocationCreateManyUserInput = {
    id?: string
    strategyId: string
    assetTicker: string
    allocatedAmount: number
    entryTimestamp?: Date | string
    cumulativeYieldEarned?: number
    lastYieldClaimTimestamp?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type TradingHistoryUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    action?: StringFieldUpdateOperationsInput | string
    asset?: StringFieldUpdateOperationsInput | string
    amount?: FloatFieldUpdateOperationsInput | number
    price?: NullableFloatFieldUpdateOperationsInput | number | null
    timestamp?: DateTimeFieldUpdateOperationsInput | Date | string
    strategy?: StrategyUpdateOneWithoutTradingEventsNestedInput
  }

  export type TradingHistoryUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    action?: StringFieldUpdateOperationsInput | string
    asset?: StringFieldUpdateOperationsInput | string
    amount?: FloatFieldUpdateOperationsInput | number
    price?: NullableFloatFieldUpdateOperationsInput | number | null
    strategyId?: NullableStringFieldUpdateOperationsInput | string | null
    timestamp?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TradingHistoryUncheckedUpdateManyWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    action?: StringFieldUpdateOperationsInput | string
    asset?: StringFieldUpdateOperationsInput | string
    amount?: FloatFieldUpdateOperationsInput | number
    price?: NullableFloatFieldUpdateOperationsInput | number | null
    strategyId?: NullableStringFieldUpdateOperationsInput | string | null
    timestamp?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CurrentAllocationUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    asset?: StringFieldUpdateOperationsInput | string
    percentage?: FloatFieldUpdateOperationsInput | number
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CurrentAllocationUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    asset?: StringFieldUpdateOperationsInput | string
    percentage?: FloatFieldUpdateOperationsInput | number
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CurrentAllocationUncheckedUpdateManyWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    asset?: StringFieldUpdateOperationsInput | string
    percentage?: FloatFieldUpdateOperationsInput | number
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CurrentAssetUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    assetName?: StringFieldUpdateOperationsInput | string
    assetTicker?: StringFieldUpdateOperationsInput | string
    balance?: FloatFieldUpdateOperationsInput | number
    valueUSD?: NullableFloatFieldUpdateOperationsInput | number | null
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CurrentAssetUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    assetName?: StringFieldUpdateOperationsInput | string
    assetTicker?: StringFieldUpdateOperationsInput | string
    balance?: FloatFieldUpdateOperationsInput | number
    valueUSD?: NullableFloatFieldUpdateOperationsInput | number | null
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CurrentAssetUncheckedUpdateManyWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    assetName?: StringFieldUpdateOperationsInput | string
    assetTicker?: StringFieldUpdateOperationsInput | string
    balance?: FloatFieldUpdateOperationsInput | number
    valueUSD?: NullableFloatFieldUpdateOperationsInput | number | null
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserStrategyAllocationUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    assetTicker?: StringFieldUpdateOperationsInput | string
    allocatedAmount?: FloatFieldUpdateOperationsInput | number
    entryTimestamp?: DateTimeFieldUpdateOperationsInput | Date | string
    cumulativeYieldEarned?: FloatFieldUpdateOperationsInput | number
    lastYieldClaimTimestamp?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    strategy?: StrategyUpdateOneRequiredWithoutUserAllocationsNestedInput
  }

  export type UserStrategyAllocationUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    strategyId?: StringFieldUpdateOperationsInput | string
    assetTicker?: StringFieldUpdateOperationsInput | string
    allocatedAmount?: FloatFieldUpdateOperationsInput | number
    entryTimestamp?: DateTimeFieldUpdateOperationsInput | Date | string
    cumulativeYieldEarned?: FloatFieldUpdateOperationsInput | number
    lastYieldClaimTimestamp?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserStrategyAllocationUncheckedUpdateManyWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    strategyId?: StringFieldUpdateOperationsInput | string
    assetTicker?: StringFieldUpdateOperationsInput | string
    allocatedAmount?: FloatFieldUpdateOperationsInput | number
    entryTimestamp?: DateTimeFieldUpdateOperationsInput | Date | string
    cumulativeYieldEarned?: FloatFieldUpdateOperationsInput | number
    lastYieldClaimTimestamp?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserStrategyAllocationCreateManyStrategyInput = {
    id?: string
    userId: string
    assetTicker: string
    allocatedAmount: number
    entryTimestamp?: Date | string
    cumulativeYieldEarned?: number
    lastYieldClaimTimestamp?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type TradingHistoryCreateManyStrategyInput = {
    id?: string
    userId: string
    action: string
    asset: string
    amount: number
    price?: number | null
    timestamp?: Date | string
  }

  export type UserStrategyAllocationUpdateWithoutStrategyInput = {
    id?: StringFieldUpdateOperationsInput | string
    assetTicker?: StringFieldUpdateOperationsInput | string
    allocatedAmount?: FloatFieldUpdateOperationsInput | number
    entryTimestamp?: DateTimeFieldUpdateOperationsInput | Date | string
    cumulativeYieldEarned?: FloatFieldUpdateOperationsInput | number
    lastYieldClaimTimestamp?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutUserStrategyAllocationsNestedInput
  }

  export type UserStrategyAllocationUncheckedUpdateWithoutStrategyInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    assetTicker?: StringFieldUpdateOperationsInput | string
    allocatedAmount?: FloatFieldUpdateOperationsInput | number
    entryTimestamp?: DateTimeFieldUpdateOperationsInput | Date | string
    cumulativeYieldEarned?: FloatFieldUpdateOperationsInput | number
    lastYieldClaimTimestamp?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserStrategyAllocationUncheckedUpdateManyWithoutStrategyInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    assetTicker?: StringFieldUpdateOperationsInput | string
    allocatedAmount?: FloatFieldUpdateOperationsInput | number
    entryTimestamp?: DateTimeFieldUpdateOperationsInput | Date | string
    cumulativeYieldEarned?: FloatFieldUpdateOperationsInput | number
    lastYieldClaimTimestamp?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TradingHistoryUpdateWithoutStrategyInput = {
    id?: StringFieldUpdateOperationsInput | string
    action?: StringFieldUpdateOperationsInput | string
    asset?: StringFieldUpdateOperationsInput | string
    amount?: FloatFieldUpdateOperationsInput | number
    price?: NullableFloatFieldUpdateOperationsInput | number | null
    timestamp?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutTradingHistoryNestedInput
  }

  export type TradingHistoryUncheckedUpdateWithoutStrategyInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    action?: StringFieldUpdateOperationsInput | string
    asset?: StringFieldUpdateOperationsInput | string
    amount?: FloatFieldUpdateOperationsInput | number
    price?: NullableFloatFieldUpdateOperationsInput | number | null
    timestamp?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TradingHistoryUncheckedUpdateManyWithoutStrategyInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    action?: StringFieldUpdateOperationsInput | string
    asset?: StringFieldUpdateOperationsInput | string
    amount?: FloatFieldUpdateOperationsInput | number
    price?: NullableFloatFieldUpdateOperationsInput | number | null
    timestamp?: DateTimeFieldUpdateOperationsInput | Date | string
  }



  /**
   * Batch Payload for updateMany & deleteMany & createMany
   */

  export type BatchPayload = {
    count: number
  }

  /**
   * DMMF
   */
  export const dmmf: runtime.BaseDMMF
}