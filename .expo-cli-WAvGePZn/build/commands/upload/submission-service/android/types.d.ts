import { SubmissionContext, SubmitCommandOptions } from '../types';
export interface AndroidSubmitCommandOptions extends SubmitCommandOptions {
    type?: string;
    key?: string;
    androidPackage?: string;
    track?: string;
    releaseStatus?: string;
}
export declare type AndroidSubmissionContext = SubmissionContext<AndroidSubmitCommandOptions>;
