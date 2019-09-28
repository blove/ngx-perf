import { AfterViewInit } from '@angular/core';

interface AfterViewInitLike {
  ngAfterViewInit?: () => any;
}

interface ComponentLike {
  prototype: AfterViewInitLike;
  new (...args: any[]): AfterViewInitLike;
}

export const NgxPerfComponent = (name: string) => {
  return (target: ComponentLike) => {
    // copy of the target's ngAfterViewInit method
    const ngAfterViewInit = target.prototype.ngAfterViewInit;

    // override existing target's ngAfterViewInit method
    target.prototype.ngAfterViewInit = function(): void {
      if (ngAfterViewInit) {
        ngAfterViewInit.apply(this);
      }
      console.log('end');
    };

    // define a new constructor function
    const constructorFn: any = function c(...args) {
      console.log('start');
      const targetConstructor = function t() {
        return new target(arguments);
      };
      targetConstructor.prototype = Object.create(target.prototype);
      return new (targetConstructor as any)(...args);
    };
    constructorFn.prototype = Object.create(target.prototype);

    return constructorFn;
  };
};
