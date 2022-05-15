import React from "react";
import "./toc.less";

interface TOC {
    nodeID: number;
    childrenNode: TOC[];
}
function goAnchor(selector: string) {
    const anchor = document.querySelector("#" + selector) as HTMLElement;
    // 当前位置
    // DTD是否存,会影响document.body.scrollTop 与 document.documentElement.scrollTop的取值
    let curPY = document.documentElement.scrollTop || document.body.scrollTop;
    // 目标位置
    const targetPY = anchor.offsetTop - 80;
    // 速率
    const rate = 4;
    if (anchor != null) {
        const go = () => {
            curPY = curPY + (targetPY - curPY) / rate;
            // 临界判断
            if (Math.abs(targetPY - curPY) < 1) {
                window.scrollTo(0, targetPY);
                return;
            }
            window.scrollTo(0, curPY);
            requestAnimationFrame(go);
        };
        go();
    }
}

function li(toc: TOC, index: number) {
    const child = toc.childrenNode;
    return (
        <li className="toc-li" key={index}>
            <a className="toc-anchor" onClick={_ => goAnchor(toc.nodeID + "")}>
                {toc.nodeID}
            </a>
            {child.length ? <ol className="toc-li">{child.map(i => li(i, i.nodeID + index))}</ol> : null}
        </li>
    );
}

export default ({ toc }: { toc: TOC }) =>
    toc ? (
        <div className="toc">
            {/* {toc.childrenNode.length > 3 ? <h3>目录</h3> : null} */}
            <ol>{toc.childrenNode.map((e, i) => li(e, e.nodeID + i))}</ol>
        </div>
    ) : null;
