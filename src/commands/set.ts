import {handleSetUnset } from './common/handleSetUnset';

export function set(options, output) {
  handleSetUnset.call(this, options, this.config.set.bind(this.config), output);
}