import {StyleSheet} from 'react-native';

declare module 'react-router-native';
declare module 'react-native-video';
declare module 'react-redux';

declare module "*.svg" {
    import React from 'react';
    import { SvgProps } from "react-native-svg";
    const content: React.FC<SvgProps>;
    export default content;
  }

export = EStyleSheet;

declare namespace EStyleSheet {
    type AnyObject<T = {}> = T & {[key: string]: any};
    type Event = 'build';


    export function create<T>(styles: AnyObject<T>): AnyObject<T>;
    export function build<T>(rawGlobalVars?: T): void;
    export function value<T>(expr: any, prop?: string): any;
    export function child<T>(styles: T, styleName: string, index: number, count: number): T;
    export function subscribe(event: Event, listener: () => any): void;
    export function clearCache(): void;
  
    // inherited from StyleSheet
    export const flatten: typeof StyleSheet.flatten;
    export const setStyleAttributePreprocessor: typeof StyleSheet.setStyleAttributePreprocessor;
    export const hairlineWidth: typeof StyleSheet.hairlineWidth;
    export const absoluteFillObject: typeof StyleSheet.absoluteFillObject;
    export const absoluteFill: typeof StyleSheet.absoluteFill;
}