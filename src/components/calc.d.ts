import { StorageFile, Variable, MergedTableRecord } from '@funii-inc/funii-assist-types';
declare type CalcOption = {
    mergedTableRecord?: MergedTableRecord | null;
    recordID?: string;
};
export declare const calcText: (text: (string | Variable)[], option?: CalcOption | undefined) => string;
export declare const calcImages: (images: (StorageFile | Variable)[], option?: CalcOption | undefined) => {
    size: {
        width: number | null;
        height: number | null;
    };
    url: string;
}[];
export {};
//# sourceMappingURL=calc.d.ts.map