(function (factory) {
    typeof define === 'function' && define.amd ? define(factory) :
    factory();
}(function () { 'use strict';

    var checkH1 = (json) => {

        return [];
    };

    var checkH2 = (json) => {

        return [];
    };

    var checkH3 = (json) => {

        return [];
    };

    const checkIfText = (obj) => obj.block && obj.block === 'text'
        || obj.mix  && obj.mix.some((mix) => checkIfText(mix));

    const textLinter = (json) => {
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

    const checkIfForm = (obj) => obj.block && obj.block === 'form'
        || obj.mix  && obj.mix.some((mix) => checkIfForm(mix));
        

    const formLinter = (json) => {
        const errors = [];

        errors.push(...checkContent());
        errors.push(...checkFooter());
        errors.push(...checkHeader());
        errors.push(...checkInput());
        
        return errors;
    };

    const checkBemObj = (obj) => {
        const errors = [];

        if(checkIfForm(obj)) {
            errors.push(...formLinter());
        }

        if(checkIfText(obj)) {
            errors.push(...textLinter());
        }

        return errors
    };


    const lint = (json) => {
        const bemObj = JSON.parse(json);

        return checkBemObj(bemObj);
    };

    //for future tests
    console.log(lint(JSON.stringify({ block: "form" })));
    console.log(lint(JSON.stringify({ block: "layout" })));
    console.log(lint(JSON.stringify({ block: "layout", mix: [{ block: "form"}] })));
    console.log(lint(JSON.stringify({ block: "layout", mix: [{ block: "text"}] })));
    console.log(lint(JSON.stringify({ block: "text" })));

}));
