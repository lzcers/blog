import React from 'react'

import './about.less'

const About = () => (
    <div className="about">
        <div className="aboutmePic" />
        <p>
            从时光这头到那头，从出生到死亡，
            <br />
            岁月携身体流逝无可挽留，思绪起伏却总是遗忘，
            <br />
            回忆将破碎的自我在时光中串起以维持人生作为一个整体的印象。
            <br />
            时光总会悄然而逝，回忆也会被遗忘，仅能用文字去挽留那些思绪。
            <br />
            给未来的自己留些往昔的痕迹，也许能勾起回忆，也许能让回忆更加深刻。
        </p>
        <br />
        <a style={{ textDecoration: 'underline' }} href="https://github.com/lzcers">
            My GitHub
        </a>
        <br />
        <i>Email: lzcers@gmail.com</i> <br />
    </div>
)

export default About
