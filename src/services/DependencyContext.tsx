import React, { Component, ComponentType, createContext } from 'react';
import ServiceFactory from './ServiceFactory';

const dependencyContext = createContext<ServiceFactory | null>(null);
/* tslint:disable variable-name */
export const DependencyContextProvider = dependencyContext.Provider;
const DependencyContextConsumer = dependencyContext.Consumer;
/* tslint:enable variable-name */

interface IMap {
  [anyProp: string]: any;
}

export const withDependency = <P extends {}>(
  // tslint:disable-next-line variable-name
  BaseComponent: ComponentType,
  map: (factory: ServiceFactory) => IMap
) =>
  class WithDependency extends Component<P, {}> {
    public render() {
      const { props } = this;

      return (
        <DependencyContextConsumer>
          {serviceFactory => {
            const serviceProps = serviceFactory && map(serviceFactory);
            return (
              serviceProps && <BaseComponent {...props} {...serviceProps} />
            );
          }}
        </DependencyContextConsumer>
      );
    }
  };
