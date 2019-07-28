const textTypes = {
    H1: 'h1',
    H2: 'h2',
    H3: 'h3',
    P: 'p'
}

export const isHeader = (block) => block && block.mods
    && block.mods.type
    && block.mods.type !== textTypes.P;

export const isH1Header = (type) => type === textTypes.H1;
export const isH2Header = (type) => type === textTypes.H2;
export const isH3Header = (type) => type === textTypes.H3;

export const checkH1Header = (headers) => !headers.find((item) => item.type === textTypes.H1);

export const getH2Headers = (headers) => headers.filter((item) => item.type === textTypes.H2);
export const getH3Headers = (headers) => headers.filter((item) => item.type === textTypes.H3);