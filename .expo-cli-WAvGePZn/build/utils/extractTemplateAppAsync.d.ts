import { BareAppConfig, ExpoConfig } from '@expo/config';
import { PackageSpec } from 'pacote';
declare type AppJsonInput = {
    expo: Partial<ExpoConfig> & {
        name: string;
    };
};
/**
 * Extract a template app to a given file path and clean up any properties left over from npm to
 * prepare it for usage.
 */
export declare function extractAndPrepareTemplateAppAsync(templateSpec: PackageSpec, projectRoot: string, config: AppJsonInput | BareAppConfig): Promise<string>;
/**
 * Extract a template app to a given file path.
 */
export declare function extractTemplateAppAsync(templateSpec: PackageSpec, targetPath: string, config: {
    name?: string;
}): Promise<string>;
export {};
