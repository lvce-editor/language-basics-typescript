const emoji: HTMLElement[] = [];
emoji.outerHTML = emoji.querySelector('img')?.getAttribute('alt') ?? '';
