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
    ADDRESS_REQUIRED,
    EXPECT_NOT_A_MEMBER,
    EXPECT_TYPE_OPTIONS_REQUIRED
} from './errors';

export const all = (options = {}, model = {}) => {

    if (typeof options !== 'object' || Object.keys(options).length === 0) {

        throw PjsError(OPTIONS_REQUIRED);
    }

    for (let key of Object.keys(model)) {

        let value = key.split('.').reduce((acc, part) => {
            return acc[part] !== undefined ? acc[part] : null;
        }, options);

        let memberValue;

        switch (model[key].type) {
            case 'enum':

                if (!model[key].values || !Array.isArray(model[key].values)) {

                    throw PjsError.apply(undefined, [
                        model[key].code || EXPECT_TYPE_OPTIONS_REQUIRED, 
                        key, 
                        model[key].type,
                        value,
                        ...(model[key].args ? model[key].args : [undefined])
                    ]);
                }

                if (!model[key].values.includes(value)) {

                    throw PjsError.apply(undefined, [
                        model[key].code || WRONG_TYPE, 
                        key, 
                        model[key].type,
                        value,
                        ...(model[key].args ? model[key].args : [undefined])
                    ]);
                }

                break;

            case 'address':

                if (!new RegExp('^0x[a-fA-F0-9]{40}$').test(value)) {

                    throw PjsError.apply(undefined, [
                        model[key].code || ADDRESS_REQUIRED, 
                        key, 
                        model[key].type, 
                        value,
                        ...(model[key].args ? model[key].args : [undefined])
                    ]);
                }

                break;

            case 'member':
                
                if (!model[key].provider || typeof model[key].provider !== 'object') {

                    throw PjsError.apply(undefined, [
                        model[key].code || `Provider object must be defined as "provider" model option for "${key}"`, 
                        key, 
                        model[key].type, 
                        value,
                        ...(model[key].args ? model[key].args : [undefined])
                    ]);
                }

                memberValue = value.split('.').reduce((acc, part) => {
                    return acc && acc[part] !== undefined ? acc[part] : null;
                }, model[key].provider);

                if (!memberValue) {

                    throw PjsError.apply(undefined, [
                        model[key].code || EXPECT_NOT_A_MEMBER, 
                        key, 
                        model[key].type, 
                        value,
                        ...(model[key].args ? model[key].args : [undefined])
                    ]);
                }

                break;

            default:
                
                if (typeof value !== model[key].type && 
                    (model[key].required === true || model[key].required === undefined)) {

                    throw PjsError.apply(undefined, [
                        model[key].code || WRONG_TYPE, 
                        key, 
                        model[key].type, 
                        value,
                        ...(model[key].args ? model[key].args : [undefined])
                    ]);
                }
        }        
    }
};
