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
    OPTIONS_REQUIRED
} from './errors';

export const all = (options = {}, model = {}) => {

    if (typeof options !== 'object' || Object.keys(options).length === 0) {

        throw PjsError(OPTIONS_REQUIRED);
    }

    for (let key of Object.keys(model)) {

        let value = key.split('.').reduce((acc, part) => {
            return acc[part] ? acc[part] : null;
        }, options);

        if (!value || (model[key].type && typeof value !== model[key].type)) {

            throw PjsError.apply(undefined, [...[model[key].code], ...(model[key].args ? model[key].args : [])]);
        }
    }
};
