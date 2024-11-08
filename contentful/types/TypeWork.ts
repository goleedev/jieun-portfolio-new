import type { ChainModifiers, Entry, EntryFieldTypes, EntrySkeletonType, LocaleCode } from "contentful";

export interface TypeWorkFields {
    title: EntryFieldTypes.Symbol;
    thumbnail: EntryFieldTypes.AssetLink;
    slug: EntryFieldTypes.Symbol;
    types: EntryFieldTypes.Array<EntryFieldTypes.Symbol>;
}

export type TypeWorkSkeleton = EntrySkeletonType<TypeWorkFields, "work">;
export type TypeWork<Modifiers extends ChainModifiers, Locales extends LocaleCode = LocaleCode> = Entry<TypeWorkSkeleton, Modifiers, Locales>;
