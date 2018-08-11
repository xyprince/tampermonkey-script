// ==UserScript==
// @name         极客时间专栏增强
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description 极客时间 专栏 文章 放大 清除复制限制
// @author       xyprince
// @match        https://time.geekbang.org/column/*
// @grant        none
// ==/UserScript==

(() => {
    'use strict';

    console.log('Enhancer By Tampermonkey');

    // 隐藏封面
    let style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = '.article-content > img {display: none}';
    document.head.appendChild(style);

    let observer = new MutationObserver(es => {
        for(let e of es) {
            if(e.type == 'childList') {
                let nodes = e.addedNodes || [];
                for(let n of nodes) {
                    let classList = Array.from(n.classList || []);

                    // 放大专栏
                    if(classList.includes('article')) {
                        n.style.maxWidth = '90%';
                    }

                    // 清除复制限制
                    if(classList.includes('main-app')) {
                        let content = n.querySelector('#article-content');
                        content.parentNode.replaceChild(content.cloneNode(true), content);
                        observer.disconnect();
                    }
                }
            }
        }
    });
    let element = document.querySelector('#app');
    observer.observe(element, {attributes: true, childList: true, subtree: true });
})();