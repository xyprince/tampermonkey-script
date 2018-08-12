// ==UserScript==
// @name         极客时间专栏增强
// @namespace    https://github.com/xyprince/tampermonkey-script/
// @updateURL    https://github.com/xyprince/tampermonkey-script/raw/master/%E6%9E%81%E5%AE%A2%E6%97%B6%E9%97%B4%E4%B8%93%E6%A0%8F%E5%A2%9E%E5%BC%BA.user.js
// @downloadURL  https://github.com/xyprince/tampermonkey-script/raw/master/%E6%9E%81%E5%AE%A2%E6%97%B6%E9%97%B4%E4%B8%93%E6%A0%8F%E5%A2%9E%E5%BC%BA.user.js
// @version      0.5
// @description  极客时间 专栏 文章 放大 清除复制限制
// @author       xyprince
// @include      https://time.geekbang.org/column/*
// @include      https://time.geekbang.org/column/article/*
// @exclude      https://time.geekbang.org/column/intro/*
// @grant        none
// ==/UserScript==

(() => {
    'use strict';

    console.log('Enhancer By Tampermonkey');

    // 隐藏大图
    let style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = '.article-content > img {display: none} body .article-item-cover {display: none}';
    document.head.appendChild(style);

    let observer = new MutationObserver(args => {
        args.filter(a => a.type == 'childList')
            .map(a => Array.from(a.addedNodes))
            .forEach(node => {
                node.filter(n => n.classList)
                    .forEach(n => {
                        let classList = Array.from(n.classList);

                        // 放大专栏
                        if(classList.includes('article')) {
                            n.style.maxWidth = '90%';
                        }

                        // 清除复制限制
                        if(classList.includes('main-app')) {
                            let content = n.querySelector('#article-content');
                            content.parentNode.replaceChild(content.cloneNode(true), content);
                        }
                    });
            });
    });
    let element = document.querySelector('#app');
    observer.observe(element, {attributes: true, childList: true, subtree: true });
    window.addEventListener('unload', e => observer.disconnect());
})();
