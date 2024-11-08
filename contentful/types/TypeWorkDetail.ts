import type { ChainModifiers, Entry, EntryFieldTypes, EntrySkeletonType, LocaleCode } from "contentful";
import type { TypeWorkSkeleton } from "./TypeWork";

export interface TypeWorkDetailFields {
    work: EntryFieldTypes.EntryLink<TypeWorkSkeleton>;
    link?: EntryFieldTypes.Symbol;
    year: EntryFieldTypes.Symbol;
    role: EntryFieldTypes.Symbol;
    services: EntryFieldTypes.Symbol;
    section1title?: EntryFieldTypes.Symbol;
    section1content?: EntryFieldTypes.Text;
    section1images: EntryFieldTypes.Array<EntryFieldTypes.AssetLink>;
    section2title?: EntryFieldTypes.Symbol;
    section2content?: EntryFieldTypes.Text;
    section2images?: EntryFieldTypes.Array<EntryFieldTypes.AssetLink>;
    section3title?: EntryFieldTypes.Symbol;
    section3content?: EntryFieldTypes.Text;
    section3images?: EntryFieldTypes.Array<EntryFieldTypes.AssetLink>;
    section4title?: EntryFieldTypes.Symbol;
    section4content?: EntryFieldTypes.Text;
    section4images?: EntryFieldTypes.Array<EntryFieldTypes.AssetLink>;
}

export type TypeWorkDetailSkeleton = EntrySkeletonType<TypeWorkDetailFields, "workDetail">;
export type TypeWorkDetail<Modifiers extends ChainModifiers, Locales extends LocaleCode = LocaleCode> = Entry<TypeWorkDetailSkeleton, Modifiers, Locales>;
