const removeEmptySpacesfromEnd = (html: string) => {
    const doc = new DOMParser().parseFromString(html, 'text/html');
    const body = doc.body.lastElementChild.children;
    for (let x = body.length - 1; x >= 0; x--) {
      if (body.item(x).innerHTML.length > 0) break;
      if (body.item(x).innerHTML.length === 0) body.item(x).remove();
    }
    return doc.body.outerHTML;
  };
