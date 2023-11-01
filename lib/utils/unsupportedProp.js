function unsupportedProp(
    props,
    propName,
    componentName,
    location,
    propFullName
) {
    if (process.env.NODE_ENV === 'production') {
        return null;
    }

    const propFullNameSafe = propFullName || propName;

    if (typeof props[propName] !== 'undefined') {
        return new Error(
            `A propriedade \`${propFullNameSafe}\` não é suportada. Por favor remova-a.`
        );
    }

    return null;
}

export default unsupportedProp;
