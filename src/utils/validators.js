export const isEmpty = (thing) => {
    let empty = false;

    switch (typeof thing) {
        case 'undefined':
            empty = true;
            break;
        case 'string':
            if (thing.trim().length === 0) {
                empty = true;
            }
            break;
        case 'object':
            if (thing === null) {
                empty = true;
            } else if (Object.keys(thing).length === 0) {
                empty = true;
            }
            break;
        default:
            empty = false;
            
    }

    return empty;
}
export const isEmail = (email) => {
    const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
}
  