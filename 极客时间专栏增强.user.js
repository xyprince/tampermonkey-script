// ==UserScript==
// @name         极客时间专栏增强
// @namespace    https://github.com/xyprince/tampermonkey-script/raw/master/%E6%9E%81%E5%AE%A2%E6%97%B6%E9%97%B4%E4%B8%93%E6%A0%8F%E5%A2%9E%E5%BC%BA.user.js
// @version      0.2
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
