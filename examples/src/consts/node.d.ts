import { AppV1_Typography, AppV1_Image, AppV1_Space, AppV1_Button, AppV1_List, AppV1_Frame } from '@funii-inc/funii-assist-types';
export declare const typography1: AppV1_Typography;
export declare const typography2: AppV1_Typography;
export declare const typography3: AppV1_Typography;
export declare const typography4: AppV1_Typography;
export declare const typography5: AppV1_Typography;
export declare const typography6: AppV1_Typography;
export declare const typography7: AppV1_Typography;
export declare const image1: AppV1_Image;
export declare const image2: AppV1_Image;
export declare const image3: AppV1_Image;
export declare const space1: AppV1_Space;
export declare const space2: AppV1_Space;
export declare const space3: AppV1_Space;
export declare const button1: AppV1_Button;
export declare const button2: AppV1_Button;
export declare const button3: AppV1_Button;
export declare const button4: AppV1_Button;
export declare const button5: AppV1_Button;
export declare const button6: AppV1_Button;
export declare const testDatabaseTableToolAsset: () => {
    useTableRecordTools: ({ tableID }: {
        tableID: string;
    }) => {
        tableRecordDictionary: {
            testRecord1: {
                id: string;
                tableID: string;
                data: {
                    testText1: {
                        type: string;
                        value: string;
                    };
                    testText2: {
                        type: string;
                        value: string;
                    };
                    testImage1: {
                        type: string;
                        value: {
                            imageID: string;
                        }[];
                    };
                    createdAtTimestamp: number;
                    updatedAtTimestamp: number;
                    type: string;
                };
            };
            testRecord2: {
                id: string;
                tableID: string;
                data: {
                    testText1: {
                        type: string;
                        value: string;
                    };
                    testText2: {
                        type: string;
                        value: string;
                    };
                    testImage1: {
                        type: string;
                        value: {
                            imageID: string;
                        }[];
                    };
                    createdAtTimestamp: number;
                    updatedAtTimestamp: number;
                    type: string;
                };
            };
        };
    };
    useTableImageTools: ({ tableID }: {
        tableID: string;
    }) => {
        tableImageMappings: {
            testImageMapping1: {
                id: string;
                tableID: string;
                columnID: string;
                projectID: string;
                data: {
                    thumbnailURL: string;
                };
                createdAtTimestamp: number;
                updatedAtTimestamp: number;
                type: string;
            };
            testImageMapping2: {
                id: string;
                tableID: string;
                columnID: string;
                projectID: string;
                data: {
                    thumbnailURL: string;
                };
                createdAtTimestamp: number;
                updatedAtTimestamp: number;
                type: string;
            };
        };
    };
    useTableMultiTagTools: ({ tableID }: {
        tableID: string;
    }) => {
        tableMultiTagMappings: {
            testMultiTagMapping1: {
                id: string;
                tableID: string;
                columnID: string;
                data: {
                    active: boolean;
                    backgroundColor: string;
                    foregroundColor: string;
                    label: string;
                    tagGroupID: string;
                };
                createdAtTimestamp: number;
                updatedAtTimestamp: number;
                type: string;
            };
            testMultiTagMapping2: {
                id: string;
                tableID: string;
                columnID: string;
                data: {
                    active: boolean;
                    backgroundColor: string;
                    foregroundColor: string;
                    label: string;
                    tagGroupID: string;
                };
                createdAtTimestamp: number;
                updatedAtTimestamp: number;
                type: string;
            };
        };
    };
    useTableTagTools: ({ tableID }: {
        tableID: string;
    }) => {
        tableTagMappings: {
            testTag1: {
                id: string;
                tableID: string;
                columnID: string;
                data: {
                    active: boolean;
                    backgroundColor: string;
                    foregroundColor: string;
                    label: string;
                    tagGroupID: string;
                };
                createdAtTimestamp: number;
                updatedAtTimestamp: number;
                type: string;
            };
            testTag2: {
                id: string;
                tableID: string;
                columnID: string;
                data: {
                    active: boolean;
                    backgroundColor: string;
                    foregroundColor: string;
                    label: string;
                    tagGroupID: string;
                };
                createdAtTimestamp: number;
                updatedAtTimestamp: number;
                type: string;
            };
        };
    };
};
export declare const list1: AppV1_List;
export declare const list2: AppV1_List;
export declare const list3: AppV1_List;
export declare const list4: AppV1_List;
export declare const frame1: AppV1_Frame;
export declare const frame2: AppV1_Frame;
export declare const frame3: AppV1_Frame;
export declare const frame4: AppV1_Frame;
export declare const frame5: AppV1_Frame;
//# sourceMappingURL=node.d.ts.map