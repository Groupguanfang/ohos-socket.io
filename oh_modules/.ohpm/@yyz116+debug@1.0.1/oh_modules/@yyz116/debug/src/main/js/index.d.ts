declare var debug: debug.Debug & { debug: debug.Debug; default: debug.Debug };
export = debug;

declare namespace debug {
    interface Debug {
        (namespace: string): Debugger;
        coerce: (val: any) => any;
        disable: () => string;
        enable: (namespaces: string) => void;
        enabled: (namespaces: string) => boolean;
        formatArgs: (this: Debugger, args: any[]) => void;
        log: (...args: any[]) => any;
        selectColor: (namespace: string) => string | number;

        names: RegExp[];
        skips: RegExp[];

        formatters: Formatters;

        inspectOpts?: {
            hideDate?: boolean | number | null;
            colors?: boolean | number | null;
            depth?: boolean | number | null;
            showHidden?: boolean | number | null;
        };
    }

    type IDebug = Debug;

    interface Formatters {
        [formatter: string]: (v: any) => string;
    }

    type IDebugger = Debugger;

    interface Debugger {
        (formatter: any, ...args: any[]): void;

        color: string;
        diff: number;
        enabled: boolean;
        enable: (namespaces: string) => void;
        log: (...args: any[]) => any;
        namespace: string;
        destroy: () => boolean;
        extend: (namespace: string, delimiter?: string) => Debugger;
    }
}
