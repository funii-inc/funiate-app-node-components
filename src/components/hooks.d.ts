import { Action } from '@funii-inc/funii-assist-types';
import { ActionHandler } from './props';
export declare const useCallableActions: (actionHandler?: ActionHandler) => (actions: Action[]) => Promise<void>;
export declare const useExistValidActions: (paths: string[]) => (actions: Action[]) => boolean;
//# sourceMappingURL=hooks.d.ts.map