export declare const getAllModules: () => Promise<{
    id: string;
    module_name: string;
    description: string | null;
    available_actions: string[];
}[]>;
export declare const getModuleById: (id: string) => Promise<{
    id: string;
    module_name: string;
    description: string | null;
    available_actions: string[];
}>;
export declare const createModule: (module_name: string, description?: string, available_actions?: string[]) => Promise<{
    id: string;
    module_name: string;
    description: string | null;
    available_actions: string[];
}>;
export declare const updateModule: (id: string, updates: Partial<{
    module_name: string;
    description: string;
    available_actions: string[];
}>) => Promise<{
    id: string;
    module_name: string;
    description: string | null;
    available_actions: string[];
}>;
export declare const deleteModule: (id: string) => Promise<void>;
//# sourceMappingURL=module.service.d.ts.map