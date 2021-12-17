/// <reference types="react" />
import { AppV1_NodeMap, Action, AppV1_List, AppV1_Frame, ThemeProps, MergedTableRecord } from '@funii-inc/funii-assist-types';
export declare type ArtboardSize = 'desktop' | 'tablet' | 'mobile';
export declare const DESKTOP_MIN_WIDTH = 1200;
export declare const TABLET_MIN_WIDTH = 700;
export declare type ActionHandler = (action: Action) => Promise<void> | void;
export declare type ComponentProps<T = AppV1_NodeMap, U = any> = {
    node: T;
    fullWidth?: boolean;
    theme?: ThemeProps;
    actionHandler?: ActionHandler;
    paths?: string[];
    screenItemData?: U;
    data: MergedTableRecord | null;
    children?: React.ReactNode;
    databaseTableToolAsset?: () => {
        useTableRecordTools: ({ tableID }: {
            tableID: string;
        }) => any;
        useTableImageTools: ({ tableID }: {
            tableID: string;
        }) => any;
        useTableMultiTagTools: ({ tableID }: {
            tableID: string;
        }) => any;
        useTableTagTools: ({ tableID }: {
            tableID: string;
        }) => any;
        useTableColumnMappingTools: ({ tableID }: {
            tableID: string;
        }) => any;
    };
};
export declare type ListProps<T = AppV1_List, U = {
    [key: string]: any;
}> = {
    node: T;
    fullWidth?: boolean;
    theme?: ThemeProps;
    renderItem: ({ item }: {
        item: U;
    }) => React.ReactNode;
    databaseTableToolAsset?: () => {
        useTableRecordTools: ({ tableID }: {
            tableID: string;
        }) => any;
        useTableImageTools: ({ tableID }: {
            tableID: string;
        }) => any;
        useTableMultiTagTools: ({ tableID }: {
            tableID: string;
        }) => any;
        useTableTagTools: ({ tableID }: {
            tableID: string;
        }) => any;
        useTableColumnMappingTools: ({ tableID }: {
            tableID: string;
        }) => any;
    };
};
export declare type FrameProps<T = AppV1_Frame> = {
    node: T;
    fullWidth?: boolean;
    theme?: ThemeProps;
    children?: React.ReactNode;
};
//# sourceMappingURL=componentProps.d.ts.map