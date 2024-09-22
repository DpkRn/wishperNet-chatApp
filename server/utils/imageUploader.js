export const getImagePublicId = (link) => {
    const parts=link.split('/');
    const fname=parts[parts.length-2];
    const iname=parts[parts.length-1];
    const iTitle=iname.split('.')
    const public_id=fname+'/'+iTitle[iTitle.length-2];
    return public_id;
};


