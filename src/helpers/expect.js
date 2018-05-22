/**
 * Ensuring expected parameters helper
 * This file it is a part of the Pandora Pyrrha Javascript library
 * 
 * @file expect.js
 * @author Kostiantyn Smyrnov <kostysh@gmail.com>
 * @date 2018
 */

'use strict';

import PjsError, {
    OPTIONS_REQUIRED,
    WRONG_TYPE,
    ADDRESS_REQUIRED
} from './errors';

export const all = (options = {}, model = {}) => {

    if (typeof options !== 'object' || Object.keys(options).length === 0) {

        throw PjsError(OPTIONS_REQUIRED);
    }

    for (let key of Object.keys(model)) {

        let value = key.split('.').reduce((acc, part) => {
            return acc[part] !== undefined ? acc[part] : null;
        }, options);

        if (model[key].type && model[key].type === 'address' && !(new RegExp('^0x[a-fA-F0-9]{40}$').test(value))) {

            throw PjsError.apply(undefined, [
                model[key].code || ADDRESS_REQUIRED, 
                key, 
                model[key].type, 
                value,
                ...(model[key].args ? model[key].args : [undefined])
            ]);
        }

        if (model[key].type && model[key].type !== 'address' && typeof value !== model[key].type) {

            throw PjsError.apply(undefined, [
                model[key].code || WRONG_TYPE, 
                key, 
                model[key].type, 
                value,
                ...(model[key].args ? model[key].args : [undefined])
            ]);
        }
    }
};
