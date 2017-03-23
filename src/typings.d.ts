// Typings reference file, see links for more information
// https://github.com/typings/typings
// https://www.typescriptlang.org/docs/handbook/writing-declaration-files.html

declare var System: any;
declare var require: NodeRequire;

declare function geojsonvt(data:any, options:any);

declare namespace L {
  namespace vectorGrid {
    export function slicer(data: any, options?: any): any;
  }
}
