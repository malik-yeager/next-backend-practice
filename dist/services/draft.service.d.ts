import { Draft } from "../entities/Draft";
import { Post } from "../entities/Post";
export declare const createDraft: (data: Partial<Draft>) => Promise<Draft>;
export declare const getAllDrafts: () => Promise<Draft[]>;
export declare const getDraftById: (id: string) => Promise<Draft | null>;
export declare const updateDraft: (id: string, data: Partial<Draft>) => Promise<Draft>;
export declare const publishDraft: (id: string) => Promise<Post>;
//# sourceMappingURL=draft.service.d.ts.map