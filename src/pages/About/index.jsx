import React from 'react'
import Lifegame from '@/components/Lifegame'

import './about.scss'

const About = _ => (
    <div className="about">
        <p>
            以为人生是连续的，从时光这头到那头，从出生到死亡，像条在时光里蠕动的虫子，
            <br />
            用无常生灭来形容或许更为恰当，岁月携身体流逝而无可挽留，思绪起伏却总是遗忘，
            <br />
            回忆将破碎的自我在时光中串起以维持人生作为一个整体的印象。
            <br />
            <br />
            即便如此，时光总会悄然将其斩断，回忆也会被遗忘，
            <br />
            能做的，仅是用文字去挽留那些思绪，在这里，
            <br />
            给未来的自己留些东西， 也许能勾起回忆，也许能让回忆更加深刻。
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
