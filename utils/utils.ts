const delay = (milliseconds: number): Promise<NodeJS.Timeout> => {
    return new Promise(resolve => {
        setTimeout(resolve, milliseconds);
    });
};

export { delay };