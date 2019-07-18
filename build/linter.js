(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
    typeof define === 'function' && define.amd ? define(['exports'], factory) :
    (global = global || self, factory(global.lint = {}));
}(this, function (exports) { 'use strict';

    var checkH1 = (json) => {

        return [];
    };

    var checkH2 = (json) => {

        return [];
    };

    var checkH3 = (json) => {

        return [];
    };

    var textLinter = (json) => {
        const errors = [];

        errors.push(...checkH1());
        errors.push(...checkH2());
        errors.push(...checkH3());

        return errors;
    };

    var checkContent = (json) => {

        return [];
    };

    var checkFooter = (json) => {

        return [];
    };

    var checkHeader = (json) => {

        return [];
    };

    var checkInput = (json) => {

        return [];
    };

    var formLinter = (json) => {
        const errors = [];

        errors.push(...checkContent());
        errors.push(...checkFooter());
        errors.push(...checkHeader());
        errors.push(...checkInput());
        
        return errors;
    };

    const checkBlockByName = (obj, blockName) => Boolean(
        obj.block && obj.block === blockName
        || obj.mix && obj.mix.some((mix) => checkBlockByName(mix, blockName))
    );

    const checkBemObj = (obj) => {
        const errors = [];

        if(checkBlockByName(obj, 'form')) {
            errors.push(...formLinter());
        }

        if(checkBlockByName(obj, 'text')) {
            errors.push(...textLinter());
        }

        return errors
    };


    const lint = (json) => {
        const bemObj = JSON.parse(json);

        return checkBemObj(bemObj);
    };

    window.lint = lint;

    exports.lint = lint;

    Object.defineProperty(exports, '__esModule', { value: true });

}));
